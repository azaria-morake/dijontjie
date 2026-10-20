/**
 * Dijontjie Agent API Client & Mock Service
 * 
 * Prepares the frontend contract for the FastAPI/Groq Python backend (Milestone 1).
 * When backend is connected, toggle USE_MOCK to false or provide VITE_API_URL.
 */

export const USE_MOCK = true;
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

// Caching and mock knowledge base drawn from brief.md
export const RECIPES_DB = {
  bobotie: {
    id: "bobotie",
    name: "Cape Malay Bobotie",
    category: "Heritage Classics",
    baseServings: 6,
    prepTime: "30 minutes",
    cookTime: "45 minutes",
    calories: "520 kcal",
    difficulty: "Medium",
    heroImage: "/assets/recipe_hero_bobotie.png",
    cardImage: "/assets/sugg_bobotie.png",
    summary: "Fragrant spiced minced beef baked under a savory golden egg custard with bay leaves and sultanas. A cornerstone of Cape Malay culinary heritage.",
    ingredients: [
      { id: "ing-1", name: "Lean minced beef (or lamb mix)", baseQty: 1000, unit: "g", estPrice: 109.99 },
      { id: "ing-2", name: "Thick slices white bread, soaked in milk", baseQty: 2, unit: "slices", estPrice: 19.99 },
      { id: "ing-3", name: "Medium onions, finely diced", baseQty: 2, unit: "units", estPrice: 16.99 },
      { id: "ing-4", name: "Mild Cape curry powder", baseQty: 2, unit: "tbsp", estPrice: 24.99 },
      { id: "ing-5", name: "Ground turmeric", baseQty: 1, unit: "tsp", estPrice: 14.99 },
      { id: "ing-6", name: "Mrs Ball's chutney (or apricot jam)", baseQty: 2, unit: "tbsp", estPrice: 42.99 },
      { id: "ing-7", name: "Seedless raisins or sultanas", baseQty: 0.5, unit: "cup", estPrice: 28.99 },
      { id: "ing-8", name: "Fresh bay leaves (or lemon leaves)", baseQty: 3, unit: "leaves", estPrice: 12.99 },
      { id: "ing-9", name: "Large farm eggs (for custard)", baseQty: 2, unit: "eggs", estPrice: 20.00 },
      { id: "ing-10", name: "Full cream milk (for custard topping)", baseQty: 180, unit: "ml", estPrice: 18.99 },
      { id: "ing-11", name: "Salt and freshly cracked black pepper", baseQty: 1, unit: "tsp", estPrice: 9.99 }
    ],
    instructions: [
      { step: 1, text: "Preheat oven to 180°C (350°F). Lightly grease a medium baking dish.", durationMin: 5 },
      { step: 2, text: "Soak the bread slices in milk, then squeeze out the excess milk and set the leftover milk aside for the custard topping.", durationMin: 5 },
      { step: 3, text: "In a heavy skillet, sauté onions in butter or oil until soft and golden. Stir in curry powder and turmeric; fry for 1 minute until aromatic.", durationMin: 7 },
      { step: 4, text: "Add minced beef, browning lightly. Mash the squeezed bread into the meat along with chutney, raisins, and seasoning.", durationMin: 10 },
      { step: 5, text: "Transfer the beef mixture into the prepared dish. Press down firmly and arrange bay leaves across the top. Bake for 25 minutes.", durationMin: 25 },
      { step: 6, text: "Whisk the eggs with the reserved milk. Pour evenly over the hot meat. Return to the oven for 20 minutes until the custard layer is golden and puffed.", durationMin: 20 }
    ],
    pairing: "Serve with warm yellow geelrys (yellow rice with raisins) and extra Mrs Ball's chutney."
  },
  chakalaka: {
    id: "chakalaka",
    name: "Spicy Chakalaka with Pap & Wors",
    category: "Sides & Relishes",
    baseServings: 4,
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    calories: "380 kcal",
    difficulty: "Easy",
    heroImage: "/assets/sugg_chakalaka.png",
    cardImage: "/assets/sugg_chakalaka.png",
    summary: "The quintessential Mzansi braai side: grated carrots, peppers, baked beans, garlic, and curry spices, paired with fluffy stiff pap and boerewors.",
    ingredients: [
      { id: "chk-1", name: "Grated fresh carrots", baseQty: 3, unit: "large", estPrice: 16.99 },
      { id: "chk-2", name: "Can Koo baked beans in tomato sauce", baseQty: 1, unit: "can (410g)", estPrice: 18.99 },
      { id: "chk-3", name: "Medium onion, chopped", baseQty: 1, unit: "unit", estPrice: 8.99 },
      { id: "chk-4", name: "Bell peppers (red and green), diced", baseQty: 2, unit: "units", estPrice: 22.99 },
      { id: "chk-5", name: "Hot curry powder or Raja curry spice", baseQty: 1.5, unit: "tbsp", estPrice: 19.99 },
      { id: "chk-6", name: "Fresh garlic and grated ginger", baseQty: 1, unit: "tbsp", estPrice: 12.99 },
      { id: "chk-7", name: "Chopped fresh chili", baseQty: 1, unit: "unit", estPrice: 6.99 }
    ],
    instructions: [
      { step: 1, text: "Heat 2 tablespoons of oil in a pot over medium heat.", durationMin: 3 },
      { step: 2, text: "Add onions, garlic, ginger, and peppers. Cook until onions are soft.", durationMin: 6 },
      { step: 3, text: "Stir in curry powder and chili. Bloom the spices for 1 minute.", durationMin: 2 },
      { step: 4, text: "Add grated carrots and stir well. Cook for 5 minutes until tender-crisp.", durationMin: 5 },
      { step: 5, text: "Fold in the baked beans. Simmer for 10 minutes on low heat. Serve warm or chilled with braai meat.", durationMin: 10 }
    ],
    pairing: "Perfect partner for hot stiff pap (phutu) and coiled boerewors straight off the braai grid."
  },
  braai_plate: {
    id: "braai_plate",
    name: "Mzansi Heritage Braai Feast",
    category: "Braai & Meats",
    baseServings: 6,
    prepTime: "30 minutes",
    cookTime: "40 minutes",
    calories: "780 kcal",
    difficulty: "Master",
    heroImage: "/assets/recipe_braai_plate.png",
    cardImage: "/assets/recipe_braai_plate.png",
    summary: "Tender Karoo lamb chops, coiled farmer's boerewors, marinated ribeye steak, braaibroodjies, and herb-roasted baby potatoes over hot sekelbos coals.",
    ingredients: [
      { id: "br-1", name: "Authentic butcher's boerewors coil", baseQty: 800, unit: "g", estPrice: 89.99 },
      { id: "br-2", name: "Karoo lamb loin chops", baseQty: 6, unit: "chops", estPrice: 139.99 },
      { id: "br-3", name: "Aged rump or ribeye steak", baseQty: 600, unit: "g", estPrice: 119.99 },
      { id: "br-4", name: "Dijontjie Signature Braai Spice blend", baseQty: 2, unit: "tbsp", estPrice: 34.99 },
      { id: "br-5", name: "Sweet mielies (corn on the cob)", baseQty: 6, unit: "cobs", estPrice: 39.99 },
      { id: "br-6", name: "Braaibroodjies (cheese, tomato, onion & chutney)", baseQty: 6, unit: "sandwiches", estPrice: 48.99 }
    ],
    instructions: [
      { step: 1, text: "Prepare a medium-hot braai fire using hardwood charcoal or sekelbos. Wait until coals develop white ash.", durationMin: 30 },
      { step: 2, text: "Season lamb chops and steaks generously with Dijontjie Braai Spice. Keep meat at room temperature before grilling.", durationMin: 15 },
      { step: 3, text: "Braai boerewors gently over medium coals, turning once or twice to preserve juices. Avoid piercing the casing.", durationMin: 15 },
      { step: 4, text: "Sear steaks over high heat for 3-4 minutes per side for medium-rare; grill lamb chops until fat caps are crispy.", durationMin: 10 },
      { step: 5, text: "Toast braaibroodjies over gentle residual coals until golden brown and cheese is meltingly gooey.", durationMin: 8 }
    ],
    pairing: "Enjoy with chilled ginger beer, ice-cold Castle Lager, or rooibos iced tea."
  },
  malva_pudding: {
    id: "malva_pudding",
    name: "Golden Malva Pudding",
    category: "Desserts",
    baseServings: 6,
    prepTime: "20 minutes",
    cookTime: "40 minutes",
    calories: "450 kcal",
    difficulty: "Easy",
    heroImage: "/assets/recipe_malva_pudding.png",
    cardImage: "/assets/recipe_malva_pudding.png",
    summary: "Traditional caramelized apricot jam pudding drenched immediately upon baking in a rich, warm butter cream sauce. Best served with homemade vanilla custard.",
    ingredients: [
      { id: "mv-1", name: "White sugar", baseQty: 1, unit: "cup", estPrice: 22.99 },
      { id: "mv-2", name: "Large farm eggs", baseQty: 2, unit: "eggs", estPrice: 20.00 },
      { id: "mv-3", name: "Smooth apricot jam", baseQty: 2, unit: "tbsp", estPrice: 26.99 },
      { id: "mv-4", name: "Cake flour", baseQty: 1, unit: "cup", estPrice: 18.99 },
      { id: "mv-5", name: "Bicarbonate of soda & butter", baseQty: 1, unit: "tsp", estPrice: 12.99 },
      { id: "mv-6", name: "Heavy fresh cream (for hot sauce)", baseQty: 250, unit: "ml", estPrice: 32.99 },
      { id: "mv-7", name: "Butter & boiling water", baseQty: 100, unit: "g", estPrice: 24.99 }
    ],
    instructions: [
      { step: 1, text: "Beat sugar and eggs until pale and fluffy, then beat in the apricot jam.", durationMin: 5 },
      { step: 2, text: "Fold in sifted flour, salt, and dissolved bicarbonate of soda in milk.", durationMin: 5 },
      { step: 3, text: "Pour into greased baking dish and bake at 180°C for 35-40 minutes until skewer comes out clean.", durationMin: 40 },
      { step: 4, text: "While baking, melt cream, butter, sugar, and water in a saucepan over medium heat.", durationMin: 8 },
      { step: 5, text: "Pour hot sauce slowly over pudding as soon as it emerges from the oven. Allow sauce to soak in deeply.", durationMin: 10 }
    ],
    pairing: "Serve steaming hot with thick yellow custard or vanilla bean ice cream."
  }
};

/**
 * Deterministic Recipe Scaling Tool (matches backend specification in brief.md)
 */
export function scaleRecipe(recipe, targetServings) {
  const ratio = targetServings / recipe.baseServings;
  const scaledIngredients = recipe.ingredients.map(ing => {
    let scaledQty = ing.baseQty * ratio;
    // Round to 1 decimal place if decimal, or integer if close
    scaledQty = Math.round(scaledQty * 10) / 10;
    return {
      ...ing,
      scaledQty,
      scaledPrice: Math.round(ing.estPrice * ratio * 100) / 100
    };
  });

  const totalEstPrice = scaledIngredients.reduce((sum, item) => sum + item.scaledPrice, 0);

  return {
    ...recipe,
    targetServings,
    ratio,
    ingredients: scaledIngredients,
    estimatedTotalZar: Math.round(totalEstPrice * 100) / 100
  };
}

/**
 * Agent Turn Simulation / FastAPI contract
 */
export async function sendAgentTurn(message, conversationHistory = []) {
  if (!USE_MOCK) {
    // Real call to Python FastAPI backend
    const res = await fetch(`${API_BASE_URL}/agent/turns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: conversationHistory })
    });
    return await res.json();
  }

  // Realistic mock delay (400ms)
  await new Promise(resolve => setTimeout(resolve, 400));

  const text = message.toLowerCase();

  // 1. Bobotie query
  if (text.includes("bobotie")) {
    return {
      reply: "Great choice! It's one of my favorites. Here is a classic recipe.",
      recipeCard: {
        recipeId: "bobotie",
        title: "Cape Malay Bobotie",
        prepTime: "30 minutes",
        cookTime: "45 minutes",
        ingredientsSnippet: [
          "Minced beef, onions, spices...",
          "Curry powder, turmeric, apricot jam...",
          "Milk-soaked bread, raisins, almonds...",
          "Egg custard topping, bay leaves..."
        ],
        followUpPrompt: "Would you like the step-by-step instructions?"
      },
      chips: ["Yes, please!", "No, thanks.", "Scale for 12 guests", "Generate Shopping List"]
    };
  }

  // 2. Chakalaka query
  if (text.includes("chakalaka")) {
    return {
      reply: "Chakalaka is the life of any braai! Spicy, vibrant, and packed with grated carrots, beans, and aromatics.",
      recipeCard: {
        recipeId: "chakalaka",
        title: "Spicy Chakalaka with Pap & Wors",
        prepTime: "20 minutes",
        cookTime: "30 minutes",
        ingredientsSnippet: [
          "Grated carrots, Koo baked beans...",
          "Curry powder, garlic & ginger...",
          "Red and green bell peppers...",
          "Pairs with boerewors and stiff pap."
        ],
        followUpPrompt: "Would you like me to scale the ingredients for your group?"
      },
      chips: ["Scale for 12 people", "Show full recipe", "What pap ratio do I need?"]
    };
  }

  // 3. Braai planning query
  if (text.includes("braai") || text.includes("guests") || text.includes("people")) {
    return {
      reply: "A lekker braai is all about preparation! For a proper gathering, I calculate 350g meat per adult, braaibroodjies, fresh chakalaka, and sekelbos coals.",
      recipeCard: {
        recipeId: "braai_plate",
        title: "Mzansi Heritage Braai Feast",
        prepTime: "30 minutes",
        cookTime: "40 minutes",
        ingredientsSnippet: [
          "Farmer's boerewors coil...",
          "Karoo lamb loin chops...",
          "Ribeye steak with Dijontjie Braai Spice...",
          "Braaibroodjies & sweet mielies..."
        ],
        followUpPrompt: "Shall I calculate the total grocery basket cost in South African Rands (ZAR)?"
      },
      chips: ["Yes, show grocery basket", "Scale for 15 guests", "Add Malva Pudding for dessert"]
    };
  }

  // 4. Instructions approval ("Yes, please!")
  if (text.includes("yes") || text.includes("instruction") || text.includes("step")) {
    return {
      reply: "Here you go! Cape Malay Bobotie is best cooked in two phases: simmering the fragrant spiced mince first, then baking until the savory egg custard forms a golden crown.",
      actionPrompt: "Tap 'View Full Recipe' or switch to the Recipe tab to activate Step-by-Step Cooking Mode with audio cues and timers!",
      chips: ["View Full Recipe", "Scale for 10 people", "Add to Shopping List"]
    };
  }

  // 5. Default conversational fallback
  return {
    reply: "My name is Dijontjie, and my goal is to single-handedly feed the RN! Tell me what you're craving—from Bobotie and Chakalaka to planning a weekend Braai for 20 guests.",
    chips: ["Cape Malay Bobotie", "Braai Planner for 12", "Easy Chakalaka", "Malva Pudding"]
  };
}
