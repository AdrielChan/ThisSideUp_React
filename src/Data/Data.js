import { initialProducts, generateId as productGenerateId } from "./ProductData";
import { initialUsers, generateId as accountGenerateId } from "./Accounts";
import { countries } from "./CountryData";

// Re-export the data
export { countries } from "./CountryData";
export { initialProducts } from "./ProductData";
export { initialUsers } from "./Accounts";

// Use a single generateId function to avoid conflicts
export const generateId = (prefix = 'id') => {
  return prefix.startsWith('prod') ? productGenerateId(prefix) : accountGenerateId(prefix);
};

export const initialCustomDesigns = [
  {
    _id: generateId('custom'),
    userId: "user123",
    designName: "Custom Wave Design",
    basePrice: 300,  // This is the base price for custom skimboards
    description: "Custom designed skimboard with wave patterns",
  }
];

export const initialOrders = [];

// Define product categories
export const productCategories = [
  'All',
  'Skimboards',
  'T-Shirts',
  'Beach Accessories',
  'Sunscreen',
  'Custom Designs'
];

// --- Mock API Functions ---

// PRODUCTS API Functions
export const fetchProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return [...initialProducts];
};

export const fetchProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const product = initialProducts.find(p => p._id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return {...product};
};

export const searchProductsAPI = async (searchTerm, category, sortBy = 'name_asc') => {
  await new Promise(resolve => setTimeout(resolve, 200));

  let filteredProducts = [...initialProducts];

  // Filter by search term if provided
  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  // Filter by category if provided and not 'All'
  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter(product =>
      product.category === category
    );
  }

  // Sort products
  switch (sortBy) {
    case 'price_asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name_desc':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'name_asc':
    default:
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return filteredProducts;
};


// USERS & AUTH
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  // Password must be at least 8 characters, contain one number and one special character
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return re.test(password);
};

export const loginAPI = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

  // Basic validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Find user by email
  const user = initialUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // In a real app, you would hash the password and compare hashes
  // For demo purposes, we're comparing the raw password with passwordHash
  if (user.passwordHash !== password) {
    throw new Error('Invalid email or password');
  }

  // Return user data (excluding password)
  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const signupAPI = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (!userData.email || !userData.password || !userData.name) {
    throw new Error("Name, email and password are required");
  }

  if (!validateEmail(userData.email)) {
    throw new Error("Invalid email format");
  }

  if (!validatePassword(userData.password)) {
    throw new Error("Password must be at least 8 characters long and contain at least one number and one special character");
  }

  if (initialUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    throw new Error("Email already in use");
  }

  const newUser = {
    _id: generateId('user'),
    name: userData.name,
    email: userData.email,
    passwordHash: userData.password, // In real app, hash this password
    role: userData.role || "customer",
    createdAt: new Date().toISOString()
  };

  initialUsers.push(newUser);

  const { passwordHash, ...userWithoutPassword } = newUser;
  return {
    ...userWithoutPassword,
    token: `mock_token_${Date.now()}`
  };
};

// CUSTOM DESIGNS
export const saveCustomDesignAPI = async (designData) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const newDesign = {
    _id: generateId('design'),
    userId: designData.userId, // Assumes userId is passed
    name: designData.name || `Custom Design ${initialCustomDesigns.length + 1}`,
    ...designData,
    price: designData.price || 200.00, // Example base price for custom design
    createdAt: new Date().toISOString(),
  };
  initialCustomDesigns.push(newDesign);
  return { ...newDesign };
};

// --- NEW DATA FOR SHOPPING CART PAGE ---
// This data is specifically designed to match the Figma screenshot for the shopping cart page.

export const initialShoppingCartPageItems = [
  { _id: 'cartItem_1', name: 'Snorkeling Gear for Adults, Dry-Top Snorkel Set...', price: 57.39, imageUrl: 'https://picsum.photos/seed/snorkeling_gear/80/80', quantity: 2, selected: false },
  { _id: 'cartItem_2', name: 'Tahe sup-yak Air 10\'6 Beach pack, Inflatable Kayak...', price: 745.00, imageUrl: 'https://picsum.photos/seed/sup_yak/80/80', quantity: 1, selected: true },
  { _id: 'cartItem_3', name: 'Mesh Duffel Bag, Dive Bags Travel Beach Gear Bag...', price: 65.14, imageUrl: 'https://picsum.photos/seed/duffel_bag/80/80', quantity: 1, selected: true },
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

export const topSearchTerms = [
    "Skimboards", "Hats", "Towels", "Sandals", "Traction Pads", "Sunscreen", "Beach Bags", "Flip-Flops"
];



// Function to toggle product likes
export const toggleProductLikeAPI = async (productId, userId) => {
  try {
    // Find the product in initialProducts array
    const productIndex = initialProducts.findIndex(p => p._id === productId);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const product = initialProducts[productIndex];
    const likes = product.likes || [];
    const userLikedIndex = likes.indexOf(userId);

    // Toggle like status
    if (userLikedIndex === -1) {
      // User hasn't liked the product yet, add like
      likes.push(userId);
    } else {
      // User already liked the product, remove like
      likes.splice(userLikedIndex, 1);
    }

    // Update product with new likes array
    initialProducts[productIndex] = {
      ...product,
      likes: likes
    };

    // Return updated like status and count
    return {
      liked: likes.includes(userId),
      likesCount: likes.length
    };
  } catch (error) {
    console.error('Error in toggleProductLikeAPI:', error);
    throw error;
  }
};