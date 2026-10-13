/**
 * RideX Motors - Unified Database Layer
 * Automatically switches between Firebase Firestore and LocalStorage fallback.
 * Supports Bikes, Categories, and Brands with full CRUD operations.
 */

const DB_COLLECTION = "bikes";
const DB_CATEGORIES_COLLECTION = "categories";
const STORAGE_KEY = "ridex_bikes_inventory";
const CATEGORIES_STORAGE_KEY = "ridex_categories";

class RideXDB {
  constructor() {
    this.initLocalStorage();
  }

  // Ensure default seed data exists in localStorage
  initLocalStorage() {
    try {
      const existingItems = localStorage.getItem(STORAGE_KEY);
      if (!existingItems && typeof SEED_BIKES !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BIKES));
      }

      const existingCats = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (!existingCats && typeof SEED_CATEGORIES !== "undefined") {
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
      }
    } catch (e) {
      console.warn("LocalStorage access issue:", e);
    }
  }

  // Check if live Firestore is ready
  isLiveFirestore() {
    return (
      window.RIDEX_FIREBASE &&
      window.RIDEX_FIREBASE.isConfigured() &&
      window.RIDEX_FIREBASE.db !== null
    );
  }

  /* ==========================================================================
     CATEGORIES / BRANDS MANAGEMENT (CRUD)
     ========================================================================== */

  // Get all categories/brands
  async getCategories() {
    if (this.isLiveFirestore()) {
      try {
        const snapshot = await window.RIDEX_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).get();
        if (!snapshot.empty) {
          const cats = [];
          snapshot.forEach((doc) => {
            cats.push({ id: doc.id, ...doc.data() });
          });
          return cats;
        } else {
          console.log("Firestore categories empty, using default seed categories...");
          try {
            await this.seedCategories();
          } catch (e) {}
          return this.getLocalCategories();
        }
      } catch (err) {
        console.warn("Firestore categories read failed, using local cache:", err);
        return this.getLocalCategories();
      }
    }
    return this.getLocalCategories();
  }

  // Get single category by ID
  async getCategoryById(id) {
    if (this.isLiveFirestore()) {
      try {
        const doc = await window.RIDEX_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(id).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
      } catch (err) {
        console.warn("Firestore getCategoryById error:", err);
      }
    }
    const cats = this.getLocalCategories();
    return cats.find((c) => String(c.id) === String(id)) || null;
  }

  // Add new category
  async addCategory(catData) {
    const id = catData.id || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const cleanCat = {
      ...catData,
      id,
      createdAt: new Date().toISOString()
    };

    if (this.isLiveFirestore()) {
      try {
        await window.RIDEX_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(id).set(cleanCat);
      } catch (err) {
        console.error("Firestore addCategory error:", err);
      }
    }

    const cats = this.getLocalCategories();
    const existingIndex = cats.findIndex((c) => c.id === id);
    if (existingIndex >= 0) {
      cats[existingIndex] = cleanCat;
    } else {
      cats.push(cleanCat);
    }
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(cats));
    return cleanCat;
  }

  // Delete category
  async deleteCategory(id) {
    if (this.isLiveFirestore()) {
      try {
        await window.RIDEX_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(id).delete();
      } catch (err) {
        console.error("Firestore deleteCategory error:", err);
      }
    }

    const cats = this.getLocalCategories().filter((c) => String(c.id) !== String(id));
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(cats));
    return true;
  }

  // Local category helpers
  getLocalCategories() {
    try {
      const data = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      return data ? JSON.parse(data) : (typeof SEED_CATEGORIES !== "undefined" ? SEED_CATEGORIES : []);
    } catch (e) {
      return typeof SEED_CATEGORIES !== "undefined" ? SEED_CATEGORIES : [];
    }
  }

  /* ==========================================================================
     BIKES INVENTORY MANAGEMENT (CRUD)
     ========================================================================== */

  // Get all bikes
  async getBikes() {
    if (this.isLiveFirestore()) {
      try {
        const snapshot = await window.RIDEX_FIREBASE.db.collection(DB_COLLECTION).get();
        if (!snapshot.empty) {
          const items = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          return items;
        } else {
          console.log("Firestore bikes empty, using default seed bikes...");
          try {
            await this.seedBikes();
          } catch (e) {}
          return this.getLocalBikes();
        }
      } catch (err) {
        console.warn("Firestore read failed, falling back to LocalStorage:", err);
        return this.getLocalBikes();
      }
    }
    return this.getLocalBikes();
  }

  // Get single bike by ID
  async getBikeById(id) {
    if (this.isLiveFirestore()) {
      try {
        const doc = await window.RIDEX_FIREBASE.db.collection(DB_COLLECTION).doc(id).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
      } catch (err) {
        console.warn("Firestore getBikeById error:", err);
      }
    }
    const items = this.getLocalBikes();
    return items.find((item) => String(item.id) === String(id)) || null;
  }

  // Add new bike
  async addBike(bikeData) {
    const id = bikeData.id || "bike-" + Date.now();
    const cleanBike = {
      ...bikeData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (this.isLiveFirestore()) {
      try {
        await window.RIDEX_FIREBASE.db.collection(DB_COLLECTION).doc(id).set(cleanBike);
      } catch (err) {
        console.error("Firestore addBike error:", err);
      }
    }

    const items = this.getLocalBikes();
    items.unshift(cleanBike);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return cleanBike;
  }

  // Update bike
  async updateBike(id, bikeData) {
    const updatedBike = {
      ...bikeData,
      id,
      updatedAt: new Date().toISOString()
    };

    if (this.isLiveFirestore()) {
      try {
        await window.RIDEX_FIREBASE.db.collection(DB_COLLECTION).doc(id).set(updatedBike, { merge: true });
      } catch (err) {
        console.error("Firestore updateBike error:", err);
      }
    }

    const items = this.getLocalBikes();
    const index = items.findIndex((item) => String(item.id) === String(id));
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedBike };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    return updatedBike;
  }

  // Delete bike
  async deleteBike(id) {
    if (this.isLiveFirestore()) {
      try {
        await window.RIDEX_FIREBASE.db.collection(DB_COLLECTION).doc(id).delete();
      } catch (err) {
        console.error("Firestore deleteBike error:", err);
      }
    }

    const items = this.getLocalBikes().filter((item) => String(item.id) !== String(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  }

  // Local bikes helpers
  getLocalBikes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : (typeof SEED_BIKES !== "undefined" ? SEED_BIKES : []);
    } catch (e) {
      return typeof SEED_BIKES !== "undefined" ? SEED_BIKES : [];
    }
  }

  /* ==========================================================================
     SEEDING HELPERS
     ========================================================================== */

  async seedCategories() {
    if (typeof SEED_CATEGORIES === "undefined") return;
    if (this.isLiveFirestore()) {
      try {
        const batch = window.RIDEX_FIREBASE.db.batch();
        SEED_CATEGORIES.forEach((cat) => {
          const ref = window.RIDEX_FIREBASE.db.collection(DB_CATEGORIES_COLLECTION).doc(cat.id);
          batch.set(ref, cat);
        });
        await batch.commit();
      } catch (e) {
        console.warn("Firestore seedCategories failed (auth rules). Using local storage.");
      }
    }
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(SEED_CATEGORIES));
  }

  async seedBikes() {
    if (typeof SEED_BIKES === "undefined") return;
    if (this.isLiveFirestore()) {
      try {
        const batch = window.RIDEX_FIREBASE.db.batch();
        SEED_BIKES.forEach((bike) => {
          const ref = window.RIDEX_FIREBASE.db.collection(DB_COLLECTION).doc(bike.id);
          batch.set(ref, bike);
        });
        await batch.commit();
      } catch (e) {
        console.warn("Firestore seedBikes failed (auth rules). Using local storage.");
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BIKES));
  }

  async restoreAllSeedData() {
    await this.seedCategories();
    await this.seedBikes();
    console.log("✅ RideX Motors default seed data restored!");
  }
}

// Global DB instance
window.ridexDB = new RideXDB();
// Backward compatibility alias
window.hsDB = window.ridexDB;
