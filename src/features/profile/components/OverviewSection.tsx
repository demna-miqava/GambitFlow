import PerformanceShowcase from "@/features/stats/components/performance/PerformanceShowcase";

export const OverviewSection = () => {
  return (
    <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <PerformanceShowcase />
      </div>
      {/* TODO: Add friends section  in the respective feature's folder*/}
      <aside className="flex flex-col gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">Friends</h3>
          <p className="mt-2 text-sm text-white/60">
            Plug in additional profile insights or a small summary card here.
          </p>
        </div>
      </aside>
    </section>
  );
};

export default OverviewSection;
