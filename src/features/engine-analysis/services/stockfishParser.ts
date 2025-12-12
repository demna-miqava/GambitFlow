import type { EvaluationLine } from "@/features/engine-analysis/types";

// Helpers dedicated to parsing Stockfish "info" lines
export class StockfishParser {
  private parseNumber(value?: string): number | undefined {
    const num = value !== undefined ? parseInt(value, 10) : NaN;
    return Number.isNaN(num) ? undefined : num;
  }

  private parseScore(
    tokens: string[],
    startIndex: number
  ): {
    score?: number;
    mate?: number;
  } {
    if (!tokens[startIndex] || !tokens[startIndex + 1]) return {};
    const type = tokens[startIndex];
    const value = this.parseNumber(tokens[startIndex + 1]);

    if (type === "cp" && value !== undefined) {
      return { score: value };
    }

    if (type === "mate" && value !== undefined) {
      return { mate: value, score: value > 0 ? 100000 : -100000 };
    }

    return {};
  }

  private extractDepth(tokens: string[]): number | undefined {
    const depthIndex = tokens.indexOf("depth");
    if (depthIndex === -1) return undefined;
    return this.parseNumber(tokens[depthIndex + 1]);
  }

  private shouldParseLine(tokens: string[], targetDepth?: number): boolean {
    if (tokens[0] !== "info") return false;
    if (!tokens.includes("score") || !tokens.includes("pv")) return false;

    if (!targetDepth) return true;

    const depth = this.extractDepth(tokens);
    return depth === targetDepth;
  }

  private parseInfoTokens(tokens: string[]): Partial<EvaluationLine> {
    const result: Partial<EvaluationLine> = {};

    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];

      switch (token) {
        case "depth": {
          const depth = this.parseNumber(tokens[i + 1]);
          if (depth !== undefined) result.depth = depth;
          i += 2;
          break;
        }
        case "multipv": {
          const multipv = this.parseNumber(tokens[i + 1]);
          if (multipv !== undefined) result.multipv = multipv;
          i += 2;
          break;
        }
        case "score": {
          const { score, mate } = this.parseScore(tokens, i + 1);
          if (score !== undefined) result.score = score;
          if (mate !== undefined) result.mate = mate;
          i += 3; // skip "score", type, and value
          break;
        }
        case "pv":
          result.pv = tokens.slice(i + 1);
          i = tokens.length; // remaining tokens belong to the PV
          break;
        default:
          i += 1;
      }
    }

    return result;
  }

  /**
    Parse a raw info message; returns null if the line should be ignored.
  */
  parseInfo(
    message: string,
    targetDepth?: number
  ): Partial<EvaluationLine> | null {
    const tokens = message.split(" ");

    if (!this.shouldParseLine(tokens, targetDepth)) return null;

    return this.parseInfoTokens(tokens);
  }
}
