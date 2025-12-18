'use client';

import { useState } from 'react';

type IngredientInput = 'photo' | 'list';
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

export default function IngredientMixer() {
  const [inputMethod, setInputMethod] = useState<IngredientInput | null>(null);
  const [ingredients, setIngredients] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate photo processing
      setAnalyzing(true);
      setTimeout(() => {
        setIngredients('Flour, Sugar, Eggs, Butter, Vanilla Extract');
        setAnalyzing(false);
      }, 2000);
    }
  };

  const analyzeIngredients = () => {
    if (!ingredients.trim()) return;
    
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const ingredientList = ingredients.toLowerCase();
      const products: Array<{name: string; image: string; recipe: string[]; category: string;}> = [];
      
      // Check for dangerous combinations
      const hasBleach = ingredientList.includes('bleach');
      const hasAmmonia = ingredientList.includes('ammonia');
      const hasBakingSoda = ingredientList.includes('baking soda');
      const hasVinegar = ingredientList.includes('vinegar');
      
      if ((hasBleach && hasAmmonia) || (hasBleach && hasVinegar)) {
        setResult({
          isSafe: false,
          products: [],
          warnings: ['⚠️ DANGEROUS COMBINATION! Never mix bleach with ammonia or vinegar - produces toxic gas!'],
          corrections: ['Remove bleach from the mix', 'Use safer cleaning alternatives separately']
        });
        setAnalyzing(false);
        return;
      }
      
      // BAKING & DESSERTS
      if (ingredientList.includes('flour') && ingredientList.includes('sugar')) {
        products.push({
          name: 'Chocolate Chip Cookies',
          image: '🍪',
          category: 'Dessert',
          recipe: [
            'Preheat oven to 375°F (190°C)',
            'Mix butter and sugars until creamy',
            'Beat in eggs and vanilla',
            'Combine flour, baking soda, and salt',
            'Stir in chocolate chips',
            'Bake for 9-11 minutes'
          ]
        });
        
        if (ingredientList.includes('egg')) {
          products.push({
            name: 'Vanilla Cake',
            image: '🎂',
            category: 'Dessert',
            recipe: [
              'Preheat oven to 350°F (175°C)',
              'Cream butter and sugar',
              'Add eggs one at a time',
              'Mix in vanilla extract',
              'Alternate adding flour and milk',
              'Bake for 30-35 minutes'
            ]
          });
        }
        
        products.push({
          name: 'Biscuits',
          image: '🥐',
          category: 'Baked Goods',
          recipe: [
            'Mix flour, baking powder, and salt',
            'Cut in cold butter until crumbly',
            'Add milk and stir until just combined',
            'Roll out and cut into rounds',
            'Bake at 450°F for 12-15 minutes'
          ]
        });
      }
      
      // ICE CREAM & FROZEN TREATS
      if ((ingredientList.includes('cream') || ingredientList.includes('milk')) && ingredientList.includes('sugar')) {
        products.push({
          name: 'Vanilla Ice Cream',
          image: '🍦',
          category: 'Frozen Dessert',
          recipe: [
            'Heat milk and cream until warm',
            'Whisk egg yolks with sugar',
            'Temper eggs with warm milk mixture',
            'Cook until thickened',
            'Add vanilla extract and chill',
            'Churn in ice cream maker for 20-25 minutes'
          ]
        });
      }
      
      // PIZZA & ITALIAN
      if (ingredientList.includes('tomato') && ingredientList.includes('cheese')) {
        products.push({
          name: 'Margherita Pizza',
          image: '🍕',
          category: 'Main Course',
          recipe: [
            'Prepare pizza dough and let rise',
            'Roll out dough into circle',
            'Spread tomato sauce',
            'Add fresh mozzarella cheese',
            'Top with basil leaves',
            'Bake at 475°F for 12-15 minutes'
          ]
        });
        
        products.push({
          name: 'Pasta Marinara',
          image: '🍝',
          category: 'Main Course',
          recipe: [
            'Cook pasta in salted boiling water',
            'Sauté garlic in olive oil',
            'Add crushed tomatoes and simmer',
            'Season with basil, salt, and pepper',
            'Toss with cooked pasta',
            'Top with grated cheese'
          ]
        });
      }
      
      // BEVERAGES
      if (ingredientList.includes('coffee') || ingredientList.includes('espresso')) {
        products.push({
          name: 'Cappuccino',
          image: '☕',
          category: 'Beverage',
          recipe: [
            'Brew a shot of espresso',
            'Steam milk until frothy',
            'Pour espresso into cup',
            'Add steamed milk',
            'Top with milk foam',
            'Optional: dust with cocoa powder'
          ]
        });
      }
      
      if (ingredientList.includes('tea') || ingredientList.includes('lemon')) {
        products.push({
          name: 'Iced Lemon Tea',
          image: '🍹',
          category: 'Beverage',
          recipe: [
            'Brew strong black tea',
            'Add sugar while hot and stir',
            'Let cool to room temperature',
            'Add fresh lemon juice',
            'Pour over ice',
            'Garnish with lemon slices'
          ]
        });
      }
      
      if (ingredientList.includes('fruit') || ingredientList.includes('banana') || ingredientList.includes('strawberry')) {
        products.push({
          name: 'Fruit Smoothie',
          image: '🥤',
          category: 'Beverage',
          recipe: [
            'Add frozen fruits to blender',
            'Pour in milk or yogurt',
            'Add honey or sugar to taste',
            'Blend until smooth',
            'Add ice if needed',
            'Serve immediately'
          ]
        });
      }
      
      // BREAD & BAKED GOODS
      if (ingredientList.includes('flour') && ingredientList.includes('yeast')) {
        products.push({
          name: 'Homemade Bread',
          image: '🍞',
          category: 'Baked Goods',
          recipe: [
            'Mix flour, yeast, salt, and water',
            'Knead dough for 10 minutes',
            'Let rise for 1-2 hours',
            'Shape into loaf',
            'Let rise again for 30 minutes',
            'Bake at 375°F for 30-35 minutes'
          ]
        });
      }
      
      // CONDIMENTS & SAUCES
      if (ingredientList.includes('oil') && ingredientList.includes('vinegar')) {
        products.push({
          name: 'Salad Dressing',
          image: '🥗',
          category: 'Condiment',
          recipe: [
            'Combine vinegar and mustard',
            'Slowly whisk in olive oil',
            'Add minced garlic',
            'Season with salt and pepper',
            'Add herbs if desired',
            'Store in refrigerator'
          ]
        });
      }
      
      if (ingredientList.includes('mayonnaise') || (ingredientList.includes('egg') && ingredientList.includes('oil'))) {
        products.push({
          name: 'Homemade Mayonnaise',
          image: '🥫',
          category: 'Condiment',
          recipe: [
            'Whisk egg yolk with mustard',
            'Very slowly drizzle in oil while whisking',
            'Continue until thick and creamy',
            'Add lemon juice',
            'Season with salt',
            'Refrigerate immediately'
          ]
        });
      }
      
      // RICE DISHES
      if (ingredientList.includes('rice')) {
        products.push({
          name: 'Fried Rice',
          image: '🍚',
          category: 'Main Course',
          recipe: [
            'Use day-old cooked rice',
            'Heat oil in wok or large pan',
            'Scramble eggs and set aside',
            'Stir-fry vegetables',
            'Add rice and break up clumps',
            'Add soy sauce and mix in eggs'
          ]
        });
        
        if (ingredientList.includes('coconut')) {
          products.push({
            name: 'Coconut Rice',
            image: '🥥',
            category: 'Side Dish',
            recipe: [
              'Rinse rice thoroughly',
              'Combine rice with coconut milk',
              'Add salt and sugar',
              'Bring to boil then reduce heat',
              'Cover and simmer for 15-20 minutes',
              'Fluff with fork before serving'
            ]
          });
        }
      }
      
      // SOUP & STEWS
      if (ingredientList.includes('broth') || ingredientList.includes('stock')) {
        products.push({
          name: 'Vegetable Soup',
          image: '🍲',
          category: 'Soup',
          recipe: [
            'Sauté onions and garlic',
            'Add chopped vegetables',
            'Pour in broth or stock',
            'Season with herbs and spices',
            'Simmer until vegetables are tender',
            'Adjust seasoning and serve hot'
          ]
        });
      }
      
      // MEAT DISHES
      if (ingredientList.includes('chicken') || ingredientList.includes('beef') || ingredientList.includes('meat')) {
        products.push({
          name: 'Grilled Meat',
          image: '🍖',
          category: 'Main Course',
          recipe: [
            'Marinate meat with spices',
            'Let sit for at least 30 minutes',
            'Preheat grill to medium-high',
            'Grill meat until cooked through',
            'Let rest for 5 minutes',
            'Slice and serve'
          ]
        });
      }
      
      // AFRICAN/LOCAL DISHES
      if (ingredientList.includes('plantain') || ingredientList.includes('yam')) {
        products.push({
          name: 'Fried Plantain',
          image: '🍌',
          category: 'Side Dish',
          recipe: [
            'Peel ripe plantains',
            'Slice diagonally',
            'Heat oil in frying pan',
            'Fry until golden brown',
            'Flip and fry other side',
            'Drain on paper towels'
          ]
        });
      }
      
      if (ingredientList.includes('beans') || ingredientList.includes('palm oil')) {
        products.push({
          name: 'Beans Porridge',
          image: '🫘',
          category: 'Main Course',
          recipe: [
            'Soak beans overnight',
            'Cook beans until soft',
            'Add palm oil and onions',
            'Season with salt and pepper',
            'Add vegetables if desired',
            'Simmer until thick'
          ]
        });
      }
      
      if (ingredientList.includes('cassava') || ingredientList.includes('garri')) {
        products.push({
          name: 'Garri (Eba)',
          image: '🥣',
          category: 'Staple Food',
          recipe: [
            'Boil water in pot',
            'Gradually add garri while stirring',
            'Stir vigorously to avoid lumps',
            'Continue until thick and smooth',
            'Mold into desired shape',
            'Serve with soup or stew'
          ]
        });
      }
      
      // ASIAN DISHES
      if (ingredientList.includes('noodle') || ingredientList.includes('ramen')) {
        products.push({
          name: 'Stir-Fried Noodles',
          image: '🍜',
          category: 'Main Course',
          recipe: [
            'Cook noodles according to package',
            'Heat oil in wok',
            'Stir-fry vegetables and protein',
            'Add cooked noodles',
            'Season with soy sauce',
            'Toss everything together'
          ]
        });
      }
      
      // MEXICAN DISHES
      if (ingredientList.includes('tortilla') || ingredientList.includes('corn')) {
        products.push({
          name: 'Tacos',
          image: '🌮',
          category: 'Main Course',
          recipe: [
            'Warm tortillas',
            'Cook seasoned meat or beans',
            'Fill tortillas with filling',
            'Add lettuce and tomatoes',
            'Top with cheese and salsa',
            'Serve immediately'
          ]
        });
      }
      
      // BREAKFAST ITEMS
      if (ingredientList.includes('egg')) {
        products.push({
          name: 'Scrambled Eggs',
          image: '🍳',
          category: 'Breakfast',
          recipe: [
            'Beat eggs with milk',
            'Season with salt and pepper',
            'Heat butter in pan',
            'Pour in egg mixture',
            'Stir gently as eggs cook',
            'Remove when still slightly soft'
          ]
        });
        
        if (ingredientList.includes('flour')) {
          products.push({
            name: 'Pancakes',
            image: '🥞',
            category: 'Breakfast',
            recipe: [
              'Mix flour, sugar, baking powder',
              'Whisk eggs with milk',
              'Combine wet and dry ingredients',
              'Heat griddle or pan',
              'Pour batter and cook until bubbles form',
              'Flip and cook until golden'
            ]
          });
        }
      }
      
      // COSMETICS
      if (ingredientList.includes('shea butter') || ingredientList.includes('coconut oil')) {
        products.push({
          name: 'Body Butter',
          image: '🧴',
          category: 'Cosmetic',
          recipe: [
            'Melt shea butter in double boiler',
            'Add coconut oil',
            'Remove from heat and let cool',
            'Whip with mixer until fluffy',
            'Add essential oils if desired',
            'Store in clean container'
          ]
        });
      }
      
      // CLEANING PRODUCTS
      if (hasBakingSoda && hasVinegar && !hasBleach) {
        products.push({
          name: 'Natural Cleaner',
          image: '🧽',
          category: 'Cleaning',
          recipe: [
            'Mix baking soda with water to form paste',
            'Apply to surface',
            'Spray with vinegar (will fizz)',
            'Let sit for 5-10 minutes',
            'Scrub and wipe clean',
            'Rinse with water'
          ]
        });
      }
      
      // PAINT & ART
      if (ingredientList.includes('pigment') || ingredientList.includes('acrylic') || ingredientList.includes('paint')) {
        products.push({
          name: 'Custom Paint Mix',
          image: '🎨',
          category: 'Art Supply',
          recipe: [
            'Start with base paint color',
            'Add small amounts of pigment',
            'Mix thoroughly',
            'Test color on paper',
            'Adjust by adding more pigment or base',
            'Store in airtight container'
          ]
        });
      }
      
      // Default if no matches
      if (products.length === 0) {
        products.push({
          name: 'Custom Creation',
          image: '🥘',
          category: 'Experimental',
          recipe: [
            'Combine your ingredients carefully',
            'Mix well in appropriate container',
            'Follow safety guidelines for each ingredient',
            'Cook or process as needed',
            'Season or adjust to taste',
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

  const reset = () => {
    setInputMethod(null);
    setIngredients('');
    setResult(null);
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setChatLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      const query = userMessage.toLowerCase();
      
      // Recipe queries
      if (query.includes('pizza')) {
        response = '🍕 To make pizza, you\'ll need: flour, yeast, water, salt, olive oil for the dough. For toppings: tomato sauce, mozzarella cheese, and your favorite toppings like pepperoni, mushrooms, or basil. Mix flour, yeast, salt, and water to form dough. Let it rise for 1-2 hours. Roll out, add sauce and toppings, then bake at 475°F for 12-15 minutes!';
      } else if (query.includes('cake')) {
        response = '🎂 For a basic cake, you need: flour, sugar, eggs, butter, baking powder, milk, and vanilla extract. Cream butter and sugar, add eggs one at a time, then alternate adding flour mixture and milk. Bake at 350°F for 30-35 minutes. You can make chocolate cake by adding cocoa powder!';
      } else if (query.includes('cookie')) {
        response = '🍪 Cookie basics: flour, sugar, butter, eggs, baking soda, and vanilla. For chocolate chip cookies, add chocolate chips! Mix butter and sugar, add eggs, then flour mixture. Drop spoonfuls on baking sheet and bake at 375°F for 9-11 minutes.';
      } else if (query.includes('ice cream')) {
        response = '🍦 Ice cream needs: heavy cream, milk, sugar, egg yolks, and vanilla extract. Heat cream and milk, temper egg yolks with sugar, cook until thick, chill completely, then churn in an ice cream maker. You can add flavors like chocolate, strawberry, or coffee!';
      } else if (query.includes('bread')) {
        response = '🍞 Bread ingredients: flour, yeast, water, salt, and a bit of sugar. Mix ingredients, knead for 10 minutes, let rise for 1-2 hours, shape, let rise again, then bake at 375°F for 30-35 minutes. The key is patience with the rising!';
      } else if (query.includes('pasta')) {
        response = '🍝 Fresh pasta needs: flour and eggs (about 1 egg per 100g flour). Mix into dough, knead until smooth, rest for 30 minutes, then roll thin and cut into shapes. Cook in boiling salted water for 2-3 minutes. For sauce, try tomato, cream, or olive oil with garlic!';
      } else if (query.includes('smoothie')) {
        response = '🥤 Smoothies are easy! Blend frozen fruits (banana, berries, mango), milk or yogurt, and honey or sugar to taste. Add ice if needed. Popular combos: strawberry-banana, mango-pineapple, or berry blast!';
      } else if (query.includes('soup')) {
        response = '🍲 Basic soup: sauté onions and garlic, add vegetables, pour in broth or stock, season with herbs, and simmer until tender. You can make chicken soup, vegetable soup, tomato soup, or any combination you like!';
      } else if (query.includes('pancake')) {
        response = '🥞 Pancakes need: flour, sugar, baking powder, egg, milk, and melted butter. Mix dry ingredients, whisk wet ingredients separately, combine gently. Cook on hot griddle until bubbles form, flip, and cook until golden. Serve with syrup!';
      } else if (query.includes('fried rice')) {
        response = '🍚 Fried rice tip: use day-old rice! Heat oil in wok, scramble eggs and set aside, stir-fry vegetables, add rice and break up clumps, season with soy sauce, mix in eggs. Add protein like chicken, shrimp, or keep it vegetarian!';
      } else if (query.includes('plantain')) {
        response = '🍌 Fried plantain: use ripe (yellow with black spots) plantains. Peel, slice diagonally, fry in hot oil until golden brown on both sides. Drain on paper towels. Sweet and delicious!';
      } else if (query.includes('beans')) {
        response = '🫘 Beans porridge: soak beans overnight, cook until soft, add palm oil, onions, salt, pepper, and vegetables. Simmer until thick. You can also make bean soup, refried beans, or add to rice!';
      } else if (query.includes('cosmetic') || query.includes('body butter') || query.includes('lotion')) {
        response = '🧴 For body butter: melt shea butter in double boiler, add coconut oil, let cool, then whip until fluffy. Add essential oils for scent. Store in clean container. Great for dry skin!';
      } else if (query.includes('cleaner') || query.includes('cleaning')) {
        response = '🧽 Natural cleaner: mix baking soda with water to make paste, apply to surface, spray with vinegar (it will fizz!), let sit 5-10 minutes, scrub and wipe. NEVER mix bleach with vinegar or ammonia - very dangerous!';
      } else if (query.includes('paint')) {
        response = '🎨 For custom paint: start with base color, add small amounts of pigment, mix thoroughly, test on paper, adjust as needed. Mix colors: red + yellow = orange, blue + yellow = green, red + blue = purple!';
      } else if (query.includes('taco')) {
        response = '🌮 Tacos: warm tortillas, fill with seasoned meat or beans, add lettuce, tomatoes, cheese, and salsa. Season meat with cumin, chili powder, garlic, and paprika. Top with sour cream and guacamole!';
      } else if (query.includes('noodle') || query.includes('ramen')) {
        response = '🍜 Stir-fried noodles: cook noodles, drain. Heat oil in wok, stir-fry vegetables and protein, add noodles, season with soy sauce and sesame oil. Add garlic, ginger, and chili for extra flavor!';
      } else if (query.includes('salad')) {
        response = '🥗 Salad dressing: whisk vinegar with mustard, slowly drizzle in olive oil while whisking, add minced garlic, salt, pepper, and herbs. Classic ratio is 3 parts oil to 1 part vinegar!';
      } else if (query.includes('egg')) {
        response = '🍳 Eggs are versatile! Scrambled: beat with milk, cook in butter, stir gently. Fried: cook in oil until whites set. Boiled: 6 mins soft, 10 mins hard. Omelette: beat eggs, cook, add fillings, fold. Poached: simmer in water with vinegar!';
      } else if (query.includes('coconut rice')) {
        response = '🥥 Coconut rice: rinse rice, cook with coconut milk instead of water, add salt and a bit of sugar. The coconut milk makes it creamy and flavorful. Great with curry or grilled meat!';
      } else if (query.includes('mayonnaise')) {
        response = '🥫 Homemade mayo: whisk egg yolk with mustard, VERY slowly drizzle in oil while whisking constantly until thick, add lemon juice and salt. Must refrigerate immediately. Use within 3-4 days!';
      } else if (query.includes('biscuit')) {
        response = '🥐 Biscuits: mix flour, baking powder, salt. Cut in COLD butter until crumbly. Add milk, stir just until combined (don\'t overmix!). Roll out, cut rounds, bake at 450°F for 12-15 minutes. Serve warm with butter!';
      } else if (query.includes('cappuccino') || query.includes('coffee')) {
        response = '☕ Cappuccino: brew espresso shot, steam milk until frothy, pour espresso into cup, add steamed milk, top with foam. Ratio is 1/3 espresso, 1/3 steamed milk, 1/3 foam. Dust with cocoa if desired!';
      } else if (query.includes('tea')) {
        response = '🍹 Iced tea: brew strong tea, add sugar while hot, let cool, add lemon juice, pour over ice. For hot tea: steep tea bag 3-5 minutes depending on strength desired. Green tea needs cooler water than black tea!';
      } else if (query.includes('garri') || query.includes('eba')) {
        response = '🥣 Garri (Eba): boil water, gradually add garri while stirring vigorously to avoid lumps. Continue stirring until thick and smooth. Mold into ball shape. Serve with soup like egusi, okra, or vegetable soup!';
      } else if (query.includes('what can i make') || query.includes('ingredients')) {
        response = 'Tell me what ingredients you have, and I\'ll suggest recipes! You can make cakes, cookies, pizza, ice cream, bread, pasta, soups, fried rice, smoothies, pancakes, local dishes like fried plantain and beans porridge, and even cosmetics or cleaning products. What do you have in your pantry?';
      } else if (query.includes('substitute') || query.includes('replace')) {
        response = 'Common substitutes: butter → oil or margarine; milk → water or plant milk; eggs → flax eggs (1 tbsp flax + 3 tbsp water) or applesauce; sugar → honey or maple syrup; flour → almond flour or oat flour. What ingredient do you need to replace?';
      } else if (query.includes('vegan') || query.includes('vegetarian')) {
        response = 'For vegan cooking: replace eggs with flax eggs or applesauce, use plant milk instead of dairy, use coconut oil or vegan butter, and nutritional yeast for cheesy flavor. Many recipes can be veganized! What would you like to make?';
      } else if (query.includes('gluten free')) {
        response = 'For gluten-free: use gluten-free flour blends, almond flour, coconut flour, or oat flour. Rice, quinoa, and corn are naturally gluten-free. Check labels on sauces and seasonings. What recipe are you adapting?';
      } else if (query.includes('dangerous') || query.includes('toxic') || query.includes('safe')) {
        response = '⚠️ NEVER mix: bleach + ammonia (toxic gas), bleach + vinegar (toxic gas), bleach + rubbing alcohol (chloroform). Keep food ingredients separate from cleaning chemicals. Always research before mixing unfamiliar substances!';
      } else {
        response = 'I can help you with recipes for cakes, cookies, pizza, ice cream, bread, pasta, soups, smoothies, pancakes, fried rice, local dishes, and more! I can also advise on cosmetics, cleaning products, and ingredient safety. What would you like to know about?';
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setChatLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🧪 Ingredient Mix Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Discover what you can make from your ingredients
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {!inputMethod && !result && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                How would you like to add ingredients?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setInputMethod('photo')}
                  className="p-8 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all group"
                >
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Take a Photo</h3>
                  <p className="text-gray-600">Snap a picture of your ingredients</p>
                </button>
                
                <button
                  onClick={() => setInputMethod('list')}
                  className="p-8 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Type a List</h3>
                  <p className="text-gray-600">Enter your pantry items</p>
                </button>
              </div>
            </div>
          )}

          {inputMethod === 'photo' && !result && (
            <div className="space-y-4">
              <button onClick={reset} className="text-gray-600 hover:text-gray-800 mb-4">
                ← Back
              </button>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-lg text-gray-700 mb-2">Click to take or upload a photo</p>
                  <p className="text-sm text-gray-500">We'll identify the ingredients for you</p>
                </label>
              </div>
              {ingredients && (
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2">Detected ingredients:</p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-800">{ingredients}</p>
                  </div>
                  <button
                    onClick={analyzeIngredients}
                    disabled={analyzing}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
                  >
                    {analyzing ? 'Analyzing...' : 'Analyze Mix'}
                  </button>
                </div>
              )}
            </div>
          )}

          {inputMethod === 'list' && !result && (
            <div className="space-y-4">
              <button onClick={reset} className="text-gray-600 hover:text-gray-800 mb-4">
                ← Back
              </button>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Enter your ingredients (comma-separated)
                </label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., flour, sugar, eggs, butter, vanilla extract"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none min-h-32"
                />
              </div>
              <button
                onClick={analyzeIngredients}
                disabled={analyzing || !ingredients.trim()}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Mix'}
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <button onClick={reset} className="text-gray-600 hover:text-gray-800 mb-4">
                ← Start Over
              </button>

              {!result.isSafe && (
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-red-800 mb-4">⚠️ Unsafe Combination!</h3>
                  {result.warnings?.map((warning, idx) => (
                    <p key={idx} className="text-red-700 mb-2 font-semibold">{warning}</p>
                  ))}
                  {result.corrections && result.corrections.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-red-800 mb-2">Suggested Corrections:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.corrections.map((correction, idx) => (
                          <li key={idx} className="text-red-700">{correction}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {result.isSafe && result.products.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">✅ Safe to Mix! Here's what you can make:</h3>
                  <div className="space-y-6">
                    {result.products.map((product, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-6xl">{product.image}</div>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-800">{product.name}</h4>
                            <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {product.category}
                            </span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <h5 className="font-semibold text-gray-800 mb-3">Recipe:</h5>
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

        {/* Info Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>💡 Tip: Always verify ingredient safety before mixing chemicals or unfamiliar substances</p>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <span className="text-2xl">{showChat ? '✕' : '💬'}</span>
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col max-h-[600px]">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold text-lg">🧑‍🍳 Recipe Assistant</h3>
            <p className="text-sm opacity-90">Ask me about any recipe or ingredient!</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="mb-4">👋 Hi! I can help you with:</p>
                <ul className="text-sm space-y-2 text-left max-w-xs mx-auto">
                  <li>🍕 Pizza, pasta, and Italian dishes</li>
                  <li>🎂 Cakes, cookies, and desserts</li>
                  <li>🍦 Ice cream and frozen treats</li>
                  <li>🍚 Rice dishes and Asian food</li>
                  <li>🌮 Tacos and Mexican cuisine</li>
                  <li>🍌 Local African dishes</li>
                  <li>🧴 Cosmetics and cleaning products</li>
                  <li>⚠️ Ingredient safety tips</li>
                </ul>
                <p className="mt-4 text-xs">Ask me anything!</p>
              </div>
            )}
            
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Ask about ingredients or recipes..."
                className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none text-sm"
                disabled={chatLoading}
              />
              <button
                onClick={handleChatSubmit}
                disabled={chatLoading || !chatInput.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
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





