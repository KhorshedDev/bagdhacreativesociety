export default function Footer() {
  return (
    <footer className="mt-12 py-8 bg-emerald-900 text-emerald-100 dark:bg-slate-950 dark:text-slate-300 border-t border-emerald-800 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
        <p className="text-sm font-semibold text-emerald-200 dark:text-emerald-400">
          বাগধা ক্রিয়েটিভ সোসাইটি (Bagdha Creative Society)
        </p>
        <p className="text-xs text-emerald-300/80 dark:text-slate-400">
          Provided by <span className="font-semibold text-white">Engr. Md. Rakibul Hasan</span>
        </p>
        <p className="text-xs text-emerald-400/70 dark:text-slate-500 pt-2 border-t border-emerald-800/60 dark:border-slate-800/80 max-w-sm mx-auto">
          Developed with ❤️ by{" "}
          <a
            className="text-emerald-300 hover:text-white font-medium underline transition-colors"
            href="https://khorshed-alam.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            khorshed-alam.com
          </a>
        </p>
      </div>
    </footer>
  );
}
