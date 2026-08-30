import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-[1280px] px-4 py-24 lg:px-8 lg:py-32 text-center">
        <div className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-red-500">404 • Not Found</div>
        <h1 className="mt-4 text-[42px] font-black uppercase tracking-[-0.02em] text-white">Lost in the shop?</h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-sm leading-relaxed text-zinc-400">That page doesn’t exist. Head home or check the nav — every page is wired up.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="bg-red-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-red-700">Go Home</Link>
          <Link to="/contact" className="border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-zinc-800">Contact</Link>
        </div>
      </div>
    </section>
  );
}
