'use client';

import { useState } from 'react';
import Image from 'next/image';

type IngredientInput = {
  name: string;
  quantity: string;
};

type AnalysisResult = {
  isSafe: boolean;
  product: string;
  category: string;
  image: string;
  recipe?: {
    ingredients: string[];
    steps: string[];
    prepTime: string;
    cookTime: string;
  };
  warnings?: string[];
  corrections?: string[];
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const RECIPE_DATABASE: Record<string, AnalysisResult> = {
  // Baked Goods
  'flour,sugar,eggs,butter,milk': {
    isSafe: true,
    product: 'Classic Vanilla Cake',
    category: 'Baked Goods',
    image: '🎂',
    recipe: {
      ingredients: ['2 cups flour', '1.5 cups sugar', '3 eggs', '1 cup butter', '1 cup milk', '2 tsp baking powder', '1 tsp vanilla'],
      steps: [
        'Preheat oven to 350°F (175°C)',
        'Cream butter and sugar until fluffy',
        'Add eggs one at a time, beating well',
        'Mix dry ingredients separately',
        'Alternate adding dry ingredients and milk',
        'Pour into greased pan',
        'Bake for 30-35 minutes'
      ],
      prepTime: '15 minutes',
      cookTime: '35 minutes'
    }
  },
  'flour,sugar,eggs,butter': {
    isSafe: true,
    product: 'Butter Cookies',
    category: 'Baked Goods',
    image: '🍪',
    recipe: {
      ingredients: ['2 cups flour', '1 cup sugar', '2 eggs', '1 cup butter', '1 tsp vanilla'],
      steps: [
        'Cream butter and sugar',
        'Add eggs and vanilla',
        'Mix in flour gradually',
        'Roll dough and cut shapes',
        'Bake at 350°F for 12-15 minutes'
      ],
      prepTime: '20 minutes',
      cookTime: '15 minutes'
    }
  },
  'flour,yeast,water,salt': {
    isSafe: true,
    product: 'Artisan Bread',
    category: 'Baked Goods',
    image: '🍞',
    recipe: {
      ingredients: ['4 cups flour', '2 tsp yeast', '1.5 cups warm water', '2 tsp salt'],
      steps: [
        'Mix yeast with warm water, let sit 5 minutes',
        'Add flour and salt, knead for 10 minutes',
        'Let rise for 1 hour',
        'Shape and let rise 30 more minutes',
        'Bake at 425°F for 25-30 minutes'
      ],
      prepTime: '2 hours (including rise time)',
      cookTime: '30 minutes'
    }
  },

  // Pizza & Savory
  'flour,yeast,tomato,cheese': {
    isSafe: true,
    product: 'Margherita Pizza',
    category: 'Main Dish',
    image: '🍕',
    recipe: {
      ingredients: ['3 cups flour', '1 packet yeast', '1 cup warm water', '2 cups tomato sauce', '2 cups mozzarella', 'Fresh basil', 'Olive oil'],
      steps: [
        'Make dough: mix flour, yeast, water, salt',
        'Let rise 1 hour',
        'Roll out dough',
        'Spread tomato sauce',
        'Add cheese and basil',
        'Bake at 475°F for 12-15 minutes'
      ],
      prepTime: '1.5 hours',
      cookTime: '15 minutes'
    }
  },

  // Frozen Desserts
  'milk,sugar,cream,vanilla': {
    isSafe: true,
    product: 'Vanilla Ice Cream',
    category: 'Frozen Dessert',
    image: '🍨',
    recipe: {
      ingredients: ['2 cups heavy cream', '1 cup whole milk', '3/4 cup sugar', '2 tsp vanilla extract'],
      steps: [
        'Mix all ingredients until sugar dissolves',
        'Chill mixture for 2 hours',
        'Pour into ice cream maker',
        'Churn for 20-25 minutes',
        'Freeze for 4 hours before serving'
      ],
      prepTime: '2.5 hours',
      cookTime: '25 minutes churning'
    }
  },

  // Beverages
  'coffee,milk,sugar': {
    isSafe: true,
    product: 'Café Latte',
    category: 'Beverage',
    image: '☕',
    recipe: {
      ingredients: ['2 shots espresso', '1 cup steamed milk', 'Sugar to taste'],
      steps: [
        'Brew espresso shots',
        'Steam milk until frothy',
        'Pour espresso into cup',
        'Add steamed milk',
        'Top with foam',
        'Add sugar if desired'
      ],
      prepTime: '5 minutes',
      cookTime: '5 minutes'
    }
  },
  'tea,milk,sugar,spices': {
    isSafe: true,
    product: 'Masala Chai',
    category: 'Beverage',
    image: '🍵',
    recipe: {
      ingredients: ['2 cups water', '2 cups milk', '4 tsp black tea', '4 tbsp sugar', 'Cardamom, ginger, cinnamon'],
      steps: [
        'Boil water with spices',
        'Add tea leaves, simmer 2 minutes',
        'Add milk and sugar',
        'Bring to boil',
        'Strain and serve hot'
      ],
      prepTime: '5 minutes',
      cookTime: '10 minutes'
    }
  },

  // Nigerian Dishes
  'rice,tomato,pepper,onion': {
    isSafe: true,
    product: 'Jollof Rice',
    category: 'Nigerian Cuisine',
    image: '🍚',
    recipe: {
      ingredients: ['3 cups rice', '400g tomato paste', '3 bell peppers', '2 onions', '1/4 cup vegetable oil', 'Curry, thyme, bay leaves', '4 cups chicken stock'],
      steps: [
        'Blend tomatoes, peppers, and 1 onion',
        'Heat oil, fry sliced onion until golden',
        'Add tomato blend, fry for 15-20 minutes',
        'Add tomato paste, spices, cook 5 minutes',
        'Add stock, bring to boil',
        'Add washed rice, stir well',
        'Cover tightly, cook on low heat 30-40 minutes',
        'Stir occasionally, add water if needed'
      ],
      prepTime: '15 minutes',
      cookTime: '1 hour'
    }
  },
  'beans,palm oil,pepper,onion': {
    isSafe: true,
    product: 'Ewa Agoyin',
    category: 'Nigerian Cuisine',
    image: '🫘',
    recipe: {
      ingredients: ['2 cups honey beans', '1/2 cup palm oil', '10 scotch bonnet peppers', '2 onions', 'Salt'],
      steps: [
        'Boil beans until very soft and mushy (2-3 hours)',
        'Mash beans slightly',
        'Blend peppers and onions',
        'Heat palm oil until hot',
        'Fry pepper mix on low heat for 30 minutes',
        'Stir constantly until dark and fragrant',
        'Add salt to taste',
        'Serve sauce over mashed beans'
      ],
      prepTime: '10 minutes',
      cookTime: '3.5 hours'
    }
  },
  'yam,palm oil,pepper,onion': {
    isSafe: true,
    product: 'Yam Porridge (Asaro)',
    category: 'Nigerian Cuisine',
    image: '🍠',
    recipe: {
      ingredients: ['1 large yam', '1/4 cup palm oil', '2 tomatoes', '2 peppers', '1 onion', 'Crayfish', 'Spinach', 'Seasoning cubes'],
      steps: [
        'Peel and cube yam',
        'Boil yam in salted water until tender',
        'Blend tomatoes, peppers, onion',
        'Heat palm oil, fry pepper mix',
        'Add to boiling yam',
        'Add crayfish and seasoning',
        'Mash some yam to thicken',
        'Add spinach, cook 5 minutes'
      ],
      prepTime: '15 minutes',
      cookTime: '45 minutes'
    }
  },
  'garri,water,sugar,milk': {
    isSafe: true,
    product: 'Garri Soakings',
    category: 'Nigerian Cuisine',
    image: '🥛',
    recipe: {
      ingredients: ['1 cup garri', '2 cups cold water', 'Sugar to taste', 'Milk (optional)', 'Groundnuts (optional)'],
      steps: [
        'Pour garri into a bowl',
        'Add cold water gradually while stirring',
        'Add sugar to taste',
        'Add milk if desired',
        'Add groundnuts or coconut for crunch',
        'Stir well and serve immediately'
      ],
      prepTime: '5 minutes',
      cookTime: '0 minutes'
    }
  },
  'plantain,flour,pepper,onion': {
    isSafe: true,
    product: 'Boli (Roasted Plantain)',
    category: 'Nigerian Cuisine',
    image: '🍌',
    recipe: {
      ingredients: ['4 ripe plantains', '2 peppers', '1 onion', 'Palm oil', 'Salt'],
      steps: [
        'Cut plantains with skin on',
        'Roast over charcoal or in oven at 400°F',
        'Turn frequently until skin is black (20 mins)',
        'Blend peppers and onion',
        'Mix pepper with palm oil and salt',
        'Peel plantain and serve with pepper sauce'
      ],
      prepTime: '5 minutes',
      cookTime: '25 minutes'
    }
  },

  // Asian Dishes
  'rice,soy sauce,eggs,vegetables': {
    isSafe: true,
    product: 'Fried Rice',
    category: 'Asian Cuisine',
    image: '🍚',
    recipe: {
      ingredients: ['4 cups cooked rice (day-old)', '3 eggs', '2 cups mixed vegetables', '3 tbsp soy sauce', '2 tbsp oil', 'Garlic, ginger'],
      steps: [
        'Heat oil in wok',
        'Scramble eggs, set aside',
        'Stir-fry vegetables',
        'Add rice, break up clumps',
        'Add soy sauce and seasonings',
        'Add eggs back, mix well'
      ],
      prepTime: '10 minutes',
      cookTime: '15 minutes'
    }
  },

  // Mexican
  'corn,lime,cheese,chili': {
    isSafe: true,
    product: 'Elote (Mexican Street Corn)',
    category: 'Mexican Cuisine',
    image: '🌽',
    recipe: {
      ingredients: ['4 corn cobs', '1/4 cup mayo', '1/2 cup cotija cheese', '2 limes', 'Chili powder', 'Cilantro'],
      steps: [
        'Grill corn until charred',
        'Brush with mayo',
        'Sprinkle with cheese',
        'Add chili powder',
        'Squeeze lime juice',
        'Garnish with cilantro'
      ],
      prepTime: '5 minutes',
      cookTime: '15 minutes'
    }
  },

  // Cosmetics
  'coconut oil,shea butter,essential oil': {
    isSafe: true,
    product: 'Body Butter',
    category: 'Cosmetic',
    image: '🧴',
    recipe: {
      ingredients: ['1/2 cup coconut oil', '1/2 cup shea butter', '20 drops essential oil'],
      steps: [
        'Melt coconut oil and shea butter',
        'Let cool slightly',
        'Add essential oils',
        'Refrigerate until solid',
        'Whip with mixer until fluffy',
        'Store in jar'
      ],
      prepTime: '10 minutes',
      cookTime: '2 hours cooling'
    }
  },

  // Cleaning Products
  'vinegar,baking soda,water': {
    isSafe: true,
    product: 'All-Purpose Cleaner',
    category: 'Cleaning Product',
    image: '🧹',
    recipe: {
      ingredients: ['1 cup white vinegar', '1 cup water', '2 tbsp baking soda', 'Essential oils (optional)'],
      steps: [
        'Mix water and vinegar in spray bottle',
        'Add baking soda slowly (will fizz)',
        'Add 10 drops essential oil',
        'Shake well before each use',
        'Spray and wipe surfaces'
      ],
      prepTime: '5 minutes',
      cookTime: '0 minutes'
    }
  },

  // Dangerous combinations
  'bleach,ammonia': {
    isSafe: false,
    product: 'TOXIC GAS',
    category: 'Dangerous',
    image: '☠️',
    warnings: ['NEVER mix bleach and ammonia!', 'Creates toxic chloramine gas', 'Can cause respiratory damage', 'Can be fatal'],
    corrections: ['Use bleach OR ammonia separately', 'Never mix cleaning products', 'Ensure good ventilation']
  },
  'vinegar,bleach': {
    isSafe: false,
    product: 'TOXIC CHLORINE GAS',
    category: 'Dangerous',
    image: '☠️',
    warnings: ['NEVER mix vinegar and bleach!', 'Creates toxic chlorine gas', 'Causes breathing problems', 'Can damage lungs'],
    corrections: ['Use vinegar OR bleach separately', 'Wait 24 hours between using different cleaners']
  }
};

const NIGERIAN_RECIPES = {
  'jollof rice': `**Jollof Rice** 🍚

**Ingredients:**
- 3 cups long-grain parboiled rice
- 400g tomato paste
- 3 large red bell peppers
- 3 scotch bonnet peppers (adjust for heat)
- 2 large onions
- 1/4 cup vegetable oil
- 4 cups chicken or beef stock
- 2 tbsp curry powder
- 1 tbsp thyme
- 2-3 bay leaves
- 2 seasoning cubes
- Salt to taste

**Detailed Steps:**

1. **Prepare the Pepper Base:**
   - Roughly chop 3 bell peppers, 2 scotch bonnets, and 1 onion
   - Blend until smooth (add minimal water if needed)
   - Set aside

2. **Fry the Base:**
   - Heat 1/4 cup oil in a large pot over medium heat
   - Slice remaining onion, fry until golden brown (5 mins)
   - Add blended pepper mix
   - Fry for 15-20 minutes, stirring frequently
   - The mix should reduce and darken - this is KEY for authentic taste!

3. **Add Tomato Paste:**
   - Add 400g tomato paste to the fried pepper
   - Fry for another 5-7 minutes
   - Add curry powder, thyme, bay leaves
   - Mix well

4. **Add Stock:**
   - Pour in 4 cups of stock
   - Add seasoning cubes and salt
   - Bring to a rolling boil
   - Taste and adjust seasoning

5. **Cook the Rice:**
   - Wash rice thoroughly until water runs clear
   - Add rice to boiling sauce, stir well
   - Ensure liquid covers rice by 1 inch (add water if needed)
   - Once boiling, reduce heat to LOW
   - Cover pot tightly with foil, then lid (traps steam)

6. **Steam:**
   - Cook for 30-40 minutes without opening
   - Check after 30 mins - rice should be tender
   - If too wet, leave uncovered for 5 mins
   - If too dry, sprinkle water, cover, cook 5 more mins

7. **Finish:**
   - Fluff with fork
   - Remove bay leaves
   - Serve hot with fried plantain, chicken, or coleslaw

**Pro Tips:**
- Use parboiled rice (Uncle Ben's or similar) for best results
- The longer you fry the pepper base, the better the flavor
- Don't stir rice too much while cooking - causes mushiness
- For smoky flavor: place foil with hot coal on top of rice for 5 mins`,

  'egusi soup': `**Egusi Soup** 🍲

**Ingredients:**
- 2 cups ground egusi (melon seeds)
- 500g assorted meat (beef, goat, tripe)
- 200g stockfish (soaked)
- 1/4 cup palm oil
- 2 cups chopped spinach or bitter leaf
- 2 onions
- 3 scotch bonnet peppers
- 2 tbsp ground crayfish
- 2 seasoning cubes
- Salt to taste

**Detailed Steps:**

1. **Prepare Meat:**
   - Season meat with 1 onion, salt, seasoning cube
   - Boil until tender (45 mins - 1 hour)
   - Add stockfish in last 20 minutes
   - Reserve 3 cups of stock

2. **Prepare Egusi Paste:**
   - Mix ground egusi with 1/2 cup water
   - Form a thick paste (should hold shape)
   - Set aside

3. **Make Pepper Base:**
   - Blend peppers and 1 onion with minimal water
   - Set aside

4. **Cook Soup:**
   - Heat palm oil in pot until clear (5 mins)
   - Add pepper mix, fry for 5 minutes
   - Add meat stock (3 cups)
   - Bring to boil

5. **Add Egusi:**
   - Drop spoonfuls of egusi paste into boiling soup
   - Don't stir immediately!
   - Let cook for 5 minutes
   - Then gently stir to break up egusi

6. **Season:**
   - Add cooked meat and stockfish
   - Add crayfish, seasoning cubes, salt
   - Simmer for 10 minutes

7. **Add Vegetables:**
   - Add chopped spinach or bitter leaf
   - Stir well
   - Cook for 5 more minutes
   - Adjust seasoning

8. **Finish:**
   - Soup should be thick and rich
   - Serve hot with pounded yam, eba, or fufu

**Pro Tips:**
- Don't over-stir egusi - makes it gummy
- Palm oil must be heated properly for best flavor
- Bitter leaf needs to be washed multiple times to reduce bitterness
- Add more stock if too thick`,

  'pounded yam': `**Pounded Yam** 🍠

**Ingredients:**
- 2 large white yams
- Water for boiling
- Salt (optional)

**Detailed Steps:**

1. **Prepare Yam:**
   - Peel yam with sharp knife
   - Cut into 2-inch chunks
   - Rinse in cold water

2. **Boil:**
   - Place yam in large pot
   - Cover with water
   - Add pinch of salt
   - Boil for 20-25 minutes
   - Yam should be very soft (test with fork)

3. **Drain:**
   - Pour out most water
   - Leave about 1/4 cup water in pot

4. **Pound (Traditional Method):**
   - Use mortar and pestle
   - Pound yam pieces vigorously
   - Dip pestle in water occasionally
   - Pound until completely smooth (15-20 mins)
   - No lumps should remain

5. **Modern Method (Mixer):**
   - Transfer hot yam to stand mixer
   - Use paddle attachment
   - Mix on low speed
   - Gradually increase speed
   - Mix for 5-7 minutes
   - Should be stretchy and smooth

6. **Shape:**
   - Wet hands with cold water
   - Mold pounded yam into balls
   - Serve immediately while hot

**Serving:**
- Serve with egusi, ogbono, or vegetable soup
- Eat with hands (traditional) or spoon

**Pro Tips:**
- Yam must be very hot when pounding
- Work quickly - yam gets harder as it cools
- Add tiny amounts of water if too stiff
- White yam is best for pounding (not yellow yam)
- Should be stretchy and elastic when done`,

  'suya': `**Suya (Spiced Grilled Meat)** 🍢

**Ingredients:**

*For Meat:*
- 1kg beef sirloin (thinly sliced)
- 2 tbsp vegetable oil

*For Suya Spice (Yaji):*
- 1 cup roasted groundnuts
- 2 tbsp ground ginger
- 2 tbsp cayenne pepper
- 1 tbsp paprika
- 1 tbsp onion powder
- 1 tbsp garlic powder
- 1 seasoning cube (crushed)
- 1/2 tsp salt

**Detailed Steps:**

1. **Make Suya Spice:**
   - Roast groundnuts in dry pan until golden
   - Let cool, then grind to fine powder
   - Mix with all other spices
   - Store in airtight container

2. **Prepare Meat:**
   - Slice beef into thin strips (1/4 inch thick)
   - Cut into 4-inch long pieces
   - Pat dry with paper towel

3. **Season:**
   - Mix meat with 2 tbsp oil
   - Add 4 tbsp suya spice
   - Massage spice into meat
   - Marinate for 2 hours (or overnight)

4. **Skewer:**
   - Soak wooden skewers in water (30 mins)
   - Thread meat onto skewers
   - Weave back and forth

5. **Grill:**
   - Prepare charcoal grill (medium-high heat)
   - OR use oven broiler
   - Grill meat for 3-4 minutes per side
   - Brush with oil while grilling
   - Should be slightly charred

6. **Finish:**
   - Remove from heat
   - Sprinkle more suya spice on top
   - Serve immediately

**Serving:**
- Serve with sliced onions, tomatoes, cabbage
- Add extra suya spice on the side
- Squeeze fresh lime juice over top

**Pro Tips:**
- Meat should be thin for quick cooking
- Don't overcook - should be juicy
- Charcoal gives authentic smoky flavor
- Make extra suya spice - keeps for months
- Can use chicken, goat, or fish instead`,

  'moi moi': `**Moi Moi (Steamed Bean Pudding)** 🫘

**Ingredients:**
- 3 cups black-eyed peas (beans)
- 2 red bell peppers
- 2 scotch bonnet peppers
- 1 large onion
- 1/2 cup vegetable oil
- 2 seasoning cubes
- Salt to taste
- 1 cup warm water
- Optional: boiled eggs, fish, corned beef

**Detailed Steps:**

1. **Prepare Beans:**
   - Soak beans in water for 5 minutes
   - Rub between palms to remove skins
   - Rinse until all skins float away
   - This takes 15-20 minutes - be patient!

2. **Blend:**
   - Add peeled beans to blender
   - Add peppers and onion
   - Add 1 cup water
   - Blend until very smooth (5 mins)
   - Should be like pancake batter

3. **Season:**
   - Pour mixture into large bowl
   - Add oil, seasoning cubes, salt
   - Whisk vigorously for 5 minutes
   - Mixture should be fluffy and airy
   - Add more water if too thick

4. **Prepare Containers:**
   - Use moi moi leaves (traditional)
   - OR small bowls/ramekins
   - OR empty tin cans
   - Grease lightly with oil

5. **Fill:**
   - Pour mixture into containers (3/4 full)
   - Add boiled egg, fish, or corned beef if using
   - Cover each container with foil

6. **Steam:**
   - Place containers in large pot
   - Add water to pot (halfway up containers)
   - Cover pot with lid
   - Steam on medium heat for 45-60 minutes
   - Don't open lid during cooking!

7. **Test:**
   - Insert toothpick in center
   - Should come out clean
   - Moi moi should be firm, not watery

8. **Serve:**
   - Let cool for 5 minutes
   - Remove from containers
   - Serve warm or cold

**Pro Tips:**
- Removing bean skins is crucial - affects texture
- Whisking adds air - makes moi moi fluffy
- Don't add too much water - should be thick
- Steam, don't boil - water shouldn't cover containers
- Can make ahead and refrigerate for 3 days`,

  'akara': `**Akara (Bean Fritters)** 🫘

**Ingredients:**
- 2 cups black-eyed peas
- 1 onion
- 1-2 scotch bonnet peppers
- Salt to taste
- Vegetable oil for frying

**Detailed Steps:**

1. **Peel Beans:**
   - Soak beans in water for 5 minutes
   - Rub vigorously between palms
   - Skins will float - pour off
   - Repeat until all skins removed (20 mins)
   - This is the most important step!

2. **Blend:**
   - Add peeled beans to blender
   - Add onion and peppers
   - Add minimal water (just enough to blend)
   - Blend until smooth but thick
   - Should be like thick pancake batter

3. **Whip:**
   - Transfer to large bowl
   - Add salt
   - Whisk vigorously for 5-10 minutes
   - Use hand mixer or wooden spoon
   - Mixture should be fluffy and airy
   - This makes akara light and fluffy!

4. **Test Consistency:**
   - Drop spoonful in water
   - Should float immediately
   - If sinks, whisk more air in

5. **Heat Oil:**
   - Pour oil in deep pot (3 inches deep)
   - Heat to 350°F (medium-high)
   - Test with small drop of batter
   - Should sizzle immediately

6. **Fry:**
   - Use spoon or ice cream scoop
   - Drop spoonfuls of batter into hot oil
   - Don't overcrowd pot
   - Fry 3-4 minutes per side
   - Should be golden brown

7. **Drain:**
   - Remove with slotted spoon
   - Drain on paper towels
   - Serve immediately while hot

**Serving:**
- Serve with pap (ogi), bread, or custard
- Eat for breakfast or snack

**Pro Tips:**
- Beans must be completely peeled
- Whipping adds air - crucial for fluffy akara
- Oil must be hot enough or akara absorbs oil
- Don't add too much water when blending
- Best eaten fresh and hot
- Can add chopped onions to batter for texture`,
};

export default function IngredientMixer() {
  const [ingredients, setIngredients] = useState<IngredientInput[]>([{ name: '', quantity: '' }]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! Ask me anything about making food, pastries, cosmetics, or cleaning products. I can help with recipes, techniques, and ingredient questions!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof IngredientInput, value: string) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const analyzeIngredients = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const ingredientNames = ingredients
        .map(i => i.name.toLowerCase().trim())
        .filter(n => n)
        .sort()
        .join(',');

      let foundResult = RECIPE_DATABASE[ingredientNames];

      if (!foundResult) {
        for (const [key, value] of Object.entries(RECIPE_DATABASE)) {
          const keyIngredients = key.split(',');
          const userIngredients = ingredientNames.split(',');
          
          const matches = keyIngredients.filter(k => userIngredients.includes(k));
          if (matches.length >= keyIngredients.length - 1 && keyIngredients.length > 2) {
            foundResult = value;
            break;
          }
        }
      }

      if (!foundResult) {
        foundResult = {
          isSafe: true,
          product: 'Custom Recipe',
          category: 'Experimental',
          image: '🧪',
          recipe: {
            ingredients: ingredients.map(i => `${i.quantity} ${i.name}`),
            steps: [
              'Combine all ingredients',
              'Mix well',
              'Adjust to taste',
              'Experiment and enjoy!'
            ],
            prepTime: 'Varies',
            cookTime: 'Varies'
          }
        };
      }

      setResult(foundResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');

    setTimeout(() => {
      let response = '';
      const lowerMessage = userMessage.toLowerCase();

      // Check for Nigerian recipes
      if (lowerMessage.includes('jollof')) {
        response = NIGERIAN_RECIPES['jollof rice'];
      } else if (lowerMessage.includes('egusi')) {
        response = NIGERIAN_RECIPES['egusi soup'];
      } else if (lowerMessage.includes('pounded yam') || lowerMessage.includes('fufu')) {
        response = NIGERIAN_RECIPES['pounded yam'];
      } else if (lowerMessage.includes('suya')) {
        response = NIGERIAN_RECIPES['suya'];
      } else if (lowerMessage.includes('moi moi') || lowerMessage.includes('moin moin')) {
        response = NIGERIAN_RECIPES['moi moi'];
      } else if (lowerMessage.includes('akara')) {
        response = NIGERIAN_RECIPES['akara'];
      }
      // General recipe questions
      else if (lowerMessage.includes('cake')) {
        response = 'To make a basic cake: Mix 2 cups flour, 1.5 cups sugar, 3 eggs, 1 cup butter, 1 cup milk, 2 tsp baking powder. Cream butter and sugar, add eggs, alternate dry ingredients with milk. Bake at 350°F for 30-35 minutes.';
      } else if (lowerMessage.includes('pizza')) {
        response = 'For pizza: Make dough with 3 cups flour, 1 packet yeast, 1 cup warm water. Let rise 1 hour. Roll out, add tomato sauce, mozzarella, and toppings. Bake at 475°F for 12-15 minutes.';
      } else if (lowerMessage.includes('ice cream')) {
        response = 'For vanilla ice cream: Mix 2 cups heavy cream, 1 cup milk, 3/4 cup sugar, 2 tsp vanilla. Chill 2 hours, then churn in ice cream maker for 20-25 minutes. Freeze 4 hours.';
      } else if (lowerMessage.includes('bread')) {
        response = 'For basic bread: Mix 4 cups flour, 2 tsp yeast, 1.5 cups warm water, 2 tsp salt. Knead 10 minutes, let rise 1 hour, shape, rise 30 more minutes. Bake at 425°F for 25-30 minutes.';
      } else if (lowerMessage.includes('cookie')) {
        response = 'For cookies: Cream 1 cup butter with 1 cup sugar, add 2 eggs and vanilla. Mix in 2 cups flour gradually. Roll, cut shapes, bake at 350°F for 12-15 minutes.';
      } else if (lowerMessage.includes('body butter') || lowerMessage.includes('lotion')) {
        response = 'For body butter: Melt 1/2 cup coconut oil with 1/2 cup shea butter. Cool slightly, add 20 drops essential oil. Refrigerate until solid, then whip until fluffy.';
      } else if (lowerMessage.includes('cleaner') || lowerMessage.includes('cleaning')) {
        response = 'For all-purpose cleaner: Mix 1 cup white vinegar, 1 cup water, 2 tbsp baking soda in spray bottle. Add essential oils if desired. Shake before use. NEVER mix bleach with vinegar or ammonia!';
      } else if (lowerMessage.includes('soap')) {
        response = 'For basic soap: Mix lye with water (carefully!), blend with oils (coconut, olive). Pour into molds, cure for 4-6 weeks. Always use safety equipment and follow exact measurements.';
      } else {
        response = 'I can help with recipes for cakes, cookies, pizza, ice cream, bread, Nigerian dishes (jollof rice, egusi soup, suya, moi moi, akara), cosmetics (body butter, soap), and cleaning products. What would you like to know?';
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🧪 Ingredient Mix Analyzer</h1>
          <p className="text-gray-600">Discover what you can create from your ingredients!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Your Ingredients</h2>
          
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Ingredient name (e.g., flour, sugar)"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Quantity (e.g., 2 cups)"
                value={ingredient.quantity}
                onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredient(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <div className="flex gap-4 mt-6">
            <button
              onClick={addIngredient}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              + Add Ingredient
            </button>
            <button
              onClick={analyzeIngredients}
              disabled={isAnalyzing || ingredients.every(i => !i.name)}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : '🔍 Analyze Mix'}
            </button>
          </div>
        </div>

        {result && (
          <div className={`bg-white rounded-lg shadow-lg p-6 ${result.isSafe ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{result.image}</div>
              <h2 className="text-3xl font-bold text-gray-800">{result.product}</h2>
              <p className="text-gray-600">{result.category}</p>
            </div>

            {result.isSafe ? (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-semibold">✅ Safe to make!</p>
                </div>

                {result.recipe && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">📝 Recipe</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Ingredients:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {result.recipe.ingredients.map((ing, i) => (
                          <li key={i} className="text-gray-600">{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        {result.recipe.steps.map((step, i) => (
                          <li key={i} className="text-gray-600">{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>⏱️ Prep: {result.recipe.prepTime}</span>
                      <span>🔥 Cook: {result.recipe.cookTime}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 font-semibold mb-2">⚠️ DANGER - Do Not Mix!</p>
                  {result.warnings && (
                    <ul className="list-disc list-inside space-y-1">
                      {result.warnings.map((warning, i) => (
                        <li key={i} className="text-red-700">{warning}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {result.corrections && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">💡 Safe Alternatives:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {result.corrections.map((correction, i) => (
                        <li key={i} className="text-blue-700">{correction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition flex items-center justify-center text-2xl"
      >
        💬
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col">
          <div className="bg-purple-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Recipe Assistant</h3>
            <button onClick={() => setShowChat(false)} className="text-xl">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about recipes..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

