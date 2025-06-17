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
  {    _id: generateId('prod'),
    name: "Candy Camo Skimboard",
    description: "Classic wooden skimboard, perfect for beginners and calm waters. Features a natural wood finish.",
    imageUrl: "/Product Photos/Candy Camo.jpeg", // Replace with actual path
    category: "Skimboards",
    price: 275.63,
    stock: 15,
    rating: 4.0,
    numRatings: 12,
  },
  {    _id: generateId('prod'),
    name: "Carbon Fiber Pro Skimboard",
    description: "High-performance skimboard with a vibrant blue wave design. Suitable for intermediate to advanced riders.",
    imageUrl: "/Product Photos/Carbon Fiber Pro.jpeg", // Replace with actual path
    category: "Skimboards",
    price: 968.54,
    stock: 8,
    rating: 4.7,
    numRatings: 25,
  }, 
  {    _id: generateId('prod'),
    name: "Blue Palm Tree T-Shirt",
    description: "Tween boy casual palm tree & sunset print revere collar short sleeve shirt, suitable For summer.",
    imageUrl: "/Product Photos/BluePalmTreeShirt.png", // Replace with actual path
    category: "T-Shirts",
    price: 6.99,
    stock: 28,
    rating: 4.2,
    numRatings: 83,
  },
  {    _id: generateId('prod'),
    name: "Green Island Skimboard",
    description: "Colorful skimboard featuring a sunset orange gradient. Great for all skill levels.",
    imageUrl: "/Product Photos/Green Island.jpeg",
    category: "Skimboards",
    price: 832.19,
    stock: 20,
    rating: 4.3,
    numRatings: 18,
  },

  {    _id: generateId('prod'),
    name: "Lime Swirl Skimboard",
    description: "Broad Spectrum SPF 50. Gentle formula for sensitive skin. 3 FL OZ.",
    imageUrl: "/Product Photos/Lime Swirl.jpeg", // Replace with actual path
    category: "Skimboards",
    price: 427.68,
    stock: 50,
    rating: 4.8,
    numRatings: 96,
  },
  {
    _id: generateId('prod'),
    name: "Marble Fish Skimboard",
    description: "Broad Spectrum SPF 55. Lightweight, non-greasy feel.",
    imageUrl: "/Product Photos/Marble Fish.jpeg", // Replace with actual path
    category: "Skimboards",
    price: 195.36,
    stock: 75,
    tags: ["spf55", "dry-touch", "neutrogena"],
    rating: 4.5,
    numRatings: 150,
  },
  
  {
    _id: generateId('prod'),
    name: "Marble Skimboard",
    description: "Spacious and stylish rope handle tote bag for all your beach essentials. Durable canvas material.",
    imageUrl: "/Product Photos/Marble.jpeg", // Replace with actual path
    category: "Skimboards",
    price: 941.25,
    stock: 30,
    tags: ["tote bag", "canvas", "striped"],
    rating: 4.2,
    numRatings: 45,
  },
  {
    _id: generateId('prod'),
    name: "Purple Carbon Skimboard",
    description: "Relax in style on this large inflatable lounger featuring a sun canopy. Perfect for pools and calm beach waters.",
    imageUrl: "/Product Photos/Purple Carbon.jpeg", // Replace with actual path
    category: "Skimboards",
    price: 659.57,
    stock: 10,
    tags: ["inflatable", "lounger", "float", "canopy"],
    rating: 4.6,
    numRatings: 33,
  },
  {
    _id: generateId('prod'),
    name: "Rasta Skimboard",
    description: "Versatile black bucket hat with detachable neck cover and face shield for ultimate sun protection.",
    imageUrl: "/Product Photos/Rasta.jpeg",
    category: "Skimboards",
    price: 92.01, // Price seems high for a hat, might be a bundle
    stock: 22,
    tags: ["bucket hat", "sun protection", "fishing hat"],
    rating: 4.4,
    numRatings: 19,
  },

  {
    _id: generateId('prod'),
    name: "Samurai Skimboard",
    description: "Timeless black sunglasses with UV protection.",
    imageUrl: "/Product Photos/Samurai.jpeg",
    category: "Skimboards", // Or "Accessories"
    price: 742.98,
    stock: 100,
    tags: ["sunglasses", "uv protection", "classic"],
    rating: 4.1,
    numRatings: 77,
  },

  {
    _id: generateId('prod'),
    name: "Sunscreen",
    description: "Timeless black sunglasses with UV protection.",
    imageUrl: "/Product Photos/Cetaphil-Sheer-Mineral-Sunscreen-Lotion-SPF-50-Fragrance-Free-3-oz_31c4fa0f-cbeb-43d0-84ae-168d51d38f5f.0783adf0de938f2148f6902345bfee3b.png",
    category: "Accessories", // Or "Accessories"
    price: 27.60,
    stock: 100,
    tags: ["sunglasses", "uv protection", "classic"],
    rating: 4.1,
    numRatings: 77,
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
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  const user = initialUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error("User not found");
  }

  // In a real app, you would hash the password and compare with stored hash
  // This is just for demo purposes
  if (password !== user.passwordHash) {
    throw new Error("Invalid password");
  }

  const { passwordHash, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    token: `mock_token_${Date.now()}`
  };
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


export const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AX", name: "Åland Islands" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo (Democratic Republic of the)" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Curaçao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "VA", name: "Holy See" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea (Democratic People's Republic of)" },
  { code: "KR", name: "Korea (Republic of)" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia (Federated States of)" },
  { code: "MD", name: "Moldova (Republic of)" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MK", name: "North Macedonia" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin (French part)" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten (Dutch part)" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan, Province of China" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom of Great Britain and Northern Ireland" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "US", name: "United States of America" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela (Bolivarian Republic of)" },
  { code: "VN", name: "Viet Nam" },
  { code: "VG", name: "Virgin Islands (British)" },
  { code: "VI", name: "Virgin Islands (U.S.)" },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "OTHER", name: "Other" } // Kept your "Other" option
].sort((a, b) => a.name.localeCompare(b.name)); // Sort countries alphabetically

// If you put this in a separate file (e.g., src/data/countries.js):
// export default countries;