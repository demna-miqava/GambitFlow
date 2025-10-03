import type { GameTableData } from "./Columns";

export function getData(): GameTableData[] {
  // Fetch data from your API here.
  return [
    {
      id: "game-1001",
      timeControl: "10+0",
      type: "rapid",
      players: {
        white: {
          userName: "Arjun",
          rating: 1480,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Mateo",
          rating: 1503,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "win",
      moves: "42",
      date: "2024-03-18",
    },
    {
      id: "game-1002",
      timeControl: "3+2",
      type: "blitz",
      players: {
        white: {
          userName: "Lena",
          rating: 1712,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Noah",
          rating: 1689,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "loss",
      moves: "58",
      date: "2024-03-15",
    },

    {
      id: "game-1003",
      timeControl: "1+0",
      type: "bullet",
      players: {
        white: {
          userName: "Mia",
          rating: 2013,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Oliver",
          rating: 1998,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "win",
      moves: "26",
      date: "2024-03-09",
    },
    {
      id: "game-1004",
      timeControl: "15+10",
      type: "rapid",
      players: {
        white: {
          userName: "Hiro",
          rating: 1834,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Sara",
          rating: 1887,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "draw",
      moves: "74",
      date: "2024-02-27",
    },
    {
      id: "game-1005",
      timeControl: "5+0",
      type: "blitz",
      players: {
        white: {
          userName: "Elena",
          rating: 1602,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Leo",
          rating: 1625,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "loss",
      moves: "41",
      date: "2024-02-19",
    },
    {
      id: "game-1006",
      timeControl: "25+0",
      type: "blitz",
      players: {
        white: {
          userName: "Isabel",
          rating: 1450,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Amir",
          rating: 1420,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "win",
      moves: "32",
      date: "2024-01-30",
    },
    {
      id: "game-1007",
      timeControl: "3+0",
      type: "blitz",
      players: {
        white: {
          userName: "Chloe",
          rating: 1527,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Ivan",
          rating: 1551,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "loss",
      moves: "35",
      date: "2024-01-22",
    },
    {
      id: "asdasdasdas",
      timeControl: "10+0",
      type: "rapid",
      players: {
        white: {
          userName: "John Doe",
          rating: 1230,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Jane Doe",
          rating: 1230,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "win",
      moves: "10",
      date: "2021-01-01",
    },
    {
      id: "728egghgfd52f",
      timeControl: "10+0",
      type: "rapid",
      players: {
        white: {
          userName: "John Doe",
          rating: 1230,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Jane Doe",
          rating: 1230,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "win",
      moves: "10",
      date: "2021-01-01",
    },
    {
      id: "728edasda52f",
      timeControl: "10+0",
      type: "rapid",
      players: {
        white: {
          userName: "John Doe",
          rating: 1230,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Jane Doe",
          rating: 1230,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "win",
      moves: "10",
      date: "2021-01-01",
    },
    {
      id: "728efdsfsdd52f",
      timeControl: "10+0",
      type: "rapid",
      players: {
        white: {
          userName: "John Doe",
          rating: 1230,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
        black: {
          userName: "Jane Doe",
          rating: 1230,
          image:
            "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
        },
      },
      result: "draw",
      moves: "10",
      date: "2021-01-01",
    },
    // ...
  ];
}
