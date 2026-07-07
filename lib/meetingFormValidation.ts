/**
 * Shared client-side validation for meeting request forms (Cal modal + chat).
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type MeetingFormFields = {
  date: string;
  time: string;
  email: string;
  description: string;
};

export function validateMeetingFormFields(
  state: MeetingFormFields,
  t: (key: string) => string
): string {
  if (!state.date) return t("cal.validDate");
  if (!state.time) return t("cal.validTime");
  if (!state.email) return t("cal.validEmail");
  if (!EMAIL_REGEX.test(state.email)) return t("cal.validEmailFormat");
  if (state.description.length > 2000) return t("cal.validDesc");
  return "";
}
