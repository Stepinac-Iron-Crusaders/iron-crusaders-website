type PlaceholderImageProps = {
  label?: string;
  className?: string;
};

export function PlaceholderImage({
  label = "IMAGE PLACEHOLDER",
  className = "aspect-video",
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-center justify-center overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900 ${className}`}
    >
      {/* crosshatch pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, #fff 0 1px, transparent 1px 14px)`,
        }}
      />
      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-zinc-700 bg-zinc-800">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-zinc-500"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="1" />
            <path d="M3 16l5-5 4 4 3-3 6 6" />
            <circle cx="9" cy="9" r="1.5" />
          </svg>
        </div>
        <span className="max-w-[22ch] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
          [ {label} ]
        </span>
      </div>
      {/* corner accents - technical feel */}
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-zinc-700" aria-hidden="true" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-zinc-700" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-zinc-700" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-zinc-700" aria-hidden="true" />
    </div>
  );
}
