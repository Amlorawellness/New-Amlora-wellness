/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from "../types";
import { PRODUCTS } from "../data/products";

/**
 * Maps database rows fetched from Supabase back into high-fidelity Product instances
 * to preserve full-page layouts, features, nutrient panels, and packaging themes.
 */
export function mapSupabaseToProduct(dbProduct: any): Product {
  if (!dbProduct) {
    return PRODUCTS[0];
  }

  // Try to find a design template match in the high-fidelity PRODUCTS catalog
  const staticMatch = PRODUCTS.find(
    (p) =>
      p.type === dbProduct.type ||
      p.id === dbProduct.id ||
      p.name.toLowerCase().includes((dbProduct.name || "").toLowerCase()) ||
      (dbProduct.name || "").toLowerCase().includes(p.name.toLowerCase())
  );

  if (staticMatch) {
    return {
      ...staticMatch,
      id: dbProduct.id || staticMatch.id,
      name: dbProduct.name || staticMatch.name,
      type: dbProduct.type || staticMatch.type,
      price: Number(dbProduct.price) || staticMatch.price,
      mrp: Number(dbProduct.mrp) || staticMatch.mrp,
      rating: dbProduct.rating !== undefined ? Number(dbProduct.rating) : staticMatch.rating,
      reviewsCount: dbProduct.reviews_count !== undefined 
        ? Number(dbProduct.reviews_count) 
        : (dbProduct.reviewsCount !== undefined ? Number(dbProduct.reviewsCount) : staticMatch.reviewsCount),
      stock: dbProduct.stock !== undefined ? Number(dbProduct.stock) : staticMatch.stock,
      tagline: dbProduct.tagline || staticMatch.tagline,
      description: dbProduct.description || staticMatch.description,
    };
  }

  // Fallback defaults for entirely custom database entries
  return {
    id: dbProduct.id,
    name: dbProduct.name || "Amlora Wellness Special",
    type: dbProduct.type || "powder",
    purityBadge: dbProduct.purity_badge || "Premium Quality",
    packagingType: dbProduct.packaging_type || "200g Pack",
    netWeight: dbProduct.net_weight || "200g",
    mrp: Number(dbProduct.mrp) || Number(dbProduct.price) || 299,
    price: Number(dbProduct.price) || 299,
    rating: Number(dbProduct.rating) || 5.0,
    reviewsCount: Number(dbProduct.reviews_count || 0),
    tagline: dbProduct.tagline || "Artisanal Amlora Development",
    description: dbProduct.description || "Freshly sourced high-vitality premium curation.",
    longDescription: dbProduct.long_description || dbProduct.description || "Processed carefully with optimal vitamin retention standards.",
    features: dbProduct.features || [
      "100% Pure Organic Selection",
      "No added synthetic preservatives",
      "Rich in active plant antioxidants"
    ],
    specs: dbProduct.specs || [
      { label: "Form", value: "Fresh Standard" },
      { label: "Origin", value: "Pratapgarh, UP" }
    ],
    ingredients: dbProduct.ingredients || "Pure Organic Amla",
    nutritionalInfo: dbProduct.nutritional_info || {
      energy: "290 kcal",
      protein: "4.0 g",
      carbohydrate: "64.0 g",
      totalSugars: "0.0 g",
      dietaryFiber: "18.0 g",
      totalFat: "0.6 g"
    },
    colorTheme: dbProduct.color_theme || {
      bg: "bg-[#0F3D2E]",
      accent: "border-[#D4AF37]",
      banner: "bg-[#D4AF37] text-[#0F3D2E]",
      accentText: "text-[#D4AF37]",
      badgeBg: "bg-amber-100 text-amber-900 border-amber-300"
    },
    backDetails: dbProduct.back_details || {
      batchNo: "AML-GEN-2401",
      mfgDate: "June 2026",
      bestBefore: "12 Months",
      fssaiLic: "30260226123537844",
      instructions: ["Store in a cool dry place"]
    }
  };
}
