// /**
//  * Stockfish Chess Engine Service
//  * Loads Stockfish from public folder as a Web Worker
//  */

export interface StockfishOptions {
  skillLevel?: number; // 0-20, maps to ~ELO 800-2850
  depth?: number; // Search depth (1-20+)
  moveTime?: number; // Time limit in ms
  multiPv?: number; // Number of lines to analyze (1-5)
}

import type { EvaluationLine } from "@/features/engine-analysis/types";
import { StockfishParser } from "./stockfishParser";
import {
  DEFAULT_ENGINE_OPTIONS,
  DEFAULT_STOCKFISH_URL,
} from "@/features/engine-analysis/constants";

export interface MultiPvResult {
  lines: EvaluationLine[];
  depth: number;
}

type MessageHandler = (data: string) => void;

class StockfishService {
  private worker: Worker | null = null;
  private isReady = false;
  private messageHandlers: Set<MessageHandler> = new Set();
  private readyPromise: Promise<void> | null = null;
  private parser = new StockfishParser();
  private options: StockfishOptions = { ...DEFAULT_ENGINE_OPTIONS };

  async init(options?: StockfishOptions): Promise<void> {
    if (this.worker && this.isReady) {
      if (options) await this.setOptions(options);
      return;
    }

    // Merge options before initializing
    if (options) {
      this.options = { ...this.options, ...options };
    }

    if (this.readyPromise) {
      await this.readyPromise;
      return;
    }

    this.readyPromise = new Promise<void>((resolve, reject) => {
      try {
        const workerUrl = DEFAULT_STOCKFISH_URL;

        this.worker = new Worker(workerUrl);
        this.worker.onmessage = (event: MessageEvent) => {
          const message =
            typeof event.data === "string" ? event.data : String(event.data);

          this.messageHandlers.forEach((handler) => handler(message));
          if (message === "uciok") {
            this.applyOptions();
            this.isReady = true;
            resolve();
          }
        };
        this.worker.onerror = (e) => {
          reject(new Error(`Stockfish error: ${e.message}`));
        };

        // Sends the UCI (Universal Chess Interface) protocol initialization command to the Stockfish Web Worker.
        this.worker.postMessage("uci");
      } catch (error) {
        reject(error);
      }
    });

    try {
      await this.readyPromise;
    } finally {
      this.readyPromise = null;
    }
  }

  private send(command: string): void {
    if (!this.worker) throw new Error("Stockfish not initialized");
    this.worker.postMessage(command);
  }

  private applyOptions(): void {
    const { skillLevel, multiPv } = this.options;

    if (skillLevel !== undefined) {
      this.send(`setoption name Skill Level value ${skillLevel}`);
    }
    if (multiPv !== undefined) {
      this.send(`setoption name MultiPV value ${multiPv}`);
    }
    this.send("isready");
  }

  async setOptions(options: StockfishOptions): Promise<void> {
    if (!this.worker || !this.isReady) {
      throw new Error("Stockfish not initialized");
    }
    this.options = { ...this.options, ...options };
    if (this.isReady) {
      this.applyOptions();
      await this.waitForReady();
    }
  }

  private waitForReady(): Promise<void> {
    return new Promise((resolve) => {
      const handler = (message: string) => {
        if (message === "readyok") {
          this.messageHandlers.delete(handler);
          resolve();
        }
      };
      this.messageHandlers.add(handler);
      this.send("isready");
    });
  }

  private normalizeValue(value: number, isBlackTurn: boolean): number {
    return isBlackTurn ? -value : value;
  }

  private updateLine(
    lines: Map<number, EvaluationLine>,
    parsed: Partial<EvaluationLine>,
    isBlackTurn: boolean
  ): number {
    const { multipv, depth, pv, score } = parsed;

    if (!multipv || !depth || !pv || score === undefined) return 0;

    const existing = lines.get(multipv);
    if (existing && existing.depth > depth) return existing.depth;

    const normalizedScore = this.normalizeValue(score, isBlackTurn);
    const normalizedMate =
      parsed.mate !== undefined
        ? this.normalizeValue(parsed.mate, isBlackTurn)
        : undefined;

    lines.set(multipv, {
      depth,
      multipv,
      pv,
      score: normalizedScore,
      mate: normalizedMate,
    });
    return depth;
  }

  async analyzeMultiPv(
    fen: string,
    numLines: number = 3
  ): Promise<MultiPvResult> {
    if (!this.isReady) await this.init();
    // Set MultiPV option
    this.send(`setoption name MultiPV value ${numLines}`);
    await this.waitForReady();

    this.send(`position fen ${fen}`);

    // Snapshot options at start to avoid mid-analysis changes affecting parsing
    const targetDepth = this.options.depth;
    const moveTime = this.options.moveTime;

    // Determine if it's Black's turn (scores need to be negated for White's perspective)
    const isBlackTurn = fen.split(" ")[1] === "b";

    return new Promise((resolve) => {
      const lines: Map<number, EvaluationLine> = new Map();
      let maxDepth = 0;

      const handler = (message: string) => {
        const parsed = this.parser.parseInfo(message, targetDepth);
        if (parsed) {
          const depth = this.updateLine(lines, parsed, isBlackTurn);
          if (depth > maxDepth) maxDepth = depth;
        }

        if (message.startsWith("bestmove")) {
          this.messageHandlers.delete(handler);

          // Convert map to sorted array
          const sortedLines = Array.from(lines.values()).sort(
            (a, b) => a.multipv - b.multipv
          );
          resolve({
            lines: sortedLines,
            depth: maxDepth,
          });
        }
      };

      this.messageHandlers.add(handler);
      this.send(`go depth ${targetDepth ?? ""} movetime ${moveTime ?? ""}`);
    });
  }

  stop(): void {
    this.worker?.postMessage("stop");
  }

  onMessage(handler: MessageHandler): () => void {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  destroy(): void {
    if (this.worker) {
      this.send("quit");
      this.worker.terminate();
      this.worker = null;
      this.isReady = false;
      this.messageHandlers.clear();
    }
  }
}

export { StockfishService };
