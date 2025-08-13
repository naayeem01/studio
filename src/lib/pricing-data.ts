// src/lib/pricing-data.ts

export const pricingTiers = [
    {
        name: "Starter",
        price: { monthly: "৳699", yearly: "৳7,999" },
        regularPrice: { monthly: "৳1500", yearly: "৳18,000" },
        description: "ছোট ফার্মেসী এবং স্টার্টআপদের জন্য সেরা।",
        features: ["POS Billing", "Inventory Management", "Sales Reports", "1 User"],
        popular: true,
    },
    {
        name: "Professional",
        price: { monthly: "৳1,999", yearly: "৳19,999" },
        regularPrice: null,
        description: "মাঝারি আকারের ফার্মেসী এবং ক্লিনিকের জন্য।",
        features: ["All Starter features", "Expiry Alerts", "5 Users", "Priority Support"],
        popular: false,
    },
    {
        name: "Enterprise",
        price: { monthly: "Custom", yearly: "Custom" },
        regularPrice: null,
        description: "বড় ফার্মেসী এবং ডিস্ট্রিবিউটরদের জন্য।",
        features: ["All Professional features", "Multi-branch Support", "Advanced Analytics", "Unlimited Users", "Dedicated Support"],
        popular: false,
    }
];

export const addons = [
  {
    id: "pos-printer",
    title: "POS Printer",
    price: "৳3,999"
  },
  {
    id: "barcode-scanner",
    title: "Barcode Scanner",
    price: "৳1499"
  }
];
