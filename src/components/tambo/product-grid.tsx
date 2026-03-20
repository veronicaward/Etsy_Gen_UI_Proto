"use client";

import { z } from "zod/v3";

export const productGridSchema = z.object({
  title: z.string().optional().describe("Section heading, e.g. 'Handmade Ceramic Mugs'"),
  listings: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      shop: z.string().describe("Seller shop name"),
      price: z.number().describe("Price in USD"),
      imageUrl: z.string().describe("Product image URL from Etsy"),
      url: z.string().optional().describe("Link to the Etsy listing"),
      numFavorers: z.number().optional().describe("Number of people who favorited this listing"),
    }),
  ),
});

type ProductGridProps = z.infer<typeof productGridSchema>;

export function ProductGrid({ title, listings }: ProductGridProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-base font-bold text-gray-900 mb-3">{title}</h3>
      )}
      <div className="grid grid-cols-2 gap-3">
        {(listings ?? []).map((listing) => (
          <a
            key={listing.id}
            href={listing.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer"
          >
            <div className="rounded-xl overflow-hidden aspect-square mb-2 bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-0.5">
              {listing.title}
            </p>
            <p className="text-xs text-gray-500 mb-0.5">{listing.shop}</p>
            {listing.numFavorers !== undefined && (
              <p className="text-xs text-gray-400 mb-0.5">
                ♥ {listing.numFavorers.toLocaleString()} favorites
              </p>
            )}
            <p className="text-sm font-bold text-gray-900">
              ${(listing.price ?? 0).toFixed(2)}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
