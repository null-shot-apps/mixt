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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{name: string; image: string; recipe: string[]; category: string;}>>([]);
  const [isSearching, setIsSearching] = useState(false);

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
      
      // FRENCH DISHES (France - #1 Most Visited Country 2025)
      if (ingredientList.includes('bread') || ingredientList.includes('baguette')) {
        products.push({
          name: 'French Onion Soup',
          image: '🍲',
          category: 'French Appetizer',
          recipe: [
            '🔰 BEGINNER TIP: Classic French comfort food! The secret is caramelizing the onions slowly.',
            '1️⃣ Slice 4 large onions thinly (yellow or white onions work best)',
            '2️⃣ Melt 4 tablespoons butter in a large pot over medium heat',
            '3️⃣ Add onions and cook slowly for 30-40 minutes, stirring often (they should turn golden brown)',
            '4️⃣ Add 2 minced garlic cloves and cook 1 minute',
            '5️⃣ Pour in 1/2 cup white wine (or skip and use more broth)',
            '6️⃣ Add 6 cups beef broth, 1 bay leaf, and thyme',
            '7️⃣ Simmer for 30 minutes',
            '8️⃣ Toast baguette slices and top with Gruyère cheese',
            '9️⃣ Ladle soup into bowls, float bread on top, broil until cheese melts',
            '🎯 Serve hot with extra crusty bread!'
          ]
        });
        
        products.push({
          name: 'Croque Monsieur',
          image: '🥪',
          category: 'French Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Fancy French grilled cheese! So easy and delicious.',
            '1️⃣ Butter 2 slices of white bread on one side',
            '2️⃣ Place ham and Gruyère cheese between bread (butter side out)',
            '3️⃣ Make béchamel: melt 2 tbsp butter, add 2 tbsp flour, cook 1 min',
            '4️⃣ Slowly whisk in 1 cup milk, cook until thick',
            '5️⃣ Add salt, pepper, and nutmeg to béchamel',
            '6️⃣ Grill sandwich in pan until golden on both sides',
            '7️⃣ Top with béchamel sauce and more cheese',
            '8️⃣ Broil until bubbly and golden',
            '🎯 Serve with a simple salad. C\'est magnifique!'
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
            '2️⃣ Use store-bought pie crust or make your own',
            '3️⃣ Cook 6 strips of bacon until crispy, then crumble',
            '4️⃣ In a bowl, whisk 4 eggs with 1.5 cups heavy cream',
            '5️⃣ Add salt, pepper, and a pinch of nutmeg',
            '6️⃣ Sprinkle bacon and 1 cup Gruyère cheese in pie crust',
            '7️⃣ Pour egg mixture over bacon and cheese',
            '8️⃣ Bake for 35-40 minutes until set and golden',
            '9️⃣ Let cool for 10 minutes before slicing',
            '🎯 Serve warm or at room temperature with salad!'
          ]
        });
      }
      
      if (ingredientList.includes('chicken') || ingredientList.includes('wine')) {
        products.push({
          name: 'Coq au Vin',
          image: '🍗',
          category: 'French Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Chicken braised in wine - sounds fancy but it\'s easy!',
            '1️⃣ Cut 4 chicken thighs into pieces, season with salt and pepper',
            '2️⃣ Cook 4 strips bacon in a large pot until crispy, remove and set aside',
            '3️⃣ Brown chicken in bacon fat (5 minutes per side), then remove',
            '4️⃣ Cook 1 chopped onion, 2 carrots, and 2 celery stalks in same pot',
            '5️⃣ Add 3 minced garlic cloves and 2 tbsp flour, stir well',
            '6️⃣ Pour in 2 cups red wine and 1 cup chicken broth',
            '7️⃣ Add thyme, bay leaf, and return chicken to pot',
            '8️⃣ Cover and simmer 45 minutes until chicken is tender',
            '9️⃣ Add mushrooms in last 10 minutes',
            '🎯 Serve over mashed potatoes or with crusty bread!'
          ]
        });
      }
      
      // SPANISH DISHES (Spain - #2 Most Visited Country 2025)
      if (ingredientList.includes('rice') || ingredientList.includes('seafood') || ingredientList.includes('saffron')) {
        products.push({
          name: 'Paella',
          image: '🥘',
          category: 'Spanish Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Spain\'s famous rice dish! Looks impressive but it\'s straightforward.',
            '1️⃣ Heat 3 tbsp olive oil in a large pan (paella pan if you have one)',
            '2️⃣ Cook 1 lb chicken pieces until golden, remove and set aside',
            '3️⃣ Add 1 chopped onion, 1 red bell pepper, cook 5 minutes',
            '4️⃣ Add 3 minced garlic cloves and 2 cups short-grain rice',
            '5️⃣ Stir in 1 tsp smoked paprika and pinch of saffron',
            '6️⃣ Pour in 4 cups chicken broth and add tomatoes',
            '7️⃣ Return chicken to pan, don\'t stir anymore!',
            '8️⃣ Simmer 20 minutes, add shrimp and mussels on top',
            '9️⃣ Cook 10 more minutes until seafood is done',
            '🎯 Let rest 5 minutes, garnish with lemon wedges and parsley!'
          ]
        });
      }
      
      if (ingredientList.includes('potato') || ingredientList.includes('potatoes')) {
        products.push({
          name: 'Patatas Bravas',
          image: '🥔',
          category: 'Spanish Tapas',
          recipe: [
            '🔰 BEGINNER TIP: Crispy potatoes with spicy sauce - perfect Spanish tapas!',
            '1️⃣ Cut 4 large potatoes into 1-inch cubes',
            '2️⃣ Boil potatoes for 5 minutes, then drain well',
            '3️⃣ Heat oil in a large pan and fry potatoes until golden and crispy',
            '4️⃣ For sauce: heat 2 tbsp olive oil, add 1 tsp smoked paprika',
            '5️⃣ Add 2 tbsp tomato paste and 1 minced garlic clove',
            '6️⃣ Stir in 1/2 cup water or broth, simmer 5 minutes',
            '7️⃣ Add cayenne pepper for heat (adjust to taste)',
            '8️⃣ Season sauce with salt and a splash of vinegar',
            '9️⃣ Drizzle sauce over crispy potatoes',
            '🎯 Serve hot with aioli on the side. ¡Delicioso!'
          ]
        });
      }
      
      if (ingredientList.includes('tomato') || ingredientList.includes('pepper')) {
        products.push({
          name: 'Gazpacho',
          image: '🍅',
          category: 'Spanish Soup',
          recipe: [
            '🔰 BEGINNER TIP: Cold Spanish soup - perfect for hot days! No cooking required.',
            '1️⃣ Chop 6 ripe tomatoes, 1 cucumber, 1 red bell pepper',
            '2️⃣ Add 1 small onion and 2 garlic cloves',
            '3️⃣ Put everything in a blender with 2 cups tomato juice',
            '4️⃣ Add 3 tbsp olive oil and 2 tbsp red wine vinegar',
            '5️⃣ Blend until smooth (or leave a bit chunky if you prefer)',
            '6️⃣ Season with salt, pepper, and a pinch of cumin',
            '7️⃣ Chill in refrigerator for at least 2 hours',
            '8️⃣ Serve cold with diced cucumber, croutons, and olive oil drizzle',
            '🎯 Refreshing and healthy! Perfect summer dish.'
          ]
        });
      }
      
      // AMERICAN DISHES (USA - #3 Most Visited Country 2025)
      if (ingredientList.includes('beef') || ingredientList.includes('burger') || ingredientList.includes('ground beef')) {
        products.push({
          name: 'Classic American Burger',
          image: '🍔',
          category: 'American Main Course',
          recipe: [
            '🔰 BEGINNER TIP: The all-American classic! Simple but delicious.',
            '1️⃣ Form 1 lb ground beef into 4 patties (don\'t overwork the meat)',
            '2️⃣ Make a small indent in the center of each patty (prevents puffing)',
            '3️⃣ Season generously with salt and pepper on both sides',
            '4️⃣ Heat a pan or grill to medium-high heat',
            '5️⃣ Cook patties 4 minutes per side for medium (don\'t press down!)',
            '6️⃣ Add cheese in last minute if desired, cover to melt',
            '7️⃣ Toast burger buns lightly',
            '8️⃣ Assemble: bun, lettuce, tomato, patty, onion, pickles, condiments',
            '9️⃣ Serve with fries or coleslaw',
            '🎯 The perfect backyard BBQ meal!'
          ]
        });
      }
      
      if (ingredientList.includes('mac') || ingredientList.includes('macaroni') || (ingredientList.includes('cheese') && ingredientList.includes('pasta'))) {
        products.push({
          name: 'Mac and Cheese',
          image: '🧀',
          category: 'American Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Ultimate comfort food! Creamy, cheesy, and easy.',
            '1️⃣ Cook 1 lb elbow macaroni according to package, drain',
            '2️⃣ In same pot, melt 4 tbsp butter over medium heat',
            '3️⃣ Add 4 tbsp flour and whisk for 1 minute (makes a roux)',
            '4️⃣ Slowly pour in 3 cups milk while whisking constantly',
            '5️⃣ Cook until sauce thickens (about 5 minutes)',
            '6️⃣ Remove from heat, add 3 cups shredded cheddar cheese',
            '7️⃣ Stir until cheese melts completely',
            '8️⃣ Add cooked macaroni and mix well',
            '9️⃣ Season with salt, pepper, and paprika',
            '🎯 Optional: Top with breadcrumbs and bake for crispy top!'
          ]
        });
      }
      
      if (ingredientList.includes('bbq') || ingredientList.includes('ribs') || ingredientList.includes('pork')) {
        products.push({
          name: 'BBQ Ribs',
          image: '🍖',
          category: 'American Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Fall-off-the-bone tender! Low and slow is the secret.',
            '1️⃣ Remove membrane from back of 2 racks of ribs',
            '2️⃣ Mix dry rub: paprika, brown sugar, garlic powder, salt, pepper',
            '3️⃣ Coat ribs generously with dry rub, let sit 30 minutes',
            '4️⃣ Preheat oven to 275°F (135°C)',
            '5️⃣ Wrap ribs tightly in foil, place on baking sheet',
            '6️⃣ Bake for 2.5-3 hours until tender',
            '7️⃣ Unwrap, brush with BBQ sauce',
            '8️⃣ Broil for 5 minutes or grill to caramelize sauce',
            '9️⃣ Let rest 5 minutes, then cut between bones',
            '🎯 Serve with coleslaw, cornbread, and extra BBQ sauce!'
          ]
        });
      }
      
      // Keep existing Nigerian dishes and other recipes...
      // [Previous code for Nigerian dishes, desserts, etc. remains the same]
      
      // NIGERIAN/AFRICAN DISHES
      if (ingredientList.includes('yam')) {
        products.push({
          name: 'Pounded Yam',
          image: '🍠',
          category: 'Nigerian Staple',
          recipe: [
            'Peel and cut yam into chunks',
            'Boil yam until very soft (about 20-30 minutes)',
            'Drain water completely',
            'Pound yam with mortar and pestle or use a food processor',
            'Add small amounts of warm water while pounding',
            'Continue until smooth and stretchy',
            'Mold into balls and serve with soup (egusi, ogbono, or vegetable soup)'
          ]
        });
        
        products.push({
          name: 'Fried Yam',
          image: '🍟',
          category: 'Nigerian Snack',
          recipe: [
            'Peel yam and cut into thick slices or wedges',
            'Soak in salted water for 10 minutes',
            'Pat dry with paper towels',
            'Heat vegetable oil in deep pan',
            'Fry yam until golden brown and crispy',
            'Drain on paper towels',
            'Serve with pepper sauce or stew'
          ]
        });
      }
      
      if (ingredientList.includes('jollof') || (ingredientList.includes('rice') && ingredientList.includes('tomato'))) {
        products.push({
          name: 'Jollof Rice',
          image: '🍚',
          category: 'Nigerian Main Course',
          recipe: [
            'Blend tomatoes, peppers, and onions into a smooth paste',
            'Heat oil and fry the tomato paste until oil rises to the top',
            'Add curry powder, thyme, bay leaves, and seasoning cubes',
            'Pour in chicken or beef stock',
            'Add washed rice and stir well',
            'Cover pot tightly and cook on low heat',
            'Stir occasionally until rice is cooked and fluffy (about 30 minutes)',
            'Serve with fried plantain, chicken, or coleslaw'
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

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results: Array<{name: string; image: string; recipe: string[]; category: string;}> = [];
      
      // FRENCH DISHES
      if (query.includes('french onion') || query.includes('onion soup')) {
        results.push({
          name: 'French Onion Soup',
          image: '🍲',
          category: 'French Appetizer',
          recipe: [
            '🔰 BEGINNER TIP: Classic French comfort food! The secret is caramelizing the onions slowly.',
            '1️⃣ Slice 4 large onions thinly (yellow or white onions work best)',
            '2️⃣ Melt 4 tablespoons butter in a large pot over medium heat',
            '3️⃣ Add onions and cook slowly for 30-40 minutes, stirring often (they should turn golden brown)',
            '4️⃣ Add 2 minced garlic cloves and cook 1 minute',
            '5️⃣ Pour in 1/2 cup white wine (or skip and use more broth)',
            '6️⃣ Add 6 cups beef broth, 1 bay leaf, and thyme',
            '7️⃣ Simmer for 30 minutes',
            '8️⃣ Toast baguette slices and top with Gruyère cheese',
            '9️⃣ Ladle soup into bowls, float bread on top, broil until cheese melts',
            '🎯 Serve hot with extra crusty bread!'
          ]
        });
      }
      
      if (query.includes('croque')) {
        results.push({
          name: 'Croque Monsieur',
          image: '🥪',
          category: 'French Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Fancy French grilled cheese! So easy and delicious.',
            '1️⃣ Butter 2 slices of white bread on one side',
            '2️⃣ Place ham and Gruyère cheese between bread (butter side out)',
            '3️⃣ Make béchamel: melt 2 tbsp butter, add 2 tbsp flour, cook 1 min',
            '4️⃣ Slowly whisk in 1 cup milk, cook until thick',
            '5️⃣ Add salt, pepper, and nutmeg to béchamel',
            '6️⃣ Grill sandwich in pan until golden on both sides',
            '7️⃣ Top with béchamel sauce and more cheese',
            '8️⃣ Broil until bubbly and golden',
            '🎯 Serve with a simple salad. C\'est magnifique!'
          ]
        });
      }
      
      if (query.includes('quiche')) {
        results.push({
          name: 'Quiche Lorraine',
          image: '🥧',
          category: 'French Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Classic French egg tart! Perfect for brunch or dinner.',
            '1️⃣ Preheat oven to 375°F (190°C)',
            '2️⃣ Use store-bought pie crust or make your own',
            '3️⃣ Cook 6 strips of bacon until crispy, then crumble',
            '4️⃣ In a bowl, whisk 4 eggs with 1.5 cups heavy cream',
            '5️⃣ Add salt, pepper, and a pinch of nutmeg',
            '6️⃣ Sprinkle bacon and 1 cup Gruyère cheese in pie crust',
            '7️⃣ Pour egg mixture over bacon and cheese',
            '8️⃣ Bake for 35-40 minutes until set and golden',
            '9️⃣ Let cool for 10 minutes before slicing',
            '🎯 Serve warm or at room temperature with salad!'
          ]
        });
      }
      
      if (query.includes('coq au vin')) {
        results.push({
          name: 'Coq au Vin',
          image: '🍗',
          category: 'French Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Chicken braised in wine - sounds fancy but it\'s easy!',
            '1️⃣ Cut 4 chicken thighs into pieces, season with salt and pepper',
            '2️⃣ Cook 4 strips bacon in a large pot until crispy, remove and set aside',
            '3️⃣ Brown chicken in bacon fat (5 minutes per side), then remove',
            '4️⃣ Cook 1 chopped onion, 2 carrots, and 2 celery stalks in same pot',
            '5️⃣ Add 3 minced garlic cloves and 2 tbsp flour, stir well',
            '6️⃣ Pour in 2 cups red wine and 1 cup chicken broth',
            '7️⃣ Add thyme, bay leaf, and return chicken to pot',
            '8️⃣ Cover and simmer 45 minutes until chicken is tender',
            '9️⃣ Add mushrooms in last 10 minutes',
            '🎯 Serve over mashed potatoes or with crusty bread!'
          ]
        });
      }
      
      // SPANISH DISHES
      if (query.includes('paella')) {
        results.push({
          name: 'Paella',
          image: '🥘',
          category: 'Spanish Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Spain\'s famous rice dish! Looks impressive but it\'s straightforward.',
            '1️⃣ Heat 3 tbsp olive oil in a large pan (paella pan if you have one)',
            '2️⃣ Cook 1 lb chicken pieces until golden, remove and set aside',
            '3️⃣ Add 1 chopped onion, 1 red bell pepper, cook 5 minutes',
            '4️⃣ Add 3 minced garlic cloves and 2 cups short-grain rice',
            '5️⃣ Stir in 1 tsp smoked paprika and pinch of saffron',
            '6️⃣ Pour in 4 cups chicken broth and add tomatoes',
            '7️⃣ Return chicken to pan, don\'t stir anymore!',
            '8️⃣ Simmer 20 minutes, add shrimp and mussels on top',
            '9️⃣ Cook 10 more minutes until seafood is done',
            '🎯 Let rest 5 minutes, garnish with lemon wedges and parsley!'
          ]
        });
      }
      
      if (query.includes('patatas bravas') || query.includes('bravas')) {
        results.push({
          name: 'Patatas Bravas',
          image: '🥔',
          category: 'Spanish Tapas',
          recipe: [
            '🔰 BEGINNER TIP: Crispy potatoes with spicy sauce - perfect Spanish tapas!',
            '1️⃣ Cut 4 large potatoes into 1-inch cubes',
            '2️⃣ Boil potatoes for 5 minutes, then drain well',
            '3️⃣ Heat oil in a large pan and fry potatoes until golden and crispy',
            '4️⃣ For sauce: heat 2 tbsp olive oil, add 1 tsp smoked paprika',
            '5️⃣ Add 2 tbsp tomato paste and 1 minced garlic clove',
            '6️⃣ Stir in 1/2 cup water or broth, simmer 5 minutes',
            '7️⃣ Add cayenne pepper for heat (adjust to taste)',
            '8️⃣ Season sauce with salt and a splash of vinegar',
            '9️⃣ Drizzle sauce over crispy potatoes',
            '🎯 Serve hot with aioli on the side. ¡Delicioso!'
          ]
        });
      }
      
      if (query.includes('gazpacho')) {
        results.push({
          name: 'Gazpacho',
          image: '🍅',
          category: 'Spanish Soup',
          recipe: [
            '🔰 BEGINNER TIP: Cold Spanish soup - perfect for hot days! No cooking required.',
            '1️⃣ Chop 6 ripe tomatoes, 1 cucumber, 1 red bell pepper',
            '2️⃣ Add 1 small onion and 2 garlic cloves',
            '3️⃣ Put everything in a blender with 2 cups tomato juice',
            '4️⃣ Add 3 tbsp olive oil and 2 tbsp red wine vinegar',
            '5️⃣ Blend until smooth (or leave a bit chunky if you prefer)',
            '6️⃣ Season with salt, pepper, and a pinch of cumin',
            '7️⃣ Chill in refrigerator for at least 2 hours',
            '8️⃣ Serve cold with diced cucumber, croutons, and olive oil drizzle',
            '🎯 Refreshing and healthy! Perfect summer dish.'
          ]
        });
      }
      
      // AMERICAN DISHES
      if (query.includes('burger')) {
        results.push({
          name: 'Classic American Burger',
          image: '🍔',
          category: 'American Main Course',
          recipe: [
            '🔰 BEGINNER TIP: The all-American classic! Simple but delicious.',
            '1️⃣ Form 1 lb ground beef into 4 patties (don\'t overwork the meat)',
            '2️⃣ Make a small indent in the center of each patty (prevents puffing)',
            '3️⃣ Season generously with salt and pepper on both sides',
            '4️⃣ Heat a pan or grill to medium-high heat',
            '5️⃣ Cook patties 4 minutes per side for medium (don\'t press down!)',
            '6️⃣ Add cheese in last minute if desired, cover to melt',
            '7️⃣ Toast burger buns lightly',
            '8️⃣ Assemble: bun, lettuce, tomato, patty, onion, pickles, condiments',
            '9️⃣ Serve with fries or coleslaw',
            '🎯 The perfect backyard BBQ meal!'
          ]
        });
      }
      
      if (query.includes('mac and cheese') || query.includes('macaroni')) {
        results.push({
          name: 'Mac and Cheese',
          image: '🧀',
          category: 'American Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Ultimate comfort food! Creamy, cheesy, and easy.',
            '1️⃣ Cook 1 lb elbow macaroni according to package, drain',
            '2️⃣ In same pot, melt 4 tbsp butter over medium heat',
            '3️⃣ Add 4 tbsp flour and whisk for 1 minute (makes a roux)',
            '4️⃣ Slowly pour in 3 cups milk while whisking constantly',
            '5️⃣ Cook until sauce thickens (about 5 minutes)',
            '6️⃣ Remove from heat, add 3 cups shredded cheddar cheese',
            '7️⃣ Stir until cheese melts completely',
            '8️⃣ Add cooked macaroni and mix well',
            '9️⃣ Season with salt, pepper, and paprika',
            '🎯 Optional: Top with breadcrumbs and bake for crispy top!'
          ]
        });
      }
      
      if (query.includes('bbq') || query.includes('ribs')) {
        results.push({
          name: 'BBQ Ribs',
          image: '🍖',
          category: 'American Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Fall-off-the-bone tender! Low and slow is the secret.',
            '1️⃣ Remove membrane from back of 2 racks of ribs',
            '2️⃣ Mix dry rub: paprika, brown sugar, garlic powder, salt, pepper',
            '3️⃣ Coat ribs generously with dry rub, let sit 30 minutes',
            '4️⃣ Preheat oven to 275°F (135°C)',
            '5️⃣ Wrap ribs tightly in foil, place on baking sheet',
            '6️⃣ Bake for 2.5-3 hours until tender',
            '7️⃣ Unwrap, brush with BBQ sauce',
            '8️⃣ Broil for 5 minutes or grill to caramelize sauce',
            '9️⃣ Let rest 5 minutes, then cut between bones',
            '🎯 Serve with coleslaw, cornbread, and extra BBQ sauce!'
          ]
        });
      }
      
      if (query.includes('aglio') || query.includes('garlic pasta')) {
        results.push({
          name: 'Pasta Aglio e Olio',
          image: '🍝',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: This is the EASIEST Italian pasta - only 5 ingredients!',
            '1️⃣ Boil water with salt in a large pot',
            '2️⃣ Slice 4-6 garlic cloves thinly (don\'t worry if they\'re not perfect)',
            '3️⃣ Cook spaghetti according to package directions',
            '4️⃣ While pasta cooks, heat olive oil in a large pan (medium-low heat)',
            '5️⃣ Add sliced garlic to oil and cook until golden (2-3 minutes, watch carefully!)',
            '6️⃣ Add red pepper flakes if you like spice (optional)',
            '7️⃣ Save 1 cup pasta water, then drain pasta',
            '8️⃣ Add pasta to the garlic oil and toss well',
            '9️⃣ Add pasta water to make it saucy (start with 1/4 cup)',
            '🎯 Top with parsley and Parmesan cheese. Done!'
          ]
        });
      }
      
      if (query.includes('risotto')) {
        results.push({
          name: 'Risotto',
          image: '🍚',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Risotto needs patience but it\'s not hard! Just keep stirring.',
            '1️⃣ Heat 6 cups chicken or vegetable broth in a pot (keep it warm)',
            '2️⃣ Chop 1 onion finely (take your time, it\'s okay)',
            '3️⃣ Heat 2 tablespoons butter and 2 tablespoons olive oil in a large pan',
            '4️⃣ Cook onion until soft (5 minutes, medium heat)',
            '5️⃣ Add 1.5 cups Arborio rice (special risotto rice) and stir for 2 minutes',
            '6️⃣ Add 1/2 cup white wine (or skip and use broth)',
            '7️⃣ When liquid is absorbed, add 1 ladle of warm broth',
            '8️⃣ Keep stirring and adding broth one ladle at a time (20-25 minutes total)',
            '9️⃣ Rice should be creamy but still have a little bite',
            '🔟 Turn off heat, add butter and Parmesan cheese, stir well',
            '🎯 Let rest 2 minutes, then serve! Add mushrooms, peas, or shrimp if you like.'
          ]
        });
      }
      
      if (query.includes('gnocchi')) {
        results.push({
          name: 'Gnocchi',
          image: '🥟',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Potato dumplings! Fun to make, like playing with dough.',
            '1️⃣ Boil 2 lbs potatoes until very soft (30-40 minutes)',
            '2️⃣ Drain and let cool slightly, then peel (skin comes off easily)',
            '3️⃣ Mash potatoes until very smooth (no lumps!)',
            '4️⃣ Add 1 egg and mix well',
            '5️⃣ Gradually add 1.5-2 cups flour, mixing until dough forms (not too sticky)',
            '6️⃣ Roll dough into long ropes (about 1 inch thick)',
            '7️⃣ Cut ropes into 1-inch pieces',
            '8️⃣ Optional: Roll each piece on a fork to make ridges (looks fancy!)',
            '9️⃣ Boil gnocchi in salted water - they\'re done when they float (2-3 minutes)',
            '🎯 Serve with tomato sauce, butter and sage, or pesto!'
          ]
        });
      }
      
      if (query.includes('alfredo')) {
        results.push({
          name: 'Fettuccine Alfredo',
          image: '🍝',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Rich and creamy! Only 4 ingredients needed.',
            '1️⃣ Boil salted water and cook fettuccine pasta (follow package time)',
            '2️⃣ While pasta cooks, heat 1 cup heavy cream in a large pan (medium heat)',
            '3️⃣ Add 4 tablespoons butter to cream and let it melt',
            '4️⃣ Simmer gently for 5 minutes (don\'t boil!)',
            '5️⃣ Add 1 cup grated Parmesan cheese and stir until melted',
            '6️⃣ Season with salt, pepper, and a pinch of nutmeg',
            '7️⃣ Save 1/2 cup pasta water, then drain pasta',
            '8️⃣ Add pasta to the cream sauce and toss well',
            '9️⃣ Add pasta water if sauce is too thick',
            '🎯 Serve immediately with extra Parmesan and parsley!'
          ]
        });
      }
      
      if (query.includes('pesto')) {
        results.push({
          name: 'Pesto Pasta',
          image: '🍝',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Fresh pesto is amazing! You can use a blender or food processor.',
            '1️⃣ In blender, add 2 cups fresh basil leaves (packed)',
            '2️⃣ Add 1/2 cup pine nuts (or walnuts if cheaper)',
            '3️⃣ Add 2 garlic cloves',
            '4️⃣ Add 1/2 cup grated Parmesan cheese',
            '5️⃣ Blend while slowly pouring in 1/2 cup olive oil',
            '6️⃣ Blend until smooth but still a little chunky',
            '7️⃣ Season with salt and pepper to taste',
            '8️⃣ Cook your favorite pasta according to package',
            '9️⃣ Save 1/2 cup pasta water before draining',
            '🔟 Toss hot pasta with pesto, add pasta water to make it creamy',
            '🎯 Top with extra Parmesan and pine nuts!'
          ]
        });
      }
      
      if (query.includes('bruschetta')) {
        results.push({
          name: 'Bruschetta',
          image: '🥖',
          category: 'Italian Appetizer',
          recipe: [
            '🔰 BEGINNER TIP: Perfect starter! So easy and impressive.',
            '1️⃣ Slice Italian bread or baguette into 1/2 inch slices',
            '2️⃣ Brush bread with olive oil on both sides',
            '3️⃣ Toast in oven at 400°F for 5-7 minutes until golden (or use toaster)',
            '4️⃣ Rub toasted bread with a cut garlic clove (gives subtle flavor)',
            '5️⃣ Dice 4 ripe tomatoes into small pieces',
            '6️⃣ Mix tomatoes with chopped fresh basil, olive oil, salt, and pepper',
            '7️⃣ Let tomato mixture sit for 10 minutes (flavors blend)',
            '8️⃣ Spoon tomato mixture onto toasted bread just before serving',
            '🎯 Eat immediately while bread is still crispy!'
          ]
        });
      }
      
      if (query.includes('eggplant') || query.includes('parmigiana')) {
        results.push({
          name: 'Eggplant Parmigiana',
          image: '🍆',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: This is like lasagna but with eggplant! Takes time but worth it.',
            '1️⃣ Slice 2 large eggplants into 1/4 inch rounds',
            '2️⃣ Sprinkle salt on both sides and let sit 30 minutes (removes bitterness)',
            '3️⃣ Pat dry with paper towels',
            '4️⃣ Brush eggplant with olive oil and bake at 400°F for 20 minutes (or fry if you prefer)',
            '5️⃣ Make tomato sauce: cook garlic in oil, add crushed tomatoes, basil, salt, simmer 15 min',
            '6️⃣ In a baking dish, spread a little sauce on bottom',
            '7️⃣ Layer: eggplant, sauce, mozzarella cheese, Parmesan cheese',
            '8️⃣ Repeat layers until ingredients are used up',
            '9️⃣ Top with extra cheese',
            '🔟 Bake at 375°F for 30-35 minutes until bubbly and golden',
            '🎯 Let cool 10 minutes before serving. Perfetto!'
          ]
        });
      }
      
      if (query.includes('cacciatore')) {
        results.push({
          name: 'Chicken Cacciatore',
          image: '🍗',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: "Cacciatore" means hunter-style. It\'s a hearty chicken stew!',
            '1️⃣ Cut 4 chicken thighs into pieces (or use pre-cut chicken)',
            '2️⃣ Season chicken with salt and pepper',
            '3️⃣ Heat 2 tablespoons olive oil in a large pot',
            '4️⃣ Brown chicken on all sides (5 minutes), then remove and set aside',
            '5️⃣ In same pot, cook 1 chopped onion and 1 chopped bell pepper (5 minutes)',
            '6️⃣ Add 3 minced garlic cloves, cook 1 minute',
            '7️⃣ Add 1 can diced tomatoes, 1/2 cup wine (or broth), and Italian herbs',
            '8️⃣ Return chicken to pot, add mushrooms if you have them',
            '9️⃣ Cover and simmer 30-40 minutes until chicken is tender',
            '🎯 Serve over pasta, rice, or with crusty bread!'
          ]
        });
      }
      
      if (query.includes('pomodoro') || query.includes('marinara')) {
        results.push({
          name: 'Pasta Pomodoro',
          image: '🍝',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: Classic tomato pasta - simple and delicious!',
            '1️⃣ Start boiling salted water for pasta',
            '2️⃣ Chop 1 onion and 3 garlic cloves (rough chop is fine)',
            '3️⃣ Heat 3 tablespoons olive oil in a pan',
            '4️⃣ Cook onion until soft (5 minutes on medium heat)',
            '5️⃣ Add garlic and cook for 1 minute (smells amazing!)',
            '6️⃣ Add 1 can crushed tomatoes (28 oz) or 6 fresh tomatoes, chopped',
            '7️⃣ Add salt, pepper, and a pinch of sugar (cuts acidity)',
            '8️⃣ Simmer for 15-20 minutes while pasta cooks',
            '9️⃣ Add fresh basil leaves at the end',
            '🎯 Toss with cooked pasta and serve with Parmesan!'
          ]
        });
      }
      
      // NIGERIAN DISHES
      if (query.includes('jollof')) {
        results.push({
          name: 'Jollof Rice',
          image: '🍚',
          category: 'Nigerian Main Course',
          recipe: [
            'Blend tomatoes, peppers, and onions into a smooth paste',
            'Heat oil and fry the tomato paste until oil rises to the top',
            'Add curry powder, thyme, bay leaves, and seasoning cubes',
            'Pour in chicken or beef stock',
            'Add washed rice and stir well',
            'Cover pot tightly and cook on low heat',
            'Stir occasionally until rice is cooked and fluffy (about 30 minutes)',
            'Serve with fried plantain, chicken, or coleslaw'
          ]
        });
      }
      
      if (query.includes('yam')) {
        results.push({
          name: 'Pounded Yam',
          image: '🍠',
          category: 'Nigerian Staple',
          recipe: [
            'Peel and cut yam into chunks',
            'Boil yam until very soft (about 20-30 minutes)',
            'Drain water completely',
            'Pound yam with mortar and pestle or use a food processor',
            'Add small amounts of warm water while pounding',
            'Continue until smooth and stretchy',
            'Mold into balls and serve with soup'
          ]
        });
      }
      
      // Add more search results for other dishes...
      if (query.includes('french') || query.includes('france')) {
        if (results.length === 0) {
          results.push({
            name: 'French Cuisine Guide',
            image: '🇫🇷',
            category: 'French Cuisine',
            recipe: [
              'Try searching for specific French dishes:',
              '🍲 French Onion Soup - caramelized onions in broth',
              '🥪 Croque Monsieur - fancy grilled cheese',
              '🥧 Quiche Lorraine - egg and bacon tart',
              '🍗 Coq au Vin - chicken in wine sauce',
              '🥐 Croissants - buttery pastries',
              '🍮 Crème Brûlée - custard with caramelized sugar',
              'French cuisine is known for elegance and technique!'
            ]
          });
        }
      }
      
      if (query.includes('spanish') || query.includes('spain')) {
        if (results.length === 0) {
          results.push({
            name: 'Spanish Cuisine Guide',
            image: '🇪🇸',
            category: 'Spanish Cuisine',
            recipe: [
              'Try searching for specific Spanish dishes:',
              '🥘 Paella - saffron rice with seafood',
              '🥔 Patatas Bravas - spicy crispy potatoes',
              '🍅 Gazpacho - cold tomato soup',
              '🦐 Gambas al Ajillo - garlic shrimp',
              '🥖 Pan con Tomate - bread with tomato',
              '🍮 Flan - caramel custard',
              'Spanish food is vibrant and full of flavor!'
            ]
          });
        }
      }
      
      if (query.includes('american') || query.includes('usa')) {
        if (results.length === 0) {
          results.push({
            name: 'American Cuisine Guide',
            image: '🇺🇸',
            category: 'American Cuisine',
            recipe: [
              'Try searching for specific American dishes:',
              '🍔 Burgers - classic beef patties',
              '🧀 Mac and Cheese - creamy comfort food',
              '🍖 BBQ Ribs - slow-cooked tender ribs',
              '🍗 Fried Chicken - crispy and juicy',
              '🥧 Apple Pie - classic American dessert',
              '🌭 Hot Dogs - ballpark favorite',
              'American food is hearty and satisfying!'
            ]
          });
        }
      }
      
      if (results.length === 0) {
        results.push({
          name: 'No Results Found',
          image: '🔍',
          category: 'Search',
          recipe: [
            'Try searching for:',
            '🇫🇷 French dishes: french onion soup, quiche, coq au vin, croque monsieur',
            '🇪🇸 Spanish dishes: paella, patatas bravas, gazpacho',
            '🇺🇸 American dishes: burger, mac and cheese, BBQ ribs',
            '🇳🇬 Nigerian dishes: jollof rice, pounded yam, amala, semovita, eba, plantain',
            '🍰 Desserts: cake, cookies, ice cream',
            'You can also use the ingredient analyzer below!'
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
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      const query = userMessage.toLowerCase();
      
      // Dishes from top 3 most visited countries 2025
      if (query.includes('french onion') || query.includes('onion soup')) {
        response = '🍲 French Onion Soup is a classic! The secret is caramelizing onions slowly for 30-40 minutes until golden. Add beef broth, top with toasted bread and Gruyère cheese, then broil until bubbly. It\'s comfort food at its finest!';
      } else if (query.includes('quiche')) {
        response = '🥧 Quiche Lorraine is a French egg tart! Mix eggs with cream, add bacon and Gruyère cheese, pour into a pie crust, and bake. Perfect for brunch! You can add vegetables like spinach or mushrooms too.';
      } else if (query.includes('coq au vin')) {
        response = '🍗 Coq au Vin is chicken braised in red wine - sounds fancy but it\'s easy! Brown chicken, cook with bacon, onions, carrots, then simmer in wine and broth. The wine makes it rich and flavorful!';
      } else if (query.includes('paella')) {
        response = '🥘 Paella is Spain\'s famous rice dish! Cook rice with saffron, chicken, seafood, and vegetables in one pan. The key is not stirring after adding the rice - this creates the crispy bottom called "socarrat"!';
      } else if (query.includes('patatas bravas') || query.includes('bravas')) {
        response = '🥔 Patatas Bravas are crispy Spanish potatoes with spicy tomato sauce! Fry cubed potatoes until golden, then top with a sauce made from tomato paste, smoked paprika, and cayenne. Serve with aioli!';
      } else if (query.includes('gazpacho')) {
        response = '🍅 Gazpacho is a cold Spanish soup - perfect for summer! Blend tomatoes, cucumber, peppers, onion, garlic, olive oil, and vinegar. Chill and serve cold. No cooking required!';
      } else if (query.includes('burger')) {
        response = '🍔 The classic American burger! Form ground beef into patties, season with salt and pepper, cook 4 minutes per side. Don\'t press down while cooking! Add cheese, lettuce, tomato, and your favorite toppings.';
      } else if (query.includes('mac and cheese') || query.includes('macaroni')) {
        response = '🧀 Mac and Cheese is ultimate American comfort food! Make a cheese sauce with butter, flour, milk, and cheddar. Mix with cooked macaroni. For extra crispy top, add breadcrumbs and bake!';
      } else if (query.includes('bbq') || query.includes('ribs')) {
        response = '🍖 BBQ Ribs are an American classic! Coat ribs with dry rub, wrap in foil, bake low and slow for 2.5-3 hours. Brush with BBQ sauce and broil to caramelize. Fall-off-the-bone tender!';
      } else if (query.includes('french') || query.includes('france')) {
        response = '🇫🇷 French cuisine is elegant yet approachable! Try: French Onion Soup, Croque Monsieur, Quiche Lorraine, or Coq au Vin. French cooking focuses on technique and quality ingredients!';
      } else if (query.includes('spanish') || query.includes('spain')) {
        response = '🇪🇸 Spanish food is vibrant and flavorful! Popular dishes: Paella (rice with seafood), Patatas Bravas (spicy potatoes), Gazpacho (cold soup), and Tapas (small plates). Spanish cuisine loves olive oil, garlic, and paprika!';
      } else if (query.includes('american') || query.includes('usa')) {
        response = '🇺🇸 American classics are hearty and satisfying! Try: Burgers, Mac and Cheese, BBQ Ribs, Fried Chicken, or Apple Pie. American food is all about comfort and bold flavors!';
      } else if (query.includes('beginner') || query.includes('easy') || query.includes('start cooking')) {
        response = '👨‍🍳 Starting to cook? Great! Begin with simple recipes like: Mac and Cheese, Burgers, Gazpacho (no cooking!), or Croque Monsieur. Follow recipes step-by-step and don\'t rush. Practice makes perfect!';
      } else if (query.includes('jollof')) {
        response = '🍚 Jollof Rice is a beloved West African dish! You need: rice, tomatoes, peppers, onions, oil, curry powder, thyme, bay leaves, and stock. The key is frying the tomato paste until the oil separates - this gives jollof its signature taste. Cook the rice in the seasoned tomato base until fluffy. Serve with fried plantain, chicken, or coleslaw!';
      } else {
        response = 'I can help with French dishes (onion soup, quiche, coq au vin), Spanish dishes (paella, patatas bravas, gazpacho), American dishes (burgers, mac and cheese, BBQ ribs), Nigerian dishes (jollof rice, pounded yam), and beginner cooking tips! What would you like to know?';
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setChatLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100/50 p-4 md:p-8">
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

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for dishes and snacks recipes... (e.g., paella, burger, quiche, jollof rice)"
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
                disabled={isSearching}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</div>
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Search Results</h3>
                <button
                  onClick={() => { setSearchResults([]); setSearchQuery(''); }}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Clear
                </button>
              </div>
              {searchResults.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-6xl">{item.image}</div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">{item.name}</h4>
                      <span className="inline-block bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
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

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {!inputMethod && !result && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Or analyze your ingredients:
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
                  <p className="text-sm text-gray-500">We&apos;ll identify the ingredients for you</p>
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
                  <h3 className="text-2xl font-bold text-green-800 mb-4">✅ Safe to Mix! Here&apos;s what you can make:</h3>
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
                  <li>🇫🇷 French: Onion Soup, Quiche, Coq au Vin</li>
                  <li>🇪🇸 Spanish: Paella, Patatas Bravas, Gazpacho</li>
                  <li>🇺🇸 American: Burgers, Mac & Cheese, BBQ Ribs</li>
                  <li>🇳🇬 Nigerian: Jollof Rice, Pounded Yam, Amala, Eba</li>
                  <li>👨‍🍳 Beginner cooking tips and guides</li>
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




















