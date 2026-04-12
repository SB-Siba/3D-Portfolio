import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  BookingForm,
  BookingSuccess,
  CalendarPicker,
  TimeSlotPicker,
} from "./booking";
import {
  TIMEZONE,
  buildGoogleCalendarUrl,
  buildWhatsAppUrl,
  formatDateKey,
  formatLongDate,
  generateTimeSlots,
  getBookedSlots,
  reserveSlot,
  validateBookingForm,
} from "../utils/booking";

const OWNER_WHATSAPP = "919692199548";

const sendEmail = async (payload) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return { skipped: true };
  }

  await emailjs.send(serviceId, templateId, payload, publicKey);
  return { skipped: false };
};

const BookCallPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [flowMessage, setFlowMessage] = useState("");

  const slots = useMemo(() => generateTimeSlots(10, 18), []);
  const dateKey = selectedDate ? formatDateKey(selectedDate) : "";

  useEffect(() => {
    if (!dateKey) return;
    setBookedSlots(getBookedSlots(dateKey));

    const refresh = () => setBookedSlots(getBookedSlots(dateKey));
    window.addEventListener("storage", refresh);
    const pollId = setInterval(refresh, 30000);

    return () => {
      window.removeEventListener("storage", refresh);
      clearInterval(pollId);
    };
  }, [dateKey]);

  const onDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
    setFlowMessage("");
  };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetFlow = () => {
    setSelectedDate(null);
    setSelectedTime("");
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    setErrors({});
    setSuccessData(null);
    setFlowMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime) {
      setFlowMessage("Select both a date and time slot before submitting.");
      return;
    }

    const validationErrors = validateBookingForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setFlowMessage("");

    const dateLabel = formatLongDate(selectedDate);
    const payload = {
      ...formData,
      dateLabel,
      dateKey,
      timeSlot: selectedTime,
      timezone: TIMEZONE,
    };

    const reservation = reserveSlot(dateKey, selectedTime, payload);
    if (!reservation.ok) {
      setIsSubmitting(false);
      setFlowMessage("That time slot was just booked. Pick a different one.");
      setBookedSlots(getBookedSlots(dateKey));
      return;
    }

    try {
      const waUrl = buildWhatsAppUrl(OWNER_WHATSAPP, payload);
      window.open(waUrl, "_blank", "noopener,noreferrer");

      const emailResult = await sendEmail({
        from_name: payload.name,
        from_email: payload.email,
        phone: payload.phone,
        company: payload.company || "N/A",
        message: payload.message || "N/A",
        date: payload.dateLabel,
        time: payload.timeSlot,
        timezone: payload.timezone,
      });

      if (emailResult.skipped) {
        setFlowMessage("Booking saved and WhatsApp opened. Configure EmailJS env vars to enable email delivery.");
      }

      setSuccessData(payload);
      setBookedSlots(getBookedSlots(dateKey));
    } catch {
      setFlowMessage("Booking reserved, but email delivery failed. WhatsApp details were still opened.");
      setSuccessData(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addToCalendar = () => {
    if (!successData || !selectedDate) return;
    const calendarUrl = buildGoogleCalendarUrl({
      title: "Discovery Call - Sibananda Behera",
      details: `Call booked by ${successData.name} (${successData.email})`,
      date: selectedDate,
      timeSlot: successData.timeSlot,
      location: "Google Meet / WhatsApp",
    });
    window.open(calendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-5 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-wide text-cyan-300">Schedule a conversation</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Book a 20-minute call</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
            Pick your preferred date, select an available slot in your timezone, and share your project context.
            Booking updates are reflected in near real-time to avoid double booking.
          </p>
        </motion.div>

        {flowMessage && (
          <div className="mb-5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {flowMessage}
          </div>
        )}

        <AnimatePresence mode="wait">
          {successData ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-4"
            >
              <BookingSuccess
                summary={successData}
                onAddToCalendar={addToCalendar}
                onBookAnother={resetFlow}
              />
            </motion.div>
          ) : (
            <motion.div
              key="flow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-5 lg:grid-cols-2"
            >
              <div className="space-y-5">
                <CalendarPicker
                  selectedDate={selectedDate}
                  onSelectDate={onDateSelect}
                  disableWeekends
                />
                {selectedDate && (
                  <TimeSlotPicker
                    slots={slots}
                    selectedTime={selectedTime}
                    unavailableSlots={bookedSlots}
                    onSelectTime={setSelectedTime}
                  />
                )}
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4 sm:p-5 backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-white">Booking summary</h2>
                  <div className="mt-3 space-y-2 text-sm text-slate-300">
                    <p>
                      <span className="text-slate-400">Date:</span>{" "}
                      {selectedDate ? formatLongDate(selectedDate) : "Not selected"}
                    </p>
                    <p>
                      <span className="text-slate-400">Time:</span> {selectedTime || "Not selected"}
                    </p>
                    <p>
                      <span className="text-slate-400">Timezone:</span> {TIMEZONE}
                    </p>
                    <p>
                      <span className="text-slate-400">Duration:</span> 20 minutes
                    </p>
                  </div>
                </div>

                <BookingForm
                  formData={formData}
                  errors={errors}
                  onChange={onFormChange}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookCallPage;
