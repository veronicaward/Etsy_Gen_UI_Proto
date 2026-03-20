"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { useAnonymousUserKey } from "@/lib/use-anonymous-user-key";
import { TamboProvider } from "@tambo-ai/react";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

const ETSY_SUGGESTIONS = [
  {
    id: "s1",
    title: "Find handmade mugs",
    detailedSuggestion: "Show me handmade ceramic mugs under $40",
    messageId: "mugs-query",
  },
  {
    id: "s2",
    title: "Gift ideas",
    detailedSuggestion: "I need a personalized housewarming gift under $60",
    messageId: "gift-query",
  },
  {
    id: "s3",
    title: "Jewelry",
    detailedSuggestion: "Show me silver jewelry with high ratings",
    messageId: "jewelry-query",
  },
];

export default function ChatPage() {
  const mcpServers = useMcpServers();
  const userKey = useAnonymousUserKey();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
      userKey={userKey}
    >
      <div className="h-screen flex flex-col" style={{ fontFamily: "Arial, sans-serif" }}>

        {/* Etsy-branded header */}
        <header
          className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 flex-shrink-0"
          style={{ backgroundColor: "#fff" }}
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Etsy
          </Link>

          <div className="w-px h-5 bg-gray-200 mx-1" />

          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/etsy-logo.png" alt="Etsy" style={{ height: "24px", width: "auto", maxWidth: "90px", objectFit: "contain" }} />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" style={{ color: "#F45800" }} />
              <span className="text-sm font-semibold text-gray-900">AI Shopping Assistant</span>
            </div>
          </div>

          <p className="hidden sm:block text-xs text-gray-400 ml-auto">
            Find handmade goods from independent sellers
          </p>
        </header>

        {/* Chat thread — fills remaining height */}
        <div className="flex-1 min-h-0">
          <MessageThreadFull
            className="max-w-3xl mx-auto h-full"
            suggestions={ETSY_SUGGESTIONS}
          />
        </div>

      </div>
    </TamboProvider>
  );
}
