import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

const Cal = ({
  textButton,
  leftImage,
  leftIcon: LeftIcon,
  buttonType = "default",
}: {
  textButton: string;
  leftImage?: string;
  leftIcon?: LucideIcon;
  buttonType?: "default" | "textual";
}) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        styles: { branding: { brandColor: "#16a34a" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const buttonClasses =
    buttonType === "textual"
      ? "flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700 hover:text-green-600 bg-green-50 rounded-md"
      : "flex items-center gap-3 rounded-md bg-green-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-green-700 transition duration-300";

  return (
    <button
      data-cal-namespace="30min"
      data-cal-link="francesco-saverio-mazzi/30min"
      data-cal-config='{"layout":"month_view"}'
      className={buttonClasses}
    >
      {leftImage && (
        <Image
          src={leftImage}
          alt={leftImage.split("/").pop() || "Francesco"}
          width={buttonType === "textual" ? 24 : 40}
          height={buttonType === "textual" ? 24 : 40}
          className="object-cover rounded-md"
        />
      )}
      {LeftIcon && (
        <LeftIcon
          size={buttonType === "textual" ? 20 : 24}
          className="flex-shrink-0"
        />
      )}
      <span>{textButton}</span>
    </button>
  );
};

export default Cal;
