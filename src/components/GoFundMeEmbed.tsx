import { useEffect, useRef } from "react";

const GOFUNDME_URL =
  "https://www.gofundme.com/f/help-the-iron-crusaders-make-robotics-accessible-4-all-teams/widget/medium?attribution_id=sl%3A18a7c5cd-45ad-4808-973b-3950a2641673";

export function GoFundMeEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Create the GoFundMe embed element
    const embed = document.createElement("div");
    embed.className = "gfm-embed";
    embed.setAttribute("data-url", GOFUNDME_URL);

    container.appendChild(embed);

    // Load GoFundMe's embed script
    const script = document.createElement("script");
    script.src = "https://www.gofundme.com/static/js/embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[600px] min-h-[500px]"
    />
  );
}
