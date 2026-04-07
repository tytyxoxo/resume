import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-100 bg-dot-pattern">
      <div className="text-center px-5">
        <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">404</p>
        <h1 className="text-6xl sm:text-8xl font-black text-base-content mb-4 leading-none">
          Oops.
        </h1>
        <p className="text-base-content/50 text-base sm:text-lg mb-8 max-w-sm mx-auto">
          This page doesn&apos;t exist. Maybe it was moved or you followed a broken link.
        </p>
        <Link href="/" className="btn btn-primary rounded-full">
          Back to Home →
        </Link>
      </div>
    </div>
  );
}
