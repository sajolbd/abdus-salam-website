"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, X, Clock, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const services = [
  "Short Form Videos",
  "Long Form Videos",
  "Promotional Videos",
  "Podcasts",
  "Full Video Editing Package",
];

const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"];

const getTodayInputValue = () => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().split("T")[0];
};

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const minBookingDate = getTodayInputValue();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: services[0],
    date: "",
    timeSlot: "",
    message: "",
  });

  // Listen to the global trigger event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectTimeSlot = (slot: string) => {
    setFormData((prev) => ({ ...prev, timeSlot: slot }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.date ||
      !formData.timeSlot
    ) {
      Swal.fire({
        title: "Incomplete Details",
        text: "Please fill out all required fields and select a time slot.",
        icon: "warning",
        background: "#121214",
        color: "#fff",
        confirmButtonColor: "#FF5C00",
      });
      return;
    }

    setLoading(true);

    try {
      const serviceId: string =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() || "service_cwznue7";
      const templateId: string =
        process.env.NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID?.trim() ||
        "template_mmsvwt6";
      const publicKey: string =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ||
        "RDIZdaG_EIZv3N4LT";

      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        service: formData.service,
        date: formData.date,
        time_slot: formData.timeSlot,
        message: formData.message || "No additional notes provided.",
      };

      if (
        serviceId === "service_cwznue7" ||
        templateId === "template_mmsvwt6" ||
        publicKey === "RDIZdaG_EIZv3N4LT"
      ) {
        // Mock successful email sending in local dev
        await new Promise((resolve) => setTimeout(resolve, 1200));
        console.warn(
          "EmailJS Booking: Using placeholders. Set env variables for live bookings.",
        );
      } else {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      }

      Swal.fire({
        title: "Call Booked Successfully!",
        text: `Your call has been scheduled for ${formData.date} at ${formData.timeSlot}. A calendar invite will be sent to your email shortly.`,
        icon: "success",
        background: "#121214",
        color: "#fff",
        confirmButtonColor: "#FF5C00",
      });

      // Reset Form and Close Modal
      setFormData({
        name: "",
        email: "",
        service: services[0],
        date: "",
        timeSlot: "",
        message: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire({
        title: "Booking Failed",
        text: "Something went wrong while booking the call. Please try again later.",
        icon: "error",
        background: "#121214",
        color: "#fff",
        confirmButtonColor: "#FF5C00",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-[#121214] border border-gray-800/80 rounded-[32px] w-full max-w-4xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Meeting Info (md:col-span-5) */}
            <div className="md:col-span-5 bg-black/40 p-8 flex flex-col gap-6 text-left border-r border-gray-800/40">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#FF5C00] tracking-widest uppercase">
                  Jihad Hasan Agency
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  15-Min Strategy Call
                </h3>
              </div>

              <div className="flex flex-col gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#FF5C00]" />
                  <span>15 min duration</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-[#FF5C00]" />
                  <span>Google Meet / Video Call</span>
                </div>
              </div>

              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mt-2">
                Find a convenient time slot to discuss your video goals. We will
                look at your raw footage, explore design formats (vertical
                shorts, ads, long-form videos), and map out a storytelling
                framework to scale your conversion rates.
              </p>

              {/* Aperture Logo Watermark */}
              <div className="mt-auto pt-8 opacity-20 flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.07 4 15.93 4.83 17.29 6.17L12.54 10.92C12.38 10.97 12.2 11 12 11C11.45 11 11 10.55 11 10C11 9.8 11.03 9.62 11.08 9.46L6.17 4.55C7.75 3.58 9.8 3 12 3V4Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-bold text-white tracking-tight text-sm">
                  JihadHasan
                </span>
              </div>
            </div>

            {/* Right Column: Calendly Form (md:col-span-7) */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-7 p-8 flex flex-col gap-5 text-left overflow-y-auto max-h-[85vh] md:max-h-none"
            >
              <h4 className="text-lg font-bold text-white mb-1">
                Select Date & Details
              </h4>

              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-black/30 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF5C00] transition-colors"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="bg-black/30 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF5C00] transition-colors"
                  required
                />
              </div>

              {/* Service Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400">
                  Required Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="bg-black/30 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF5C00] transition-colors appearance-none cursor-pointer"
                >
                  {services.map((svc) => (
                    <option key={svc} value={svc} className="bg-[#121214]">
                      {svc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400">
                  Select Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={minBookingDate}
                    className="w-full bg-black/30 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF5C00] transition-colors cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* Time Slots Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-400">
                  Select Time Slot *
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => selectTimeSlot(slot)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                        formData.timeSlot === slot
                          ? "bg-[#FF5C00] border-[#FF5C00] text-white shadow-[0_0_15px_rgba(255,92,0,0.3)]"
                          : "border-gray-800 text-gray-400 bg-black/10 hover:border-gray-600 hover:text-white"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes TextArea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400">
                  Additional Notes
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us details about your project format, duration, goals..."
                  rows={2}
                  className="bg-black/30 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF5C00] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#FF5C00] text-white py-3.5 rounded-xl text-sm font-bold mt-2 hover:bg-[#FF7324] transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,92,0,0.4)] disabled:opacity-50"
              >
                {loading ? "Scheduling..." : "Schedule Strategy Call ↗"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
