'use client';

import { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-green-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="text-6xl md:text-7xl">🍳</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Cook Anything with What You Have
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover delicious recipes from any country using the ingredients in your kitchen. 
            Search by dish name, upload a photo, or list what you have!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={() => document.getElementById('ingredient-input')?.focus()}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              🚀 Start Cooking
            </button>
            <button
              onClick={() => setShowImageSearch(!showImageSearch)}
              className="bg-white text-orange-600 border-2 border-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              📸 Try Image Search
            </button>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for any dish from any country... (e.g., paella, burger, quiche)"
                className="w-full p-5 pl-14 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:outline-none text-lg"
                disabled={isSearching}
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-3xl">🔍</div>
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {/* Image Search Section */}
          {showImageSearch && (
            <div className="mt-6 p-6 bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl border-2 border-orange-200">
              <div className="text-center">
                <div className="text-5xl mb-4">📸</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Image Search</h3>
                <p className="text-gray-600 mb-4">Upload a photo of a dish to identify it and get the recipe</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-orange-600 transition-colors"
                >
                  Choose Image
                </label>
              </div>
            </div>
          )}
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">Search Results</h3>
                <button
                  onClick={() => { setSearchResults([]); setSearchQuery(''); }}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Clear
                </button>
              </div>
              {searchResults.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-6 border-2 border-orange-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-6xl">{item.image}</div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">{item.name}</h4>
                      <span className="inline-block bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h5 className="font-semibold text-gray-800 mb-3">Recipe:</h5>
                    <ol className="list-decimal list-inside space-y-2">
                      {item.recipe.map((step, stepIdx) => (
                        <li key={stepIdx} className="text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Global Food Search</h3>
            <p className="text-gray-600">Discover recipes from France, Spain, USA, and more</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Image Recognition</h3>
            <p className="text-gray-600">Upload a photo to identify dishes instantly</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">🥘</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ingredient Analyzer</h3>
            <p className="text-gray-600">List what you have and get recipe suggestions</p>
          </div>
        </div>

        {/* Ingredient Analyzer Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Ingredient Analyzer</h2>
            <p className="text-gray-600">Tell us what ingredients you have, and we'll show you what to cook!</p>
          </div>

          {!result && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-lg">
                  What ingredients do you have?
                </label>
                <textarea
                  id="ingredient-input"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., chicken, rice, tomatoes, onions, garlic..."
                  className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:outline-none min-h-32 text-lg"
                />
              </div>
              <button
                onClick={analyzeIngredients}
                disabled={analyzing || !ingredients.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 rounded-2xl font-semibold text-lg hover:opacity-90 disabled:bg-gray-400 transition-all transform hover:scale-[1.02]"
              >
                {analyzing ? '🔍 Analyzing...' : '✨ Get Cooking Instructions'}
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <button
                onClick={() => { setResult(null); setIngredients(''); }}
                className="text-orange-600 hover:text-orange-800 font-medium"
              >
                ← Try Different Ingredients
              </button>

              {result.isSafe && result.products.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-green-800 mb-6">✅ Here's what you can make:</h3>
                  <div className="space-y-6">
                    {result.products.map((product, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-green-50 to-orange-50 rounded-2xl p-6 border-2 border-green-200">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-6xl">{product.image}</div>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-800">{product.name}</h4>
                            <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {product.category}
                            </span>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-5">
                          <h5 className="font-semibold text-gray-800 mb-3 text-lg">Cooking Instructions:</h5>
                          <ol className="list-decimal list-inside space-y-2">
                            {product.recipe.map((step, stepIdx) => (
                              <li key={stepIdx} className="text-gray-700">{step}</li>
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

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">💡 Powered by AI • Cook with confidence • Discover new flavors</p>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <span className="text-3xl">{showChat ? '✕' : '💬'}</span>
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-28 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl z-50 flex flex-col max-h-[600px]">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-t-3xl">
            <h3 className="font-bold text-xl">🧑‍🍳 Recipe Assistant</h3>
            <p className="text-sm opacity-90">Ask me about any recipe!</p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[300px] max-h-[400px]">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="mb-4">👋 Hi! I can help you with:</p>
                <ul className="text-sm space-y-2 text-left max-w-xs mx-auto">
                  <li>🇫🇷 French cuisine</li>
                  <li>🇪🇸 Spanish dishes</li>
                  <li>🇺🇸 American classics</li>
                  <li>👨‍🍳 Cooking tips</li>
                </ul>
              </div>
            )}
            
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Ask about recipes..."
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none"
                disabled={chatLoading}
              />
              <button
                onClick={handleChatSubmit}
                disabled={chatLoading || !chatInput.trim()}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

