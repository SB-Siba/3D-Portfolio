import React, { useState, useEffect, useMemo } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { motion } from "framer-motion";

const getLevel = (count) => {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

const RANGE_OPTIONS = [
  { label: "3M", months: 3 },
  { label: "6M", months: 6 },
  { label: "1Y", months: 12 },
];

const LiveGitHubGraph = () => {
  const [allActivities, setAllActivities] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rangeMonths, setRangeMonths] = useState(6);

  useEffect(() => {
    fetch("/api/github-graph")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(JSON.stringify(data.error));

        const days = data.weeks.flatMap((week) =>
          week.contributionDays.map((d) => ({
            date: d.date,
            count: d.contributionCount,
            level: getLevel(d.contributionCount),
          })),
        );

        setAllActivities(days);
        setTotal(data.totalContributions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("LiveGitHubGraph error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredActivities = useMemo(() => {
    if (!allActivities) return null;

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const cutoff = new Date(today);
    cutoff.setMonth(cutoff.getMonth() - rangeMonths);
    const cutoffStr = `${cutoff.getFullYear()}-${String(
      cutoff.getMonth() + 1,
    ).padStart(2, "0")}-${String(cutoff.getDate()).padStart(2, "0")}`;

    return allActivities.filter(
      (d) => d.date >= cutoffStr && d.date <= todayStr,
    );
  }, [allActivities, rangeMonths]);

  const rangeTotal = useMemo(() => {
    if (!filteredActivities) return 0;
    return filteredActivities.reduce((sum, d) => sum + d.count, 0);
  }, [filteredActivities]);

  if (loading)
    return (
      <div className="w-full bg-[#0d1117] rounded-lg p-3 sm:p-4 animate-pulse">
        {/* Filter buttons skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-10 rounded-md bg-[#161b22]" />
            <div className="h-7 w-10 rounded-md bg-[#161b22]" />
            <div className="h-7 w-10 rounded-md bg-[#161b22]" />
          </div>
          <div className="h-4 w-40 rounded bg-[#161b22]" />
        </div>

        {/* Grid skeleton */}
        <div className="w-full overflow-hidden pb-2">
          <div className="flex gap-[3px]">
            {Array.from({ length: 26 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => (
                  <div
                    key={di}
                    className="rounded-sm bg-[#161b22]"
                    style={{ width: 13, height: 13 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="mt-3 flex items-center justify-between">
          <div className="h-3 w-32 rounded bg-[#161b22]" />
          <div className="h-3 w-24 rounded bg-[#161b22]" />
        </div>
      </div>
    );

  if (error || !filteredActivities)
    return (
      <div className="text-red-400 text-sm py-4 text-center">
        Could not load contribution data.
        <div className="text-slate-500 text-xs mt-1">{error}</div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-[#0d1117] rounded-lg p-3 sm:p-4"
    >
      {/* Filter buttons + range total */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          {RANGE_OPTIONS.map((opt) => {
            const active = rangeMonths === opt.months;
            return (
              <button
                key={opt.label}
                onClick={() => setRangeMonths(opt.months)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 border ${
                  active
                    ? "bg-[#238636] text-white border-[#2ea043] shadow-sm"
                    : "bg-[#161b22] text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
                }`}
                aria-pressed={active}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-400">
          <span className="text-[#39d353] font-semibold">{rangeTotal}</span>{" "}
          contributions in the selected range
        </div>
      </div>

      {/* Calendar — built-in tooltip works automatically when `showTotal` + default props are set */}
      <div
        className="w-full overflow-x-auto pb-2 github-scroll"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
      >
        <div className="inline-block min-w-max px-1">
          <ActivityCalendar
            data={filteredActivities}
            theme={{
              dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
            colorScheme="dark"
            blockSize={13}
            blockMargin={3}
            fontSize={12}
            showWeekdayLabels
            labels={{
              totalCount: `${total} contributions in the last year`,
            }}
          />
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500 text-center">
        Showing last {rangeMonths} month{rangeMonths > 1 ? "s" : ""} ·{" "}
        <span className="text-slate-400">Hover any square for details</span>
      </div>
    </motion.div>
  );
};

export default LiveGitHubGraph;
