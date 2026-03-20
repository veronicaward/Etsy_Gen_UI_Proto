import Link from "next/link";
import { MessageCircle, Search, ShoppingCart, Gift, Menu } from "lucide-react";



const FEATURED_SHOPS = [
  { name: "LunaJewels", tagline: "Celestial handmade jewelry", emoji: "🌙", sales: "12k sales" },
  { name: "ClayAndCoShop", tagline: "Wheel-thrown ceramics", emoji: "🏺", sales: "8.4k sales" },
  { name: "WoodworksStudio", tagline: "Custom wood gifts & decor", emoji: "🪵", sales: "6.1k sales" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Arial, sans-serif" }}>

      {/* Top nav */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        {/* Top row */}
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 h-16">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/etsy-logo.png" alt="Etsy" style={{ height: "32px", width: "auto", maxWidth: "80px", objectFit: "contain" }} className="flex-shrink-0" />

          {/* Categories trigger */}
          <button className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-800 hover:text-gray-600 flex-shrink-0 px-1">
            <Menu className="w-4 h-4" />
            Categories
          </button>

          {/* Search bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full border border-gray-800 rounded-full px-5 py-2.5 pr-14 text-sm focus:outline-none"
            />
            <button
              className="absolute right-1 top-1 bottom-1 w-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#F45800" }}
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="hidden md:block text-sm font-medium text-gray-800 px-3 hover:underline whitespace-nowrap">
              Sign in
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Gift className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
            <Link
              href="/chat" prefetch={true}
              className="hidden sm:flex items-center gap-1.5 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors ml-1"
              style={{ backgroundColor: "#222" }}
            >
              <MessageCircle className="w-4 h-4" />
              Ask AI
            </Link>
          </div>
        </div>

        {/* Bottom nav row */}
        <div className="border-t border-gray-100 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 py-2 text-sm text-gray-700 whitespace-nowrap">
            <button className="flex items-center gap-1.5 hover:underline flex-shrink-0">
              <Gift className="w-4 h-4" /> Gifts
            </button>
            {["Best of Easter", "Home Favorites", "Fashion Finds", "Registry", "Gift Cards"].map((item) => (
              <button key={item} className="hover:underline flex-shrink-0">{item}</button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="rounded-3xl overflow-hidden flex" style={{ backgroundColor: "#D6D6D6", minHeight: "240px" }}>
          {/* Left: centered text */}
          <div className="flex flex-col items-center justify-center text-center px-12 py-10 flex-1">
            <h1
              className="text-5xl leading-tight mb-6 text-gray-900"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Describe what you need.<br />We&apos;ll find it.
            </h1>
            <Link
              href="/chat" prefetch={true}
              className="inline-block text-white text-sm px-6 py-3 rounded-full transition-colors"
              style={{ backgroundColor: "#222", fontWeight: 600 }}
            >
              Try the assistant
            </Link>
          </div>

          {/* Right: lamp photo */}
          <div className="hidden md:block w-72 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lamp.png"
              alt="Postmodern lamp"
              className="w-full h-full object-cover object-left"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Jump into featured interests</h2>

        <div className="grid grid-cols-4 gap-4">
          {[
            { id: 1, label: "The Art of Hosting", subtitle: "The perfect touches", image: "/art-of-hosting.png" },
            { id: 2, label: "Airy Living", subtitle: "Light, space, calm", image: "/airy-living.png" },
            { id: 3, label: "Bold in Blue", subtitle: "Everyday, elevated", image: "/bold-in-blue.png" },
            { id: 4, label: "Garden Whimsy", subtitle: "Spring time shopping", image: "/garden-whimsy.png" },
          ].map((interest) => (
            <div key={interest.id} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-3 bg-gray-100" style={{ height: "313px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={interest.image}
                  alt={interest.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-sm font-bold text-gray-900 text-center">{interest.label}</p>
              <p className="text-xs text-gray-500 mt-0.5 text-center">{interest.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Featured sellers */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shops we love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURED_SHOPS.map((shop) => (
              <div
                key={shop.name}
                className="border border-gray-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: "#FDF0E8" }}
                >
                  {shop.emoji}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{shop.name}</p>
                  <p className="text-xs text-gray-500">{shop.tagline}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{shop.sales}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI CTA banner */}
        <div
          className="mt-16 rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: "#FDF0E8" }}
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Not sure where to start?</h3>
            <p className="text-gray-600 text-sm">
              Our AI assistant helps you find the perfect handmade item based on your style, occasion, and budget.
            </p>
          </div>
          <Link
            href="/chat" prefetch={true}
            className="flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-colors flex-shrink-0"
            style={{ backgroundColor: "#F45800" }}
          >
            <MessageCircle className="w-4 h-4" />
            Chat with AI
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-100 mt-16 py-8 text-center text-xs text-gray-400">
        This is a fictional demo — not affiliated with Etsy, Inc. Built with Tambo AI.
      </footer>
    </div>
  );
}
