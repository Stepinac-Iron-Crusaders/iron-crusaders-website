export type Sponsor = {
  name: string;
  tier?: string;
  logo?: string | null;
};

import SendCutSendLogo from "../assets/sendcutsend_logo.png";
import iFixitLogo from "../assets/iFixit_logo.png"
  
export const TIERS = [
  {
    name: "Crusader",
    price: "$5,000+",
    perks: [
      "Large logo on robot chassis",
      "Large Logo on team banner at competitions",
      "Large logo on team website & all social media",
      "Shoutout on social media",
    ],
    accent: "bg-red-600 text-white",
    logoSize: "max-h-32",
  },
  {
    name: "Knight",
    price: "$2,500",
    perks: [
      "Medium logo on robot",
      "Logo on team banner",
      "Medium logo on team website",
      "Social media recognition",
      "Medium logo on team shirt",
    ],
    accent: "bg-blue-600 text-white",
    logoSize: "max-h-24",
  },
  {
    name: "Paladin",
    price: "$1,000",
    perks: [
      "Small logo on robot",
      "Small logo on team shirt",
      "Named on team website",
      "Social media shoutout",
      "Small logo on team presentations",
    ],
    accent: "bg-zinc-800 text-white",
    logoSize: "max-h-16",
  },
  {
    name: "Squire",
    price: "$500",
    perks: [
      "Small logo on team shirt",
      "Social media shoutout",
      "Named on team website",
      "Small logo on team presentations",
    ],
    accent: "bg-gray-300 text-black",
    logoSize: "max-h-10",
  },
  {
    name: "Ally",
    price: "$250",
    perks: ["Named on team website", "Named on team presentations", "Social media shoutout", "*Donations under $250 will only receive the first two benefits"],
    accent: "bg-purple-300 text-black",
    logoSize: "max-h-6",
  },
];

export const SPONSORS: Sponsor[] = [
  { name: "SendCutSend", tier: "Paladin", logo: SendCutSendLogo },
  { name: "iFixit", tier: "Squire", logo: iFixitLogo },
];

export const DEFAULT_LOGO_SIZES: Record<string, string> = {
  Crusader: "max-h-32",
  Knight: "max-h-24",
  Paladin: "max-h-16",
  Squire: "max-h-10",
  Ally: "max-h-6",
};

export const getLogoClass = (tierName?: string) => {
  if (!tierName) return DEFAULT_LOGO_SIZES.Ally;
  const tier = TIERS.find((t) => t.name === tierName);
  return tier?.logoSize ?? DEFAULT_LOGO_SIZES[tierName] ?? DEFAULT_LOGO_SIZES.Ally;
};
