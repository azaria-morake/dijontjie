import React, { useState } from 'react';
import { 
  MessageSquare, BookOpen, ThumbsUp, Flame, Sparkles, Clock, 
  Users, ChevronRight, X, Minus, Plus, ExternalLink, ArrowRight,
  ShoppingBag, ShieldCheck, Heart, Share2, Smartphone, Download
} from 'lucide-react';

// South African Culinary Data drawn directly from brief.md
const RECIPES_DATA = [
  {
    id: "braai-plate",
    title: "Braai plate",
    shortDesc: "Braai plate. Your plate: cooking places the heart of South Africa.",
    fullDesc: "Flame-grilled Karoo lamb chops, authentic butcher's boerewors coil, matured rump steak seared over red-hot sekelbos coals, served with toasted braaibroodjies and sweet mielies.",
    category: "Braai & Meats",
    image: "/assets/recipe_braai_plate.png",
    prepTime: "25 mins",
    cookTime: "40 mins",
    baseServings: 6,
    calories: "780 kcal",
    ingredients: [
      { name: "Artisanal boerewors coil", baseQty: 800, unit: "g", estPrice: 89.99 },
      { name: "Karoo lamb loin chops", baseQty: 6, unit: "chops", estPrice: 139.99 },
      { name: "Aged rump steak (medium-rare)", baseQty: 600, unit: "g", estPrice: 119.99 },
      { name: "Dijontjie Signature Braai Spice blend", baseQty: 2, unit: "tbsp", estPrice: 34.99 },
      { name: "Braaibroodjies (cheese, tomato, onion, chutney)", baseQty: 6, unit: "sandwiches", estPrice: 48.99 },
      { name: "Sweet mielies (corn on the cob) with salted butter", baseQty: 6, unit: "cobs", estPrice: 39.99 }
    ],
    steps: [
      "Light a medium-hot braai fire using hardwood charcoal or dry sekelbos. Wait for white ash on the coals.",
      "Rub lamb chops and steak with olive oil and Dijontjie Braai Spice. Allow meat to come to room temperature.",
      "Place boerewors on the braai grid over moderate coals. Grill gently for 15 minutes, turning occasionally without puncturing casing.",
      "Sear steaks over high heat for 3-4 minutes per side; braai lamb chops until golden and fat is crisped.",
      "Toast braaibroodjies over residual gentle coals until bread is crisp and gouda cheese is fully melted."
    ]
  },
  {
    id: "malva-pudding",
    title: "Malva Pudding",
    shortDesc: "Instant, authentic recipes and cooking tips from the heart of South Africa.",
    fullDesc: "A beloved South African classic: spongy caramelized cake with smooth apricot jam, drenched hot from the oven in an indulgent warm butter and cream sauce, served alongside velvety custard.",
    category: "Desserts",
    image: "/assets/recipe_malva_pudding.png",
    prepTime: "20 mins",
    cookTime: "40 mins",
    baseServings: 6,
    calories: "450 kcal",
    ingredients: [
      { name: "White granulated sugar", baseQty: 1, unit: "cup", estPrice: 22.99 },
      { name: "Farm fresh eggs", baseQty: 2, unit: "eggs", estPrice: 20.00 },
      { name: "Smooth apricot jam", baseQty: 2, unit: "tbsp", estPrice: 26.99 },
      { name: "Cake flour, sifted", baseQty: 1, unit: "cup", estPrice: 18.99 },
      { name: "Bicarbonate of soda dissolved in milk", baseQty: 1, unit: "tsp", estPrice: 12.99 },
      { name: "Fresh dairy whipping cream", baseQty: 250, unit: "ml", estPrice: 32.99 },
      { name: "Salted butter (for warm soaking sauce)", baseQty: 100, unit: "g", estPrice: 24.99 }
    ],
    steps: [
      "Preheat oven to 180°C. Grease an ovenproof baking dish.",
      "Beat sugar and eggs until pale and thick, then beat in smooth apricot jam.",
      "Fold in sifted flour, a pinch of salt, and milk with dissolved bicarbonate of soda.",
      "Bake for 35-40 minutes until deeply golden brown and a tester comes out clean.",
      "Melt cream, butter, sugar, and boiling water in a saucepan over medium heat.",
      "Pour hot syrup all over the baked pudding immediately upon removing from oven. Let it soak deeply."
    ]
  },
  {
    id: "bobotie",
    title: "Bobotie",
    shortDesc: "Bobotie Malva Pudding and cooking tips from the heart of South Africa.",
    fullDesc: "Cape Malay Bobotie featuring gently spiced minced beef with turmeric, mild curry, fruit chutney, and sultanas, baked beneath a smooth egg-custard topping and aromatic bay leaves.",
    category: "Heritage Classics",
    image: "/assets/recipe_bobotie.png",
    prepTime: "30 mins",
    cookTime: "45 mins",
    baseServings: 6,
    calories: "520 kcal",
    ingredients: [
      { name: "Lean minced beef (or beef & lamb blend)", baseQty: 1000, unit: "g", estPrice: 109.99 },
      { name: "Thick white bread slices soaked in milk", baseQty: 2, unit: "slices", estPrice: 19.99 },
      { name: "Medium onions, finely diced", baseQty: 2, unit: "onions", estPrice: 16.99 },
      { name: "Cape Malay curry powder & turmeric", baseQty: 2, unit: "tbsp", estPrice: 24.99 },
      { name: "Mrs Ball's original fruit chutney", baseQty: 2, unit: "tbsp", estPrice: 42.99 },
      { name: "Seedless raisins or sultanas", baseQty: 0.5, unit: "cup", estPrice: 28.99 },
      { name: "Fresh bay leaves (or lemon leaves)", baseQty: 3, unit: "leaves", estPrice: 12.99 },
      { name: "Large eggs whisked with milk for custard topping", baseQty: 2, unit: "eggs", estPrice: 20.00 }
    ],
    steps: [
      "Preheat oven to 180°C. Sauté diced onions in butter until golden and sweet.",
      "Stir in curry powder and turmeric; fry for 1 minute until fragrant.",
      "Add minced beef, browning lightly. Squeeze bread from milk, mash into meat with chutney and raisins.",
      "Transfer into a baking dish, smoothing the top. Insert bay leaves evenly. Bake for 25 minutes.",
      "Whisk eggs with remaining milk. Pour custard layer over meat and bake for 20 minutes until golden."
    ]
  }
];

// Additional heritage dishes from brief
const MORE_DISHES = [
  {
    id: "chakalaka",
    title: "Spicy Chakalaka with Pap & Wors",
    category: "Sides & Relishes",
    desc: "Grated carrots, Koo baked beans, bell peppers, garlic and curry spices simmered into Mzansi's favorite braai accompaniment.",
    image: "/assets/sugg_chakalaka.png"
  },
  {
    id: "potjiekos",
    title: "Beef Short Ribs Potjiekos",
    category: "Heritage Classics",
    desc: "Slow-simmered beef short ribs, baby potatoes, carrots, and button mushrooms layered in a cast-iron No. 3 Potjie over wood coals.",
    image: "/assets/sugg_potjie.png"
  },
  {
    id: "pap-wors",
    title: "Stiff Pap & Farmer's Wors",
    category: "Heritage Classics",
    desc: "Steaming fluffy maize meal pap served with braaied boerewors and sweet tomato-onion smoor relish.",
    image: "/assets/sugg_pap_wors.png"
  }
];

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeServings, setRecipeServings] = useState(6);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // URL for Chat Interface App (port 5174 if running dev:all or direct path)
  const chatAppUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:5174' 
    : '/chat-interface';

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setRecipeServings(recipe.baseServings || 6);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  // Deterministic ingredient scaling
  const getScaledRecipe = () => {
    if (!selectedRecipe) return null;
    const ratio = recipeServings / selectedRecipe.baseServings;
    const scaledIngs = selectedRecipe.ingredients.map(ing => {
      let qty = ing.baseQty * ratio;
      qty = Math.round(qty * 10) / 10;
      return {
        ...ing,
        scaledQty: qty,
        scaledPrice: Math.round(ing.estPrice * ratio * 100) / 100
      };
    });
    const totalZar = scaledIngs.reduce((sum, item) => sum + item.scaledPrice, 0);
    return {
      ...selectedRecipe,
      scaledIngs,
      totalZar: Math.round(totalZar * 100) / 100
    };
  };

  const currentScaled = getScaledRecipe();

  return (
    <div className="landing-page-root">
      <div className="page-container">
        
        {/* ========================================================
            NAVIGATION BAR (Matches UI.jpeg Top Bar)
            ======================================================== */}
        <header className="site-navbar">
          <a href="#" className="nav-brand-logo">
            <img src="/assets/logo_mark.png" alt="Dijontjie Logo" className="brand-sq-icon" />
            <span className="brand-name-text">Dijontjie</span>
          </a>

          <nav>
            <ul className="nav-links-menu">
              <li><a href="#" className="nav-link-item active">Home</a></li>
              <li><a href="#features" className="nav-link-item">Features</a></li>
              <li><a href="#how-it-works" className="nav-link-item">How it Works</a></li>
              <li><a href="#recipes" className="nav-link-item">Braai Recipes</a></li>
              <li><a href="#gear" className="nav-link-item">Braai Gear</a></li>
            </ul>
          </nav>

          <button className="nav-btn-app" onClick={() => setAppModalOpen(true)}>
            Get the App
          </button>
        </header>

        {/* ========================================================
            HERO SECTION (Matches UI.jpeg Hero)
            ======================================================== */}
        <section className="hero-section">
          <div className="hero-left-content">
            <h1 className="hero-main-title">
              Meet Dijontjie.<br />
              Your Braai & SA Food<br />
              Companion.
            </h1>

            <p className="hero-subtitle">
              Instant, authentic recipes and cooking tips from the heart of South Africa.
            </p>

            <div className="hero-cta-group">
              <a 
                href={chatAppUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-hero-primary"
                id="hero-chat-now-btn"
              >
                Chat Now
                <ArrowRight size={18} />
              </a>

              <a href="#recipes" className="btn-hero-secondary">
                Explore Recipes
              </a>
            </div>

            <div className="hero-cultural-tags">
              <div className="cultural-pill-badge">
                <Sparkles size={14} color="#FFC72C" />
                <span>100% Mzansi Flavours</span>
              </div>
              <div className="cultural-pill-badge">
                <Users size={14} color="#4A3422" />
                <span>Deterministic Group Scaling</span>
              </div>
              <div className="cultural-pill-badge">
                <ShoppingBag size={14} color="#2E7D32" />
                <span>Simulated Grocery Basket</span>
              </div>
            </div>
          </div>

          <div className="hero-mascot-visual">
            <div className="hero-mascot-img-wrap">
              <img 
                src="/assets/hero_potjie.png" 
                alt="Dijontjie 3D mascot next to steaming potjie pot" 
                className="hero-potjie-img" 
              />
              <div className="mascot-speech-bubble">
                <span>🔥</span>
                <span>"Aweh! Ready to cook something lekker?"</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FEATURED RECIPES SECTION (Matches UI.jpeg)
            ======================================================== */}
        <section className="section-wrapper" id="recipes">
          <div className="section-header-block">
            <h2 className="section-h2-title">Featured Recipes</h2>
            <p className="section-desc-p">Authentic recipes calibrated with deterministic scaling and local ingredients.</p>
          </div>

          <div className="featured-recipes-grid">
            {RECIPES_DATA.map((recipe) => (
              <div key={recipe.id} className="recipe-card-ui">
                <div className="recipe-card-media">
                  <img src={recipe.image} alt={recipe.title} className="recipe-card-img" />
                  <span className="recipe-card-category-badge">{recipe.category}</span>
                </div>

                <div className="recipe-card-body">
                  <h3 className="recipe-card-h3">{recipe.title}</h3>
                  <p className="recipe-card-desc">{recipe.shortDesc}</p>
                  
                  <div className="recipe-meta-badges">
                    <span>⏱ {recipe.cookTime}</span>
                    <span>•</span>
                    <span>👥 Serves {recipe.baseServings}</span>
                  </div>

                  <button 
                    className="recipe-btn-cook"
                    onClick={() => handleOpenRecipe(recipe)}
                  >
                    Cook
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            HOW IT WORKS SECTION (Matches UI.jpeg)
            ======================================================== */}
        <section className="section-wrapper" id="how-it-works">
          <div className="section-header-block">
            <h2 className="section-h2-title">How it Works</h2>
            <p className="section-desc-p">From craving to completed braai in four seamless agent-driven steps.</p>
          </div>

          <div className="how-it-works-grid">
            {/* Step 1 */}
            <div className="hiw-step-column">
              <div className="hiw-icon-circle">
                <MessageSquare size={26} strokeWidth={2.2} />
              </div>
              <h3 className="hiw-step-h3">Ask Dijontjie</h3>
              <p className="hiw-step-text">
                Ask Dijontjie for recommendations, cultural insights, or plan a braai for 12 people. She understands regional heritage, Sesotho, Afrikaans, and South African food terms.
              </p>
            </div>

            {/* Step 2 */}
            <div className="hiw-step-column">
              <div className="hiw-icon-circle">
                <BookOpen size={26} strokeWidth={2.2} />
              </div>
              <h3 className="hiw-step-h3">Get Instant Recipes</h3>
              <p className="hiw-step-text">
                Receive structured recipes with deterministic ingredient scaling (no hallucinated quantities), package-size normalization, and estimated ZAR shopping basket costs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="hiw-step-column">
              <div className="hiw-icon-circle">
                <ThumbsUp size={26} strokeWidth={2.2} />
              </div>
              <h3 className="hiw-step-h3">Cook with Confidence</h3>
              <p className="hiw-step-text">
                Cook with confidence. Step-by-step guidance, braai fire temperature countdowns, reminders, and approval-gated ordering so you stay in complete control.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            MEET THE TEAM & HERITAGE (Matches UI.jpeg)
            ======================================================== */}
        <section className="section-wrapper" id="features">
          <div className="section-header-block">
            <h2 className="section-h2-title">Meet the Team</h2>
            <p className="section-desc-p">The culinary heart and engineering intelligence powering Dijontjie.</p>
          </div>

          <div className="meet-the-team-grid">
            <div className="mascot-avatar-box">
              <img src="/assets/mascot_outline.png" alt="Dijontjie mascot face" className="mascot-avatar-img" />
            </div>

            <div className="team-card-ui">
              <h4 className="team-card-h4">Dijontjie (AI Chatbot)</h4>
              <p className="team-card-p">
                Dijontjie (AI Chatbot) combines Sesotho <em>"dijo"</em> (food) with the Afrikaans diminutive <em>"-ntjie"</em> ("Foodly"). Her mission is to single-handedly feed the Rainbow Nation with cultural precision, persistent workflows, and warmth.
              </p>
            </div>

            <div className="team-card-ui">
              <h4 className="team-card-h4">The SA Culinary Experts</h4>
              <p className="team-card-p">
                The SA Culinary Experts bring deep regional heritage knowledge, curated recipes, secret braai spice formulations, and trusted cooking techniques from Soweto to the Karoo.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            EXCLUSIVE BRAAI GEAR & MERCH COLLECTION (Assets 1-3)
            ======================================================== */}
        <section className="merch-section-wrapper" id="gear">
          <div className="section-header-block">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#B38100', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Flame size={16} /> Official Merchandise
            </div>
            <h2 className="section-h2-title" style={{ marginTop: '6px' }}>Gear Up for the Ultimate Braai</h2>
            <p className="section-desc-p">Authentic merchandise and tools designed for South African braai masters.</p>
          </div>

          <div className="merch-grid-showcase">
            {/* Featured Hero Stand (Assets 3) */}
            <div className="merch-hero-stand-card">
              <div>
                <span className="recipe-card-category-badge" style={{ position: 'static' }}>Flagship Edition</span>
                <h3 className="section-h2-title" style={{ fontSize: '24px', marginTop: '10px' }}>Dijontjie Folding Braai Stand</h3>
                <p className="section-desc-p">Heavy-duty matte black steel with side prep shelf, utensil hooks, and temperature badge.</p>
              </div>
              <img src="/assets/merch_braai_stand.png" alt="Dijontjie Folding Braai Stand" className="merch-stand-img" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#4A3422' }}>R 1,499.00</span>
                <button className="recipe-btn-cook" style={{ width: 'auto', padding: '10px 24px' }}>Pre-order</button>
              </div>
            </div>

            {/* Spice Blend (Assets 1) */}
            <div className="merch-item-card">
              <img src="/assets/merch_braai_spice.png" alt="Dijontjie's Braai Spice" className="merch-item-img" />
              <div className="merch-item-title">Dijontjie's Signature Braai Spice</div>
              <div className="merch-item-desc">Crushed coriander, smoked paprika, garlic, and coarse Kalahari desert salt.</div>
              <div style={{ fontWeight: '700', color: '#4A3422' }}>R 34.99</div>
            </div>

            {/* Wood Coasters (Assets 1) */}
            <div className="merch-item-card">
              <img src="/assets/merch_coasters.png" alt="Sustainable Wood Coasters" className="merch-item-img" />
              <div className="merch-item-title">Set Coasters (Sustainable Wood)</div>
              <div className="merch-item-desc">Laser-etched with traditional 3-legged Potjie and braai tongs. Pack of 4.</div>
              <div style={{ fontWeight: '700', color: '#4A3422' }}>R 189.00</div>
            </div>

            {/* Branded Apron (Assets 2) */}
            <div className="merch-item-card">
              <img src="/assets/merch_apron.png" alt="Branded Braai Apron" className="merch-item-img" />
              <div className="merch-item-title">Braai Brown Heavy Apron</div>
              <div className="merch-item-desc">100% thick canvas with deep pockets for spices and braai tongs.</div>
              <div style={{ fontWeight: '700', color: '#4A3422' }}>R 249.00</div>
            </div>

            {/* Ceramic Mug (Assets 1) */}
            <div className="merch-item-card">
              <img src="/assets/merch_mug.png" alt="Branded Ceramic Mug" className="merch-item-img" />
              <div className="merch-item-title">Marigold Morning Ceramic Mug</div>
              <div className="merch-item-desc">Sunny yellow ceramic for morning rooibos tea or campfire coffee.</div>
              <div style={{ fontWeight: '700', color: '#4A3422' }}>R 129.00</div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FOOTER (Matches UI.jpeg Footer)
            ======================================================== */}
        <footer className="site-footer">
          <div className="footer-main-row">
            <div className="nav-brand-logo">
              <img src="/assets/logo_mark.png" alt="Dijontjie" className="brand-sq-icon" style={{ width: '34px', height: '34px' }} />
              <span className="brand-name-text" style={{ fontSize: '18px' }}>Dijontjie</span>
            </div>

            <ul className="footer-nav-links">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#how-it-works" className="footer-link">How it Works</a></li>
              <li><a href="#recipes" className="footer-link">Recipes</a></li>
              <li><a href="#" className="footer-link">Legal</a></li>
            </ul>

            <div className="footer-social-icons">
              <button className="social-icon-btn" title="Twitter / X">𝕏</button>
              <button className="social-icon-btn" title="Instagram">📸</button>
              <button className="social-icon-btn" title="Facebook">📘</button>
            </div>
          </div>

          <div className="footer-copy-text">
            © 2026 Dijontjie. All rights reserved. My name is Dijontjie, and my goal is to single-handedly feed the RN.
          </div>
        </footer>

      </div>

      {/* ========================================================
          RECIPE DETAILS MODAL (Interactive Scaler)
          ======================================================== */}
      {selectedRecipe && currentScaled && (
        <div className="modal-backdrop-blur" onClick={handleCloseRecipe}>
          <div className="modal-recipe-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseRecipe}>
              <X size={18} />
            </button>

            <div className="modal-header-hero">
              <img src={currentScaled.image} alt={currentScaled.title} className="modal-hero-img" />
            </div>

            <div className="modal-body-content">
              <div>
                <span className="recipe-card-category-badge" style={{ position: 'static' }}>{currentScaled.category}</span>
                <h2 className="section-h2-title" style={{ marginTop: '8px' }}>{currentScaled.title}</h2>
                <p className="section-desc-p">{currentScaled.fullDesc}</p>
              </div>

              {/* Scaler Bar */}
              <div className="modal-scale-bar">
                <span style={{ fontWeight: '600', color: '#4A3422' }}>
                  Deterministic Group Scaling ({recipeServings} guests)
                </span>
                <div className="modal-scale-controls">
                  <button 
                    className="modal-scale-btn" 
                    onClick={() => setRecipeServings(Math.max(2, recipeServings - 2))}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>{recipeServings}</span>
                  <button 
                    className="modal-scale-btn" 
                    onClick={() => setRecipeServings(recipeServings + 2)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Scaled Ingredients */}
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#4A3422', marginBottom: '10px' }}>
                  Required Ingredients ({recipeServings} Servings)
                </h4>
                <ul className="modal-ingredients-list">
                  {currentScaled.scaledIngs.map((ing, i) => (
                    <li key={i} className="modal-ing-item">
                      <span style={{ color: '#FFC72C', fontWeight: '700' }}>✓</span>
                      <span><strong>{ing.scaledQty} {ing.unit}</strong> {ing.name}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#7E7166' }}>
                  Estimated Grocery Basket Cost: <strong style={{ color: '#4A3422' }}>R {currentScaled.totalZar.toFixed(2)} ZAR</strong>
                </div>
              </div>

              {/* Preparation Steps */}
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#4A3422', marginBottom: '10px' }}>
                  Preparation Steps
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentScaled.steps.map((st, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: '1.5' }}>
                      <span style={{ 
                        width: '22px', 
                        height: '22px', 
                        borderRadius: '50%', 
                        backgroundColor: '#FFC72C', 
                        color: '#4A3422',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        {idx + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct CTA to launch Chat with this recipe */}
              <a 
                href={chatAppUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="modal-cta-chat"
              >
                <span>Cook with Dijontjie in Chat Mode</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          APP DOWNLOAD MODAL
          ======================================================== */}
      {appModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setAppModalOpen(false)}>
          <div className="app-download-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setAppModalOpen(false)}>
              <X size={18} />
            </button>

            <img src="/assets/logo_mark.png" alt="Dijontjie" style={{ width: '64px', height: '64px', borderRadius: '16px' }} />
            
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#4A3422' }}>
              Get the Dijontjie Mobile App
            </h3>
            
            <p style={{ fontSize: '14px', color: '#7E7166', lineHeight: '1.5' }}>
              Scan the QR code with your phone camera or launch the standalone web app directly to experience the full conversational culinary companion.
            </p>

            <div className="qr-code-box">
              <Smartphone size={36} color="#4A3422" style={{ marginBottom: '8px' }} />
              <span>SCAN TO LAUNCH</span>
              <span style={{ fontSize: '10px', opacity: 0.8 }}>iOS & Android Ready</span>
            </div>

            <a 
              href={chatAppUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-hero-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Open Web App Now
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
