import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Mic, Send, ChevronLeft, Heart, Check, Play, Pause, 
  RotateCcw, ArrowLeft, Home, MessageSquare, BookOpen, Bookmark, 
  Sparkles, Clock, Flame, Users, Plus, Minus, X
} from 'lucide-react';
import { RECIPES_DB, scaleRecipe, sendAgentTurn } from './services/agentApi';

export default function App() {
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' or 'interactive'
  const [activeTab, setActiveTab] = useState('chat'); // 'discover', 'chat', 'recipe'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'Hey Dijontjie, I need a bobotie recipe for dinner.'
    },
    {
      id: 2,
      sender: 'assistant',
      text: "Great choice! It's one of my favorites. Here is a classic recipe.",
      recipeCard: {
        recipeId: 'bobotie',
        title: 'Cape Malay Bobotie',
        prepTime: '3 minutes to prep',
        cookTime: '30 minutes to cook',
        ingredientsSnippet: [
          'Minced beef, onions, spices...',
          'Curry powder, turmeric, apricot jam...',
          'Milk-soaked bread, raisins, almonds...',
          'Egg custard topping, bay leaves...'
        ]
      }
    },
    {
      id: 3,
      sender: 'assistant',
      text: 'Would you like the step-by-step instructions?',
      chips: ['Yes, please!', 'No, thanks.', 'Scale for 12 guests', 'Add to Shopping List']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Recipe details state
  const [currentRecipeId, setCurrentRecipeId] = useState('bobotie');
  const [servings, setServings] = useState(6);
  const [recipeTab, setRecipeTab] = useState('ingredients'); // 'overview', 'ingredients', 'instructions'
  const [checkedIngredients, setCheckedIngredients] = useState({
    'ing-1': true,
    'ing-2': true,
    'ing-3': true,
    'ing-4': true,
    'ing-5': true
  });

  // Cooking Mode state
  const [cookingModeOpen, setCookingModeOpen] = useState(false);
  const [cookingStep, setCookingStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(1200); // 20 mins default
  const [timerRunning, setTimerRunning] = useState(false);

  const baseRecipe = RECIPES_DB[currentRecipeId] || RECIPES_DB.bobotie;
  const scaled = scaleRecipe(baseRecipe, servings);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleSendMessage = async (customText = null) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsTyping(true);

    try {
      const response = await sendAgentTurn(textToSend, messages);
      setIsTyping(false);

      const assistantMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: response.reply,
        recipeCard: response.recipeCard,
        chips: response.chips
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: "I'm having a little trouble connecting to my culinary server. But no worries, I'm here to help with all your South African favorites!"
        }
      ]);
    }
  };

  const handleChipClick = (chip) => {
    if (chip === 'Yes, please!') {
      handleSendMessage('Yes, please! Give me the step-by-step instructions.');
    } else if (chip === 'No, thanks.') {
      handleSendMessage('No, thanks, just checking the ingredients for now.');
    } else if (chip.includes('Scale')) {
      setServings(12);
      handleSendMessage('Please scale this recipe for 12 guests.');
    } else if (chip === 'View Full Recipe') {
      setActiveTab('recipe');
    } else {
      handleSendMessage(chip);
    }
  };

  const toggleCheck = (id) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Back to landing page URL
  const landingUrl = window.location.port === '5174' ? 'http://localhost:5173' : '/';

  /* ==========================================================
     SUB-COMPONENTS FOR THE 3 INDIVIDUAL SCREENS
     ========================================================== */

  // Screen 1: Discover Screen
  const DiscoverScreen = () => (
    <div className="phone-screen discover-screen">
      {/* Header */}
      <div className="screen-header-row">
        <div className="brand-badge">
          <img src="/assets/logo_mark.png" alt="Dijontjie" className="brand-logo-img" />
          <span className="brand-text-sm">Dijontjie</span>
        </div>
        <button className="user-avatar-btn" title="Sarah's Profile">
          <Users size={16} />
        </button>
      </div>

      {/* Welcome Braai Banner Card */}
      <div className="welcome-card-banner">
        <div className="welcome-card-text">
          <h3>Welcome, Sarah!<br/>Ready to cook<br/>something<br/>lekker?</h3>
        </div>
        <img 
          src="/assets/chat_banner.png" 
          alt="Braai Grill" 
          className="banner-braai-img" 
        />
      </div>

      {/* Recipe Search Box */}
      <div className="recipe-search-box">
        <Search size={16} />
        <input 
          type="text" 
          placeholder="Search for recipes (e.g., Malva Pudding)" 
          className="recipe-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Today's Suggestions */}
      <div className="suggestions-section">
        <h4 className="section-title-sm">Today's Suggestions</h4>
        <div className="suggestions-grid">
          <div 
            className="sugg-card" 
            onClick={() => {
              setCurrentRecipeId('bobotie');
              setActiveTab('chat');
              handleSendMessage('Tell me about Bobotie and how to make it!');
            }}
          >
            <div className="sugg-img-wrapper">
              <img src="/assets/sugg_bobotie.png" alt="Bobotie" className="sugg-img" />
              <img src="/assets/logo_mark.png" alt="Badge" className="sugg-badge-logo" />
            </div>
            <div className="sugg-title">Bobotie</div>
          </div>

          <div 
            className="sugg-card"
            onClick={() => {
              setCurrentRecipeId('chakalaka');
              setActiveTab('chat');
              handleSendMessage('How do I make a lekker Chakalaka for my braai?');
            }}
          >
            <div className="sugg-img-wrapper">
              <img src="/assets/sugg_chakalaka.png" alt="Chakalaka" className="sugg-img" />
              <img src="/assets/logo_mark.png" alt="Badge" className="sugg-badge-logo" />
            </div>
            <div className="sugg-title">Chakalaka</div>
          </div>

          <div 
            className="sugg-card"
            onClick={() => {
              setCurrentRecipeId('braai_plate');
              setActiveTab('chat');
              handleSendMessage('Help me plan a braai feast with boerewors and chops!');
            }}
          >
            <div className="sugg-img-wrapper">
              <img src="/assets/sugg_potjie.png" alt="Potjiekos" className="sugg-img" />
              <img src="/assets/logo_mark.png" alt="Badge" className="sugg-badge-logo" />
            </div>
            <div className="sugg-title">Potjiekos</div>
          </div>

          <div 
            className="sugg-card"
            onClick={() => {
              setCurrentRecipeId('chakalaka');
              setActiveTab('chat');
              handleSendMessage('What is the best way to make stiff pap and wors?');
            }}
          >
            <div className="sugg-img-wrapper">
              <img src="/assets/sugg_pap_wors.png" alt="Pap & Wors" className="sugg-img" />
              <img src="/assets/logo_mark.png" alt="Badge" className="sugg-badge-logo" />
            </div>
            <div className="sugg-title">Pap & Wors</div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="mobile-bottom-nav">
        <button className="nav-item-btn active" onClick={() => setActiveTab('discover')}>
          <Home size={18} />
          <span>Home</span>
        </button>
        <button className="nav-item-btn" onClick={() => setActiveTab('chat')}>
          <MessageSquare size={18} />
          <span>Chat</span>
        </button>
        <button className="nav-item-btn" onClick={() => setActiveTab('recipe')}>
          <BookOpen size={18} />
          <span>Recipes</span>
        </button>
        <button className="nav-item-btn">
          <Bookmark size={18} />
          <span>Saved</span>
        </button>
      </div>
    </div>
  );

  // Screen 2: Chat Conversation Screen
  const ChatScreen = () => (
    <div className="phone-screen chat-screen">
      {/* Top Bar */}
      <div className="chat-top-bar">
        <button className="chat-back-btn" onClick={() => setActiveTab('discover')}>
          <ChevronLeft size={22} />
        </button>
        <div className="chat-agent-info">
          <img src="/assets/logo_mark.png" alt="Dijontjie" className="brand-logo-img" />
          <div>
            <div className="chat-agent-title">Dijontjie</div>
            <div className="chat-online-pill">Online • SA Culinary AI</div>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div className="chat-messages-stream">
        {messages.map((msg) => (
          <div key={msg.id} className={`msg-row ${msg.sender}`}>
            {msg.sender === 'assistant' && (
              <img src="/assets/logo_mark.png" alt="Avatar" className="msg-avatar" />
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '85%' }}>
              <div className={`msg-bubble ${msg.sender}`}>
                {msg.text}
              </div>

              {/* Rich Card if attached */}
              {msg.recipeCard && (
                <div className="rich-chat-recipe-card">
                  <div className="rich-card-title">{msg.recipeCard.title}</div>
                  <div className="rich-card-meta">
                    <span>Prep Time: {msg.recipeCard.prepTime}</span>
                    <span>Cook Time: {msg.recipeCard.cookTime}</span>
                  </div>
                  <div className="rich-card-ingredients-title">Ingredients</div>
                  <ul className="rich-card-ingredients-list">
                    {msg.recipeCard.ingredientsSnippet.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                  <button 
                    className="btn-view-full-recipe"
                    onClick={() => {
                      setCurrentRecipeId(msg.recipeCard.recipeId || 'bobotie');
                      setActiveTab('recipe');
                    }}
                  >
                    View Full Recipe
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="msg-row assistant">
            <img src="/assets/logo_mark.png" alt="Avatar" className="msg-avatar" />
            <div className="msg-bubble assistant" style={{ fontStyle: 'italic', opacity: 0.8 }}>
              Dijontjie is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chips */}
      <div className="chat-chips-scroll">
        {['Yes, please!', 'No, thanks.', 'Scale for 12 guests', 'View Full Recipe'].map((chip, idx) => (
          <button 
            key={idx} 
            className="chat-chip-btn"
            onClick={() => handleChipClick(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Bottom Input Area */}
      <div className="chat-input-bar">
        <input 
          type="text" 
          placeholder="Type your message..." 
          className="chat-text-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          className={`chat-mic-btn ${isRecording ? 'recording' : ''}`}
          onClick={() => {
            setIsRecording(!isRecording);
            if (!isRecording) {
              setTimeout(() => {
                setIsRecording(false);
                setInputText("How much meat do I buy for a braai with 12 friends?");
              }, 2200);
            }
          }}
          title={isRecording ? "Listening..." : "Voice input"}
        >
          <Mic size={18} />
        </button>
        <button 
          className="chat-send-btn"
          onClick={() => handleSendMessage()}
          title="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );

  // Screen 3: Recipe Details & Cooking Mode Screen
  const RecipeScreen = () => (
    <div className="phone-screen recipe-screen">
      {/* Hero Dish Image */}
      <div className="recipe-hero-container">
        <img 
          src={scaled.heroImage || "/assets/recipe_hero_bobotie.png"} 
          alt={scaled.name} 
          className="recipe-hero-img" 
        />
        <div className="recipe-top-nav-actions">
          <button className="recipe-nav-circle-btn" onClick={() => setActiveTab('chat')}>
            <ChevronLeft size={20} />
          </button>
          <button className="recipe-nav-circle-btn">
            <Heart size={18} color="#E03131" fill="#E03131" />
          </button>
        </div>
      </div>

      {/* Content Card */}
      <div className="recipe-content-card">
        <div className="recipe-header-title-row">
          <img src="/assets/logo_mark.png" alt="Dijontjie" className="brand-logo-img" />
          <h2 className="recipe-title-h2">{scaled.name}</h2>
        </div>

        {/* Tab Switcher */}
        <div className="recipe-tabs-row">
          <button 
            className={`recipe-tab-btn ${recipeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setRecipeTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`recipe-tab-btn ${recipeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setRecipeTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`recipe-tab-btn ${recipeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setRecipeTab('instructions')}
          >
            Instructions
          </button>
        </div>

        {/* Tab Content */}
        <div className="recipe-tab-content">
          {recipeTab === 'ingredients' && (
            <>
              {/* Servings Scaler */}
              <div className="scaler-bar">
                <span>Deterministic Scaler ({servings} servings)</span>
                <div className="scaler-controls">
                  <button 
                    className="scaler-btn" 
                    onClick={() => setServings(Math.max(2, servings - 2))}
                  >
                    <Minus size={12} />
                  </button>
                  <span>{servings}</span>
                  <button 
                    className="scaler-btn" 
                    onClick={() => setServings(servings + 2)}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Checklist */}
              <ul className="ingredients-checklist">
                {scaled.ingredients.map((ing) => {
                  const isChecked = !!checkedIngredients[ing.id];
                  return (
                    <li 
                      key={ing.id} 
                      className={`checklist-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleCheck(ing.id)}
                    >
                      <div className={`checklist-box ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span>
                        <strong>{ing.scaledQty} {ing.unit}</strong> {ing.name}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div style={{ fontSize: '11px', color: '#8A7E72', marginTop: '4px' }}>
                Est. Grocery Basket: <strong>R{scaled.estimatedTotalZar.toFixed(2)} ZAR</strong>
              </div>
            </>
          )}

          {recipeTab === 'overview' && (
            <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#4A3422' }}>
              <p style={{ marginBottom: '10px' }}>{scaled.summary}</p>
              <div style={{ background: '#FAF6EE', padding: '12px', borderRadius: '12px', fontSize: '12px' }}>
                <strong>Cultural Origin:</strong> Cape Malay cuisine, rooted in 17th-century Cape Town spice traditions.
                <br /><br />
                <strong>Pairing:</strong> {scaled.pairing}
              </div>
            </div>
          )}

          {recipeTab === 'instructions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {scaled.instructions.map((step) => (
                <div key={step.step} style={{ display: 'flex', gap: '10px', fontSize: '12px', lineHeight: '1.4' }}>
                  <span style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FFC72C', 
                    color: '#4A3422',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    flexShrink: 0
                  }}>
                    {step.step}
                  </span>
                  <div>
                    <div>{step.text}</div>
                    <span style={{ color: '#8E8276', fontSize: '11px' }}>⏱ {step.durationMin} mins</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Start Cooking Mode Button */}
        <button 
          className="btn-start-cooking"
          onClick={() => {
            setCookingStep(0);
            setTimerSeconds(scaled.instructions[0]?.durationMin * 60 || 600);
            setTimerRunning(false);
            setCookingModeOpen(true);
          }}
        >
          Start Cooking Mode
        </button>
      </div>

      {/* Cooking Mode Modal Overlay */}
      {cookingModeOpen && (
        <div className="cooking-modal-overlay">
          <div className="cooking-modal-header">
            <span className="cooking-step-badge">
              Step {cookingStep + 1} of {scaled.instructions.length}
            </span>
            <button 
              style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              onClick={() => setCookingModeOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          <div className="cooking-modal-body">
            <div className="cooking-step-text">
              {scaled.instructions[cookingStep]?.text}
            </div>

            <div className="cooking-timer-box">
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Braai & Cooking Timer
              </div>
              <div className="timer-digits">
                {formatTimer(timerSeconds)}
              </div>
              <div className="timer-btn-row">
                <button 
                  className="timer-ctrl-btn"
                  onClick={() => setTimerRunning(!timerRunning)}
                >
                  {timerRunning ? <Pause size={14} /> : <Play size={14} />} {timerRunning ? 'Pause' : 'Start'}
                </button>
                <button 
                  className="timer-ctrl-btn"
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(scaled.instructions[cookingStep]?.durationMin * 60 || 600);
                  }}
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          <div className="cooking-modal-nav">
            <button 
              className="cooking-nav-btn prev"
              disabled={cookingStep === 0}
              style={{ opacity: cookingStep === 0 ? 0.4 : 1 }}
              onClick={() => {
                if (cookingStep > 0) {
                  const prev = cookingStep - 1;
                  setCookingStep(prev);
                  setTimerSeconds(scaled.instructions[prev]?.durationMin * 60 || 600);
                  setTimerRunning(false);
                }
              }}
            >
              Previous
            </button>
            <button 
              className="cooking-nav-btn next"
              onClick={() => {
                if (cookingStep < scaled.instructions.length - 1) {
                  const next = cookingStep + 1;
                  setCookingStep(next);
                  setTimerSeconds(scaled.instructions[next]?.durationMin * 60 || 600);
                  setTimerRunning(false);
                } else {
                  setCookingModeOpen(false);
                  alert("Lekker! You finished cooking! Enjoy your meal!");
                }
              }}
            >
              {cookingStep < scaled.instructions.length - 1 ? 'Next Step' : 'Finish Dish!'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="chat-app-root">
      {/* Global Top Bar */}
      <header className="chat-global-header">
        <div className="header-left">
          <a href={landingUrl} className="btn-back-landing">
            <ArrowLeft size={16} />
            Back to Landing Page
          </a>
          <div className="chat-app-brand">
            <img src="/assets/logo_mark.png" alt="Dijontjie Logo" className="brand-icon-sq" />
            <span className="brand-title">Dijontjie Chat Companion</span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="view-mode-toggle">
          <button 
            className={`view-btn ${viewMode === 'side-by-side' ? 'active' : ''}`}
            onClick={() => setViewMode('side-by-side')}
          >
            Side-by-Side (3 Screens)
          </button>
          <button 
            className={`view-btn ${viewMode === 'interactive' ? 'active' : ''}`}
            onClick={() => setViewMode('interactive')}
          >
            Interactive Mobile Shell
          </button>
        </div>
      </header>

      {/* Workspace Area */}
      <main className="chat-workspace">
        {viewMode === 'side-by-side' ? (
          /* Exact reproduction of chat-interface.jpeg showing all 3 screens side-by-side */
          <div className="side-by-side-container">
            {/* Screen 1: Discover */}
            <div className="phone-mockup">
              <div className="phone-island"></div>
              <DiscoverScreen />
            </div>

            {/* Screen 2: Chat */}
            <div className="phone-mockup">
              <div className="phone-island"></div>
              <ChatScreen />
            </div>

            {/* Screen 3: Recipe */}
            <div className="phone-mockup">
              <div className="phone-island"></div>
              <RecipeScreen />
            </div>
          </div>
        ) : (
          /* Single interactive phone frame with bottom nav */
          <div className="phone-mockup" style={{ width: '410px', height: '820px' }}>
            <div className="phone-island"></div>
            {activeTab === 'discover' && <DiscoverScreen />}
            {activeTab === 'chat' && <ChatScreen />}
            {activeTab === 'recipe' && <RecipeScreen />}
          </div>
        )}
      </main>
    </div>
  );
}
