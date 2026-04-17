export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50 px-6 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-8 text-center">
        <div
          className="text-6xl font-bold tracking-tighter text-amber-600 dark:text-amber-500"
          aria-hidden
        >
          🚧
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Under Construction
          </h1>
          <p className="max-w-sm text-lg text-zinc-600 dark:text-zinc-400">
            We’re working on something new. Check back soon.
          </p>
        </div>
        <div className="h-px w-16 bg-amber-300 dark:bg-amber-600/60" />
      </div>
    </div>
  );
}
