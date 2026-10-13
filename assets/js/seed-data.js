/**
 * RideX Motors - Initial Seed Bike & Category Data
 * Specially curated for Bangladesh motorcycle market (Tangail & Sakhipur Showroom).
 */

const SEED_CATEGORIES = [
  {
    id: "yamaha",
    name: "Yamaha",
    subtitle: "R15 V4, MT-15, FZ-S, Saluto",
    badge: "Top Choice",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
    icon: "fa-motorcycle"
  },
  {
    id: "suzuki",
    name: "Suzuki",
    subtitle: "Gixxer SF, Gixxer Monotone, Hayate",
    badge: "Stylish",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    icon: "fa-bolt"
  },
  {
    id: "honda",
    name: "Honda",
    subtitle: "CB Shine, XBlade, Hornet, Livo",
    badge: "Reliable",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=600&q=80",
    icon: "fa-shield-halved"
  },
  {
    id: "bajaj",
    name: "Bajaj",
    subtitle: "Pulsar 150, Discover, Platina, Avenger",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=600&q=80",
    icon: "fa-fire"
  },
  {
    id: "hero",
    name: "Hero",
    subtitle: "Splendor+, Glamour, Passion Pro, Thriller",
    badge: "Best Mileage",
    image: "assets/images/bikes/hero-splendor-plus.jpg",
    icon: "fa-gas-pump"
  },
  {
    id: "tvs",
    name: "TVS",
    subtitle: "Apache RTR 4V, RTR 2V, Metro Plus, Raider",
    badge: "Racing DNA",
    image: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=600&q=80",
    icon: "fa-gauge-high"
  },
  {
    id: "kawasaki",
    name: "Kawasaki",
    subtitle: "Ninja 125, Z125 Pro, D-Tracker",
    badge: "Premium Sport",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=600&q=80",
    icon: "fa-trophy"
  }
];

const SEED_BIKES = [
  {
    id: "hero-splendor-plus-red",
    name: "Hero Splendor+ Self i3S (Special Red)",
    brand: "Hero",
    category: "hero",
    categoryName: "Hero",
    condition: "Used",
    price: 78000,
    priceNegotiable: true,
    engineCc: "97.2 cc",
    mileage: "60-65 km/L",
    year: "2021",
    kmDriven: "18,500 km",
    braking: "Drum (Integrated Braking System)",
    papers: "10 Years Registration, Tangail Digital Plate, 1st Owner",
    badge: "Best Mileage",
    featured: true,
    isPopular: true,
    image: "assets/images/bikes/hero-splendor-plus.jpg",
    gallery: [
      "assets/images/bikes/hero-splendor-plus.jpg",
      "assets/images/showroom-exterior.jpg",
      "assets/images/showroom-interior.jpg"
    ],
    description: "খুবই ফ্রেশ কন্ডিশনে ব্যবহৃত হিরো স্প্লেন্ডার প্লাস। চমৎকার মাইলেজ ও স্মুথ ইঞ্জিন সাউন্ড। কোনো এক্সিডেন্ট হিস্ট্রি নেই। সখিপুর শোরুমে এসে সরাসরি টেস্ট ড্রাইভ দিয়ে নেওয়ার সুযোগ রয়েছে। ডিজিটাল নাম্বার প্লেট ও স্মার্ট কার্ড রেডি।",
    features: [
      "১০০% জেনুইন বিআরটিএ পেপারস ও স্মার্ট কার্ড",
      "i3S ফুয়েল সেভিং প্রযুক্তি সহ সেলফ স্টার্ট",
      "চমৎকার টায়ার গ্রিপ ও অরিজিনাল কালার পেইন্ট",
      "মালিকানা পরিবর্তনের সম্পূর্ণ নিশ্চয়তা ও শোরুম ক্যাশ মেমো"
    ]
  },
  {
    id: "yamaha-r15-v4-racing-blue",
    name: "Yamaha R15 V4 (Racing Blue)",
    brand: "Yamaha",
    category: "yamaha",
    categoryName: "Yamaha",
    condition: "Used",
    price: 465000,
    priceNegotiable: true,
    engineCc: "155 cc VVA",
    mileage: "40-45 km/L",
    year: "2023",
    kmDriven: "8,200 km",
    braking: "Dual Channel ABS + Traction Control",
    papers: "2 Years Registration, Smart Card, Showroom Paperwork Complete",
    badge: "Hot Deal",
    featured: true,
    isPopular: true,
    image: "assets/images/bikes/yamaha-r15.jpg",
    gallery: [
      "assets/images/bikes/yamaha-r15.jpg",
      "assets/images/showroom-interior.jpg"
    ],
    description: "রানিং সুপার স্পোর্টস বাইক Yamaha R15 V4। আকর্ষণীয় রেসিং ব্লু কালার, কুইক শিফটার ও গোল্ডেন ইউএসডি ফর্কস সহ ফুল লোডেড। কোনো দাগ বা স্ক্র্যাচ নেই, একদম নতুনের মতো ফ্রেশ।",
    features: [
      "Variable Valve Actuation (VVA) ইঞ্জিন",
      "ডুয়েল চ্যানেল এবিএস ও ট্র্যাকশন কন্ট্রোল",
      "অরিজিনাল কি (২টি চাবি) এবং শোরুম ফাইল",
      "RideX Motors থেকে লাইফটাইম পেপার ভেরিফিকেশন সহায়তা"
    ]
  },
  {
    id: "suzuki-gixxer-sf-blue",
    name: "Suzuki Gixxer SF Fi Disc (Triton Blue)",
    brand: "Suzuki",
    category: "suzuki",
    categoryName: "Suzuki",
    condition: "Used",
    price: 215000,
    priceNegotiable: true,
    engineCc: "155 cc SEP",
    mileage: "42-46 km/L",
    year: "2022",
    kmDriven: "12,400 km",
    braking: "Single Channel ABS + Rear Disc",
    papers: "10 Years Registration, Tangail Metro, Smart Card",
    badge: "Popular",
    featured: true,
    isPopular: true,
    image: "assets/images/bikes/suzuki-gixxer.jpg",
    gallery: [
      "assets/images/bikes/suzuki-gixxer.jpg",
      "assets/images/showroom-exterior.jpg"
    ],
    description: "সুজুকি জিক্সার এসএফ এফআই স্পোর্টস ফেয়ারিং বাইক। অ্যারোডাইনামিক লুক, দুর্দান্ত এক্সিলারেশন এবং আরামদায়ক রাইডিং পজিশন। শোরুমে এসে সরাসরি দেখে পছন্দ করুন।",
    features: [
      "Fuel Injection (Fi) ইঞ্জিন উইথ SEP টেকনোলজি",
      "সিঙ্গেল চ্যানেল এবিএস ও এলইডি হেডল্যাম্প",
      "ট্যাক্স টোকেন ও ফিটনেস শতভাগ আপ-টু-ডেট",
      "যেকোনো পুরোনো বাইকের সাথে এক্সচেঞ্জ সুবিধা"
    ]
  },
  {
    id: "bajaj-pulsar-150-twin-disc",
    name: "Bajaj Pulsar 150 Twin Disc (Neon Black/Red)",
    brand: "Bajaj",
    category: "bajaj",
    categoryName: "Bajaj",
    condition: "Used",
    price: 148000,
    priceNegotiable: true,
    engineCc: "149.5 cc DTS-i",
    mileage: "45-50 km/L",
    year: "2021",
    kmDriven: "21,000 km",
    braking: "Twin Disc (Front & Rear Disc)",
    papers: "10 Years Registration, 1st Party Owner, All Cleared",
    badge: "Top Seller",
    featured: true,
    isPopular: true,
    image: "assets/images/bikes/bajaj-pulsar.jpg",
    gallery: [
      "assets/images/bikes/bajaj-pulsar.jpg"
    ],
    description: "বাংলাদেশের সর্বাধিক জনপ্রিয় বাইক বাজাজ পালসার ১৫০ টুইন ডিস্ক। নিখুঁত সাসপেনশন, চমৎকার পিকআপ ও মাইলেজ। সম্পূর্ণ ইঞ্জিন সাউন্ড সুপার স্মুথ।",
    features: [
      "DTS-i টুইন স্পার্ক শক্তিশালী ইঞ্জিন",
      "ডাবল ডিস্ক ব্রেকিং ও চওড়া টিউবলেস টায়ার",
      "১ম মালিকের ডিজিটাল স্মার্ট কার্ড",
      "তাত্ক্ষণিক মালিকানা বদলের সুবিধা"
    ]
  },
  {
    id: "tvs-apache-rtr-160-4v",
    name: "TVS Apache RTR 160 4V SmartXonnect (Racing Red)",
    brand: "TVS",
    category: "tvs",
    categoryName: "TVS",
    condition: "Used",
    price: 175000,
    priceNegotiable: true,
    engineCc: "159.7 cc Oil Cooled",
    mileage: "40-44 km/L",
    year: "2022",
    kmDriven: "14,800 km",
    braking: "Single Channel Super-Moto ABS",
    papers: "2 Years Registration, Showroom File Ready",
    badge: "Performance",
    featured: true,
    isPopular: true,
    image: "assets/images/bikes/tvs-apache.jpg",
    gallery: [
      "assets/images/bikes/tvs-apache.jpg"
    ],
    description: "রেসিং ডিএনএ সম্পন্ন টিভিএস অ্যাপাচি আরটিআর ১৬০ ৪ভি। ব্লুটুথ কানেক্টিভিটি (SmartXonnect), ডিজিটাল ক্লাস্টার এবং এগ্রেসিভ সাউন্ড।",
    features: [
      "রেস টিউনড ফুয়েল ইনজেকশন (RT-Fi) ও অয়েল কুলার",
      "ব্লুটুথ স্মার্টএক্সকানেক্ট ও কল অ্যালার্ট",
      "সুপার মোটো এবিএস সহ প্রিমিয়াম ব্রেকিং",
      "অন স্পট টেস্ট ড্রাইভ ও মেকানিক চেকিং গ্রহণযোগ্য"
    ]
  },
  {
    id: "yamaha-mt-15-v2",
    name: "Yamaha MT-15 Version 2 (Metallic Black)",
    brand: "Yamaha",
    category: "yamaha",
    categoryName: "Yamaha",
    condition: "Used",
    price: 390000,
    priceNegotiable: true,
    engineCc: "155 cc Liquid Cooled",
    mileage: "42-47 km/L",
    year: "2023",
    kmDriven: "9,100 km",
    braking: "Dual Channel ABS + USD Forks",
    papers: "2 Years Registration, Digital Number Plate",
    badge: "Dark Knight",
    featured: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"
    ],
    description: "দ্য ডার্ক সাইড অব জাপান — Yamaha MT-15 V2। আপরাইট সিটিং পজিশন, তীব্র টর্ক ও স্ট্রিট ফাইটার লুক।",
    features: [
      "গোল্ডেন আপসাইড ডাউন (USD) ফ্রন্ট ফর্কস",
      "অ্যালুমিনিয়াম সুইংআর্ম ও ডুয়েল এবিএস",
      "১০০% জেনুইন কিমি এবং সার্ভিস হিস্ট্রি",
      "সখিপুর ও টাঙ্গাইলের মধ্যে দ্রুত ডেলিভারি"
    ]
  },
  {
    id: "honda-cb-shine-sp-125",
    name: "Honda CB Shine SP 125 Disc",
    brand: "Honda",
    category: "honda",
    categoryName: "Honda",
    condition: "Used",
    price: 112000,
    priceNegotiable: true,
    engineCc: "124.7 cc eSP",
    mileage: "55-60 km/L",
    year: "2020",
    kmDriven: "25,000 km",
    braking: "Front Disc with Combi Brake System (CBS)",
    papers: "10 Years Registration, 1st Owner, All Paper Fresh",
    badge: "Smooth Commuter",
    featured: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "হোন্ডা সিবি শাইন এসপি ১২৫। ৫-স্পিড গিয়ারবক্স, সুপার রিফাইন্ড ইঞ্জিন ও চমৎকার মাইলেজ। পরিবারের নিত্যদিনের ব্যবহারের জন্য সেরা চয়েস।",
    features: [
      "হোন্ডা ইকোলজি টেকনোলজি (HET) ইঞ্জিন",
      "৫ স্পিড গিয়ারবক্স ও ফ্রন্ট ডিস্ক ব্রেক",
      "স্মার্ট কার্ড ও ১০ বছরের টেক্স টোকেন ক্লিয়ার",
      "ফিক্সড দাম নয়, সামান্য আলোচনার সুযোগ রয়েছে"
    ]
  },
  {
    id: "yamaha-fzs-v3-abs",
    name: "Yamaha FZ-S FI V3 ABS Vintage Edition",
    brand: "Yamaha",
    category: "yamaha",
    categoryName: "Yamaha",
    condition: "Used",
    price: 210000,
    priceNegotiable: true,
    engineCc: "149 cc Blue Core Fi",
    mileage: "44-48 km/L",
    year: "2022",
    kmDriven: "15,200 km",
    braking: "Single Channel Bosch ABS + Rear Disc",
    papers: "10 Years Registration, Tangail BRTA, First Party",
    badge: "Lord FZ",
    featured: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "আরামদায়ক মাসকুলার বাইক Yamaha FZ-S V3। ভিন্টেজ ব্রাউন সিট, সিঙ্গেল চ্যানেল বশ এবিএস ও ব্লুকোর ইঞ্জিন। শহরের ট্রাফিকে দারুণ আরামদায়ক।",
    features: [
      "Bosch Single Channel ABS",
      "এলইডি হেডলাইট ও নেগেটিভ এলসিডি মিটার",
      "১৪০ সেকশন চওড়া রেডিয়াল টায়ার",
      "১০০% জেনুইন শোরুম মেমো ও বিআরটিএ রেকর্ড"
    ]
  },
  {
    id: "kawasaki-ninja-125",
    name: "Kawasaki Ninja 125 (Lime Green)",
    brand: "Kawasaki",
    category: "kawasaki",
    categoryName: "Kawasaki",
    condition: "Used",
    price: 345000,
    priceNegotiable: true,
    engineCc: "125 cc DOHC 4-Valve",
    mileage: "36-40 km/L",
    year: "2021",
    kmDriven: "11,800 km",
    braking: "Dual Channel ABS (Front & Rear)",
    papers: "2 Years Registration, Showroom Papers Complete",
    badge: "Super Sport",
    featured: true,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "কাওয়াসাকি নিনজা ১২৫ ইউরোপিয়ান স্পেক সুপার স্পোর্টস বাইক। ট্রেলিস ফ্রেম, ডুয়েল চ্যানেল এবিএস ও এগ্রেসিভ নিনজা লুক।",
    features: [
      "লিকুইড কুলড DOHC ৪-ভালভ ইঞ্জিন",
      "কাওয়াসাকি সিগনেচার ট্রেলিস ফ্রেম",
      "ডুয়েল চ্যানেল এবিএস ব্রেকিং",
      "যেকোনো মেকানিক দিয়ে চেক করিয়ে নেওয়ার নিশ্চয়তা"
    ]
  }
];

// Helper to expose globally
window.SEED_CATEGORIES = SEED_CATEGORIES;
window.SEED_BIKES = SEED_BIKES;

