/* eslint-disable react/prop-types */
const BookingSuccess = ({ summary, onAddToCalendar, onBookAnother }) => (
  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 backdrop-blur-xl">
    <h3 className="text-xl font-bold text-emerald-300">Booking confirmed</h3>
    <p className="mt-2 text-sm text-slate-200">
      Thanks {summary.name}. Your call has been reserved.
    </p>

    <div className="mt-4 space-y-1.5 text-sm text-slate-300">
      <p><span className="text-slate-400">Date:</span> {summary.dateLabel}</p>
      <p><span className="text-slate-400">Time:</span> {summary.timeSlot}</p>
      <p><span className="text-slate-400">Timezone:</span> {summary.timezone}</p>
      <p><span className="text-slate-400">Email:</span> {summary.email}</p>
    </div>

    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
      <button
        type="button"
        onClick={onAddToCalendar}
        className="rounded-lg border border-cyan-400/50 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/30"
      >
        Add to Google Calendar
      </button>
      <button
        type="button"
        onClick={onBookAnother}
        className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400"
      >
        Book another slot
      </button>
    </div>
  </div>
);

export default BookingSuccess;
