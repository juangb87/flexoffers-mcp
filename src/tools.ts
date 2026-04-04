/**
 * MCP tool definitions for FlexOffers.
 * Each tool maps to one or more v3 API endpoints.
 */

export const TOOLS = [
  // ─── Advertisers ──────────────────────────────────────────────────────────
  {
    name: "fo_list_advertisers",
    description:
      "List or search advertiser programs. Filter by approval status, category, country, or name. Returns program details including commission rates and tracking links.",
    inputSchema: {
      type: "object",
      properties: {
        ProgramStatus: {
          type: "string",
          description: "Filter by program status: Approved, Pending, Declined, Paused",
          enum: ["Approved", "Pending", "Declined", "Paused"],
        },
        ApplicationStatus: {
          type: "string",
          description: "Publisher application status: Applied, NotApplied, Approved, Declined",
        },
        Name: { type: "string", description: "Search advertisers by name" },
        categoryIds: {
          type: "string",
          description: "Comma-separated category IDs to filter",
        },
        Country: { type: "string", description: "2-letter country code (e.g. US, MX)" },
        ProductAdvertiser: {
          type: "boolean",
          description: "Only return advertisers with product feeds",
        },
        page: { type: "number", description: "Page number (default 1)" },
        pageSize: { type: "number", description: "Results per page (default 50, max 200)" },
      },
    },
  },

  {
    name: "fo_get_categories",
    description: "Get all FlexOffers advertiser categories (for building filter UIs).",
    inputSchema: { type: "object", properties: {} },
  },

  {
    name: "fo_get_featured_advertisers",
    description: "Get featured/promoted advertiser programs.",
    inputSchema: {
      type: "object",
      properties: {
        categoryIds: { type: "string", description: "Comma-separated category IDs" },
        Country: { type: "string", description: "2-letter country code" },
        page: { type: "number" },
        pageSize: { type: "number" },
      },
    },
  },

  // ─── Promotions / Coupons ─────────────────────────────────────────────────
  {
    name: "fo_list_promotions",
    description:
      "Fetch active promotions and coupons from FlexOffers. Filter by advertiser, category, promo type, or date range. Use couponsOnly=true for coupon codes only.",
    inputSchema: {
      type: "object",
      properties: {
        advertiserIds: { type: "string", description: "Comma-separated advertiser IDs" },
        categoryIds: { type: "string", description: "Comma-separated category IDs" },
        promotionalTypeIds: {
          type: "string",
          description: "Comma-separated promo type IDs (get IDs from fo_get_promotion_types)",
        },
        startDate: {
          type: "string",
          description: "Filter promotions active after this date (YYYY-MM-DD)",
        },
        endDate: {
          type: "string",
          description: "Filter promotions expiring before this date (YYYY-MM-DD)",
        },
        couponsOnly: { type: "boolean", description: "Only return promotions with coupon codes" },
        minPercentageOff: { type: "number", description: "Minimum % discount" },
        minDollarOff: { type: "number", description: "Minimum $ discount" },
        names: { type: "string", description: "Search by promotion name" },
        page: { type: "number" },
        pageSize: { type: "number", description: "Max 1000" },
      },
    },
  },

  {
    name: "fo_get_promotion_types",
    description: "Get all promotion type categories (banner, coupon, sale, etc.) with their IDs.",
    inputSchema: { type: "object", properties: {} },
  },

  // ─── Products ─────────────────────────────────────────────────────────────
  {
    name: "fo_search_products",
    description:
      "Search FlexOffers product catalog. Requires at least one of: cid (catalog ID), name, manufacturer, or UPCorEANs. Returns lightweight product rows.",
    inputSchema: {
      type: "object",
      properties: {
        cid: { type: "number", description: "Catalog ID (from fo_list_catalogs)" },
        name: { type: "string", description: "Product name search" },
        manufacturer: { type: "string", description: "Filter by manufacturer/brand" },
        UPCorEANs: { type: "string", description: "Comma-separated UPC or EAN codes" },
        MPN: { type: "string", description: "Manufacturer Part Number" },
        minPrice: { type: "number" },
        maxPrice: { type: "number" },
        Country: { type: "string" },
        page: { type: "number" },
        pageSize: { type: "number", description: "Max 500" },
      },
    },
  },

  {
    name: "fo_search_products_full",
    description:
      "Search FlexOffers product catalog with full details including discounts and sale flags. Slower than fo_search_products but richer data.",
    inputSchema: {
      type: "object",
      properties: {
        cid: { type: "number", description: "Catalog ID (from fo_list_catalogs)" },
        name: { type: "string", description: "Product name search" },
        manufacturer: { type: "string", description: "Filter by manufacturer/brand" },
        min_discount: { type: "number", description: "Minimum discount %" },
        Max_discount: { type: "number", description: "Maximum discount %" },
        Country: { type: "string" },
        page: { type: "number" },
        pageSize: { type: "number", description: "Max 500" },
      },
    },
  },

  {
    name: "fo_list_catalogs",
    description: "List all product catalogs you have access to. Returns catalog IDs (cid) needed for product searches.",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "number" },
        pageSize: { type: "number" },
      },
    },
  },

  {
    name: "fo_count_products",
    description: "Count products for a given catalog or filter before doing a full pull.",
    inputSchema: {
      type: "object",
      properties: {
        cid: { type: "number", description: "Catalog ID" },
        name: { type: "string" },
        manufacturer: { type: "string" },
      },
    },
  },

  // ─── Deeplinks ────────────────────────────────────────────────────────────
  {
    name: "fo_generate_deeplink",
    description:
      "Generate a monetized FlexOffers deep link for any merchant URL. Returns the affiliate tracking URL.",
    inputSchema: {
      type: "object",
      required: ["url"],
      properties: {
        url: { type: "string", description: "The merchant product/page URL to monetize" },
        advertiserId: {
          type: "number",
          description: "Optional advertiser ID (improves link accuracy)",
        },
        linkType: {
          type: "string",
          description: "Link type: Text, Banner",
          enum: ["Text", "Banner"],
        },
      },
    },
  },

  // ─── Cards ────────────────────────────────────────────────────────────────
  {
    name: "fo_list_cards",
    description: "List financial card offers (credit cards, rewards cards) from FlexOffers.",
    inputSchema: {
      type: "object",
      properties: {
        advertiserIds: { type: "string" },
        categoryIds: { type: "string" },
        creditCardName: { type: "string" },
        isFeatured: { type: "boolean" },
        consumerCreditRating: { type: "string", description: "Excellent, Good, Fair, Limited, Bad" },
        creditCardNetwork: { type: "string", description: "Visa, Mastercard, Amex, Discover" },
        page: { type: "number" },
        pageSize: { type: "number", description: "Max 1000" },
      },
    },
  },

  // ─── Payments ─────────────────────────────────────────────────────────────
  {
    name: "fo_get_payment_summary",
    description: "Get payout summary for a date range. Returns total commissions earned.",
    inputSchema: {
      type: "object",
      required: ["startdate", "enddate"],
      properties: {
        startdate: { type: "string", description: "Start date MM/DD/YYYY" },
        enddate: { type: "string", description: "End date MM/DD/YYYY" },
      },
    },
  },

  {
    name: "fo_get_payment_details",
    description: "Get detailed payout breakdown by advertiser for a date range.",
    inputSchema: {
      type: "object",
      required: ["startdate", "enddate"],
      properties: {
        startdate: { type: "string", description: "Start date MM/DD/YYYY" },
        enddate: { type: "string", description: "End date MM/DD/YYYY" },
        page: { type: "number" },
        pageSize: { type: "number" },
      },
    },
  },

  // ─── Reports ──────────────────────────────────────────────────────────────
  {
    name: "fo_export_report",
    description:
      "Export a performance report (clicks, approved sales, pending sales) for a date range. Returns CSV data as text.",
    inputSchema: {
      type: "object",
      required: ["StartDate", "EndDate", "ReportType"],
      properties: {
        StartDate: { type: "string", description: "Start date MM/DD/YYYY" },
        EndDate: { type: "string", description: "End date MM/DD/YYYY" },
        ReportType: {
          type: "string",
          description: "C = Clicks, ASE = Approved Sales/Events, ASP = Pending Sales/Events",
          enum: ["C", "ASE", "ASP"],
        },
        ReportFormat: {
          type: "string",
          description: "CSV (default), EXCEL, XML",
          enum: ["CSV", "EXCEL", "XML"],
        },
      },
    },
  },
];
