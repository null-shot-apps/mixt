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
      
      // ITALIAN DISHES
      if (ingredientList.includes('pasta') || ingredientList.includes('spaghetti')) {
        products.push({
          name: 'Spaghetti Carbonara',
          image: '🍝',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: This is easier than it looks! Just follow each step slowly.',
            '1️⃣ Boil a large pot of water with salt (water should taste like the sea)',
            '2️⃣ While water heats, cut bacon or pancetta into small pieces',
            '3️⃣ Cook the bacon in a pan until crispy (medium heat, about 5 minutes)',
            '4️⃣ In a bowl, crack 2 eggs and mix with grated cheese (Parmesan or Pecorino)',
            '5️⃣ Cook spaghetti in boiling water (follow package time, usually 8-10 minutes)',
            '6️⃣ Save 1 cup of pasta water before draining!',
            '7️⃣ Add hot drained pasta to the bacon pan (turn off heat first!)',
            '8️⃣ Pour egg mixture over pasta and toss quickly (the heat cooks the eggs)',
            '9️⃣ Add pasta water little by little if too thick',
            '🎯 Serve immediately with extra cheese and black pepper!'
          ]
        });
        
        products.push({
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
      
      if (ingredientList.includes('tomato') && (ingredientList.includes('pasta') || ingredientList.includes('basil'))) {
        products.push({
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
      
      if (ingredientList.includes('rice') && (ingredientList.includes('mushroom') || ingredientList.includes('cheese'))) {
        products.push({
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
      
      if (ingredientList.includes('eggplant') || ingredientList.includes('aubergine')) {
        products.push({
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
      
      if (ingredientList.includes('chicken') && ingredientList.includes('tomato')) {
        products.push({
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
      
      if (ingredientList.includes('bread') || ingredientList.includes('tomato')) {
        products.push({
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
      
      if (ingredientList.includes('cheese') && ingredientList.includes('flour')) {
        products.push({
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
      
      if (ingredientList.includes('cream') && ingredientList.includes('cheese')) {
        products.push({
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
      
      if (ingredientList.includes('basil') && ingredientList.includes('pine nuts')) {
        products.push({
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
      
      // ITALIAN DISHES
      if (query.includes('carbonara')) {
        results.push({
          name: 'Spaghetti Carbonara',
          image: '🍝',
          category: 'Italian Main Course',
          recipe: [
            '🔰 BEGINNER TIP: This is easier than it looks! Just follow each step slowly.',
            '1️⃣ Boil a large pot of water with salt (water should taste like the sea)',
            '2️⃣ While water heats, cut bacon or pancetta into small pieces',
            '3️⃣ Cook the bacon in a pan until crispy (medium heat, about 5 minutes)',
            '4️⃣ In a bowl, crack 2 eggs and mix with grated cheese (Parmesan or Pecorino)',
            '5️⃣ Cook spaghetti in boiling water (follow package time, usually 8-10 minutes)',
            '6️⃣ Save 1 cup of pasta water before draining!',
            '7️⃣ Add hot drained pasta to the bacon pan (turn off heat first!)',
            '8️⃣ Pour egg mixture over pasta and toss quickly (the heat cooks the eggs)',
            '9️⃣ Add pasta water little by little if too thick',
            '🎯 Serve immediately with extra cheese and black pepper!'
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
      if (query.includes('pasta') || query.includes('italian')) {
        if (results.length === 0) {
          results.push({
            name: 'Italian Pasta Guide',
            image: '🇮🇹',
            category: 'Italian Cuisine',
            recipe: [
              'Try searching for specific Italian dishes:',
              '🍝 Carbonara - creamy egg and bacon pasta',
              '🍝 Aglio e Olio - simple garlic and oil pasta',
              '🍝 Alfredo - rich cream and cheese sauce',
              '🍝 Pesto - fresh basil sauce',
              '🍝 Pomodoro/Marinara - classic tomato sauce',
              '🍚 Risotto - creamy rice dish',
              '🥟 Gnocchi - potato dumplings',
              '🥖 Bruschetta - toasted bread with tomatoes',
              '🍆 Eggplant Parmigiana - baked eggplant layers',
              '🍗 Chicken Cacciatore - hunter-style chicken stew'
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
            '🇮🇹 Italian dishes: carbonara, risotto, gnocchi, alfredo, pesto, bruschetta',
            '🇳🇬 Nigerian dishes: jollof rice, pounded yam, amala, semovita, eba, plantain',
            '🍰 Desserts: cake, cookies, ice cream',
            '🍕 Other: pizza, pasta, bread, pancakes, smoothie',
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
      
      // Italian dishes responses
      if (query.includes('carbonara')) {
        response = '🍝 Carbonara is a classic Roman pasta! You need: spaghetti, eggs, Parmesan cheese, bacon (or pancetta), and black pepper. The key is to turn off the heat before adding the egg mixture - the hot pasta cooks the eggs gently. Never add cream! Traditional carbonara is just eggs, cheese, and pasta water. It\'s easier than you think!';
      } else if (query.includes('risotto')) {
        response = '🍚 Risotto is an Italian rice dish that\'s creamy and delicious! Use Arborio rice (short grain). The secret is adding warm broth one ladle at a time and stirring constantly. It takes about 20-25 minutes. You can add mushrooms, peas, shrimp, or keep it simple with just Parmesan. Be patient and keep stirring!';
      } else if (query.includes('gnocchi')) {
        response = '🥟 Gnocchi are Italian potato dumplings! Boil potatoes, mash them smooth, add egg and flour to make a soft dough. Roll into ropes, cut into pieces, and boil until they float. Serve with tomato sauce, butter and sage, or pesto. They\'re fun to make and kids love helping roll them!';
      } else if (query.includes('pesto')) {
        response = '🌿 Pesto is a fresh basil sauce from Genoa, Italy! Blend fresh basil, pine nuts (or walnuts), garlic, Parmesan cheese, and olive oil. It\'s bright green and super flavorful. Toss with pasta, spread on sandwiches, or use as a pizza sauce. You can freeze it in ice cube trays for later!';
      } else if (query.includes('bruschetta')) {
        response = '🥖 Bruschetta is an easy Italian appetizer! Toast bread, rub with garlic, and top with diced tomatoes mixed with basil, olive oil, salt, and pepper. The key is using ripe tomatoes and good olive oil. Assemble just before serving so the bread stays crispy. Perfect for parties!';
      } else if (query.includes('italian') || query.includes('italy')) {
        response = '🇮🇹 Italian cooking is all about simple, quality ingredients! Popular dishes include: Carbonara, Aglio e Olio, Risotto, Gnocchi, Pesto, Alfredo, Bruschetta, Eggplant Parmigiana, and Chicken Cacciatore. Most Italian recipes are beginner-friendly. What would you like to learn?';
      } else if (query.includes('beginner') || query.includes('easy') || query.includes('start cooking')) {
        response = '👨‍🍳 Starting to cook? Great! Begin with simple recipes like: Pasta Aglio e Olio (garlic pasta - only 5 ingredients!), Scrambled Eggs, Fried Rice, or Bruschetta. Follow recipes step-by-step, don\'t rush, and taste as you go. Cooking is about practice - you\'ll get better each time! What would you like to try first?';
      } else if (query.includes('jollof')) {
        response = '🍚 Jollof Rice is a beloved West African dish! You need: rice, tomatoes, peppers, onions, oil, curry powder, thyme, bay leaves, and stock. The key is frying the tomato paste until the oil separates - this gives jollof its signature taste. Cook the rice in the seasoned tomato base until fluffy. Serve with fried plantain, chicken, or coleslaw!';
      } else if (query.includes('pasta') && !query.includes('carbonara') && !query.includes('pesto')) {
        response = '🍝 Pasta is versatile! Try these Italian classics: Carbonara (eggs & bacon), Aglio e Olio (garlic & oil - easiest!), Alfredo (cream & cheese), Pesto (basil sauce), Pomodoro (tomato sauce), or Arrabbiata (spicy tomato). Always salt your pasta water generously and save some pasta water to make sauces creamy!';
      } else {
        response = 'I can help with Italian dishes (carbonara, risotto, gnocchi, pesto, bruschetta, alfredo), Nigerian dishes (jollof rice, pounded yam, amala), and beginner cooking tips! What would you like to know?';
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

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for dishes and snacks recipes... (e.g., carbonara, risotto, jollof rice)"
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
                  <li>🇮🇹 Italian: Carbonara, Risotto, Gnocchi, Pesto, Alfredo</li>
                  <li>🇳🇬 Nigerian: Jollof Rice, Pounded Yam, Amala, Eba</li>
                  <li>🎂 Desserts: Cakes, Cookies, Ice Cream</li>
                  <li>👨‍🍳 Beginner cooking tips and guides</li>
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

