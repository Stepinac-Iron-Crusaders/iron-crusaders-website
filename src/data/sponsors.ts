import SendCutSendLogo from "../assets/sendcutsend_logo.png";

export const TIERS = [
  {
    name: "Crusader",
    price: "$5,000+",
    perks: [
      "Large logo on robot chassis",
      "Logo on team banner at competitions",
      "Large logo on team website & all social media",
      "Shoutout on social media",
    ],
    logoSize: "max-h-28",
    accent: "bg-gold-500 text-black",
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
    logoSize: "max-h-20",
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
    logoSize: "max-h-16",
    accent: "bg-blue-300 text-black",
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
    logoSize: "max-h-12",
    accent: "bg-gray-300 text-black",
  },
  {
    name: "Ally",
    price: "$250",
    perks: ["Named on team website", "Named on team presentations", "Social media shoutout"],
    logoSize: "max-h-10",
    accent: "bg-purple-300 text-black",
  },
];

export const SPONSORS = [
  { name: "SendCutSend", tier: "Knight", logo: SendCutSendLogo },
  { name: "[Your Logo Here]", tier: "Ally", logo: null },
  { name: "[Your Logo Here]", tier: "Ally", logo: null },
  { name: "[Your Logo Here]", tier: "Ally", logo: null },
  { name: "[Your Logo Here]", tier: "Ally", logo: null },
  { name: "[Your Logo Here]", tier: "Ally", logo: null },
  { name: "[Your Logo Here]", tier: "Ally", logo: null },
  { name: "[Your Logo Here]", tier: "Ally", logo: null },
];
