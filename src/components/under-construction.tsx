import Image from "next/image";

export function UnderConstruction() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <div className="flex flex-col items-center gap-8 text-center">
        <Image
          src="/logo-white.png"
          alt="Logo"
          width={100}
          height={100}
          priority
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Under Construction
          </h1>
          <p className="max-w-sm text-lg text-zinc-400">
            We&apos;re working on something new. Check back soon.
          </p>
        </div>
        <div className="h-px w-16 bg-white" />
      </div>
    </div>
  );
}
