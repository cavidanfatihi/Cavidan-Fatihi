export const BOOKING_PHONE_DISPLAY = "+994 99 299 11 77";
export const BOOKING_PHONE_E164 = "994992991177";

export function buildBookingWhatsAppUrl(locale: "az" | "en") {
  const message = locale === "az"
    ? "Salam, Cavidan Fatihi ilə əməkdaşlıq haqqında məlumat almaq istəyirəm."
    : "Hello, I would like to get information about collaborating with Cavidan Fatihi.";
  return `https://wa.me/${BOOKING_PHONE_E164}?text=${encodeURIComponent(message)}`;
}
