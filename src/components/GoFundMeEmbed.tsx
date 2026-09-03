import { useEffect, useRef } from "react";

export function GoFundMeEmbed() {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const embed = embedRef.current;

    if (!embed) return;

    const script = document.createElement("script");
    script.src = "https://www.gofundme.com/static/js/embed.js";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      ref={embedRef}
      className="gfm-embed"
      data-url="https://www.gofundme.com/f/help-the-iron-crusaders-make-robotics-accessible-4-all-teams/widget/medium?attribution_id=sl%3A18a7c5cd-45ad-4808-973b-3950a2641673"
    />
  );
}
