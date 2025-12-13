import type { Puzzle, PuzzleResponse } from "../types/puzzle.types";

// Mock Data
const MOCK_PUZZLES: Puzzle[] = [
    {
        id: "00008",
        fen: "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
        moves: ["f2g3", "e6e7", "b2b1"],
        rating: 600,
        themes: ["endgame", "mate", "short"],
    },
    {
        id: "0000D",
        fen: "5rk1/1p3ppp/pq3b2/8/8/1P1Q1N2/P4PPP/3R2K1 w - - 2 27",
        moves: ["d3d6", "f8d8", "d6d8", "f6d8", "d1d8"],
        rating: 1500,
        themes: ["advantage", "middleGame"],
    },
    {
        id: "0001A",
        fen: "3r2k1/p4ppp/1p6/8/8/1P6/P4PPP/4R1K1 w - - 0 1",
        moves: ["e1e8"],
        rating: 600,
        themes: ["mate", "backRankMate", "endgame"],
    },
    {
        id: "0002B",
        fen: "r4rk1/pp3ppp/2p5/4N3/2BP1nb1/8/PP3PPP/R3R1K1 b - - 1 18",
        moves: ["f4e2", "c4e2", "g4e2", "e1e2", "f8e8"],
        rating: 1100,
        themes: ["advantage", "exchange"],
    },
    {
        id: "0003C",
        fen: "r1bqk2r/ppp2ppp/2n1pn2/8/1bBP4/2N1PN2/PP3PPP/R1BQK2R w KQkq - 3 7",
        moves: ["d4d5", "e6d5", "c4d5", "f6d5", "d1d5"],
        rating: 1200,
        themes: ["opening", "advantage"],
    },
    {
        id: "0004E",
        fen: "rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq e6 0 3",
        moves: ["d4e5", "d5d4", "c2c3"],
        rating: 900,
        themes: ["opening", "hangingPiece"],
    },
    {
        id: "0005F",
        fen: "r1b1k1nr/pppp1ppp/2n2q2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5",
        moves: ["c3d5", "f6d8", "c2c3"],
        rating: 1300,
        themes: ["opening", "development"],
    },
];

const BATCH_SIZE = 5;
const MOCK_DELAY_MS = 500;

const generateUniqueId = (baseId: string): string => {
    return `${baseId}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 11)}`;
};

const mockFetchPuzzles = async (cursor: number): Promise<PuzzleResponse> => {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

    const puzzles: Puzzle[] = [];
    for (let i = 0; i < BATCH_SIZE; i++) {
        const template =
            MOCK_PUZZLES[Math.floor(Math.random() * MOCK_PUZZLES.length)];
        puzzles.push({
            ...template,
            id: generateUniqueId(template.id),
        });
    }

    return {
        data: puzzles,
        nextCursor: cursor + 1,
    };
};

// Service object - ready for real API integration
export const puzzleService = {
    fetchPuzzles: async (cursor: number = 0): Promise<PuzzleResponse> => {
        // TODO: Replace with real API call when backend is ready
        // return apiRequest<PuzzleResponse>("get", `/puzzles?cursor=${cursor}`);
        return mockFetchPuzzles(cursor);
    },
};

// Legacy export for backward compatibility
export const fetchNextPuzzle = async (): Promise<Puzzle> => {
    const template =
        MOCK_PUZZLES[Math.floor(Math.random() * MOCK_PUZZLES.length)];
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
    return {
        ...template,
        id: generateUniqueId(template.id),
    };
};
