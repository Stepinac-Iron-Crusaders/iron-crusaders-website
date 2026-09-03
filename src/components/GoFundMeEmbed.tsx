import { useEffect } from "react";

export function GoFundMeEmbed() {
  useEffect(() => {
    const scriptId = "gofundme-embed-script";

    // Don't load the script more than once
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://www.gofundme.com/static/js/embed.js";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      // Leave the script loaded so navigating back to the page
      // doesn't unnecessarily reload it.
    };
  }, []);

  return (
    <div
      className="gfm-embed"
      data-url="https://www.gofundme.com/f/help-the-iron-crusaders-make-robotics-accessible-4-all-teams/widget/medium?attribution_id=sl%3A18a7c5cd-45ad-4808-973b-3950a2641673"
    />
  );
}
