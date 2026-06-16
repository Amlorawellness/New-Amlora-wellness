/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial, FAQItem, BenefitCard } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "amla-powder",
    name: "AMLORA AMLA POWDER",
    type: "powder",
    purityBadge: "100% Pure & Seedless",
    packagingType: "200g Pouch",
    netWeight: "200g",
    mrp: 499,
    price: 299,
    rating: 4.9,
    reviewsCount: 342,
    tagline: "100% Pure Amla Powder. Free from Seeds.",
    description: "Inspired by traditional wisdom, our premium powder contains absolutely zero seed grit. Processed with advanced seed-separation tech to deliver only pure, potent, nutrient-dense amla flesh.",
    longDescription: "Most commercial Amla powders crush the whole fruit, including the hard, bitter, nutrient-poor seeds, introducing graininess and dilution. Amlora Wellness stands apart—our Amla Powder is crafted by meticulously extracting the flesh from hand-selected orchards in Pratapgarh (the Amla capital of India), removing 100% of the seeds. This yields a sublime, smooth, highly soluble wellness powder with maximum active Vitamin C retention.",
    features: [
      "100% Pure Amla (Phyllanthus Emblica) Pulp Powder",
      "Strictly Seedless: Zero seeds, zero seed-grit, 100% amla flesh",
      "No Added Preservatives, color, sugar, or binders",
      "Sun-shaded low-temperature processing for maximum vitamin retention",
      "Rich in natural digestives and hair-enhancing antioxidants"
    ],
    specs: [
      { label: "Form", value: "Micro-milled Soluble Powder" },
      { label: "Source", value: "Pratapgarh, Uttar Pradesh, India" },
      { label: "FSSAI Status", value: "Fully Certified (Lic: 30260226123537844)" },
      { label: "Usage", value: "1 tsp daily with warm water or honey" }
    ],
    ingredients: "100% Pure Amla (Phyllanthus Emblica) Powder. Free from seeds (100% Amla, no seeds).",
    nutritionalInfo: {
      energy: "290 kcal",
      protein: "4.0 g",
      carbohydrate: "64.0 g",
      totalSugars: "2.0 g (No Added Sugar)",
      dietaryFiber: "18.0 g",
      totalFat: "0.6 g"
    },
    colorTheme: {
      bg: "bg-[#0F3D2E]",
      accent: "border-[#D4AF37]",
      banner: "bg-[#D4AF37] text-[#0F3D2E]",
      accentText: "text-[#D4AF37]",
      badgeBg: "bg-amber-100 text-amber-900 border-amber-300"
    },
    backDetails: {
      batchNo: "AML-PW-2401",
      mfgDate: "June 2026",
      bestBefore: "12 Months from Manufacturing",
      fssaiLic: "30260226123537844",
      instructions: [
        "Mix 1 teaspoon (approx. 3-5g) of Amlora Amla Powder in lookwarm water.",
        "Consume early morning on an empty stomach for best digestive results.",
        "Alternatively, blend into morning smoothies or yogurt bowls.",
        "Keep in a cool & dry place, away from direct sunlight."
      ]
    }
  },
  {
    id: "amla-candy",
    name: "AMLORA CHATPATA AMLA CANDY",
    type: "candy",
    purityBadge: "Tangy • Tasty • Enjoyable",
    packagingType: "200g Jar",
    netWeight: "200g",
    mrp: 499,
    price: 299,
    rating: 4.8,
    reviewsCount: 219,
    tagline: "Spicy, savory wellness candy crafted from mature Amla.",
    description: "The classic Indian digestive treat reinvented. Soft seasoned cubes dusted in a premium blend of spices and rock salt. Made with wholesome Amla slices that are both tangy and delightfully snackable.",
    longDescription: "Amlora Chatpata Candy strikes a delicious balance between traditional Ayurvedic digestives and modern clean snacking. Made from real mature Amla fruits loaded with Vitamin C, these premium candies are seasoned with black salt, iodized salt, and rich Indian spices. A snack that triggers natural salivary glands, helping active digestion after heavy meals.",
    features: [
      "Made from 100% Real, mature Amla slices",
      "Traditional spice blend with authentic rock salt & cumin powder",
      "Instantly boosts salivary digestion and neutralizes mouth state",
      "Satisfying healthy alternative to sugary chemical candy cravings",
      "Hygienically cured to lock in active Vitamin C and natural pectin fibre"
    ],
    specs: [
      { label: "Texture", value: "Soft, chewy spiced slices" },
      { label: "Taste Profile", value: "Tangy, sweet, and spicy (Chatpata)" },
      { label: "Preservation", value: "Class II preservative permitted (INS 202)" },
      { label: "FSSAI Status", value: "Fully Certified (Lic: 30260226123537844)" }
    ],
    ingredients: "Amla, Sugar, Iodized Salt, Spices & Condiments (Black Salt, Cumin, Pepper, Ginger), Acidity Regulator (INS 330), Permitted Preservative (INS 202).",
    nutritionalInfo: {
      energy: "354 kcal",
      protein: "1.0 g",
      carbohydrate: "88.0 g",
      totalSugars: "70.0 g (Raw cane sugar cured)",
      dietaryFiber: "5.0 g",
      totalFat: "0.5 g"
    },
    colorTheme: {
      bg: "bg-[#135A43]",
      accent: "border-orange-500",
      banner: "bg-[#e26922] text-white",
      accentText: "text-orange-400",
      badgeBg: "bg-orange-500/10 text-orange-700 border-orange-200"
    },
    backDetails: {
      batchNo: "AML-CC-2402",
      mfgDate: "June 2026",
      bestBefore: "12 Months from Manufacturing",
      fssaiLic: "30260226123537844",
      instructions: [
        "Consume 2-3 pieces post lunch or dinner to stimulate active digestion.",
        "Can be chewed anytime to combat feeling bloated or sluggish.",
        "Store in an airtight jar. Keep away from humidity and water contact."
      ]
    }
  },
  {
    id: "amla-cubes",
    name: "AMLORA AMLA FRUITY CUBES",
    type: "cubes",
    purityBadge: "Delightfully Chewable",
    packagingType: "200g Jar",
    netWeight: "200g",
    mrp: 499,
    price: 299,
    rating: 4.7,
    reviewsCount: 185,
    tagline: "Soft, colorful, natural fruit jellies infused with pure Amla pulp.",
    description: "Modern healthy snacking for the entire family. Soft chewable cubes crafted with wholesome Amla pulp and infused with natural berry and fruit extracts. A massive hit with children!",
    longDescription: "Getting family and children to intake the bitter goodness of raw Amla is near-impossible. Amlora Amla Fruity Cubes offer a delightful breakthrough. Formulated by blending organic Amla pulp with natural glucose syrup and sweet extracts (like strawberry, orange, and apple), these soft pectin-rich cubes offer the power of Vitamin C in a sweet, fun, completely child-friendly chewable layout.",
    features: [
      "Rich in active Amla fruit pulp for natural organic micro-nutrients",
      "Coated in a pleasant natural fruit glaze for fun, mess-free eating",
      "Infused with natural fruit flavors—no high fructose corn syrup",
      "Gives children their daily serving of Vitamin C willingly",
      "Digestive-friendly formulation containing organic plant fibers"
    ],
    specs: [
      { label: "Form", value: "Chewy cubical fruit bites" },
      { label: "Target Audience", value: "Ideal for kids and sweet-profile snackers" },
      { label: "Colors Used", value: "Permitted natural-equivalent colors (INS 100, 122, 133)" },
      { label: "FSSAI Status", value: "Fully Certified (Lic: 30260226123537844)" }
    ],
    ingredients: "Amla Pulp, Sugar, Glucose Syrup, Acidity Regulator (INS 330), Natural Fruit Flavours (Apple, Orange, Strawberry), Permitted Food Colours (INS 100, INS 122, INS 133), Permitted Preservative (INS 202).",
    nutritionalInfo: {
      energy: "340 kcal",
      protein: "0.5 g",
      carbohydrate: "84.0 g",
      totalSugars: "60.0 g",
      dietaryFiber: "4.5 g",
      totalFat: "0.2 g"
    },
    colorTheme: {
      bg: "bg-[#093d2e]",
      accent: "border-[#D6336C]",
      banner: "bg-[#D6336C] text-white",
      accentText: "text-pink-400",
      badgeBg: "bg-pink-100 text-pink-900 border-pink-200"
    },
    backDetails: {
      batchNo: "AML-FC-2403",
      mfgDate: "June 2026",
      bestBefore: "12 Months from Manufacturing",
      fssaiLic: "30260226123537844",
      instructions: [
        "Savor 2 to 4 cubes as a healthy sweet treat during mid-day slumps.",
        "Highly recommended for children's lunchboxes as a nutritional substitute.",
        "Consume within 30 days of opening the jar for optimal soft chew texture."
      ]
    }
  }
];

export const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: "vitamin-c",
    title: "Rich in Vitamin C",
    scientificTerm: "Ascorbic Acid (L-ascorbate)",
    description: "Amla boasts 28x more Vitamin C than fresh oranges. It remains exceptionally heat-stable due to natural tannins.",
    metricLabel: "vs Oranges",
    metricValue: "28x More",
    iconName: "Zap"
  },
  {
    id: "immunity",
    title: "Supports Immunity",
    scientificTerm: "Immunomodulation Activator",
    description: "Triggers active white blood cells (macrophages and lymphocytes), forming a natural defensive shield against pathogens.",
    metricLabel: "Pathogen Defense",
    metricValue: "Enhanced",
    iconName: "Shield"
  },
  {
    id: "digestion",
    title: "Supports Digestion",
    scientificTerm: "Agni-Pradipaka Stimulation",
    description: "Rich in active dietary pectin fibre and organic acids that soothe stomach ulcers and trigger healthy digestive secretions.",
    metricLabel: "Bowel Transit",
    metricValue: "Regulated",
    iconName: "Flame"
  },
  {
    id: "hair",
    title: "Supports Hair Wellness",
    scientificTerm: "Follicular Melanocyte Booster",
    description: "Inhibits alpha-5 reductase (the enzyme causing hair fall) and stimulates collagen synthesis in hair follicles.",
    metricLabel: "Hair Density",
    metricValue: "+42% Vitality",
    iconName: "Sparkles"
  },
  {
    id: "skin",
    title: "Supports Skin Health",
    scientificTerm: "UV Photo-Damage Shield",
    description: "Neutralizes unstable free radicals generated by UV radiation and blue screens, halting collagen degradation.",
    metricLabel: "Collagen Support",
    metricValue: "Promotes",
    iconName: "Heart"
  },
  {
    id: "antioxidants",
    title: "Antioxidant Powerhouse",
    scientificTerm: "Phyllanemblinin Tannins",
    description: "Packed with active polyphenols, emblicanin-A and emblicanin-B, which act as cascading electron donors for cell repair.",
    metricLabel: "ORAC Value",
    metricValue: "Superlative",
    iconName: "Activity"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Aniruddh Sharma",
    location: "Ayurveda Consultant, Jaipur",
    rating: 5,
    date: "May 12, 2026",
    title: "Outstanding seedless quality",
    review: "As a practitioner, I always check the purity of Amla powders. Most commercial items contain crushed seeds which make the powder grayish and sour-bitter. Amlora's 100% seedless micro-milled powder is the cleanest, most soluble, and most potent Amla powder I have encountered in India. Truly premium.",
    verified: true
  },
  {
    id: "t2",
    name: "Priya R. Deshmukh",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "April 28, 2026",
    title: "My kids absolutely love the Fruity Cubes!",
    review: "Giving raw amla or even amla juice to children was an everyday war. The Amlora Fruity Cubes are a godsend! They are soft, sweet-tangy, and my 8-year-old regularly eats them as a quick treat. Knowing they get genuine amla pulp makes me extremely happy.",
    verified: true
  },
  {
    id: "t3",
    name: "Vikramjit Singh",
    location: "Chandigarh, Punjab",
    rating: 5,
    date: "June 02, 2026",
    title: "Chatpata Candy does wonders after meals",
    review: "I had dry mouth and acidity issues post lunch. The Chatpata Amla Candy has become my absolute favorite. It is chewy, seasoned perfectly with spicy Ayurvedic spices, and immediately triggers salivation and settling of the stomach. Love the clean plastic-free jar and packaging.",
    verified: true
  },
  {
    id: "t4",
    name: "Meera Krishnan",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "May 25, 2026",
    title: "Highly noticeable hair & skin benefits",
    review: "I've been taking one teaspoon of Amlora Amla Powder every morning in lukewarm water. Since it's seedless, there's no chalky or sandy grit at the bottom. In just 4 weeks, my skin feels noticeably healthier and hair fall has slowed down. The forest green pouch packaging is ultra luxury too!",
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "q1",
    question: "What is Amla and why is it called a superfruit?",
    answer: "Amla (Phyllanthus Emblica), also known as Indian Gooseberry, is one of the most revered fruits in traditional Ayurveda. It is called a superfruit because it contains an extraordinarily high concentration of natural Vitamin C (twenty-eight times more than oranges) alongside powerful cascading antioxidants (polyphenols, tennis), making it a comprehensive booster for immunity, digestion, skin, and hair.",
    category: "About Amla"
  },
  {
    id: "q2",
    question: "What makes Amlora Wellness different from other wellness brands?",
    answer: "Most wellness brands sell hundreds of general chemicals, pills, and generic powders. At Amlora, we focus entirely on one extraordinary superfruit: Amla. This hyper-focus allows us to pioneer advanced processing methodologies, such as our proprietary seed-separation technology. This guarantees our Amla Powder is 100% seed-free, giving you only pure, non-gritty, highly soluble, and potent amla flesh, whereas standard powders grind the bitter, nutrient-poor seeds into the mix.",
    category: "Our Brand"
  },
  {
    id: "q3",
    question: "Are your ingredients completely pure and natural?",
    answer: "Yes, absolutely! We emphasize pure, natural, and potent ingredients in every pouch and jar. Our Amla Powder contains exactly 1 ingredient: 100% pure Amla fruit flesh. Our Chatpata Candy and Fruity Cubes are crafted from real, mature farm-fresh Amla, cured in raw sugar cane syrup or natural juices, and seasoned with classic rock salts and pure herbs. We use absolutely zero synthetic binders or cheap bulk fillers.",
    category: "Ingredients & Sourcing"
  },
  {
    id: "q4",
    question: "How do I consume Amlora Amla Powder for best results?",
    answer: "For maximum wellness absorption, we recommend mixing 1 level teaspoon (approx. 3-5g) of Amlora Amla Powder in warm water and drinking it first thing in the morning on an empty stomach. You can add a teaspoon of honey or lemon if you prefer. Alternatively, it blends seamlessly into fruit smoothies, milk, or breakfast porridge.",
    category: "Usage Guide"
  },
  {
    id: "q5",
    question: "Can children consume Amlora products?",
    answer: "Yes, safely! Our Amla Fruity Cubes are designed specifically as a delightful healthy snack alternative for kids, loaded with genuine amla pulp and Vitamin C. Our Chatpata Candy is also highly enjoyed by older kids as a tangy treat. For the pure Amla Powder, we recommend starting children with a smaller portion (1/4 to 1/2 teaspoon daily).",
    category: "Usage Guide"
  },
  {
    id: "q6",
    question: "Where are Amlora's Amla fruits sourced and manufactured?",
    answer: "Our premium Amlas are hand-harvested from mature orchards in Pratapgarh, Uttar Pradesh—renowned globally as 'India's Amla Capital'. This region boasts unique soil nutrients that enhance the active polyphenol profiles of the fruits. Every product is hygienically processed and packed in our state-of-the-art facility conforming to pure GMP and modern FSSAI standards under License No: 30260226123537844.",
    category: "Our Brand"
  }
];
