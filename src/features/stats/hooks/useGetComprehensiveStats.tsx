import { useQueryParams } from "@/hooks/useQueryParams";

// Types for comprehensive stats data
export interface RatingDataPoint {
  date: string;
  rating: number;
}

export interface WinLossData {
  percent: number;
  count: number;
}

export interface ComprehensiveStatsData {
  currentRating: number;
  ratingGain: number;
  friendsRank: number;
  friendsCount: number;
  globalRank: number;
  percentile: number;
  highestRating: number;
  totalGames: number;
  wins: number;
  draws: number;
  losses: number;
  ratingHistory: RatingDataPoint[];
  // Additional data for comprehensive stats components
  averageRating: number;
  bestWin: number;
  winStreak: number;
  // Computed win/loss data for WinRatePill
  winData: WinLossData;
  drawData: WinLossData;
  lossData: WinLossData;
}

// Helper function to calculate win/loss percentages and counts
const calculateWinLossData = (
  wins: number,
  draws: number,
  losses: number,
  totalGames: number
) => {
  const winPercent = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
  const drawPercent =
    totalGames > 0 ? Math.round((draws / totalGames) * 100) : 0;
  const lossPercent =
    totalGames > 0 ? Math.round((losses / totalGames) * 100) : 0;

  return {
    winData: { percent: winPercent, count: wins },
    drawData: { percent: drawPercent, count: draws },
    lossData: { percent: lossPercent, count: losses },
  };
};

// Static data for different time periods and variants
const comprehensiveStatsData: Record<
  string,
  Record<string, ComprehensiveStatsData>
> = {
  "30": {
    all: {
      currentRating: 1251,
      ratingGain: 45,
      friendsRank: 3,
      friendsCount: 15,
      globalRank: 568968,
      percentile: 92,
      highestRating: 1289,
      totalGames: 127,
      wins: 68,
      draws: 12,
      losses: 47,
      ratingHistory: [
        { date: "Aug 1, 2025", rating: 1206 },
        { date: "Aug 8, 2025", rating: 1223 },
        { date: "Aug 15, 2025", rating: 1218 },
        { date: "Aug 22, 2025", rating: 1245 },
        { date: "Aug 29, 2025", rating: 1251 },
      ],
      averageRating: 1230,
      bestWin: 1289,
      winStreak: 8,
      ...calculateWinLossData(68, 12, 47, 127),
    },
    bullet: {
      currentRating: 1180,
      ratingGain: 32,
      friendsRank: 4,
      friendsCount: 15,
      globalRank: 623456,
      percentile: 88,
      highestRating: 1195,
      totalGames: 45,
      wins: 24,
      draws: 3,
      losses: 18,
      ratingHistory: [
        { date: "Aug 1, 2025", rating: 1148 },
        { date: "Aug 8, 2025", rating: 1165 },
        { date: "Aug 15, 2025", rating: 1158 },
        { date: "Aug 22, 2025", rating: 1178 },
        { date: "Aug 29, 2025", rating: 1180 },
      ],
      averageRating: 1165,
      bestWin: 1195,
      winStreak: 5,
      ...calculateWinLossData(24, 3, 18, 45),
    },
    blitz: {
      currentRating: 1320,
      ratingGain: 58,
      friendsRank: 2,
      friendsCount: 15,
      globalRank: 445678,
      percentile: 95,
      highestRating: 1335,
      totalGames: 52,
      wins: 32,
      draws: 6,
      losses: 14,
      ratingHistory: [
        { date: "Aug 1, 2025", rating: 1262 },
        { date: "Aug 8, 2025", rating: 1289 },
        { date: "Aug 15, 2025", rating: 1301 },
        { date: "Aug 22, 2025", rating: 1315 },
        { date: "Aug 29, 2025", rating: 1320 },
      ],
      averageRating: 1295,
      bestWin: 1335,
      winStreak: 7,
      ...calculateWinLossData(32, 6, 14, 52),
    },
    rapid: {
      currentRating: 1280,
      ratingGain: 15,
      friendsRank: 5,
      friendsCount: 15,
      globalRank: 512345,
      percentile: 90,
      highestRating: 1295,
      totalGames: 30,
      wins: 12,
      draws: 3,
      losses: 15,
      ratingHistory: [
        { date: "Aug 1, 2025", rating: 1265 },
        { date: "Aug 8, 2025", rating: 1278 },
        { date: "Aug 15, 2025", rating: 1272 },
        { date: "Aug 22, 2025", rating: 1285 },
        { date: "Aug 29, 2025", rating: 1280 },
      ],
      averageRating: 1275,
      bestWin: 1295,
      winStreak: 4,
      ...calculateWinLossData(12, 3, 15, 30),
    },
  },
  "90": {
    all: {
      currentRating: 1251,
      ratingGain: 127,
      friendsRank: 3,
      friendsCount: 15,
      globalRank: 568968,
      percentile: 92,
      highestRating: 1289,
      totalGames: 389,
      wins: 201,
      draws: 35,
      losses: 153,
      ratingHistory: [
        { date: "Jun 1, 2025", rating: 1124 },
        { date: "Jun 15, 2025", rating: 1156 },
        { date: "Jul 1, 2025", rating: 1189 },
        { date: "Jul 15, 2025", rating: 1212 },
        { date: "Aug 1, 2025", rating: 1206 },
        { date: "Aug 15, 2025", rating: 1218 },
        { date: "Aug 29, 2025", rating: 1251 },
      ],
      averageRating: 1200,
      bestWin: 1289,
      winStreak: 12,
      ...calculateWinLossData(201, 35, 153, 389),
    },
    bullet: {
      currentRating: 1180,
      ratingGain: -89,
      friendsRank: 4,
      friendsCount: 15,
      globalRank: 623456,
      percentile: 88,
      highestRating: 1195,
      totalGames: 142,
      wins: 78,
      draws: 12,
      losses: 52,
      ratingHistory: [
        { date: "Jun 1, 2025", rating: 1091 },
        { date: "Jun 15, 2025", rating: 1115 },
        { date: "Jul 1, 2025", rating: 1138 },
        { date: "Jul 15, 2025", rating: 1156 },
        { date: "Aug 1, 2025", rating: 1148 },
        { date: "Aug 15, 2025", rating: 1158 },
        { date: "Aug 29, 2025", rating: 1180 },
      ],
      averageRating: 1145,
      bestWin: 1195,
      winStreak: 9,
      ...calculateWinLossData(78, 12, 52, 142),
    },
    blitz: {
      currentRating: 1320,
      ratingGain: 156,
      friendsRank: 2,
      friendsCount: 15,
      globalRank: 445678,
      percentile: 95,
      highestRating: 1335,
      totalGames: 156,
      wins: 98,
      draws: 18,
      losses: 40,
      ratingHistory: [
        { date: "Jun 1, 2025", rating: 1164 },
        { date: "Jun 15, 2025", rating: 1198 },
        { date: "Jul 1, 2025", rating: 1234 },
        { date: "Jul 15, 2025", rating: 1267 },
        { date: "Aug 1, 2025", rating: 1262 },
        { date: "Aug 15, 2025", rating: 1301 },
        { date: "Aug 29, 2025", rating: 1320 },
      ],
      averageRating: 1250,
      bestWin: 1335,
      winStreak: 15,
      ...calculateWinLossData(98, 18, 40, 156),
    },
    rapid: {
      currentRating: 1280,
      ratingGain: 45,
      friendsRank: 5,
      friendsCount: 15,
      globalRank: 512345,
      percentile: 90,
      highestRating: 1295,
      totalGames: 91,
      wins: 25,
      draws: 5,
      losses: 61,
      ratingHistory: [
        { date: "Jun 1, 2025", rating: 1235 },
        { date: "Jun 15, 2025", rating: 1248 },
        { date: "Jul 1, 2025", rating: 1256 },
        { date: "Jul 15, 2025", rating: 1269 },
        { date: "Aug 1, 2025", rating: 1265 },
        { date: "Aug 15, 2025", rating: 1272 },
        { date: "Aug 29, 2025", rating: 1280 },
      ],
      averageRating: 1255,
      bestWin: 1295,
      winStreak: 6,
      ...calculateWinLossData(25, 5, 61, 91),
    },
  },
  "365": {
    all: {
      currentRating: 1251,
      ratingGain: 423,
      friendsRank: 3,
      friendsCount: 15,
      globalRank: 568968,
      percentile: 92,
      highestRating: 1289,
      totalGames: 1534,
      wins: 789,
      draws: 142,
      losses: 603,
      ratingHistory: [
        { date: "Sep 1, 2024", rating: 828 },
        { date: "Dec 1, 2024", rating: 945 },
        { date: "Mar 1, 2025", rating: 1089 },
        { date: "Jun 1, 2025", rating: 1124 },
        { date: "Aug 1, 2025", rating: 1206 },
        { date: "Aug 29, 2025", rating: 1251 },
      ],
      averageRating: 1050,
      bestWin: 1289,
      winStreak: 18,
      ...calculateWinLossData(789, 142, 603, 1534),
    },
    bullet: {
      currentRating: 1180,
      ratingGain: 298,
      friendsRank: 4,
      friendsCount: 15,
      globalRank: 623456,
      percentile: 88,
      highestRating: 1195,
      totalGames: 567,
      wins: 312,
      draws: 45,
      losses: 210,
      ratingHistory: [
        { date: "Sep 1, 2024", rating: 882 },
        { date: "Dec 1, 2024", rating: 923 },
        { date: "Mar 1, 2025", rating: 1023 },
        { date: "Jun 1, 2025", rating: 1091 },
        { date: "Aug 1, 2025", rating: 1148 },
        { date: "Aug 29, 2025", rating: 1180 },
      ],
      averageRating: 1000,
      bestWin: 1195,
      winStreak: 14,
      ...calculateWinLossData(312, 45, 210, 567),
    },
    blitz: {
      currentRating: 1320,
      ratingGain: 456,
      friendsRank: 2,
      friendsCount: 15,
      globalRank: 445678,
      percentile: 95,
      highestRating: 1335,
      totalGames: 612,
      wins: 378,
      draws: 67,
      losses: 167,
      ratingHistory: [
        { date: "Sep 1, 2024", rating: 864 },
        { date: "Dec 1, 2024", rating: 978 },
        { date: "Mar 1, 2025", rating: 1123 },
        { date: "Jun 1, 2025", rating: 1164 },
        { date: "Aug 1, 2025", rating: 1262 },
        { date: "Aug 29, 2025", rating: 1320 },
      ],
      averageRating: 1100,
      bestWin: 1335,
      winStreak: 22,
      ...calculateWinLossData(378, 67, 167, 612),
    },
    rapid: {
      currentRating: 1280,
      ratingGain: 198,
      friendsRank: 5,
      friendsCount: 15,
      globalRank: 512345,
      percentile: 90,
      highestRating: 1295,
      totalGames: 355,
      wins: 99,
      draws: 30,
      losses: 226,
      ratingHistory: [
        { date: "Sep 1, 2024", rating: 1082 },
        { date: "Dec 1, 2024", rating: 1123 },
        { date: "Mar 1, 2025", rating: 1189 },
        { date: "Jun 1, 2025", rating: 1235 },
        { date: "Aug 1, 2025", rating: 1265 },
        { date: "Aug 29, 2025", rating: 1280 },
      ],
      averageRating: 1150,
      bestWin: 1295,
      winStreak: 8,
      ...calculateWinLossData(99, 30, 226, 355),
    },
  },
  "all-time": {
    all: {
      currentRating: 1251,
      ratingGain: 987,
      friendsRank: 5,
      friendsCount: 15,
      globalRank: 568968,
      percentile: 92,
      highestRating: 1383,
      totalGames: 2539,
      wins: 1288,
      draws: 86,
      losses: 1165,
      ratingHistory: [
        { date: "May 1, 2024", rating: 264 },
        { date: "Sep 1, 2024", rating: 828 },
        { date: "Jan 1, 2025", rating: 945 },
        { date: "May 1, 2025", rating: 1089 },
        { date: "Sep 1, 2025", rating: 1251 },
      ],
      averageRating: 950,
      bestWin: 1383,
      winStreak: 25,
      ...calculateWinLossData(1288, 86, 1165, 2539),
    },
    bullet: {
      currentRating: 1180,
      ratingGain: 723,
      friendsRank: 6,
      friendsCount: 15,
      globalRank: 623456,
      percentile: 88,
      highestRating: 1300,
      totalGames: 1200,
      wins: 612,
      draws: 45,
      losses: 543,
      ratingHistory: [
        { date: "May 1, 2024", rating: 457 },
        { date: "Sep 1, 2024", rating: 882 },
        { date: "Jan 1, 2025", rating: 923 },
        { date: "May 1, 2025", rating: 1023 },
        { date: "Sep 1, 2025", rating: 1180 },
      ],
      averageRating: 900,
      bestWin: 1300,
      winStreak: 20,
      ...calculateWinLossData(612, 45, 543, 1200),
    },
    blitz: {
      currentRating: 1320,
      ratingGain: 892,
      friendsRank: 3,
      friendsCount: 15,
      globalRank: 445678,
      percentile: 95,
      highestRating: 1500,
      totalGames: 1500,
      wins: 789,
      draws: 67,
      losses: 644,
      ratingHistory: [
        { date: "May 1, 2024", rating: 428 },
        { date: "Sep 1, 2024", rating: 864 },
        { date: "Jan 1, 2025", rating: 978 },
        { date: "May 1, 2025", rating: 1123 },
        { date: "Sep 1, 2025", rating: 1320 },
      ],
      averageRating: 1000,
      bestWin: 1500,
      winStreak: 30,
      ...calculateWinLossData(789, 67, 644, 1500),
    },
    rapid: {
      currentRating: 1280,
      ratingGain: 456,
      friendsRank: 7,
      friendsCount: 15,
      globalRank: 512345,
      percentile: 90,
      highestRating: 1600,
      totalGames: 1300,
      wins: 487,
      draws: 30,
      losses: 783,
      ratingHistory: [
        { date: "May 1, 2024", rating: 824 },
        { date: "Sep 1, 2024", rating: 1082 },
        { date: "Jan 1, 2025", rating: 1123 },
        { date: "May 1, 2025", rating: 1189 },
        { date: "Sep 1, 2025", rating: 1280 },
      ],
      averageRating: 1050,
      bestWin: 1600,
      winStreak: 18,
      ...calculateWinLossData(487, 30, 783, 1300),
    },
  },
};

export const useGetComprehensiveStats = () => {
  const [selectedDays] = useQueryParams("days", "all-time");
  const [selectedVariant] = useQueryParams("variant", "all");

  // Get the data for the selected time period and variant
  const statsData =
    comprehensiveStatsData[selectedDays]?.[selectedVariant] ||
    comprehensiveStatsData["all-time"]["all"];

  return {
    selectedDays,
    selectedVariant,
    statsData,
  };
};
