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
      title: 'African & Global Search',
      description: 'Discover authentic African dishes from all regions plus global cuisines. Fast, accurate results.',
      action: 'Search Recipes',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 1,
      icon: '📸',
      title: 'Image Recognition',
      description: 'Upload any dish photo for instant identification with origin, ingredients, and cooking method.',
      action: 'Upload Photo',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 2,
      icon: '🥘',
      title: 'Ingredient Analyzer',
      description: 'List your ingredients and get African-style recipes with local spices and traditional techniques.',
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
      
      // WEST AFRICAN DISHES
      if (ingredientList.includes('rice') || ingredientList.includes('tomato')) {
        products.push({
          name: 'Jollof Rice',
          image: '🍚',
          category: 'West African (Nigeria/Ghana)',
          recipe: [
            '⚡ QUICK TIP: The king of West African rice! One-pot wonder.',
            '🌍 ORIGIN: Nigeria, Ghana, Senegal',
            '1️⃣ Blend 4 tomatoes, 2 bell peppers, 1 onion, 2 scotch bonnets',
            '2️⃣ Heat oil, fry tomato paste for 5 minutes',
            '3️⃣ Add blended mix, cook 15 minutes until thick',
            '4️⃣ Add curry, thyme, bay leaves, stock cubes',
            '5️⃣ Pour 3 cups stock, bring to boil',
            '6️⃣ Add 2 cups parboiled rice, stir once',
            '7️⃣ Cover tight, cook on low 30 minutes',
            '8️⃣ Don\'t stir! Let it steam',
            '🎯 Serve with fried plantain and chicken!'
          ]
        });
      }
      
      if (ingredientList.includes('beans') || ingredientList.includes('plantain')) {
        products.push({
          name: 'Waakye',
          image: '🫘',
          category: 'West African (Ghana)',
          recipe: [
            '⚡ QUICK TIP: Ghanaian rice and beans with sorghum leaves!',
            '🌍 ORIGIN: Ghana',
            '1️⃣ Soak 2 cups black-eyed peas overnight',
            '2️⃣ Boil peas with dried sorghum leaves (or baking soda)',
            '3️⃣ Add 2 cups rice after 20 minutes',
            '4️⃣ Cook until tender (30 minutes)',
            '5️⃣ Season with salt',
            '6️⃣ Serve with shito (pepper sauce)',
            '7️⃣ Add fried fish or boiled eggs',
            '8️⃣ Top with gari (cassava flakes)',
            '🎯 Traditional breakfast or lunch!'
          ]
        });
      }
      
      if (ingredientList.includes('chicken') || ingredientList.includes('peanut')) {
        products.push({
          name: 'Groundnut Soup',
          image: '🥜',
          category: 'West African (Ghana/Nigeria)',
          recipe: [
            '⚡ QUICK TIP: Creamy peanut soup - rich and satisfying!',
            '🌍 ORIGIN: Ghana, Nigeria',
            '1️⃣ Season chicken with salt, ginger, garlic',
            '2️⃣ Boil chicken in 6 cups water (30 min)',
            '3️⃣ Blend 1 cup roasted peanuts smooth',
            '4️⃣ Add peanut butter to chicken stock',
            '5️⃣ Add tomato paste, onions, peppers',
            '6️⃣ Simmer 20 minutes, stir constantly',
            '7️⃣ Add vegetables (eggplant, okra)',
            '8️⃣ Cook until thick and creamy',
            '🎯 Serve with fufu, banku, or rice!'
          ]
        });
      }
      
      // EAST AFRICAN DISHES
      if (ingredientList.includes('lentils') || ingredientList.includes('onion')) {
        products.push({
          name: 'Misir Wot',
          image: '🫘',
          category: 'East African (Ethiopia)',
          recipe: [
            '⚡ QUICK TIP: Spicy Ethiopian red lentil stew!',
            '🌍 ORIGIN: Ethiopia',
            '1️⃣ Soak 2 cups red lentils 30 minutes',
            '2️⃣ Sauté 2 chopped onions until golden',
            '3️⃣ Add 2 tbsp berbere spice, 1 tbsp paprika',
            '4️⃣ Add tomato paste, cook 5 minutes',
            '5️⃣ Add lentils and 4 cups water',
            '6️⃣ Simmer 30 minutes until thick',
            '7️⃣ Add garlic, ginger paste',
            '8️⃣ Season with salt',
            '🎯 Serve with injera (sour flatbread)!'
          ]
        });
      }
      
      if (ingredientList.includes('beef') || ingredientList.includes('meat')) {
        products.push({
          name: 'Nyama Choma',
          image: '🍖',
          category: 'East African (Kenya)',
          recipe: [
            '⚡ QUICK TIP: Kenyan grilled meat - simple and delicious!',
            '🌍 ORIGIN: Kenya, Tanzania',
            '1️⃣ Cut beef/goat into large chunks',
            '2️⃣ Season with salt, pepper, garlic',
            '3️⃣ Marinate 2 hours (optional)',
            '4️⃣ Grill over charcoal or high heat',
            '5️⃣ Turn every 5 minutes',
            '6️⃣ Cook 20-30 minutes until charred',
            '7️⃣ Slice into bite-size pieces',
            '8️⃣ Serve with kachumbari (tomato salad)',
            '🎯 Eat with ugali and sukuma wiki!'
          ]
        });
      }
      
      // NORTH AFRICAN DISHES
      if (ingredientList.includes('couscous') || ingredientList.includes('vegetables')) {
        products.push({
          name: 'Couscous',
          image: '🍲',
          category: 'North African (Morocco)',
          recipe: [
            '⚡ QUICK TIP: Moroccan steamed semolina with vegetables!',
            '🌍 ORIGIN: Morocco, Algeria, Tunisia',
            '1️⃣ Boil 2 cups water with salt and butter',
            '2️⃣ Pour over 2 cups couscous, cover 5 min',
            '3️⃣ Fluff with fork',
            '4️⃣ Sauté onions, carrots, zucchini, chickpeas',
            '5️⃣ Add cumin, coriander, turmeric',
            '6️⃣ Add tomatoes and stock, simmer 20 min',
            '7️⃣ Serve vegetables over couscous',
            '8️⃣ Top with raisins and almonds',
            '🎯 Add harissa for spice!'
          ]
        });
      }
      
      if (ingredientList.includes('lamb') || ingredientList.includes('apricot')) {
        products.push({
          name: 'Tagine',
          image: '🍯',
          category: 'North African (Morocco)',
          recipe: [
            '⚡ QUICK TIP: Slow-cooked Moroccan stew - sweet and savory!',
            '🌍 ORIGIN: Morocco',
            '1️⃣ Brown 1 lb lamb in olive oil',
            '2️⃣ Add onions, garlic, ginger',
            '3️⃣ Add cinnamon, cumin, saffron, paprika',
            '4️⃣ Add tomatoes and stock',
            '5️⃣ Add dried apricots, prunes, honey',
            '6️⃣ Cover, simmer 1.5 hours',
            '7️⃣ Add chickpeas last 15 minutes',
            '8️⃣ Garnish with almonds and cilantro',
            '🎯 Serve with couscous or bread!'
          ]
        });
      }
      
      // SOUTHERN AFRICAN DISHES
      if (ingredientList.includes('corn') || ingredientList.includes('maize')) {
        products.push({
          name: 'Pap (Sadza/Ugali)',
          image: '🌽',
          category: 'Southern African (South Africa/Zimbabwe)',
          recipe: [
            '⚡ QUICK TIP: Staple cornmeal porridge - easy and filling!',
            '🌍 ORIGIN: South Africa, Zimbabwe, Zambia',
            '1️⃣ Boil 4 cups water with salt',
            '2️⃣ Slowly add 2 cups maize meal',
            '3️⃣ Stir constantly to avoid lumps',
            '4️⃣ Cook 10 minutes on low heat',
            '5️⃣ Add more maize meal for thickness',
            '6️⃣ Stir vigorously until smooth',
            '7️⃣ Cover, steam 5 minutes',
            '8️⃣ Shape into balls or serve soft',
            '🎯 Serve with stew, meat, or vegetables!'
          ]
        });
      }
      
      if (ingredientList.includes('cabbage') || ingredientList.includes('greens')) {
        products.push({
          name: 'Chakalaka',
          image: '🥗',
          category: 'Southern African (South Africa)',
          recipe: [
            '⚡ QUICK TIP: Spicy South African vegetable relish!',
            '🌍 ORIGIN: South Africa',
            '1️⃣ Heat oil, sauté onions and garlic',
            '2️⃣ Add grated carrots and peppers',
            '3️⃣ Add curry powder, paprika, chili',
            '4️⃣ Add shredded cabbage',
            '5️⃣ Add canned baked beans and tomatoes',
            '6️⃣ Simmer 20 minutes',
            '7️⃣ Season with salt and pepper',
            '8️⃣ Add vinegar for tang',
            '🎯 Serve with pap, bread, or braai!'
          ]
        });
      }
      
      // CENTRAL AFRICAN DISHES
      if (ingredientList.includes('cassava') || ingredientList.includes('fish')) {
        products.push({
          name: 'Poulet Moambé',
          image: '🍗',
          category: 'Central African (Congo/Gabon)',
          recipe: [
            '⚡ QUICK TIP: Rich chicken in palm butter sauce!',
            '🌍 ORIGIN: Congo, Gabon, Angola',
            '1️⃣ Season chicken with salt, pepper, garlic',
            '2️⃣ Brown chicken in oil',
            '3️⃣ Remove chicken, sauté onions',
            '4️⃣ Add tomato paste and palm butter',
            '5️⃣ Add chicken stock, bring to boil',
            '6️⃣ Return chicken, add scotch bonnet',
            '7️⃣ Simmer 40 minutes',
            '8️⃣ Add spinach or cassava leaves',
            '🎯 Serve with fufu or rice!'
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
    
    // Navigate to dedicated search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.toLowerCase())}`;
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setChatLoading(true);
    
    setTimeout(() => {
      const msg = userMessage.toLowerCase();
      let response = '';
      
      if (msg.includes('jollof') || msg.includes('west africa')) {
        response = '🍚 Jollof Rice is West Africa\'s signature dish! Key: blend tomatoes/peppers, fry tomato paste first, use parboiled rice, don\'t stir after adding rice. Cook covered 30 min. Nigerian vs Ghanaian style differs in spice level and smokiness.';
      } else if (msg.includes('injera') || msg.includes('ethiopia')) {
        response = '🫓 Injera is Ethiopian sourdough flatbread made from teff flour. Ferment 3 days for sour taste. Cook on hot pan until bubbles form. Serve with misir wot (lentils), doro wot (chicken), or kitfo (raw beef). Eat with hands!';
      } else if (msg.includes('tagine') || msg.includes('morocco')) {
        response = '🍯 Tagine is Moroccan slow-cooked stew. Use lamb/chicken, add sweet (apricots, prunes, honey) + savory (cumin, cinnamon, saffron). Cook 1.5 hours. Serve with couscous. Named after the clay pot used!';
      } else if (msg.includes('suya') || msg.includes('nigeria')) {
        response = '🍢 Suya is Nigerian spicy grilled meat! Mix ground peanuts + cayenne + ginger + bouillon. Coat thin beef strips, grill over charcoal 10-15 min. Serve with onions, tomatoes, cabbage. Street food favorite!';
      } else if (msg.includes('fufu') || msg.includes('pounded')) {
        response = '🥔 Fufu is pounded cassava/plantain staple. Boil until soft, pound in mortar with water until smooth and stretchy. Shape into balls. Eat with soup (egusi, groundnut, okra). Don\'t chew - swallow!';
      } else if (msg.includes('pap') || msg.includes('ugali') || msg.includes('sadza')) {
        response = '🌽 Pap/Ugali/Sadza is cornmeal porridge - same dish, different names! Boil water, add maize meal slowly while stirring. Cook 10 min until thick. Serve with stew, meat, or vegetables. Staple across Africa!';
      } else if (msg.includes('berbere') || msg.includes('spice')) {
        response = '🌶️ Berbere is Ethiopian spice blend: chili, fenugreek, coriander, cardamom, black pepper, cinnamon, cloves, ginger. Use in wot (stews). Substitute: cayenne + paprika + cumin + coriander + ginger.';
      } else if (msg.includes('substitute') || msg.includes('replace')) {
        response = '🔄 Common substitutes: Scotch bonnet → habanero/cayenne. Palm oil → red palm butter/vegetable oil + paprika. Cassava flour → potato starch. Plantain → banana (less starchy). Teff → whole wheat + buckwheat.';
      } else {
        response = '⚡ I specialize in African cuisines! Ask about:\n🌍 West: jollof, suya, fufu, egusi\n🌍 East: injera, nyama choma, pilau\n🌍 North: tagine, couscous, harira\n🌍 South: pap, chakalaka, bobotie\n🌍 Central: poulet moambé\n\nOr ask about ingredients, spices, substitutions!';
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setChatLoading(false);
    }, 800);
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
            Fast. Smart. African-First.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-light">
            Discover African cuisines and global recipes—identify dishes, cook with what you have
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
                  placeholder="Search African dishes, global recipes, or ingredients..."
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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
            Three Ways to Cook
          </h2>
          <p className="text-center text-gray-600 mb-8">Swipe to explore on mobile</p>
          
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
                List your ingredients → Get African-style recipes with local spices!
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
                    placeholder="e.g., chicken, rice, tomatoes, peppers, onions, plantain..."
                    className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none min-h-40 text-lg bg-gray-50 hover:bg-white transition-all"
                  />
                </div>
                <button
                  onClick={analyzeIngredients}
                  disabled={analyzing || !ingredients.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all duration-200"
                >
                  {analyzing ? 'Analyzing...' : 'Get Recipe Instantly'}
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
          <p className="text-sm font-medium">⚡ Fast • Accurate • African-First • Global Support</p>
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
              <span className="text-2xl">⚡</span>
              African Cuisine Expert
            </h3>
            <p className="text-sm opacity-90 mt-1">Fast answers • All regions • Substitutions</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px] max-h-[400px] bg-gradient-to-br from-blue-50 to-white">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-600 mt-8">
                <p className="mb-6 font-medium">⚡ Fast African cuisine expert!</p>
                <div className="space-y-3 text-left max-w-xs mx-auto">
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">🌍</span> West African dishes
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">🌍</span> East African recipes
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">🌍</span> North African cuisine
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">🌍</span> Southern African food
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-bold">🔄</span> Ingredient substitutes
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
                placeholder="Ask about African dishes, spices, substitutes..."
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

