export default function Marquee() {
  const text =
    "BY ARTISTS, FOR ARTISTS \u2605 DISCOVER. CREATE. SELL. CONNECT. \u2605 INDEPENDENT CREATIVE MARKETPLACE \u2605 HAND-CURATED \u2605 ";

  return (
    <div className="bg-lime text-black py-3.5 overflow-hidden whitespace-nowrap font-display font-bold text-lg tracking-[0.05em]">
      <div
        className="inline-block"
        style={{ animation: "scroll 30s linear infinite" }}
      >
        {text}
        {text}
      </div>
    </div>
  );
}
