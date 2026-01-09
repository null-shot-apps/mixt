'use client';

import { useState, useRef, useEffect } from 'react';

type AnalysisResult = {
  isSafe: boolean;
  products: Array<{
    name: string;
    image: string;
    recipe: string[];
    category: string;
  }>;
  warnings?: string[];
  corrections?: string[];
} | null;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type FeatureCard = {
  id: number;
  icon: string;
  title: string;
  description: string;
  action: string;
  gradient: string;
};

export default function CookingAnalyzer() {
  const [ingredients, setIngredients] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{name: string; image: string; recipe: string[]; category: string;}>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const features: FeatureCard[] = [
    {
      id: 0,
      icon: '🌍',
      title: 'Food Search',
      description: 'Discover authentic recipes from any country. Search by dish name and explore global cuisines.',
      action: 'Search Recipes',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 1,
      icon: '📸',
      title: 'Image Search',
      description: 'Take a photo of any dish and instantly identify it with AI-powered recognition.',
      action: 'Upload Photo',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 2,
      icon: '🥘',
      title: 'Ingredient Analyzer',
      description: 'List what you have in your kitchen and get personalized recipe suggestions.',
      action: 'Analyze Ingredients',
      gradient: 'from-blue-600 to-indigo-600'
    }
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setCurrentSlide((prev) => Math.min(prev + 1, features.length - 1));
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleFeatureAction = (id: number) => {
    if (id === 0) {
      document.getElementById('search-input')?.focus();
    } else if (id === 1) {
      setShowImageSearch(true);
      document.getElementById('image-upload')?.click();
    } else if (id === 2) {
      document.getElementById('ingredient-input')?.focus();
      document.getElementById('ingredient-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: currentSlide * scrollContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  const analyzeIngredients = () => {
    if (!ingredients.trim()) return;
    
    setAnalyzing(true);
    
    setTimeout(() => {
      const ingredientList = ingredients.toLowerCase();
      const products: Array<{name: string; image: string; recipe: string[]; category: string;}> = [];
      
      // FRENCH DISHES
      if (ingredientList.includes('bread') || ingredientList.includes('baguette')) {
        products.push({
          name: 'French Onion Soup',
          image: '🍲',
          category: 'French Appetizer',
          recipe: [
            '🔰 BEGINNER TIP: Classic French comfort food! The secret is caramelizing the onions slowly.',
            '1️⃣ Slice 4 large onions thinly',
            '2️⃣ Melt 4 tablespoons butter in a large pot',
            '3️⃣ Add onions and cook slowly for 30-40 minutes',
            '4️⃣ Add 2 minced garlic cloves',
            '5️⃣ Pour in 6 cups beef broth',
            '6️⃣ Simmer for 30 minutes',
            '7️⃣ Toast baguette slices with Gruyère cheese',
            '8️⃣ Ladle soup into bowls, float bread on top',
            '🎯 Serve hot with extra crusty bread!'
          ]
        });
      }
      
      if (ingredientList.includes('egg') || ingredientList.includes('eggs')) {
        products.push({
          name: 'Quiche Lorraine',
          image: '🥧',
          category: 'French Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Classic French egg tart! Perfect for brunch or dinner.',
            '1️⃣ Preheat oven to 375°F (190°C)',
            '2️⃣ Use store-bought pie crust',
            '3️⃣ Cook 6 strips of bacon until crispy',
            '4️⃣ Whisk 4 eggs with 1.5 cups heavy cream',
            '5️⃣ Add salt, pepper, and nutmeg',
            '6️⃣ Sprinkle bacon and cheese in crust',
            '7️⃣ Pour egg mixture over',
            '8️⃣ Bake for 35-40 minutes',
            '🎯 Serve warm with salad!'
          ]
        });
      }
      
      // SPANISH DISHES
      if (ingredientList.includes('rice') || ingredientList.includes('seafood')) {
        products.push({
          name: 'Paella',
          image: '🥘',
          category: 'Spanish Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Spain\'s famous rice dish!',
            '1️⃣ Heat olive oil in a large pan',
            '2️⃣ Cook chicken pieces until golden',
            '3️⃣ Add onion and bell pepper',
            '4️⃣ Add garlic and rice',
            '5️⃣ Stir in smoked paprika and saffron',
            '6️⃣ Pour in chicken broth',
            '7️⃣ Simmer 20 minutes',
            '8️⃣ Add shrimp and mussels on top',
            '🎯 Garnish with lemon wedges!'
          ]
        });
      }
      
      // AMERICAN DISHES
      if (ingredientList.includes('beef') || ingredientList.includes('burger')) {
        products.push({
          name: 'Classic American Burger',
          image: '🍔',
          category: 'American Main Course',
          recipe: [
            '🔰 BEGINNER TIP: The all-American classic!',
            '1️⃣ Form ground beef into 4 patties',
            '2️⃣ Season with salt and pepper',
            '3️⃣ Heat pan to medium-high',
            '4️⃣ Cook 4 minutes per side',
            '5️⃣ Add cheese in last minute',
            '6️⃣ Toast burger buns',
            '7️⃣ Assemble with toppings',
            '🎯 Serve with fries!'
          ]
        });
      }
      
      if (products.length === 0) {
        products.push({
          name: 'Custom Creation',
          image: '🥘',
          category: 'Experimental',
          recipe: [
            'Combine your ingredients carefully',
            'Mix well in appropriate container',
            'Follow safety guidelines',
            'Cook or process as needed',
            'Season to taste',
            'Test small amounts first'
          ]
        });
      }
      
      setResult({
        isSafe: true,
        products: products
      });
      
      setAnalyzing(false);
    }, 2000);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results: Array<{name: string; image: string; recipe: string[]; category: string;}> = [];
      
      if (query.includes('paella')) {
        results.push({
          name: 'Paella',
          image: '🥘',
          category: 'Spanish Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Spain\'s famous rice dish!',
            '1️⃣ Heat olive oil in large pan',
            '2️⃣ Cook chicken until golden',
            '3️⃣ Add onion and bell pepper',
            '4️⃣ Add garlic and rice',
            '5️⃣ Stir in paprika and saffron',
            '6️⃣ Pour in chicken broth',
            '7️⃣ Simmer 20 minutes',
            '8️⃣ Add seafood on top',
            '🎯 Garnish with lemon!'
          ]
        });
      }
      
      if (results.length === 0) {
        results.push({
          name: 'No Results Found',
          image: '🔍',
          category: 'Search',
          recipe: [
            'Try searching for:',
            '🇫🇷 French: onion soup, quiche, coq au vin',
            '🇪🇸 Spanish: paella, patatas bravas, gazpacho',
            '🇺🇸 American: burger, mac and cheese, BBQ ribs',
            'Or use the ingredient analyzer below!'
          ]
        });
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setChatLoading(true);
    
    setTimeout(() => {
      const response = 'I can help with French dishes (onion soup, quiche), Spanish dishes (paella, gazpacho), American dishes (burgers, mac and cheese), and beginner cooking tips! What would you like to know?';
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setChatLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6 animate-bounce">
            <span className="text-7xl md:text-8xl">🍳</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6 leading-tight">
            Your Smart Cooking Assistant
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-light">
            Discover recipes, identify dishes, and cook with what you have—all powered by AI
          </p>
        </div>

        {/* Central Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-3 hover:shadow-blue-200 transition-all duration-300">
            <div className="flex gap-3">
              <div className="flex-1 relative group">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search any dish from any country..."
                  className="w-full p-6 pl-16 border-2 border-transparent rounded-2xl focus:border-blue-400 focus:outline-none text-lg bg-gray-50 group-hover:bg-white transition-all"
                  disabled={isSearching}
                />
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-3xl">🔍</div>
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-6 rounded-2xl font-bold hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all duration-200"
              >
                {isSearching ? '⏳' : '→'}
              </button>
            </div>
          </div>
        </div>

        {/* Swipeable Feature Cards */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            Explore Features
          </h2>
          
          {/* Desktop View - All Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => handleFeatureAction(feature.id)}
              >
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <button
                  className={`w-full bg-gradient-to-r ${feature.gradient} text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-200`}
                >
                  {feature.action}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile View - Swipeable Cards */}
          <div className="md:hidden">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4 pb-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex-shrink-0 w-[85vw] snap-center"
                >
                  <div
                    className="bg-white rounded-3xl p-8 shadow-xl h-full flex flex-col"
                    onClick={() => handleFeatureAction(feature.id)}
                  >
                    <div className="text-7xl mb-6 animate-pulse">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{feature.description}</p>
                    <button
                      className={`w-full bg-gradient-to-r ${feature.gradient} text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all duration-200`}
                    >
                      {feature.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Swipe Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-blue-500' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Image Search Modal */}
        {showImageSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-100 animate-fadeIn">
              <div className="text-center">
                <div className="text-7xl mb-6 animate-bounce">📸</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Image Search</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Upload a photo of any dish to identify it and get the recipe instantly
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 mb-4"
                >
                  📷 Choose Image
                </label>
                <button
                  onClick={() => setShowImageSearch(false)}
                  className="block w-full text-gray-600 hover:text-gray-800 font-medium mt-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Search Results
                </h3>
                <button
                  onClick={() => { setSearchResults([]); setSearchQuery(''); }}
                  className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
                >
                  ✕ Clear
                </button>
              </div>
              <div className="space-y-6">
                {searchResults.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-6xl">{item.image}</div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800">{item.name}</h4>
                        <span className="inline-block bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <h5 className="font-bold text-gray-800 mb-3 text-lg">Recipe:</h5>
                      <ol className="list-decimal list-inside space-y-2">
                        {item.recipe.map((step, stepIdx) => (
                          <li key={stepIdx} className="text-gray-700 leading-relaxed">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ingredient Analyzer Section */}
        <div id="ingredient-section" className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="text-6xl mb-4">🥘</div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Ingredient Analyzer
              </h2>
              <p className="text-gray-600 text-lg">
                Tell us what you have, and we&apos;ll show you what to cook!
              </p>
            </div>

            {!result && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-3 text-lg">
                    What ingredients do you have?
                  </label>
                  <textarea
                    id="ingredient-input"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g., chicken, rice, tomatoes, onions, garlic..."
                    className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none min-h-40 text-lg bg-gray-50 hover:bg-white transition-all"
                  />
                </div>
                <button
                  onClick={analyzeIngredients}
                  disabled={analyzing || !ingredients.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all duration-200"
                >
                  {analyzing ? '🔍 Analyzing...' : '✨ Get Cooking Instructions'}
                </button>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <button
                  onClick={() => { setResult(null); setIngredients(''); }}
                  className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all"
                >
                  ← Try Different Ingredients
                </button>

                {result.isSafe && result.products.length > 0 && (
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <span className="text-4xl">✅</span>
                      Here&apos;s what you can make:
                    </h3>
                    <div className="space-y-6">
                      {result.products.map((product, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-xl transition-all">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="text-6xl">{product.image}</div>
                            <div>
                              <h4 className="text-2xl font-bold text-gray-800">{product.name}</h4>
                              <span className="inline-block bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">
                                {product.category}
                              </span>
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h5 className="font-bold text-gray-800 mb-4 text-lg">Cooking Instructions:</h5>
                            <ol className="list-decimal list-inside space-y-2">
                              {product.recipe.map((step, stepIdx) => (
                                <li key={stepIdx} className="text-gray-700 leading-relaxed">{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 pb-8">
          <p className="text-sm font-medium">💡 Powered by AI • Cook with confidence • Discover new flavors</p>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-full shadow-2xl hover:scale-110 hover:shadow-blue-300 transition-all duration-200 z-50 group"
      >
        <span className="text-3xl group-hover:scale-110 transition-transform inline-block">
          {showChat ? '✕' : '💬'}
        </span>
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-32 right-8 w-96 max-w-[calc(100vw-4rem)] bg-white rounded-3xl shadow-2xl z-50 flex flex-col max-h-[600px] animate-slideUp">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-3xl">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">🧑‍🍳</span>
              Recipe Assistant
            </h3>
            <p className="text-sm opacity-90 mt-1">Ask me about any recipe!</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px] max-h-[400px] bg-gradient-to-br from-blue-50 to-white">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-600 mt-8">
                <p className="mb-6 font-medium">👋 Hi! I can help you with:</p>
                <div className="space-y-3 text-left max-w-xs mx-auto">
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">🇫🇷</span> French cuisine
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">🇪🇸</span> Spanish dishes
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">🇺🇸</span> American classics
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">👨‍🍳</span> Cooking tips
                  </div>
                </div>
              </div>
            )}
            
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {chatLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white text-gray-800 p-4 rounded-2xl shadow-md border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white rounded-b-3xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Ask about recipes..."
                className="flex-1 p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none bg-gray-50 hover:bg-white transition-all"
                disabled={chatLoading}
              />
              <button
                onClick={handleChatSubmit}
                disabled={chatLoading || !chatInput.trim()}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all duration-200"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}








