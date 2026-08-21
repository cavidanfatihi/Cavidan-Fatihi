import { describe, expect, it } from "vitest";
import { BOOKING_PHONE_DISPLAY, BOOKING_PHONE_E164, buildBookingWhatsAppUrl } from "../shared/siteBrand";

describe("site collaboration identity", () => {
  it("uses the supplied WhatsApp collaboration number in international format", () => {
    expect(BOOKING_PHONE_DISPLAY).toBe("+994 99 299 11 77");
    expect(BOOKING_PHONE_E164).toBe("994992991177");
  });

  it("creates locale-aware WhatsApp collaboration links", () => {
    expect(buildBookingWhatsAppUrl("az")).toContain("https://wa.me/994992991177?text=");
    expect(decodeURIComponent(buildBookingWhatsAppUrl("az"))).toContain("əməkdaşlıq haqqında məlumat");
    expect(decodeURIComponent(buildBookingWhatsAppUrl("en"))).toContain("information about collaborating");
  });
});
