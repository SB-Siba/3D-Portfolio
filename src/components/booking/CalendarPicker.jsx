/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateKey, isPastDate, isWeekend } from "../../utils/booking";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarPicker = ({ selectedDate, onSelectDate, disableWeekends = false }) => {
  const [viewDate, setViewDate] = useState(() => new Date());

  const calendarGrid = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const firstWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }
    return cells;
  }, [viewDate]);

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4 sm:p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
        >
          Prev
        </button>
        <h3 className="text-base font-semibold text-white sm:text-lg">
          {viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </h3>
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 sm:text-sm">
        {weekDays.map((day) => (
          <div key={day} className="py-1 font-medium">
            {day}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-2 grid grid-cols-7 gap-2"
        >
          {calendarGrid.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="h-10 sm:h-11" />;
            }

            const disabled = isPastDate(day) || (disableWeekends && isWeekend(day));
            const selected = selectedDate && formatDateKey(day) === formatDateKey(selectedDate);

            return (
              <button
                key={formatDateKey(day)}
                type="button"
                disabled={disabled}
                onClick={() => onSelectDate(day)}
                className={[
                  "h-10 rounded-lg border text-sm transition sm:h-11",
                  disabled
                    ? "cursor-not-allowed border-slate-800 bg-slate-900/60 text-slate-600"
                    : "border-slate-700 bg-slate-900 text-slate-200 hover:border-cyan-400/50 hover:text-white",
                  selected ? "border-cyan-400 bg-cyan-500/20 text-cyan-300" : "",
                ].join(" ")}
              >
                {day.getDate()}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <p className="mt-3 text-xs text-slate-400">
        Past dates are disabled{disableWeekends ? "; weekends are unavailable." : "."}
      </p>
    </div>
  );
};

export default CalendarPicker;
