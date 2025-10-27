/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Hash,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

const contacts = [
  {
    name: "Jeffrey TEH",
    location: "Hong Kong",
    email: "Jeffrey.Teh@thetehgroup.com",
    phone: "+852 68019775",
    gradient: "from-blue-500 to-cyan-600",
    role: "Founder & CEO",
    initials: "JT",
    avatar: "/images/contacts/jeffreyteh.png",
  },
  {
    name: "Kennith Ng",
    location: "Hong Kong",
    email: "Kennith@thetehgroup.com",
    phone: "+852 6109 8485",
    gradient: "from-purple-500 to-pink-600",
    role: "Principal Partner",
    initials: "KN",
    avatar: "/images/contacts/ken.png",
  },
  {
    name: "Zen Lai",
    location: "Hong Kong",
    email: "zen@thetehgroup.com",
    phone: "+852 5623 2015",
    gradient: "from-emerald-500 to-teal-600",
    role: "Principal Partner",
    initials: "ZL",
    avatar: "/images/contacts/zen.png",
  },
  {
    name: "Johnny Chan",
    location: "Hong Kong",
    email: "johnny@thetehgroup.com",
    phone: "+852 5611 4851",
    gradient: "from-orange-500 to-red-600",
    role: "Client Relations",
    initials: "JC",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Johnny",
  },
  {
    name: "Harris Mak",
    location: "Hong Kong",
    email: "harris@thetehgroup.com",
    phone: "+852 6778 2788",
    gradient: "from-violet-500 to-purple-600",
    role: "Account Manager",
    initials: "HM",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harris",
  },
  {
    name: "Nick Jim",
    location: "Hong Kong",
    email: "Nick.jim@thetehgroup.com",
    phone: "+852 67741127",
    gradient: "from-pink-500 to-rose-600",
    role: "Sales Director",
    initials: "NJ",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nick",
  },
];

const hashtags = [
  "#AINexusAPAC",
  "#AISponsor",
  "#Cybersecurity",
  "#EnterpriseTech",
  "#APACTechTour",
  "#Innovation2025",
];

const ContactCard = ({ contact, index }) => {
  const [copiedField, setCopiedField] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [showWAmsg, setShowWAmsg] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Helper to format phone for WhatsApp (remove spaces, replace + with nothing) and add message template
  const getWhatsappUrl = (phone) => {
    let num = phone.replace(/\s|-|\(|\)/g, "");
    if (num.startsWith("+")) num = num.substring(1);
    const message = encodeURIComponent(
      `Hello ${contact.name}, I am interested in sponsorship opportunities with Nexus. Please provide more information. Thank you!`
    );
    return `https://wa.me/${num}?text=${message}`;
  };

  // Handler for WhatsApp click
  const handleWA = (e) => {
    e.preventDefault();
    setShowWAmsg(true);
    const url = getWhatsappUrl(contact.phone);
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => setShowWAmsg(false), 1200);
    }, 900);
  };

  return (
    <motion.div
      animate={
        isInView ?
          { opacity: 1, y: 0, rotateX: 0 }
        : { opacity: 0, y: 100, rotateX: 20 }
      }
      className="relative group"
      initial={{ opacity: 0, y: 100, rotateX: 20 }}
      ref={cardRef}
      style={{ y, opacity, scale, rotate }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}>
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500`}
      />

      <motion.div
        className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl border border-emerald-500/30 hover:border-emerald-400/70 overflow-hidden cursor-pointer"
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ y: -10, scale: 1.02 }}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${contact.gradient} rounded-bl-full opacity-20`}
        />

        <div className="relative p-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="relative"
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1, rotate: 5 }}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} rounded-2xl blur-lg opacity-60`}
              />
              <div
                className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${contact.gradient} p-0.5 shadow-2xl`}>
                {!imageError ?
                  <img
                    alt={contact.name}
                    className="w-full h-full rounded-2xl bg-slate-800 object-cover"
                    onError={() => setImageError(true)}
                    src={contact.avatar}
                  />
                : <div className="w-full h-full rounded-2xl bg-slate-800 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {contact.initials}
                    </span>
                  </div>
                }
              </div>

              {/* Online Status Indicator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900"
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.div
                animate={isInView ? { width: "60px" } : { width: 0 }}
                className={`h-1 bg-gradient-to-r ${contact.gradient} mb-2 rounded-full`}
                initial={{ width: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              />

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300 truncate">
                {contact.name}
              </h3>

              <p
                className={`text-xs font-medium bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent`}>
                {contact.role}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <motion.div
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              whileHover={{ x: 5 }}>
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${contact.gradient} flex items-center justify-center flex-shrink-0`}>
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">{contact.location}</span>
            </motion.div>

            <motion.div
              className="flex items-center justify-between gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 group/item"
              whileHover={{ x: 5 }}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${contact.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium truncate">
                  {contact.email}
                </span>
              </div>
              <motion.button
                className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg"
                onClick={() => handleCopy(contact.email, `email-${index}`)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                {copiedField === `email-${index}` ?
                  <Check className="w-4 h-4 text-emerald-400" />
                : <Copy className="w-4 h-4 text-gray-400" />}
              </motion.button>
            </motion.div>

            <motion.div
              className="flex items-center justify-between gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 group/item"
              whileHover={{ x: 5 }}>
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${contact.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{contact.phone}</span>
              </div>
              <motion.button
                className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg"
                onClick={() => handleCopy(contact.phone, `phone-${index}`)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                {copiedField === `phone-${index}` ?
                  <Check className="w-4 h-4 text-emerald-400" />
                : <Copy className="w-4 h-4 text-gray-400" />}
              </motion.button>
            </motion.div>
          </div>

          {/* Email Contact Button */}
          <div className="relative flex flex-col items-center">
            <motion.a
              className={`w-full mt-6 py-3 rounded-xl bg-gradient-to-r ${contact.gradient} text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
              href={`mailto:${contact.email}?subject=${encodeURIComponent(`Nexus Inquiry for ${contact.name} (${contact.role})`)}&body=${encodeURIComponent(`Hello ${contact.name},\n\nI am interested in Nexus and would like to connect with you regarding your role as ${contact.role}. Please provide more information.\n\nThank you!`)}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              <span>Contact Now</span>
            </motion.a>
          </div>

          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${contact.gradient}`}
            initial={{ scaleX: 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scaleX: 1 }}
          />
        </div>
      </motion.div>
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

export const ContactSection = () => {
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
          className="text-center mb-20"
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
              Contact Us Now!
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileInView={{ opacity: 1 }}>
            Our team is ready to help you secure your sponsorship spot
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {contacts.map((contact, idx) => (
            <ContactCard contact={contact} index={idx} key={idx} />
          ))}
        </div>

        <motion.div
          className="text-center"
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
};
