/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const TimeSlotPicker = ({ slots, selectedTime, unavailableSlots, onSelectTime }) => (
  <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4 sm:p-5 backdrop-blur-xl">
    <h3 className="mb-3 text-base font-semibold text-white sm:text-lg">Pick a 20-minute slot</h3>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {slots.map((slot) => {
        const isUnavailable = unavailableSlots.has(slot);
        const isSelected = selectedTime === slot;

        return (
          <motion.button
            key={slot}
            type="button"
            whileTap={{ scale: isUnavailable ? 1 : 0.98 }}
            disabled={isUnavailable}
            onClick={() => onSelectTime(slot)}
            className={[
              "rounded-lg border px-3 py-2 text-sm font-medium transition",
              isUnavailable
                ? "cursor-not-allowed border-slate-800 bg-slate-900/60 text-slate-600"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-cyan-400/50 hover:text-white",
              isSelected ? "border-cyan-400 bg-cyan-500/20 text-cyan-300" : "",
            ].join(" ")}
          >
            {slot}
          </motion.button>
        );
      })}
    </div>
  </div>
);

export default TimeSlotPicker;
