export interface BurgerProduct {
  id: string;
  name: string;
  subName: string;
  price: number;
  description: string;
  folderPath: string;
  frameCount: number;
  frameExt: string;
  themeColor: string;
  gradient: string;
  features: string[];
  stats: { label: string; value: string }[];
  details: {
    title: string;
    description: string;
  };
  freshness: {
    title: string;
    description: string;
  };
  buyNow: {
    title: string;
    priceStr: string;
  };
}

export const products: BurgerProduct[] = [
  {
    id: "smoky-veg-supreme",
    name: "Smoky Veg",
    subName: "SUPREME",
    price: 12.99,
    description: "A masterclass in plant-based BBQ. Featuring a double-smoked patty, crispy onion rings, and our signature hickory sauce.",
    folderPath: "/images/smoky-veg",
    frameCount: 120,
    frameExt: "jpg",
    themeColor: "#FF5E00",
    gradient: "from-[#FF5E00]/20 to-[#4A0E00]/80",
    features: ["Double Smoked Patty", "Crispy Onion Rings", "Hickory BBQ Sauce", "Melted Vegan Cheddar"],
    stats: [
      { label: "Protein", value: "24g" },
      { label: "Calories", value: "540" },
      { label: "Prep Time", value: "8 min" },
    ],
    details: {
      title: "The Ultimate BBQ Experience",
      description: "We've perfected the smoky flavor using traditional hickory wood smoking techniques on our custom plant-based patties, resulting in a burger that satisfies the deepest barbecue cravings."
    },
    freshness: {
      title: "Farm to Bun",
      description: "Our ingredients are sourced from local organic farms. The crisp lettuce and vine-ripened tomatoes provide the perfect fresh snap to contrast the rich, smoky flavors."
    },
    buyNow: {
      title: "Ready to Taste the Smoke?",
      priceStr: "$12.99"
    }
  },
  {
    id: "cheesy-crunch",
    name: "Cheesy Crunch",
    subName: "BURGER",
    price: 10.99,
    description: "The ultimate cheese lover's dream. A crispy, golden-fried patty stuffed with molten mozzarella and topped with jalapeño cheese sauce.",
    folderPath: "/images/cheesy-crunch",
    frameCount: 120,
    frameExt: "jpg",
    themeColor: "#FBBF24",
    gradient: "from-[#FBBF24]/20 to-[#78350F]/80",
    features: ["Mozzarella Stuffed", "Golden Panko Crust", "Jalapeño Cheese", "Spicy Mayo"],
    stats: [
      { label: "Protein", value: "18g" },
      { label: "Calories", value: "620" },
      { label: "Prep Time", value: "6 min" },
    ],
    details: {
      title: "Explosion of Cheese",
      description: "Bit into the ultra-crispy premium panko crust to reveal a core of premium molten mozzarella. It's a textural masterpiece that redefines what a veg burger can be."
    },
    freshness: {
      title: "Hand-Crafted Daily",
      description: "Every patty is hand-breaded in our kitchen every single morning. We never freeze our cheesy patties to ensure the perfect cheese pull every time."
    },
    buyNow: {
      title: "Experience the Crunch",
      priceStr: "$10.99"
    }
  },
  {
    id: "spicy-tandoori",
    name: "Spicy Tandoori",
    subName: "BURGER",
    price: 11.49,
    description: "A fiery fusion of flavors. Char-grilled paneer and mixed veg patty infused with authentic tandoori spices and mint yogurt.",
    folderPath: "/images/spicy-tandoori",
    frameCount: 120,
    frameExt: "jpg",
    themeColor: "#E11D48",
    gradient: "from-[#E11D48]/20 to-[#4C0519]/80",
    features: ["Char-Grilled Patty", "Authentic Spices", "Mint Yogurt", "Pickled Onions"],
    stats: [
      { label: "Protein", value: "22g" },
      { label: "Calories", value: "510" },
      { label: "Prep Time", value: "10 min" },
    ],
    details: {
      title: "Authentic Tandoor Char",
      description: "We marinate our protein mix in authentic tandoori spices for 24 hours before grilling at high heat to achieve that unmistakable smoky, spiced char."
    },
    freshness: {
      title: "Vibrant & Zesty",
      description: "Cooling house-made mint yogurt and zesty pickled red onions cut through the rich spices, creating a beautifully balanced flavor profile in every bite."
    },
    buyNow: {
      title: "Craving the Heat?",
      priceStr: "$11.49"
    }
  }
];
