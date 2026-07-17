/**
 * Tool handler dispatch — maps tool names to API calls.
 */

import type { foGet as FoGet, foPost as FoPost } from "./client.js";

type ApiHelpers = {
  foGet: typeof FoGet;
  foPost: typeof FoPost;
};

type Args = Record<string, unknown>;

export async function handleTool(
  name: string,
  args: Args,
  { foGet, foPost }: ApiHelpers
): Promise<unknown> {
  switch (name) {
    // ─── Advertisers ────────────────────────────────────────────────────────
    case "fo_list_advertisers":
      return foGet("/advertisers", args as Record<string, string | number | boolean>);

    case "fo_get_categories":
      return foGet("/categories");

    case "fo_get_featured_advertisers":
      return foGet("/featuredAdvertisers", args as Record<string, string | number | boolean>);

    // ─── Promotions ─────────────────────────────────────────────────────────
    case "fo_list_promotions": {
      const params = { ...args } as Record<string, string | number | boolean>;
      // API expects string "true"/"false", not 0/1
      if (typeof params.couponsOnly === "boolean") {
        params.couponsOnly = String(params.couponsOnly);
      }
      return foGet("/promotions", params);
    }

    case "fo_get_promotion_types":
      return foGet("/promotionTypes");

    // ─── Products ───────────────────────────────────────────────────────────
    case "fo_search_products":
      return foGet("/products", args as Record<string, string | number | boolean>);

    case "fo_search_products_full":
      return foGet("/products/full", args as Record<string, string | number | boolean>);

    case "fo_list_catalogs":
      return foGet("/products/catalogs", args as Record<string, string | number | boolean>);

    case "fo_count_products":
      return foGet("/products/count", args as Record<string, string | number | boolean>);

    // ─── Deeplinks ──────────────────────────────────────────────────────────
    case "fo_generate_deeplink":
      return foGet("/deeplink/apideeplink", args as Record<string, string | number | boolean>);

    // ─── Cards ──────────────────────────────────────────────────────────────
    case "fo_list_cards":
      return foGet("/cards", args as Record<string, string | number | boolean>);

    // ─── Payments ───────────────────────────────────────────────────────────
    case "fo_get_payment_summary":
      return foGet("/payments/summary", args as Record<string, string>);

    case "fo_get_payment_details":
      return foGet("/payments/details", args as Record<string, string | number>);

    // ─── Sales ──────────────────────────────────────────────────────────────
    case "fo_list_all_sales":
      return foGet("/allsales", args as Record<string, string | number>);

    // ─── Reports ────────────────────────────────────────────────────────────
    case "fo_export_report": {
      const params = {
        ReportFormat: "CSV",
        ...args,
      } as Record<string, string>;
      return foGet("/reportFeed/Export", params);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
