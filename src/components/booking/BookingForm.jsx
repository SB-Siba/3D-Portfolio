/* eslint-disable react/prop-types */
const BookingForm = ({ formData, errors, onChange, onSubmit, isSubmitting }) => (
  <form
    onSubmit={onSubmit}
    className="space-y-4 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4 sm:p-5 backdrop-blur-xl"
  >
    <h3 className="text-base font-semibold text-white sm:text-lg">Your details</h3>

    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1.5 block text-sm text-slate-300">Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          placeholder="Jane Doe"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-300">Email *</label>
        <input
          name="email"
          value={formData.email}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          placeholder="you@company.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-300">Phone *</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          placeholder="+91 9876543210"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm text-slate-300">Company</label>
        <input
          name="company"
          value={formData.company}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          placeholder="Your company"
        />
      </div>
    </div>

    <div>
      <label className="mb-1.5 block text-sm text-slate-300">Message</label>
      <textarea
        rows={4}
        name="message"
        value={formData.message}
        onChange={onChange}
        className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        placeholder="Tell me about your project goals"
      />
    </div>

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSubmitting ? "Scheduling..." : "Confirm booking"}
    </button>
  </form>
);

export default BookingForm;
