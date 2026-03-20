export default function ChatLoading() {
  return (
    <div className="h-screen flex flex-col" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header skeleton */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
      </header>

      {/* Chat area skeleton */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/etsy-logo.png"
          alt="Etsy"
          style={{ height: "32px", width: "auto", maxWidth: "100px", objectFit: "contain", opacity: 0.4 }}
        />
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
