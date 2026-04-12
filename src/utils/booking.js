export const SLOT_DURATION_MINUTES = 20;
const STORAGE_KEY = "portfolio.bookedSlots.v1";

export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatLongDate = (date) =>
  date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const isPastDate = (date) => {
  const today = new Date();
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return dateOnly < todayOnly;
};

export const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;

export const generateTimeSlots = (startHour = 10, endHour = 18) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour += 1) {
    for (let minute = 0; minute < 60; minute += SLOT_DURATION_MINUTES) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      const displayMinute = String(minute).padStart(2, "0");
      slots.push(`${displayHour}:${displayMinute} ${period}`);
    }
  }
  return slots;
};

const getStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const setStore = (store) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

export const getBookedSlots = (dateKey) => {
  const store = getStore();
  return new Set(store[dateKey] || []);
};

export const reserveSlot = (dateKey, timeSlot, bookingPayload) => {
  const store = getStore();
  const existing = new Set(store[dateKey] || []);
  if (existing.has(timeSlot)) {
    return { ok: false, reason: "slot-unavailable" };
  }
  existing.add(timeSlot);
  store[dateKey] = [...existing];

  const historyKey = `${dateKey}.${timeSlot}`;
  store.__history = store.__history || {};
  store.__history[historyKey] = {
    ...bookingPayload,
    reservedAt: new Date().toISOString(),
  };

  setStore(store);
  return { ok: true };
};

export const parseTimeTo24Hour = (timeSlot) => {
  const [clock, period] = timeSlot.split(" ");
  const [hours, minutes] = clock.split(":").map(Number);
  let h = hours;
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return { hour: h, minute: minutes };
};

const toUtcCalendarStamp = (date) =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

export const buildGoogleCalendarUrl = ({
  title,
  details,
  date,
  timeSlot,
  location,
}) => {
  const { hour, minute } = parseTimeTo24Hour(timeSlot);
  const start = new Date(date);
  start.setHours(hour, minute, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + SLOT_DURATION_MINUTES);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details,
    location,
    dates: `${toUtcCalendarStamp(start)}/${toUtcCalendarStamp(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const buildWhatsAppUrl = (phoneNumber, payload) => {
  const message = [
    "New Call Booking Request",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Company: ${payload.company || "N/A"}`,
    `Date: ${payload.dateLabel}`,
    `Time: ${payload.timeSlot}`,
    `Timezone: ${payload.timezone}`,
    `Message: ${payload.message || "N/A"}`,
  ].join("\n");

  const normalized = phoneNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
};

export const validateBookingForm = (form) => {
  const errors = {};

  if (!form.name.trim()) errors.name = "Name is required";

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\+?[\d\s()-]{8,}$/.test(form.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  return errors;
};
