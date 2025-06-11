let nextId = 1;
export const generateId = (prefix = 'id') => `${prefix}_${nextId++}`;

export const initialUsers = [
  {
    _id: generateId('user'),
    name: "Edward Barry Robert",
    email: "Edward_BR@rocketmail.com",
    passwordHash: "E92f47e3",
    role: "customer",
    createdAt: new Date().toISOString(),
  },
  {
    _id: generateId('user'),
    name: "Keiko Villanueva",
    email: "keikomori@gmail.com",
    passwordHash: "K3ikoMori2025",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
];

export const initialProducts = [
  {
    _id: generateId('prod'),
    name: "Candy Camo Skimboard",
    description: "Classic wooden skimboard, perfect for beginners and calm waters. Features a natural wood finish.",
    imageUrl: "/Product Photos/Candy Camo.jpeg", // Replace with actual path
    category: "Skimboards",
    type: "Wood",
    price: 275.63,
    stock: 15,
    tags: ["beginner", "wood", "radbug"],
    rating: 4.0,
    numRatings: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Carbon Fiber Pro Skimboard",
    description: "High-performance skimboard with a vibrant blue wave design. Suitable for intermediate to advanced riders.",
    imageUrl: "/Product Photos/Carbon Fiber Pro.jpeg", // Replace with actual path
    category: "Skimboards",
    type: "Foam",
    price: 968.54,
    stock: 8,
    tags: ["intermediate", "advanced", "foam", "wave"],
    rating: 4.7,
    numRatings: 25,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  }, 
  {
    _id: generateId('prod'),
    name: "Blue Palm Tree T-Shirt",
    description: "Tween boy casual palm tree & sunset print revere collar short sleeve shirt, suitable For summer.",
    imageUrl: "/Product Photos/BluePalmTreeShirt.png", // Replace with actual path
    category: "T-Shirts",
    type: "T-Shirts",
    price: 6.99,
    stock: 28,
    tags: ["tree", "palm", "beach", "shirt", "blue"],
    rating: 4.2,
    numRatings: 83,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Green Island Skimboard",
    description: "Colorful skimboard featuring a sunset orange gradient. Great for all skill levels.",
    imageUrl: "/Product Photos/Green Island.jpeg",
    category: "Skimboards",
    type: "Composite",
    price: 832.19,
    stock: 20,
    tags: ["all levels", "composite", "colorful"],
    rating: 4.3,
    numRatings: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },

  {
    _id: generateId('prod'),
    name: "Lime Swirl Skimboard",
    description: "Broad Spectrum SPF 50. Gentle formula for sensitive skin. 3 FL OZ.",
    imageUrl: "/Product Photos/Lime Swirl.jpeg", // Replace with actual path
    category: "Skimboards",
    type: "Lotion",
    price: 427.68,
    stock: 50,
    tags: ["spf50", "mineral", "sensitive skin", "cetaphil"],
    rating: 4.8,
    numRatings: 96,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Marble Fish Skimboard",
    description: "Broad Spectrum SPF 55. Lightweight, non-greasy feel.",
    imageUrl: "/Product Photos/Marble Fish.jpeg", // Replace with actual path
    category: "Skimboards",
    type: "Lotion",
    price: 195.36,
    stock: 75,
    tags: ["spf55", "dry-touch", "neutrogena"],
    rating: 4.5,
    numRatings: 150,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  
  {
    _id: generateId('prod'),
    name: "Marble Skimboard",
    description: "Spacious and stylish rope handle tote bag for all your beach essentials. Durable canvas material.",
    imageUrl: "/Product Photos/Marble.jpeg", // Replace with actual path
    category: "Skimboards",
    type: "Tote",
    price: 941.25,
    stock: 30,
    tags: ["tote bag", "canvas", "striped"],
    rating: 4.2,
    numRatings: 45,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Purple Carbon Skimboard",
    description: "Relax in style on this large inflatable lounger featuring a sun canopy. Perfect for pools and calm beach waters.",
    imageUrl: "/Product Photos/Purple Carbon.jpeg", // Replace with actual path
    category: "Skimboards",
    type: "Floats",
    price: 659.57,
    stock: 10,
    tags: ["inflatable", "lounger", "float", "canopy"],
    rating: 4.6,
    numRatings: 33,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Rasta Skimboard",
    description: "Versatile black bucket hat with detachable neck cover and face shield for ultimate sun protection.",
    imageUrl: "/Product Photos/Rasta.jpeg",
    category: "Skimboards",
    type: "Bucket Hat",
    price: 92.01, // Price seems high for a hat, might be a bundle
    stock: 22,
    tags: ["bucket hat", "sun protection", "fishing hat"],
    rating: 4.4,
    numRatings: 19,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },

  {
    _id: generateId('prod'),
    name: "Samurai Skimboard",
    description: "Timeless black sunglasses with UV protection.",
    imageUrl: "/Product Photos/Samurai.jpeg",
    category: "Beach Apparel", // Or "Accessories"
    type: "Sunglasses",
    price: 742.98,
    stock: 100,
    tags: ["sunglasses", "uv protection", "classic"],
    rating: 4.1,
    numRatings: 77,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  }
];

export const initialCustomDesigns = [
    // {
    //   _id: generateId('design'),
    //   userId: initialUsers[0]._id,
    //   name: "My Custom Board 1",
    //   boardShape: "oval", // Example
    //   baseType: "gradient", // 'solid' or 'gradient'
    //   gradientDetails: {
    //     type: "linear", // 'linear' or 'radial'
    //     angle: 90, // degrees for linear
    //     stops: [
    //       { offset: 0, color: "#F2C2CE", opacity: 1 },
    //       { offset: 0.5, color: "#BDCE62", opacity: 1 },
    //       { offset: 1, color: "#A0C888", opacity: 1 },
    //     ],
    //   },
    //   solidColor: null, // Hex string if baseType is 'solid'
    //   customText: {
    //     text: "Beach Vibes",
    //     font: "Arial",
    //     color: "#333333",
    //     size: 30, // px
    //     position: { x: 50, y: 150 }, // relative to board preview
    //   },
    //   decal: {
    //     url: null, // URL of uploaded decal image
    //     position: { x: 100, y: 200 },
    //     size: { width: 80, height: 80 },
    //   },
    //   price: 75.00, // Base price for custom board + customizations
    //   createdAt: new Date().toISOString(),
    // }
];

export const initialOrders = [];


// --- Mock API Functions ---

// PRODUCTS
export const fetchProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return [...initialProducts];
};

export const fetchProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const product = initialProducts.find(p => p._id === id);
  return product ? {...product} : null;
};

export const searchProductsAPI = async (searchTerm, category, sortBy = 'name_asc') => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let results = [...initialProducts];

    if (searchTerm) {
        results = results.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category && category !== "All") { // Assuming "All" means no category filter
        results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Sorting
    if (sortBy === 'name_asc') {
        results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
        results.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price_asc') {
        results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
        results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating_desc') { // Most Popular (by rating)
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    // Add more sorting options as needed

    return results;
};


// USERS
export const loginAPI = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const user = initialUsers.find(u => u.email === email /* && checkPassword(password, u.passwordHash) */);
  // Simplified: in real app, compare hashed passwords
  if (user && password) { // For demo, any password for a known email works
    return { ...user, token: `mock_token_for_${user._id}` }; // Return a mock token
  }
  throw new Error("Invalid email or password");
};

export const signupAPI = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (initialUsers.some(u => u.email === userData.email)) {
    throw new Error("User with this email already exists.");
  }
  const newUser = {
    _id: generateId('user'),
    name: userData.name,
    email: userData.email,
    passwordHash: `hashed_${userData.password}_placeholder`, // HASH PASSWORDS IN REAL APP
    role: "customer",
    createdAt: new Date().toISOString(),
  };
  initialUsers.push(newUser); // In a real app, this would be a DB operation
  return { ...newUser, token: `mock_token_for_${newUser._id}` };
};

// CUSTOM DESIGNS
export const saveCustomDesignAPI = async (designData) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const newDesign = {
    _id: generateId('design'),
    userId: designData.userId, // Assumes userId is passed
    name: designData.name || `Custom Design ${initialCustomDesigns.length + 1}`,
    ...designData,
    price: designData.price || 70.00, // Example base price for custom design
    createdAt: new Date().toISOString(),
  };
  initialCustomDesigns.push(newDesign);
  return { ...newDesign };
};

// --- NEW DATA FOR SHOPPING CART PAGE ---
// This data is specifically designed to match the Figma screenshot for the shopping cart page.
// ImageURLs are placeholders from picsum.photos for easy display.
// In a real app, these imageURLs would point to actual product images.
export const initialShoppingCartPageItems = [
  { _id: 'cartItem_1', name: 'Snorkeling Gear for Adults, Dry-Top Snorkel Set...', price: 57.39, imageUrl: 'https://picsum.photos/seed/snorkeling_gear/80/80', quantity: 2, selected: false },
  { _id: 'cartItem_2', name: 'Tahe sup-yak Air 10\'6 Beach pack, Inflatable Kayak...', price: 745.00, imageUrl: 'https://picsum.photos/seed/sup_yak/80/80', quantity: 1, selected: true },
  { _id: 'cartItem_3', name: 'Mesh Duffel Bag, Dive Bags Travel Beach Gear Bag...', price: 65.14, imageUrl: 'https://picsum.photos/seed/duffel_bag/80/80', quantity: 1, selected: true },
  { _id: 'cartItem_4', name: 'Sun Bum Premium Day Tripper Travel Set, Sunscreen...', price: 32.98, imageUrl: 'https://picsum.photos/seed/sun_bum/80/80', quantity: 3, selected: true },
  { _id: 'cartItem_5', name: 'Deluxe Skimboard Travel Bag for Skimboards up to 52"...', price: 153.00, imageUrl: 'https://picsum.photos/seed/skimboard_bag_deluxe/80/80', quantity: 1, selected: true },
  { _id: 'cartItem_6', name: 'Buckets and Spades Play Set for Kids, Beach Sand To...', price: 7.78, imageUrl: 'https://picsum.photos/seed/buckets_spades/80/80', quantity: 2, selected: false },
  { _id: 'cartItem_7', name: 'Blue Swimwear Beach Shorts Mens Quick Dry Swim Tru...', price: 24.61, imageUrl: 'https://picsum.photos/seed/swim_shorts/80/80', quantity: 1, selected: false },
  { _id: 'cartItem_8', name: 'The Essential Beach Set - Includes Tote Bag, Microfi...', price: 391.98, imageUrl: 'https://picsum.photos/seed/essential_beach_set/80/80', quantity: 2, selected: true },
  { _id: 'cartItem_9', name: 'CETAPHIL Sheer Mineral Sunscreen Lotion SPF 50, Fa...', price: 27.60, imageUrl: 'https://picsum.photos/seed/cetaphil_sunscreen/80/80', quantity: 1, selected: true },
  { _id: 'cartItem_10', name: 'Camouflage Skimboard Travel Bag with Shoulder Str...', price: 89.21, imageUrl: 'https://picsum.photos/seed/skimboard_bag_camo/80/80', quantity: 1, selected: false },
  { _id: 'cartItem_11', name: 'Sunglasses, Classic Aviator Style UV Protection Su...', price: 10.98, imageUrl: 'https://picsum.photos/seed/sunglasses_classic/80/80', quantity: 4, selected: true },
  { _id: 'cartItem_12', name: 'Beach Towel with Fringes 100x200cm, Absorbent C...', price: 7.78, imageUrl: 'https://picsum.photos/seed/beach_towel/80/80', quantity: 2, selected: false },
];

// ORDERS
export const createOrderAPI = async (orderData) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const newOrder = {
    _id: generateId('order'),
    ...orderData, // Expects { userId, items, totalPrice, shippingAddress, paymentMethod }
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  initialOrders.push(newOrder);
  return { ...newOrder };
};

export const fetchOrdersForUserAPI = async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return initialOrders.filter(order => order.userId === userId);
};

export const productCategories = [
    "All", 
    "Skimboards", 
    "T-Shirts", 
    "Jackets", 
    "Boardshorts", 
    "Accessories", 
];

export const topSearchTerms = [
    "Skimboards", "Hats", "Towels", "Sandals", "Traction Pads", "Sunscreen", "Beach Bags", "Flip-Flops"
];