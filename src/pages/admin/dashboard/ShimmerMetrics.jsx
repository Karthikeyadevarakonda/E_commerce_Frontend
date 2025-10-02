// ShimmerMetrics.js
import React from "react";

const ShimmerCard = () => (
  <div className="bg-white/80 p-6 rounded-xl shadow flex flex-col gap-3 animate-pulse">
    <div className="h-4 w-20 bg-slate-200 rounded" />
    <div className="h-6 w-28 bg-slate-300 rounded" />
  </div>
);

const ShimmerMetrics = () => {
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <ShimmerCard key={i} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white/80 p-6 rounded-xl shadow flex flex-col items-center animate-pulse"
          >
            <div className="h-5 w-32 bg-slate-200 rounded mb-4" />
            <div className="w-full h-56 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      {/* Top Products Scroll */}
      <div className="bg-white/80 p-6 rounded-xl shadow animate-pulse">
        <div className="h-5 w-32 bg-slate-200 rounded mb-4" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-w-[140px] bg-slate-100 rounded-xl p-4 flex flex-col items-center"
            >
              <div className="h-24 w-24 bg-slate-200 rounded-md mb-2" />
              <div className="h-4 w-20 bg-slate-200 rounded mb-1" />
              <div className="h-3 w-16 bg-slate-200 rounded mb-1" />
              <div className="h-4 w-12 bg-slate-300 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerMetrics;
