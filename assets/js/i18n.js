/**
 * RideX Motors - Internationalization (i18n) Engine
 * Seamless bilingual switching between English (EN) and Bengali (BN).
 * Supports Motorcycle Dealership terms, specs, and WhatsApp inquiry formatting.
 */

const TRANSLATIONS = {
  en: {
    topbar: {
      location: "Kachua Road, Sakhipur, Tangail",
      tagline: "Trusted Second Hand Motorbike Showroom | Buy-Sell-Exchange",
      call_us: "Hotline:",
      verified_badge: "100% Verified Papers"
    },
    nav: {
      home: "Home",
      inventory: "Motorcycles",
      bikes: "All Bikes",
      services: "Services",
      exchange: "Exchange",
      about: "About Us",
      contact: "Contact & Location",
      admin: "Admin",
      inquire_whatsapp: "WhatsApp Us",
      search_placeholder: "Search Yamaha, R15, Pulsar, Gixxer, Splendor..."
    },
    hero: {
      badge: "RIDE YOUR DREAM",
      title_line1: "Premium Bikes for",
      title_line2: "Every Journey",
      subtitle: "Explore our wide range of quality pre-owned and new motorcycles in Sakhipur, Tangail. Top brands. Verified legal papers. Best price guarantee.",
      shop_now: "Explore Bikes",
      view_inventory: "View Inventory",
      feature_1_title: "Trusted Dealer",
      feature_1_sub: "100% Genuine Bikes",
      feature_2_title: "Best Prices",
      feature_2_sub: "Competitive Rates",
      feature_3_title: "Easy Exchange",
      feature_3_sub: "Trade-In Your Bike",
      feature_4_title: "Expert Support",
      feature_4_sub: "Before & After Sale"
    },
    filter: {
      tab_all: "All Bikes",
      tab_used: "Used Bikes",
      tab_new: "Brand New",
      tab_sports: "Sports / Naked",
      tab_commuter: "Commuter / Mileage",
      brand_label: "Brand",
      all_brands: "All Brands",
      type_label: "Segment",
      all_types: "All Segments",
      price_label: "Price Range",
      all_prices: "Any Price",
      price_under_100k: "Under ৳ 1,00,000",
      price_100k_200k: "৳ 1,00,000 - 2,00,000",
      price_200k_300k: "৳ 2,00,000 - 3,00,000",
      price_above_300k: "৳ 3,00,000+",
      location_label: "Location",
      location_showroom: "Sakhipur Showroom",
      search_btn: "Search Bikes"
    },
    brands: {
      tag: "TOP BRANDS",
      heading: "Explore Top Motorcycle Brands",
      view_all: "View All Brands"
    },
    featured: {
      tag: "FEATURED BIKES",
      heading: "Popular Models",
      view_all: "View All Bikes",
      filter_all: "All",
      badge_used: "Used",
      badge_new: "New",
      inquire_now: "Inquire on WhatsApp",
      view_details: "View Details",
      negotiable: "Negotiable",
      no_results: "No motorcycles found matching your criteria.",
      reset_filters: "Reset Filters"
    },
    why_us: {
      tag: "WHY CHOOSE US",
      heading: "More Than Just A Dealership",
      desc: "We're passionate about motorcycles and committed to giving you the best buying, selling, and bike exchange experience with total peace of mind.",
      item_1_title: "Wide Selection",
      item_1_desc: "Wide range of tested bikes from Yamaha, Honda, Suzuki, Bajaj, Hero & TVS.",
      item_2_title: "Verified BRTA Papers",
      item_2_desc: "100% verified legal papers, tax token & seamless ownership name transfer.",
      item_3_title: "Best Exchange Value",
      item_3_desc: "Get instant fair valuation when you trade-in your current motorcycle.",
      item_4_title: "50-Point Quality Inspection",
      item_4_desc: "Every bike undergoes thorough engine, chassis, and brake testing before sale."
    },
    services: {
      tag: "OUR SERVICES",
      heading: "More Than Just Sales, We've Got You Covered",
      subtitle: "From verified used bike sales to trade-ins and genuine accessories, we provide everything for a smooth and enjoyable riding experience.",
      btn_all: "Explore All Services",
      s1_title: "Bike Sales & Purchase",
      s1_desc: "Buy tested pre-owned motorbikes at market best rates or sell your bike for instant cash.",
      s2_title: "Trade-In & Bike Exchange",
      s2_desc: "Upgrade your ride! Bring your old motorcycle and take home your favorite machine with ease.",
      s3_title: "BRTA Papers & Name Transfer",
      s3_desc: "Complete assistance for ownership name transfer, smart card, and BRTA paper verification.",
      s4_title: "Helmets & Motul Engine Oil",
      s4_desc: "Original Motul lubricants, premium riding helmets, WD-40, security locks & accessories."
    },
    stats: {
      tag: "WHY RIDE WITH US",
      heading: "Trusted by Riders. Built for the Journey",
      subtitle: "Whether you're a first-time buyer or a seasoned rider, we're here to help you find the perfect motorcycle with confidence and peace of mind.",
      stat_1_num: "7.4K+",
      stat_1_lbl: "Facebook Followers",
      stat_2_num: "1,200+",
      stat_2_lbl: "Bikes Sold & Exchanged",
      stat_3_num: "100%",
      stat_3_lbl: "Verified Legal Papers",
      stat_4_num: "5+",
      stat_4_lbl: "Years Trusted Showroom",
      watch_story: "View Showroom Tour"
    },
    reviews: {
      tag: "CUSTOMER REVIEWS",
      heading: "Real Riders. Real Stories.",
      view_all: "View All Reviews",
      r1_text: "Bought my Yamaha FZ-S from RideX Motors. Condition was completely genuine, papers transferred without any hassle. Highly recommended in Tangail!",
      r1_author: "Tanvir Ahmed",
      r1_role: "Verified Buyer • Sakhipur",
      r2_text: "Exchanged my old Discover for a Pulsar 150. Got the best valuation and took delivery on the same day. Transparent dealership.",
      r2_author: "Kamrul Islam",
      r2_role: "Exchange Customer • Tangail",
      r3_text: "I was worried about second-hand bike papers, but RideX Motors verified everything from BRTA before handing over the keys. 10/10 service!",
      r3_author: "Sabbir Hossain",
      r3_role: "Verified Buyer • Mirzapur"
    },
    tips: {
      tag: "LATEST STORIES & TIPS",
      heading: "News, Guides & Riding Tips",
      view_all: "View All Articles",
      t1_title: "10 Essential Used Motorcycle Inspection Tips Before Buying",
      t1_cat: "Buying Guide",
      t2_title: "BRTA Motorcycle Ownership Name Transfer: Rules & Steps",
      t2_cat: "Paperwork",
      t3_title: "Engine Oil Guide: How Motul Keeps Your Bike Running Smooth",
      t3_cat: "Maintenance",
      read_more: "Read More"
    },
    cta: {
      tag: "READY TO RIDE?",
      heading: "Find Your Perfect Bike Today",
      subtitle: "Browse our showroom inventory or visit our Sakhipur showroom for a free test ride and instant paper verification.",
      btn_inventory: "Browse Inventory",
      btn_contact: "Contact Showroom"
    },
    footer: {
      bio: "RideX Motors is Sakhipur's most trusted second-hand motorbike showroom. We guarantee genuine bikes, verified legal papers, and fair exchange rates.",
      quick_links: "Quick Links",
      top_brands: "Top Brands",
      contact_title: "Showroom Contact",
      address: "Kachua Road, Sakhipur, Tangail, 1950",
      phones: "01868-546518, 01681-103565",
      email: "ridexmotors0405@gmail.com",
      hours: "Saturday - Friday: 9:00 AM - 9:00 PM (Everyday Open)",
      copyright: "© 2026 RideX Motors. All rights reserved.",
      credit: "Designed & Developed for RideX Motors"
    }
  },
  bn: {
    topbar: {
      location: "কচুয়া রোড, সখিপুর, টাঙ্গাইল",
      tagline: "বিশ্বস্ত সেকেন্ড হ্যান্ড মোটরসাইকেল শোরুম | ক্রয়-বিক্রয়-এক্সচেঞ্জ",
      call_us: "হটলাইন:",
      verified_badge: "১০০% ভেরিফায়েড পেপারস"
    },
    nav: {
      home: "হোম",
      inventory: "মোটরসাইকেল",
      bikes: "সকল বাইক",
      services: "সার্ভিসসমূহ",
      exchange: "এক্সচেঞ্জ",
      about: "আমাদের সম্পর্কে",
      contact: "ঠিকানা ও যোগাযোগ",
      admin: "অ্যাডমিন",
      inquire_whatsapp: "হোয়াটসঅ্যাপে কথা বলুন",
      search_placeholder: "Yamaha, R15, Pulsar, Gixxer, Splendor খুঁজুন..."
    },
    hero: {
      badge: "রাইড ইওর ড্রিম",
      title_line1: "আপনার পছন্দের সেরা বাইক",
      title_line2: "বিশ্বস্ত ঠিকানায়",
      subtitle: "সখিপুর, টাঙ্গাইলে সেরা ফ্রেশ কন্ডিশন ব্যবহৃত ও নতুন মোটরসাইকেলের বিশাল সমাহার। ১০০% লিগ্যাল বিআরটিএ পেপারস এবং সেরা দামের গ্যারান্টি।",
      shop_now: "বাইকগুলো দেখুন",
      view_inventory: "ইনভেন্টরি ব্রাউজ করুন",
      feature_1_title: "বিশ্বস্ত শোরুম",
      feature_1_sub: "১০০% অথেনটিক বাইক",
      feature_2_title: "সেরা দামের নিশ্চয়তা",
      feature_2_sub: "ন্যায্য বাজার দর",
      feature_3_title: "সহজ এক্সচেঞ্জ",
      feature_3_sub: "পুরোনো বদলে নতুন নিন",
      feature_4_title: "এক্সপার্ট সহায়তা",
      feature_4_sub: "বিক্রয় ও বিক্রয়োত্তর সাপোর্ট"
    },
    filter: {
      tab_all: "সকল বাইক",
      tab_used: "সেকেন্ড হ্যান্ড বাইক",
      tab_new: "ব্র্যান্ড নিউ",
      tab_sports: "স্পোর্টস / নেকেড",
      tab_commuter: "কমিউটার / মাইলেজ",
      brand_label: "ব্র্যান্ড",
      all_brands: "সব ব্র্যান্ড",
      type_label: "সেগমেন্ট",
      all_types: "সব সেগমেন্ট",
      price_label: "বাজেট রেঞ্জ",
      all_prices: "যেকোনো বাজেট",
      price_under_100k: "৳ ১,০০,০০০ এর নিচে",
      price_100k_200k: "৳ ১,০০,০০০ - ২,০০,০০০",
      price_200k_300k: "৳ ২,০০,০০০ - ৩,০০,০০০",
      price_above_300k: "৳ ৩,০০,০০০+",
      location_label: "শোরুম লোকেশন",
      location_showroom: "সখিপুর শোরুম",
      search_btn: "বাইক খুঁজুন"
    },
    brands: {
      tag: "শীর্ষ ব্র্যান্ডস",
      heading: "সেরা সব ব্র্যান্ডের মোটরসাইকেল",
      view_all: "সকল ব্র্যান্ড দেখুন"
    },
    featured: {
      tag: "জনপ্রিয় কালেকশন",
      heading: "পপুলার মডেলসমূহ",
      view_all: "সকল বাইক দেখুন",
      filter_all: "সব",
      badge_used: "ব্যবহৃত",
      badge_new: "নতুন",
      inquire_now: "হোয়াটসঅ্যাপে ইনকোয়ারি",
      view_details: "বিস্তারিত দেখুন",
      negotiable: "আলোচনা সাপেক্ষে",
      no_results: "আপনার পছন্দের সাথে মিল রেখে কোনো বাইক পাওয়া যায়নি।",
      reset_filters: "ফিল্টার রিসেট করুন"
    },
    why_us: {
      tag: "কেন আমাদের বেছে নেবেন",
      heading: "শুধুমাত্র একটি শোরুম নয়, নির্ভরতার ঠিকানা",
      desc: "আমরা প্রতিটি বাইকারকে শতভাগ সন্তুষ্টি, সঠিক ডকুমেন্ট এবং নির্ভরযোগ্য রাইডিং এক্সপেরিয়েন্স দিতে প্রতিশ্রুতিবদ্ধ।",
      item_1_title: "বিশাল কালেকশন",
      item_1_desc: "Yamaha, Honda, Suzuki, Bajaj, Hero ও TVS-এর সেরা সব মডেল এক ছাদের নিচে।",
      item_2_title: "১০০% ভেরিফায়েড পেপারস",
      item_2_desc: "বিআরটিএ স্মার্ট কার্ড, ট্যাক্স টোকেন ও আইনগত কাগজপত্র ১০০% সঠিক ও নির্ভেজাল।",
      item_3_title: "সর্বোচ্চ এক্সচেঞ্জ রেট",
      item_3_desc: "আপনার পুরোনো বাইকের ন্যায্য দাম দিয়ে সাথে সাথে পছন্দের বাইক বদলে নেওয়ার সুবিধা।",
      item_4_title: "৫০ পয়েন্ট কোয়ালিটি চেক",
      item_4_desc: "প্রতিটি বাইকের ইঞ্জিন, চেসিস, সাসপেনশন ও ইলেকট্রিক পার্টস বিশেষজ্ঞ দ্বারা পরীক্ষিত।"
    },
    services: {
      tag: "আমাদের সেবাসমূহ",
      heading: "বাইক কেনাবেচার সব সমাধান এক জায়গায়",
      subtitle: "ব্যবহৃত বাইক কেনাবেচা থেকে শুরু করে মালিকানা বদল ও জেনুইন এক্সেসরিজ — আমরা আছি আপনার সাথে।",
      btn_all: "সব সার্ভিস দেখুন",
      s1_title: "বাইক ক্রয় ও বিক্রয়",
      s1_desc: "সেরা দামে বিশ্বস্ত সেকেন্ড হ্যান্ড বাইক কিনুন অথবা আপনার বাইক বিক্রি করে তাৎক্ষণিক ক্যাশ নিন।",
      s2_title: "ট্রেড-ইন ও বাইক এক্সচেঞ্জ",
      s2_desc: "পুরোনো বাইক নিয়ে আসুন এবং অন-স্পট ভ্যালুয়েশন করে নতুন বা আপগ্রেড বাইক নিয়ে যান।",
      s3_title: "বিআরটিএ পেপারস ও নাম ট্রান্সফার",
      s3_desc: "কাগজপত্র ভেরিফিকেশন, ডিজিটাল প্লেট ও দ্রুত নাম ট্রান্সফার সংক্রান্ত যাবতীয় সহায়তা।",
      s4_title: "হেলমেট ও মটুল ইঞ্জিন অয়েল",
      s4_desc: "১০০% অরিজিনাল Motul ইঞ্জিন লুব্রিকেন্ট, সেফটি হেলমেট, চেইন লিউব ও সিকিউরিটি লক।"
    },
    stats: {
      tag: "বাইকারদের আস্থা",
      heading: "রাইডারদের ভরসা, রাইডেক্স মোটরস",
      subtitle: "টাঙ্গাইল ও সখিপুরের বাইকারদের জন্য নিখুঁত সেকেন্ড হ্যান্ড বাইক কেনাবেচার অন্যতম বিশ্বস্ত প্রতিষ্ঠান।",
      stat_1_num: "৭.৪K+",
      stat_1_lbl: "ফেসবুক ফলোয়ার্স",
      stat_2_num: "১,২০০+",
      stat_2_lbl: "বাইক বিক্রয় ও এক্সচেঞ্জ",
      stat_3_num: "১০০%",
      stat_3_lbl: "ভেরিফায়েড লিগ্যাল পেপারস",
      stat_4_num: "৫+",
      stat_4_lbl: "বছরের সুনাম ও অভিজ্ঞতা",
      watch_story: "শোরুম ভিডিও ও ছবি দেখুন"
    },
    reviews: {
      tag: "গ্রাহকদের মতামত",
      heading: "সন্তুষ্ট রাইডারদের বাস্তব অভিজ্ঞতা",
      view_all: "সব রিভিউ দেখুন",
      r1_text: "রাইডেক্স মোটরস থেকে Yamaha FZ-S বাইকটি নিয়েছি। একদম ফ্রেশ কন্ডিশন পেয়েছি এবং পেপারস দ্রুত ট্রান্সফার হয়েছে। টাঙ্গাইলের সেরা শোরুম!",
      r1_author: "তানভীর আহমেদ",
      r1_role: "ভেরিফায়েড ক্রেতা • সখিপুর",
      r2_text: "আমার পুরোনো ডিসকভার বাইক এক্সচেঞ্জ করে পালসার ১৫০ নিয়েছি। খুব ভালো ভ্যালুয়েশন পেয়েছি এবং একই দিনে বাইক ডেলিভারি পেয়েছি।",
      r2_author: "কামরুল ইসলাম",
      r2_role: "এক্সচেঞ্জ গ্রাহক • টাঙ্গাইল",
      r3_text: "সেকেন্ড হ্যান্ড বাইকের পেপারস নিয়ে আমার ভয় ছিল, কিন্তু রাইডেক্স মোটরসের ভাইয়েরা বিআরটিএ থেকে সব ক্লিয়ারেন্স চেক করে দিয়েছে।",
      r3_author: "সাব্বির হোসেন",
      r3_role: "ভেরিফায়েড ক্রেতা • মির্জাপুর"
    },
    tips: {
      tag: "রাইডিং ও মেইনটেন্যান্স টিপস",
      heading: "বাইক কেয়ার ও রাইডিং গাইড",
      view_all: "সকল আর্টিকেল দেখুন",
      t1_title: "ব্যবহৃত মোটরসাইকেল কেনার আগে যে ১০টি বিষয় ভালোভাবে চেক করবেন",
      t1_cat: "বায়িং গাইড",
      t2_title: "বিআরটিএ বাইক মালিকানা বদল (Name Transfer) নিয়ম ও প্রয়োজনীয় কাগজপত্র",
      t2_cat: "পেপারওয়ার্ক",
      t3_title: "ইঞ্জিন অয়েল গাইড: মটুল লুব্রিকেন্ট ব্যবহারের সুবিধা ও মাইলেজ বৃদ্ধি",
      t3_cat: "রক্ষণাবেক্ষণ",
      read_more: "আরও পড়ুন"
    },
    cta: {
      tag: "বাইক কিনতে চান?",
      heading: "আজই আপনার স্বপ্নের বাইকটি খুঁজে নিন",
      subtitle: "আমাদের শোরুমের লাইভ স্টক ব্রাউজ করুন অথবা সরাসরি সখিপুর শোরুমে এসে টেস্ট ড্রাইভ দিন।",
      btn_inventory: "বাইকের স্টক দেখুন",
      btn_contact: "শোরুমে যোগাযোগ করুন"
    },
    footer: {
      bio: "রাইডেক্স মোটরস সখিপুরের সবচেয়ে বিশ্বস্ত সেকেন্ড হ্যান্ড মোটরসাইকেল শোরুম। আমরা নিশ্চিত করি লিগ্যাল পেপারস, সেরা কন্ডিশন ও ন্যায্য এক্সচেঞ্জ সুবিধা।",
      quick_links: "প্রয়োজনীয় লিংক",
      top_brands: "শীর্ষ ব্র্যান্ডস",
      contact_title: "শোরুমের ঠিকানা",
      address: "কচুয়া রোড, সখিপুর, টাঙ্গাইল, ১৯৫০",
      phones: "০১৮৬৮-৫৪৬৫১৮, ০১৬৮১-১০৩৫৬৫",
      email: "ridexmotors0405@gmail.com",
      hours: "শনি - শুক্র: সকাল ৯:০০ - রাত ৯:০০ (প্রতিদিন খোলা)",
      copyright: "© ২০২৬ রাইডেক্স মোটরস। সর্বস্বত্ব সংরক্ষিত।",
      credit: "রাইডেক্স মোটরসের জন্য প্রস্তুতকৃত"
    }
  }
};

class RideXI18n {
  constructor() {
    this.currentLang = localStorage.getItem("ridex_lang") || "en";
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.applyTranslations(this.currentLang);
      this.updateSwitcherButtons();
      this.bindEvents();
    });
  }

  setLanguage(lang) {
    if (lang !== "en" && lang !== "bn") lang = "en";
    this.currentLang = lang;
    localStorage.setItem("ridex_lang", lang);
    this.applyTranslations(lang);
    this.updateSwitcherButtons();
    document.body.classList.toggle("lang-bn", lang === "bn");
    
    // Dispatch custom event for dynamic pages
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang } }));
  }

  getTranslation(path, lang = this.currentLang) {
    const keys = path.split(".");
    let current = TRANSLATIONS[lang] || TRANSLATIONS.en;
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = TRANSLATIONS.en;
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  }

  applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.body.classList.toggle("lang-bn", lang === "bn");

    // Elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = this.getTranslation(key, lang);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });

    // Elements with data-i18n-html
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = this.getTranslation(key, lang);
    });

    // Elements with data-i18n-placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.placeholder = this.getTranslation(key, lang);
    });
  }

  updateSwitcherButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      if (btnLang === this.currentLang) {
        btn.classList.add("bg-brand-600", "text-white", "shadow-sm");
        btn.classList.remove("text-gray-400", "hover:text-white");
      } else {
        btn.classList.remove("bg-brand-600", "text-white", "shadow-sm");
        btn.classList.add("text-gray-400", "hover:text-white");
      }
    });
  }

  bindEvents() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetLang = btn.getAttribute("data-lang");
        this.setLanguage(targetLang);
      });
    });
  }

  formatPrice(num) {
    if (isNaN(num)) return num;
    if (this.currentLang === "bn") {
      const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      const formatted = Number(num).toLocaleString("en-IN");
      return formatted.replace(/[0-9]/g, (w) => bnDigits[+w]);
    }
    return Number(num).toLocaleString("en-IN");
  }
}

// Global i18n instance
window.ridexI18n = new RideXI18n();
window.ridexT = (path) => window.ridexI18n.getTranslation(path);
// Compatibility aliases
window.hsI18n = window.ridexI18n;
window.hsT = window.ridexT;
