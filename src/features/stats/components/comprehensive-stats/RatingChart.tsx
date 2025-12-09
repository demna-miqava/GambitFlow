import { type ComprehensiveStatsData } from "../../hooks/useGetComprehensiveStats";

const RatingChart = ({ statsData }: { statsData: ComprehensiveStatsData }) => {
  const ratingData = statsData.ratingHistory;

  const maxRating = Math.max(...ratingData.map((d) => d.rating));
  const minRating = Math.min(...ratingData.map((d) => d.rating));
  const range = maxRating - minRating;

  // Calculate Y-axis labels dynamically
  const yAxisLabels = [];
  const step = Math.ceil((maxRating - minRating) / 4);
  for (let i = 0; i <= 4; i++) {
    yAxisLabels.push(minRating + step * i);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Rating Progress
      </h3>
      <div className="h-64 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
          {yAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full relative">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            <defs>
              <pattern
                id="grid"
                width="40"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 50"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Area fill */}
            <path
              d={`M 0,${
                200 - ((ratingData[0].rating - minRating) / range) * 200
              } ${ratingData
                .map(
                  (point, index) =>
                    `L ${(index / (ratingData.length - 1)) * 400},${
                      200 - ((point.rating - minRating) / range) * 200
                    }`
                )
                .join(" ")} L 400,200 L 0,200 Z`}
              fill="rgba(59, 130, 246, 0.3)"
            />

            {/* Line */}
            <path
              d={`M 0,${
                200 - ((ratingData[0].rating - minRating) / range) * 200
              } ${ratingData
                .map(
                  (point, index) =>
                    `L ${(index / (ratingData.length - 1)) * 400},${
                      200 - ((point.rating - minRating) / range) * 200
                    }`
                )
                .join(" ")}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />

            {/* Data points */}
            {ratingData.map((point, index) => (
              <circle
                key={index}
                cx={(index / (ratingData.length - 1)) * 400}
                cy={200 - ((point.rating - minRating) / range) * 200}
                r="3"
                fill="#3b82f6"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground mt-2">
            {ratingData.map((point, index) => (
              <span key={index}>{point.date}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingChart;
