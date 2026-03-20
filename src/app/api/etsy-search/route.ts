import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keywords = searchParams.get("keywords") ?? "";
  const limit = searchParams.get("limit") ?? "6";

  const apiKey = process.env.ETSY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ETSY_API_KEY is not set in .env.local" },
      { status: 500 },
    );
  }

  const etsyUrl = new URL(
    "https://openapi.etsy.com/v3/application/listings/active",
  );
  etsyUrl.searchParams.set("keywords", keywords);
  etsyUrl.searchParams.set("limit", limit);
  etsyUrl.searchParams.set("includes", "images,shop");

  try {
    const response = await fetch(etsyUrl.toString(), {
      headers: { "x-api-key": apiKey },
      next: { revalidate: 60 }, // cache for 60s
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `Etsy API error: ${response.status}`, detail: text },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reach Etsy API", detail: String(err) },
      { status: 502 },
    );
  }
}
