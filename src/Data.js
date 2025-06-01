let nextId = 1;
const generateId = (prefix = 'id') => `${prefix}_${nextId++}`;

export const initialUsers = [
  {
    _id: generateId('user'),
    name: "John Doe",
    email: "john.doe@example.com",
    passwordHash: "hashed_password123", // In a real app, never store plain text or weak hashes
    role: "customer",
    createdAt: new Date().toISOString(),
  },
  {
    _id: generateId('user'),
    name: "Admin User",
    email: "admin@example.com",
    passwordHash: "hashed_admin_password",
    role: "employee",
    createdAt: new Date().toISOString(),
  },
];

export const initialProducts = [
  // Skimboards (from page 12)
  {
    _id: generateId('prod'),
    name: "Candy Camo",
    description: "Classic wooden skimboard, perfect for beginners and calm waters. Features a natural wood finish.",
    imageUrl: "/Product Photos/Candy Camo.jpeg", // Replace with actual path
    category: "Skimboards",
    type: "Wood",
    price: 20.60,
    stock: 15,
    tags: ["beginner", "wood", "radbug"],
    rating: 4.0,
    numRatings: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Carbon Fiber Pro",
    description: "High-performance skimboard with a vibrant blue wave design. Suitable for intermediate to advanced riders.",
    imageUrl: "/Product Photos/Carbon Fiber Pro.jpeg", // Replace with actual path
    category: "Skimboards",
    type: "Foam",
    price: 35.00,
    stock: 8,
    tags: ["intermediate", "advanced", "foam", "wave"],
    rating: 4.7,
    numRatings: 25,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Green Island",
    description: "Colorful skimboard featuring a sunset orange gradient. Great for all skill levels.",
    imageUrl: "/Product Photos/Green Island.jpeg",
    category: "Skimboards",
    type: "Composite",
    price: 30.50,
    stock: 20,
    tags: ["all levels", "composite", "colorful"],
    rating: 4.3,
    numRatings: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },

  // Sunscreens (from page 11)
  {
    _id: generateId('prod'),
    name: "Lime Swirl",
    description: "Broad Spectrum SPF 50. Gentle formula for sensitive skin. 3 FL OZ.",
    imageUrl: "/Product Photos/Lime Swirl.jpeg", // Replace with actual path
    category: "Sunscreen",
    type: "Lotion",
    price: 27.60,
    stock: 50,
    tags: ["spf50", "mineral", "sensitive skin", "cetaphil"],
    rating: 4.8,
    numRatings: 96,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Marble Fish",
    description: "Broad Spectrum SPF 55. Lightweight, non-greasy feel.",
    imageUrl: "/Product Photos/Marble Fish.jpeg", // Replace with actual path
    category: "Sunscreen",
    type: "Lotion",
    price: 15.20,
    stock: 75,
    tags: ["spf55", "dry-touch", "neutrogena"],
    rating: 4.5,
    numRatings: 150,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  
  // Beach Gear (from page 8/9)
  {
    _id: generateId('prod'),
    name: "Marble",
    description: "Spacious and stylish rope handle tote bag for all your beach essentials. Durable canvas material.",
    imageUrl: "/Product Photos/Marble.jpeg", // Replace with actual path
    category: "Beach Bags",
    type: "Tote",
    price: 19.50,
    stock: 30,
    tags: ["tote bag", "canvas", "striped"],
    rating: 4.2,
    numRatings: 45,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Purple Carbon",
    description: "Relax in style on this large inflatable lounger featuring a sun canopy. Perfect for pools and calm beach waters.",
    imageUrl: "/Product Photos/Purple Carbon.jpeg", // Replace with actual path
    category: "Beach Gear",
    type: "Floats",
    price: 59.50,
    stock: 10,
    tags: ["inflatable", "lounger", "float", "canopy"],
    rating: 4.6,
    numRatings: 33,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    _id: generateId('prod'),
    name: "Rasta",
    description: "Versatile black bucket hat with detachable neck cover and face shield for ultimate sun protection.",
    imageUrl: "/Product Photos/Rasta.jpeg",
    category: "Hats",
    type: "Bucket Hat",
    price: 50.00, // Price seems high for a hat, might be a bundle
    stock: 22,
    tags: ["bucket hat", "sun protection", "fishing hat"],
    rating: 4.4,
    numRatings: 19,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  // Add more products...
  // Example Sunglasses
  {
    _id: generateId('prod'),
    name: "Samurai",
    description: "Timeless black sunglasses with UV protection.",
    imageUrl: "/Product Photos/Samurai.jpeg",
    category: "Beach Apparel", // Or "Accessories"
    type: "Sunglasses",
    price: 10.98,
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
    "All", "Skimboards", "Sunscreen", "Hats", "Beach Bags", "Beach Gear", "Beach Apparel", "Towels", "Sandals", "Flip-Flops", "Traction Pads"
];

export const topSearchTerms = [
    "Skimboards", "Hats", "Towels", "Sandals", "Traction Pads", "Sunscreen", "Beach Bags", "Flip-Flops"
];