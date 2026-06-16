/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductFeature {
  label: string;
  value: string;
}

export interface NutritionalInfo {
  energy: string;
  protein: string;
  carbohydrate: string;
  totalSugars: string;
  addedSugars?: string;
  dietaryFiber: string;
  totalFat: string;
}

export interface Product {
  id: string;
  name: string;
  type: string; // "powder" | "candy" | "cubes"
  purityBadge: string;
  packagingType: string;
  netWeight: string;
  mrp: number;
  price: number;
  rating: number;
  reviewsCount: number;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  specs: ProductFeature[];
  ingredients: string;
  nutritionalInfo: NutritionalInfo;
  colorTheme: {
    bg: string;
    accent: string;
    banner: string;
    accentText: string;
    badgeBg: string;
  };
  backDetails: {
    batchNo: string;
    mfgDate: string;
    bestBefore: string;
    fssaiLic: string;
    instructions: string[];
  };
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BenefitCard {
  id: string;
  title: string;
  scientificTerm: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  iconName: string;
}
