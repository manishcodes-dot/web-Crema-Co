import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Fallback data when MongoDB is not connected
const fallbackProducts = [
  {
    _id: '1',
    name: 'The Obsidian Roast',
    slug: 'obsidian-roast',
    category: 'roast',
    description: 'A deep, complex profile with lingering notes of dark cocoa and forest floor.',
    longDescription: 'Meticulously slow-roasted for the boldest flavor. Our Obsidian Roast is crafted from single-origin beans sourced from the volcanic highlands of Sumatra. Each batch undergoes a precise 14-minute roasting cycle at carefully controlled temperatures, resulting in a coffee with extraordinary depth and complexity.',
    price: 18.50,
    image: '/images/beans-bag.png',
    origin: 'Sumatra, Indonesia',
    roastLevel: 'Dark',
    tastingNotes: ['Dark Chocolate', 'Forest Floor', 'Molasses'],
    featured: true,
    available: true
  },
  {
    _id: '2',
    name: 'Velvet Cortado',
    slug: 'velvet-cortado',
    category: 'espresso',
    description: 'Perfectly balanced espresso cut with silky micro-foam. A texture that lives up to its name.',
    longDescription: 'Our Velvet Cortado represents the pinnacle of espresso craft. A double shot of our signature house blend is meticulously cut with an equal measure of velvety steamed milk, creating a harmonious balance between bold espresso intensity and creamy smoothness.',
    price: 5.75,
    image: '/images/cortado.png',
    origin: 'Colombia',
    roastLevel: 'Medium',
    tastingNotes: ['Caramel', 'Hazelnut', 'Silk'],
    featured: true,
    available: true
  },
  {
    _id: '3',
    name: 'Ethereal Ethiopian',
    slug: 'ethereal-ethiopian',
    category: 'roast',
    description: 'High-altitude beans offering a tea-like clarity with vibrant jasmine and citrus aromatics.',
    longDescription: 'Sourced from the birthplace of coffee itself, our Ethereal Ethiopian is a celebration of the bean in its purest form. Grown at elevations above 2,000 meters in the Yirgacheffe region, these beans develop a flavor profile that is uniquely complex and gracefully aromatic.',
    price: 22.00,
    image: '/images/hero-beans.png',
    origin: 'Yirgacheffe, Ethiopia',
    roastLevel: 'Light',
    tastingNotes: ['Jasmine', 'Lemon Zest', 'Bergamot'],
    featured: true,
    available: true
  },
  {
    _id: '4',
    name: 'Double Espresso',
    slug: 'double-espresso',
    category: 'espresso',
    description: 'The heart of our craft. Two shots of our signature house blend with a thick, honeyed crema.',
    longDescription: 'Our Double Espresso is the foundation upon which our entire menu is built. Extracted at precisely 9 bars of pressure through our hand-calibrated La Marzocca machines, each shot delivers 25ml of pure, concentrated coffee perfection.',
    price: 4.50,
    image: '/images/espresso.png',
    origin: 'Brazil & Colombia Blend',
    roastLevel: 'Medium-Dark',
    tastingNotes: ['Honey', 'Dark Chocolate', 'Walnut'],
    featured: false,
    available: true
  },
  {
    _id: '5',
    name: 'Signature Gold Latte',
    slug: 'signature-gold-latte',
    category: 'latte',
    description: 'Our house-specialty double espresso infused with honey, Madagascar vanilla, and topped with edible 24k gold.',
    longDescription: 'The crown jewel of our beverage program. This extraordinary creation begins with a double shot of our signature espresso, infused with raw acacia honey and genuine Madagascar vanilla bean. It is then crowned with hand-poured latte art and a delicate shimmer of edible 24-karat gold leaf.',
    price: 12.00,
    image: '/images/latte.png',
    origin: 'House Blend',
    roastLevel: 'Medium',
    tastingNotes: ['Vanilla', 'Honey', 'Gold Leaf'],
    featured: true,
    available: true
  },
  {
    _id: '6',
    name: 'Cold Brew Concierge',
    slug: 'cold-brew-concierge',
    category: 'cold-brew',
    description: 'Steeped for 18 hours in filtered cold water. Low acidity with a natural chocolate finish.',
    longDescription: 'Our Cold Brew Concierge is patience in a glass. A proprietary blend of three single-origin beans is coarsely ground and steeped for a precise 18-hour window in triple-filtered cold water. The result is a remarkably smooth, low-acid coffee with layers of natural chocolate and stone fruit.',
    price: 7.50,
    image: '/images/cold-brew.png',
    origin: 'Guatemala & Ethiopia Blend',
    roastLevel: 'Medium',
    tastingNotes: ['Chocolate', 'Stone Fruit', 'Smooth'],
    featured: false,
    available: true
  },
  {
    _id: '7',
    name: 'Midnight Velvet',
    slug: 'midnight-velvet',
    category: 'roast',
    description: 'Indulgent notes of dark chocolate and toasted walnut with a smooth, heavy body.',
    longDescription: 'Midnight Velvet is our darkest, most indulgent roast profile. Selected from premium Brazilian Cerrado beans, this roast is taken to the edge of second crack, where the oils emerge to create a glossy, rich surface that promises deep, resonant flavors.',
    price: 19.00,
    image: '/images/beans-bag.png',
    origin: 'Cerrado, Brazil',
    roastLevel: 'Dark',
    tastingNotes: ['Dark Chocolate', 'Toasted Walnut', 'Smoke'],
    featured: true,
    available: true
  },
  {
    _id: '8',
    name: 'Vesuvius Dark',
    slug: 'vesuvius-dark',
    category: 'roast',
    description: 'A bold, smoky profile with deep molasses sweetness and a lingering volcanic finish.',
    longDescription: 'Named after the legendary Italian volcano, our Vesuvius Dark is a force of nature in a cup. This Italian-style roast takes premium Robusta-Arabica blend to their absolute limit, producing an intensely smoky, full-bodied coffee with the strength to cut through any milk.',
    price: 20.00,
    image: '/images/espresso.png',
    origin: 'Italian Blend',
    roastLevel: 'Extra Dark',
    tastingNotes: ['Molasses', 'Smoke', 'Volcanic Ash'],
    featured: true,
    available: true
  },
  {
    _id: '9',
    name: 'Oat Milk Latte',
    slug: 'oat-milk-latte',
    category: 'latte',
    description: 'Creamy, gluten-free oat milk paired with our rich espresso. Naturally sweet and satisfying.',
    longDescription: 'Our Oat Milk Latte is a testament to the fact that dairy-free doesn\'t mean flavor-free. We use a specially formulated barista-grade oat milk that steams to a micro-foam as velvety as any traditional milk, creating a naturally sweet and satisfying latte experience.',
    price: 6.50,
    image: '/images/latte.png',
    origin: 'House Blend',
    roastLevel: 'Medium',
    tastingNotes: ['Oat', 'Caramel', 'Vanilla'],
    featured: false,
    available: true
  }
];

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    if (products.length === 0) {
      return res.json(fallbackProducts);
    }
    res.json(products);
  } catch (error) {
    // Fallback if MongoDB is not connected
    res.json(fallbackProducts);
  }
});

// GET featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true, available: true });
    if (products.length === 0) {
      return res.json(fallbackProducts.filter(p => p.featured));
    }
    res.json(products);
  } catch (error) {
    res.json(fallbackProducts.filter(p => p.featured));
  }
});

// GET single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      const fallback = fallbackProducts.find(p => p.slug === req.params.slug);
      if (fallback) return res.json(fallback);
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    const fallback = fallbackProducts.find(p => p.slug === req.params.slug);
    if (fallback) return res.json(fallback);
    res.status(500).json({ message: error.message });
  }
});

export default router;
