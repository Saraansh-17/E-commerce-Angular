import { Product, Category } from '../models/product.model';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    image: '📱'
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashionable clothing for all occasions',
    image: '👕'
  },
  {
    id: '3',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Comfortable and stylish shoes',
    image: '👟'
  },
  {
    id: '4',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Complete your look with accessories',
    image: '👜'
  },
  {
    id: '5',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Everything for your home',
    image: '🏠'
  },
  {
    id: '6',
    name: 'Sports',
    slug: 'sports',
    description: 'Sports equipment and gear',
    image: '⚽'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals.',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    category: 'Electronics',
    categoryId: '1',
    color: 'Black',
    stock: 45,
    rating: 4.5,
    reviewCount: 234,
    brand: 'SoundMax',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Feature-rich smartwatch with health tracking, GPS, and water resistance. Stay connected on the go.',
    price: 249.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'
    ],
    category: 'Electronics',
    categoryId: '1',
    color: 'Silver',
    stock: 32,
    rating: 4.7,
    reviewCount: 189,
    brand: 'TechWear',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '3',
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with a modern fit. Perfect for casual outings and layering.',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500'
    ],
    category: 'Clothing',
    categoryId: '2',
    color: 'Blue',
    stock: 67,
    rating: 4.3,
    reviewCount: 156,
    brand: 'FashionCo',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning and breathable mesh upper. Ideal for daily runs.',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'
    ],
    category: 'Footwear',
    categoryId: '3',
    color: 'White',
    stock: 54,
    rating: 4.6,
    reviewCount: 278,
    brand: 'RunFast',
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    description: 'Elegant leather crossbody bag with multiple compartments. Perfect for everyday use.',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500'
    ],
    category: 'Accessories',
    categoryId: '4',
    color: 'Brown',
    stock: 28,
    rating: 4.4,
    reviewCount: 92,
    brand: 'LuxuryBags',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  },
  {
    id: '6',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe. Brew perfect coffee every morning.',
    price: 119.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1517668808823-7113c1e3e1e0?w=500',
    images: [
      'https://images.unsplash.com/photo-1517668808823-7113c1e3e1e0?w=500',
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500'
    ],
    category: 'Home & Kitchen',
    categoryId: '5',
    color: 'Silver',
    stock: 41,
    rating: 4.5,
    reviewCount: 203,
    brand: 'BrewMaster',
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z'
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra cushioning. Perfect for yoga, pilates, and exercise routines.',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'
    ],
    category: 'Sports',
    categoryId: '6',
    color: 'Purple',
    stock: 73,
    rating: 4.6,
    reviewCount: 145,
    brand: 'FitLife',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '8',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking. Long battery life and comfortable design.',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      'https://images.unsplash.com/photo-1501196354995-cbb4cda6c054?w=500'
    ],
    category: 'Electronics',
    categoryId: '1',
    color: 'Black',
    stock: 89,
    rating: 4.4,
    reviewCount: 312,
    brand: 'TechPro',
    createdAt: '2024-01-11T10:00:00Z',
    updatedAt: '2024-01-11T10:00:00Z'
  },
  {
    id: '9',
    name: 'Cotton T-Shirt',
    description: 'Soft cotton t-shirt with comfortable fit. Available in multiple colors. Perfect for casual wear.',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'
    ],
    category: 'Clothing',
    categoryId: '2',
    color: 'White',
    stock: 156,
    rating: 4.2,
    reviewCount: 445,
    brand: 'ComfortWear',
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z'
  },
  {
    id: '10',
    name: 'Basketball Shoes',
    description: 'High-performance basketball shoes with excellent grip and ankle support. Designed for the court.',
    price: 109.99,
    originalPrice: 139.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'
    ],
    category: 'Footwear',
    categoryId: '3',
    color: 'Black',
    stock: 38,
    rating: 4.7,
    reviewCount: 167,
    brand: 'CourtMaster',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z'
  },
  {
    id: '11',
    name: 'Sunglasses Classic',
    description: 'UV-protection sunglasses with polarized lenses. Stylish design for sunny days.',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
    ],
    category: 'Accessories',
    categoryId: '4',
    color: 'Black',
    stock: 62,
    rating: 4.5,
    reviewCount: 198,
    brand: 'SunShade',
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z'
  },
  {
    id: '12',
    name: 'Air Fryer',
    description: 'Large capacity air fryer with digital display. Cook healthier meals with less oil.',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=500',
    images: [
      'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=500',
      'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=500'
    ],
    category: 'Home & Kitchen',
    categoryId: '5',
    color: 'Silver',
    stock: 51,
    rating: 4.6,
    reviewCount: 289,
    brand: 'KitchenPro',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: '13',
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set for home workouts. Build strength and muscle at home.',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500'
    ],
    category: 'Sports',
    categoryId: '6',
    color: 'Gray',
    stock: 25,
    rating: 4.8,
    reviewCount: 134,
    brand: 'FitGear',
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z'
  },
  {
    id: '14',
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand for better ergonomics. Improve your workspace setup.',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
    ],
    category: 'Electronics',
    categoryId: '1',
    color: 'Silver',
    stock: 47,
    rating: 4.4,
    reviewCount: 176,
    brand: 'WorkSpace',
    createdAt: '2024-01-09T10:00:00Z',
    updatedAt: '2024-01-09T10:00:00Z'
  },
  {
    id: '15',
    name: 'Winter Jacket',
    description: 'Warm and waterproof winter jacket with insulated lining. Stay cozy in cold weather.',
    price: 179.99,
    originalPrice: 229.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500'
    ],
    category: 'Clothing',
    categoryId: '2',
    color: 'Black',
    stock: 34,
    rating: 4.6,
    reviewCount: 223,
    brand: 'WarmWear',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z'
  },
  {
    id: '16',
    name: 'Hiking Boots',
    description: 'Durable hiking boots with excellent traction. Perfect for outdoor adventures and trails.',
    price: 139.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'
    ],
    category: 'Footwear',
    categoryId: '3',
    color: 'Brown',
    stock: 29,
    rating: 4.7,
    reviewCount: 156,
    brand: 'TrailBlazer',
    createdAt: '2024-01-23T10:00:00Z',
    updatedAt: '2024-01-23T10:00:00Z'
  },
  {
    id: '17',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with RFID blocking. Multiple card slots and cash compartment.',
    price: 39.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    category: 'Accessories',
    categoryId: '4',
    color: 'Brown',
    stock: 81,
    rating: 4.5,
    reviewCount: 267,
    brand: 'LeatherCraft',
    createdAt: '2024-01-24T10:00:00Z',
    updatedAt: '2024-01-24T10:00:00Z'
  },
  {
    id: '18',
    name: 'Blender Pro',
    description: 'High-powered blender for smoothies, soups, and more. Easy to clean and durable.',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=500',
    images: [
      'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=500',
      'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=500'
    ],
    category: 'Home & Kitchen',
    categoryId: '5',
    color: 'Silver',
    stock: 43,
    rating: 4.6,
    reviewCount: 194,
    brand: 'BlendMaster',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '19',
    name: 'Resistance Bands Set',
    description: 'Complete resistance bands set for full-body workouts. Portable and versatile.',
    price: 29.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500'
    ],
    category: 'Sports',
    categoryId: '6',
    color: 'Purple',
    stock: 95,
    rating: 4.4,
    reviewCount: 312,
    brand: 'FlexFit',
    createdAt: '2024-01-26T10:00:00Z',
    updatedAt: '2024-01-26T10:00:00Z'
  },
  {
    id: '20',
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Expand your connectivity.',
    price: 34.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500'
    ],
    category: 'Electronics',
    categoryId: '1',
    color: 'Silver',
    stock: 68,
    rating: 4.3,
    reviewCount: 201,
    brand: 'ConnectPro',
    createdAt: '2024-01-27T10:00:00Z',
    updatedAt: '2024-01-27T10:00:00Z'
  }
];
