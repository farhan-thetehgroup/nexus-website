import { WHATSAPP_MESSAGE } from "../constants";

export const buildWhatsAppLink = (phone, message = WHATSAPP_MESSAGE) => {
  const sanitizedPhone = `${phone ?? ""}`.replace(/[^\d]/g, "");

  if (!sanitizedPhone) {
    return "";
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`;
};
