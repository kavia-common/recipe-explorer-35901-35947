//
// Mock dataset and filtering utilities for Recipe Explorer
// Provides deterministic results to power UI during development.
//

import { normalizeString, containsAny } from '../utils/format';

// Internal seeded dataset (min 20 recipes)
const RECIPES = [
  {
    id: 'r-001',
    name: 'Classic Spaghetti Bolognese',
    cuisine: 'Italian',
    description: 'Rich tomato and beef sauce served over spaghetti.',
    ingredients: ['spaghetti', 'ground beef', 'tomato', 'onion', 'garlic', 'olive oil'],
    timeMinutes: 40,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-002',
    name: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    description: 'Creamy tomato-based curry with marinated chicken.',
    ingredients: ['chicken', 'yogurt', 'garam masala', 'tomato', 'cream', 'ginger', 'garlic'],
    timeMinutes: 55,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1604909052691-5d7b4c7adb1b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-003',
    name: 'Beef Tacos',
    cuisine: 'Mexican',
    description: 'Crispy tacos filled with seasoned beef and fresh toppings.',
    ingredients: ['tortillas', 'ground beef', 'onion', 'tomato', 'lettuce', 'cheddar', 'cumin'],
    timeMinutes: 25,
    servings: 3,
    image: 'https://images.unsplash.com/photo-1604467731413-2c3c79a0c145?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-004',
    name: 'Sushi Bowl',
    cuisine: 'Japanese',
    description: 'Deconstructed sushi with rice, salmon, avocado, and seaweed.',
    ingredients: ['sushi rice', 'salmon', 'avocado', 'soy sauce', 'nori', 'sesame'],
    timeMinutes: 30,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-005',
    name: 'Pad Thai',
    cuisine: 'Thai',
    description: 'Stir-fried rice noodles with shrimp, peanuts, and tamarind sauce.',
    ingredients: ['rice noodles', 'shrimp', 'egg', 'peanuts', 'bean sprouts', 'tamarind', 'fish sauce'],
    timeMinutes: 35,
    servings: 3,
    image: 'https://images.unsplash.com/photo-1625944527978-96399ceb859b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-006',
    name: 'Margherita Pizza',
    cuisine: 'Italian',
    description: 'Simple pizza with tomatoes, mozzarella, and basil.',
    ingredients: ['pizza dough', 'tomato', 'mozzarella', 'basil', 'olive oil'],
    timeMinutes: 20,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-007',
    name: 'Falafel Wrap',
    cuisine: 'Middle Eastern',
    description: 'Crispy chickpea patties wrapped with tahini and salad.',
    ingredients: ['chickpeas', 'tahini', 'garlic', 'cumin', 'parsley', 'pita', 'lettuce', 'tomato'],
    timeMinutes: 30,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1604908812226-c0e6f2cae3aa?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-008',
    name: 'Greek Salad',
    cuisine: 'Greek',
    description: 'Fresh salad with cucumber, tomato, olives, and feta.',
    ingredients: ['cucumber', 'tomato', 'red onion', 'olives', 'feta', 'olive oil', 'oregano'],
    timeMinutes: 10,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-009',
    name: 'Shakshuka',
    cuisine: 'Middle Eastern',
    description: 'Eggs poached in spiced tomato and pepper sauce.',
    ingredients: ['eggs', 'tomato', 'bell pepper', 'onion', 'cumin', 'paprika'],
    timeMinutes: 25,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1617195737498-98d9f96e65e8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-010',
    name: 'Avocado Toast with Poached Egg',
    cuisine: 'American',
    description: 'Toasted sourdough with creamy avocado and runny egg.',
    ingredients: ['bread', 'avocado', 'egg', 'lemon', 'chili flakes'],
    timeMinutes: 12,
    servings: 1,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-011',
    name: 'Pho Ga (Chicken Pho)',
    cuisine: 'Vietnamese',
    description: 'Fragrant chicken noodle soup with herbs.',
    ingredients: ['chicken', 'rice noodles', 'ginger', 'star anise', 'clove', 'fish sauce'],
    timeMinutes: 60,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-012',
    name: 'Bibimbap',
    cuisine: 'Korean',
    description: 'Mixed rice bowl with assorted vegetables and gochujang.',
    ingredients: ['rice', 'spinach', 'carrot', 'zucchini', 'egg', 'gochujang', 'sesame oil'],
    timeMinutes: 35,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1514517220037-300dbf3f0b86?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-013',
    name: 'Fish and Chips',
    cuisine: 'British',
    description: 'Crispy battered fish with golden fries.',
    ingredients: ['white fish', 'flour', 'beer', 'potato', 'oil', 'salt', 'vinegar'],
    timeMinutes: 30,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1523795483797-5f2e1b11d7b8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-014',
    name: 'Quinoa Buddha Bowl',
    cuisine: 'Fusion',
    description: 'Wholesome bowl with quinoa, roasted veggies, and tahini dressing.',
    ingredients: ['quinoa', 'sweet potato', 'broccoli', 'chickpeas', 'tahini', 'lemon'],
    timeMinutes: 30,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-015',
    name: 'Pancakes with Berries',
    cuisine: 'American',
    description: 'Fluffy pancakes topped with fresh berries and maple syrup.',
    ingredients: ['flour', 'milk', 'egg', 'baking powder', 'butter', 'maple syrup', 'berries'],
    timeMinutes: 20,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-016',
    name: 'Caprese Salad',
    cuisine: 'Italian',
    description: 'Tomato, mozzarella, and basil with balsamic glaze.',
    ingredients: ['tomato', 'mozzarella', 'basil', 'balsamic', 'olive oil'],
    timeMinutes: 8,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1568051243850-0cf9d1d7a1a6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-017',
    name: 'Ramen with Pork Belly',
    cuisine: 'Japanese',
    description: 'Comforting ramen with rich broth and chashu.',
    ingredients: ['ramen noodles', 'pork belly', 'soy sauce', 'mirin', 'egg', 'scallions'],
    timeMinutes: 90,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1604908176997-4318a54398f1?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-018',
    name: 'Ceviche',
    cuisine: 'Peruvian',
    description: 'Citrus-cured fish with red onion and cilantro.',
    ingredients: ['white fish', 'lime', 'red onion', 'cilantro', 'chili'],
    timeMinutes: 20,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1625944528104-e2b0a93d91c4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-019',
    name: 'Hummus and Veggie Platter',
    cuisine: 'Middle Eastern',
    description: 'Creamy hummus served with crisp vegetables and pita.',
    ingredients: ['chickpeas', 'tahini', 'lemon', 'garlic', 'olive oil', 'pita', 'carrot', 'cucumber'],
    timeMinutes: 15,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-020',
    name: 'Stir-Fry Vegetables with Tofu',
    cuisine: 'Chinese',
    description: 'Quick stir-fry with tofu and seasonal vegetables.',
    ingredients: ['tofu', 'broccoli', 'bell pepper', 'soy sauce', 'garlic', 'ginger'],
    timeMinutes: 15,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1615937691196-00b3c62b9c30?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r-021',
    name: 'Paella',
    cuisine: 'Spanish',
    description: 'Traditional rice dish with saffron, seafood, and chorizo.',
    ingredients: ['rice', 'saffron', 'shrimp', 'mussels', 'chorizo', 'peas'],
    timeMinutes: 60,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
  },
];

// Basic paging config for mock responses
const PAGE_SIZE = 9;

// PUBLIC_INTERFACE
export async function mockListRecipes({ q, cuisine, ingredients, page = 1, signal } = {}) {
  // Simulate async delay and respect abort signal
  await delay(150, signal);

  // Normalize filters
  const nQ = normalizeString(q || '');
  const nCuisine = normalizeString(cuisine || '');
  const nIngs = Array.isArray(ingredients) ? ingredients.map(normalizeString).filter(Boolean) : [];

  // Filter pipeline
  let results = RECIPES.filter((r) => {
    const name = normalizeString(r.name);
    const desc = normalizeString(r.description);
    const cuis = normalizeString(r.cuisine);
    const ings = r.ingredients.map(normalizeString);

    // Text search
    const matchQ = nQ ? name.includes(nQ) || desc.includes(nQ) || cuis.includes(nQ) || containsAny(ings, [nQ]) : true;
    // Cuisine filter
    const matchCuisine = nCuisine ? cuis === nCuisine : true;
    // Ingredients filter (any ingredient present)
    const matchIngs = nIngs.length ? containsAny(ings, nIngs) : true;

    return matchQ && matchCuisine && matchIngs;
  });

  const total = results.length;
  const start = (Math.max(1, page) - 1) * PAGE_SIZE;
  const items = results.slice(start, start + PAGE_SIZE);

  return {
    items,
    page: Math.max(1, page),
    pageSize: PAGE_SIZE,
    total,
  };
}

// PUBLIC_INTERFACE
export async function mockGetRecipeById(id, signal) {
  await delay(120, signal);
  const item = RECIPES.find((r) => r.id === String(id));
  if (!item) {
    const err = new Error('Recipe not found');
    err.code = 'NOT_FOUND';
    throw err;
  }
  return item;
}

// Small helper to simulate network delay with abort support
function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    if (signal) {
      if (signal.aborted) {
        clearTimeout(t);
        reject(new DOMException('Aborted', 'AbortError'));
        return;
      }
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(t);
          reject(new DOMException('Aborted', 'AbortError'));
        },
        { once: true }
      );
    }
  });
}

// PUBLIC_INTERFACE
export function getAllCuisines() {
  // Return unique cuisines for filter UIs
  return Array.from(new Set(RECIPES.map((r) => r.cuisine))).sort();
}

// PUBLIC_INTERFACE
export function getAllIngredients() {
  const set = new Set();
  RECIPES.forEach((r) => r.ingredients.forEach((i) => set.add(i)));
  return Array.from(set).sort();
}

export { RECIPES as __RECIPES_SEEDED__ };
