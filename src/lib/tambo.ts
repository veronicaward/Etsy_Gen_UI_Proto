/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * Etsy AI Shopping Assistant demo — registers components and tools
 * that the AI uses to render generative UI in response to shopping queries.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { ProductGrid, productGridSchema } from "@/components/tambo/product-grid";
import { searchListings } from "@/services/etsy-listings";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod/v3";

/**
 * tools
 *
 * Tools the AI can call to fetch data before rendering a component.
 */
export const tools: TamboTool[] = [
  {
    name: "searchListings",
    description:
      "Search Etsy listings by keyword, category, price range, or minimum rating. Use this to find products before displaying them in a ProductGrid.",
    tool: searchListings,
    inputSchema: z.object({
      query: z
        .string()
        .optional()
        .describe("Search keyword, e.g. 'ceramic mug', 'silver necklace', 'personalized gift'"),
      maxPrice: z
        .number()
        .optional()
        .describe("Maximum price in USD"),
      limit: z
        .number()
        .optional()
        .describe("Max number of results to return, default 6"),
    }),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        shop: z.string(),
        price: z.number(),
        imageUrl: z.string(),
        url: z.string(),
        numFavorers: z.number(),
      }),
    ),
  },
];

/**
 * components
 *
 * React components the AI can render dynamically in the chat.
 * The description tells the AI when and how to use each component.
 */
export const components: TamboComponent[] = [
  {
    name: "ProductGrid",
    description:
      "Displays a grid of Etsy product listings with images, shop names, prices, and ratings. Use this whenever a user asks to find, browse, or search for products — always call searchListings first to get real data.",
    component: ProductGrid,
    propsSchema: productGridSchema,
  },
];
