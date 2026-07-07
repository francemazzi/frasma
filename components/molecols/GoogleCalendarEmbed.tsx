import { ArrowUpRight } from "lucide-react";
import { useT } from "../../lib/i18n/context";
import {
  GOOGLE_CALENDAR_BOOKING_URL,
  GOOGLE_CALENDAR_EMBED_URL,
} from "../../lib/googleCalendar";

type GoogleCalendarEmbedProps = {
  height: number;
};

export default function GoogleCalendarEmbed({
  height,
}: GoogleCalendarEmbedProps) {
  const t = useT();

  return (
    <div className="w-full">
      <iframe
        src={GOOGLE_CALENDAR_EMBED_URL}
        style={{ border: 0 }}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        loading="lazy"
        className="rounded-lg"
      />
      <a
        href={GOOGLE_CALENDAR_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-sage-600 hover:text-sage-500 transition-colors"
      >
        {t("cal.openInNewTab")}
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}
