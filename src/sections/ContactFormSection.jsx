/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  Hash,
  Sparkles,
  Check,
  Building2,
  User,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  EMAIL,
  MAILTO_URL,
  PHONE_WHATSAPP,
  WHATSAPP_MESSAGE,
} from "../constants";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_API_KEY;

const contactInfo = {
  name: "Nexus Team",
  location: "Hong Kong",
  email: "Jeffrey.Teh@thetehgroup.com",
  phone: "+852 68019775",
  gradient: "from-blue-500 to-cyan-600",
  role: "Founder & CEO",
  initials: "JT",
  avatar: "/images/contacts/jeffreyteh.png",
};

const hashtags = [
  "#AINexusAPAC",
  "#AISponsor",
  "#Cybersecurity",
  "#EnterpriseTech",
  "#APACTechTour",
  "#Innovation2025",
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFieldErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setStatusMessage("");
    setFieldErrors({});
    if (!API_ENDPOINT || !API_KEY) {
      console.error("Missing contact form API configuration.");
      setStatus("error");
      setStatusMessage(
        "The contact form is temporarily unavailable. Please try again later."
      );
      setLoading(false);
      return;
    }

    try {
      const newFieldErrors = {};
      const trimmedMessage = formData.message.trim();
      if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
        newFieldErrors.message =
          "Message must be between 10 and 5000 characters.";
      }

      if (!formData.from_name.trim()) {
        newFieldErrors.from_name = "Full name is required.";
      }

      if (!formData.from_email.trim()) {
        newFieldErrors.from_email = "Email address is required.";
      }

      if (Object.keys(newFieldErrors).length > 0) {
        setStatus("error");
        setStatusMessage("Please fix the highlighted fields.");
        setFieldErrors(newFieldErrors);
        return;
      }

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          fullname: formData.from_name,
          email: formData.from_email,
          phone_number: formData.phone,
          company_name: formData.company,
          message: formData.message,
        }),
      });
      const responseBody = await response.json().catch(() => null);

      if (response.status === 429) {
        setFieldErrors({});
        setStatus("error");
        setStatusMessage(
          responseBody?.message ||
            "You have made too many requests. Please wait a moment and try again."
        );
        setTimeout(() => {
          setStatus(null);
          setStatusMessage("");
        }, 5000);
        return;
      }

      if (!response.ok) {
        const apiMessage =
          responseBody?.message ||
          (Array.isArray(responseBody?.errors) ?
            responseBody.errors.join(", ")
          : null);

        setStatus("error");
        setStatusMessage(
          apiMessage || `Failed to submit form. Status: ${response.status}`
        );
        if (Array.isArray(responseBody?.errors)) {
          const parsedErrors = {};
          responseBody.errors.forEach((err) => {
            const lowerErr = err.toLowerCase();
            if (
              lowerErr.includes("full name") ||
              lowerErr.includes("fullname")
            ) {
              parsedErrors.from_name = err;
            } else if (lowerErr.includes("email")) {
              parsedErrors.from_email = err;
            } else if (lowerErr.includes("phone")) {
              parsedErrors.phone = err;
            } else if (lowerErr.includes("company")) {
              parsedErrors.company = err;
            } else if (lowerErr.includes("message")) {
              parsedErrors.message = err;
            }
          });

          setFieldErrors(parsedErrors);
        }
        return;
      }

      setStatus("success");
      setStatusMessage(
        responseBody?.message ||
          "Message sent successfully! We'll contact you soon."
      );
      setFieldErrors({});
      setFormData({
        from_name: "",
        from_email: "",
        phone: "",
        company: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setStatus(null);
        setStatusMessage("");
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setStatusMessage(
        error?.message || "Failed to send message. Please try again."
      );
      setFieldErrors({});
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (hasError) =>
    [
      "w-full px-4 py-3 rounded-xl bg-slate-800/50 border text-white placeholder-gray-500 focus:outline-none transition-all",
      hasError ?
        "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20",
    ].join(" ");

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}>
      <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl border border-emerald-500/30 overflow-hidden p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-bl-full opacity-10" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/40 mb-4"
              initial={{ scale: 0 }}
              transition={{ type: "spring", delay: 0.2 }}
              whileInView={{ scale: 1 }}>
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-medium text-sm">
                Sponsorship Inquiry
              </span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Get in Touch with{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {contactInfo.name}
              </span>
            </h3>
            <p className="text-gray-400">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-emerald-400 font-medium">
                {statusMessage ||
                  "Message sent successfully! We'll contact you soon."}
              </p>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}>
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 font-medium">
                {statusMessage ||
                  "Failed to send message. Please try again or email us directly."}
              </p>
            </motion.div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  Full Name *
                </label>
                <input
                  className={inputClasses(Boolean(fieldErrors.from_name))}
                  name="from_name"
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  type="text"
                  value={formData.from_name}
                />
                {fieldErrors.from_name && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.from_name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  Email Address *
                </label>
                <input
                  className={inputClasses(Boolean(fieldErrors.from_email))}
                  name="from_email"
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  type="email"
                  value={formData.from_email}
                />
                {fieldErrors.from_email && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.from_email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  Phone Number
                </label>
                <input
                  className={inputClasses(Boolean(fieldErrors.phone))}
                  name="phone"
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  type="tel"
                  value={formData.phone}
                />
                {fieldErrors.phone && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  Company Name
                </label>
                <input
                  className={inputClasses(Boolean(fieldErrors.company))}
                  name="company"
                  onChange={handleChange}
                  placeholder="Company Inc."
                  type="text"
                  value={formData.company}
                />
                {fieldErrors.company && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.company}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                Message *
              </label>
              <textarea
                className={[
                  "w-full px-4 py-3 rounded-xl bg-slate-800/50 border text-white placeholder-gray-500 focus:outline-none transition-all resize-none",
                  fieldErrors.message ?
                    "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20",
                ].join(" ")}
                name="message"
                onChange={handleChange}
                placeholder="Tell us about your sponsorship interests and goals..."
                required
                rows={6}
                value={formData.message}
              />
              {fieldErrors.message && (
                <p className="mt-2 text-sm text-red-400">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}>
              {loading ?
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              : <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>Send Message</span>
                </>
              }
            </motion.button>

            {/* Contact Info */}
            <div className="pt-6 border-t border-slate-700">
              <p className="text-center text-gray-400 text-sm mb-4">
                Or reach out directly:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  href={MAILTO_URL}>
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">{EMAIL}</span>
                </a>
                <a
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  href={`https://api.whatsapp.com/send?phone=${PHONE_WHATSAPP}&text=${WHATSAPP_MESSAGE}`}
                  rel="noopener noreferrer"
                  target="_blank">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">{PHONE_WHATSAPP}</span>
                </a>
              </div>
            </div>
          </form>
        </div>

        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
      </div>
    </motion.div>
  );
};

const HashtagBadge = ({ tag, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      onClick={handleCopy}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}>
      <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 hover:border-emerald-400/70 backdrop-blur-sm transition-all duration-300 flex items-center gap-2 group">
        <Hash className="w-4 h-4 text-emerald-400 group-hover:text-cyan-400 transition-colors" />
        <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
          {tag.substring(1)}
        </span>
        {copied && (
          <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }}>
            <Check className="w-4 h-4 text-emerald-400" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default function ContactFormSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden"
      id="contact"
      ref={containerRef}>
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}>
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          className="text-center mb-16"
          style={{ y: headerY, opacity: headerOpacity }}>
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 mb-6 backdrop-blur-sm"
            initial={{ scale: 0, rotate: -180 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileInView={{ scale: 1, rotate: 0 }}>
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold">Get in Touch</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}>
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Ask for Sponsorship
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileInView={{ opacity: 1 }}>
            Connect with us to discuss partnership opportunities for AI Nexus
            APAC
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <ContactForm />

        {/* Hashtags Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}>
          <div className="inline-block bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl px-10 py-8 rounded-3xl border border-emerald-500/30">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white">
                Follow the Journey
              </h3>
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>

            <p className="text-gray-400 mb-6">
              Stay updated with our latest news and events
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {hashtags.map((tag, idx) => (
                <HashtagBadge index={idx} key={idx} tag={tag} />
              ))}
            </div>

            <motion.p
              className="text-sm text-gray-500 mt-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 1 }}
              whileInView={{ opacity: 1 }}>
              Click any hashtag to copy
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
