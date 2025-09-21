import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d9e497a1/health", (c) => {
  return c.json({ status: "ok" });
});

// Products endpoints
app.post("/make-server-d9e497a1/products", async (c) => {
  try {
    const productData = await c.req.json();
    const productId = `product_${Date.now()}`;
    
    await kv.set(productId, {
      ...productData,
      id: productId,
      createdAt: new Date().toISOString(),
      status: 'active',
      views: 0
    });
    
    return c.json({ success: true, productId });
  } catch (error) {
    console.log('Error creating product:', error);
    return c.json({ error: 'Failed to create product' }, 500);
  }
});

app.get("/make-server-d9e497a1/products", async (c) => {
  try {
    const products = await kv.getByPrefix('product_');
    return c.json({ products });
  } catch (error) {
    console.log('Error fetching products:', error);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// Analytics endpoints
app.get("/make-server-d9e497a1/analytics", async (c) => {
  try {
    // Generate sample analytics data
    const analyticsData = {
      reach: [
        { name: 'Mon', reach: 1200, clicks: 45, sales: 3 },
        { name: 'Tue', reach: 1800, clicks: 62, sales: 5 },
        { name: 'Wed', reach: 2200, clicks: 78, sales: 8 },
        { name: 'Thu', reach: 1900, clicks: 55, sales: 4 },
        { name: 'Fri', reach: 2800, clicks: 95, sales: 12 },
        { name: 'Sat', reach: 3200, clicks: 120, sales: 15 },
        { name: 'Sun', reach: 2600, clicks: 85, sales: 9 }
      ],
      stats: {
        totalReach: '15.8K',
        totalClicks: '540',
        totalSales: '56',
        engagement: '7.2%'
      }
    };
    
    return c.json(analyticsData);
  } catch (error) {
    console.log('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Ad campaigns endpoints
app.post("/make-server-d9e497a1/ads/generate", async (c) => {
  try {
    const { product, hashtags, customCaption } = await c.req.json();
    
    if (!product) {
      return c.json({ error: 'Product is required for ad generation' }, 400);
    }
    
    // Generate contextual ads based on the selected product
    const generatedAds = [
      {
        id: 1,
        type: 'poster',
        image: product.images[0] || 'https://images.unsplash.com/photo-1567366865504-ffd4cc9ce7bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBhaW50JTIwYnJ1c2hlcyUyMGFydHxlbnwxfHx8fDE3NTc4MzExMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: customCaption || `🎨 "${product.title}" - ${product.description.slice(0, 100)}... ✨ Perfect for art lovers! Available for ${product.price} ${hashtags}`,
        hashtags: hashtags.split(' ').filter((tag: string) => tag.startsWith('#')),
        price: product.price,
        productId: product.id
      },
      {
        id: 2,
        type: 'story',
        image: product.images[0] || 'https://images.unsplash.com/photo-1646846565807-61fd42034c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwYXJ0d29yayUyMGRpc3BsYXl8ZW58MXx8fHwxNzU3ODMxMTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: customCaption || `Behind every masterpiece is a story 📖 "${product.title}" captures ${product.description.slice(0, 80)}... Available now for ${product.price} ${hashtags}`,
        hashtags: hashtags.split(' ').filter((tag: string) => tag.startsWith('#')),
        price: product.price,
        productId: product.id
      }
    ];
    
    return c.json({ ads: generatedAds });
  } catch (error) {
    console.log('Error generating ads:', error);
    return c.json({ error: 'Failed to generate ads' }, 500);
  }
});

app.post("/make-server-d9e497a1/ads/run", async (c) => {
  try {
    const { adId, platforms } = await c.req.json();
    
    // Here you would integrate with social media APIs
    // For now, we'll simulate the process
    const campaignId = `campaign_${Date.now()}`;
    
    await kv.set(campaignId, {
      adId,
      platforms,
      status: 'active',
      startDate: new Date().toISOString(),
      reach: 0,
      clicks: 0,
      engagement: 0
    });
    
    return c.json({ 
      success: true, 
      campaignId,
      message: 'Ad campaign started successfully! Connect your social media accounts in settings to run live campaigns.'
    });
  } catch (error) {
    console.log('Error running ad:', error);
    return c.json({ error: 'Failed to run ad campaign' }, 500);
  }
});

// Profile endpoints
app.get("/make-server-d9e497a1/profile", async (c) => {
  try {
    const profile = await kv.get('user_profile') || {
      name: 'Artist Name',
      email: 'artist@example.com',
      bio: 'Passionate artist creating beautiful works.',
      socialConnections: {}
    };
    
    return c.json({ profile });
  } catch (error) {
    console.log('Error fetching profile:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

app.post("/make-server-d9e497a1/profile", async (c) => {
  try {
    const profileData = await c.req.json();
    
    await kv.set('user_profile', {
      ...profileData,
      updatedAt: new Date().toISOString()
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error updating profile:', error);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
});

Deno.serve(app.fetch);