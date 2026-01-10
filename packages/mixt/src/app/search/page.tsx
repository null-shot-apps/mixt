'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, ChefHat, Youtube, Globe, Lightbulb } from 'lucide-react';
import { Suspense } from 'react';

// Recipe database with comprehensive information
const recipeDatabase: Record<string, {
  name: string;
  country: string;
  region: string;
  description: string;
  cookingStyle: string;
  prepTime: string;
  servings: string;
  images: string[];
  ingredients: { item: string; substitution?: string }[];
  instructions: string[];
  tips: string[];
  variations: string[];
  youtubeLinks: { title: string; channel: string; url: string }[];
}> = {
  'jollof rice': {
    name: 'Jollof Rice',
    country: 'West Africa',
    region: 'Nigeria, Ghana, Senegal',
    description: 'A vibrant one-pot rice dish cooked in a rich tomato and pepper sauce with aromatic spices. Jollof rice is a beloved staple across West Africa, often served at celebrations and gatherings.',
    cookingStyle: 'One-pot cooking, simmering',
    prepTime: '15 mins prep, 45 mins cooking',
    servings: '6-8 people',
    images: [
      'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    ],
    ingredients: [
      { item: '3 cups long-grain parboiled rice', substitution: 'basmati rice' },
      { item: '400g tomato paste' },
      { item: '4 large tomatoes, blended' },
      { item: '2 red bell peppers, blended' },
      { item: '2 scotch bonnet peppers', substitution: 'habanero or jalapeño for less heat' },
      { item: '1 large onion, diced' },
      { item: '3 cups chicken or vegetable stock' },
      { item: '1/4 cup vegetable oil' },
      { item: '2 tbsp curry powder' },
      { item: '1 tbsp thyme' },
      { item: '2 bay leaves' },
      { item: 'Salt and seasoning cubes to taste' },
    ],
    instructions: [
      'Rinse rice thoroughly and set aside to drain.',
      'Heat oil in a large pot over medium heat. Add diced onions and sauté until translucent.',
      'Add tomato paste and fry for 5-7 minutes, stirring constantly to prevent burning.',
      'Add blended tomatoes, peppers, curry powder, thyme, and bay leaves. Cook for 15-20 minutes until oil rises to the top.',
      'Pour in stock and bring to a boil. Season with salt and seasoning cubes.',
      'Add rice, stir well, and reduce heat to low. Cover tightly with foil and lid.',
      'Cook for 30-35 minutes without stirring, until rice is tender and liquid is absorbed.',
      'Fluff with a fork and serve hot with fried plantains, chicken, or salad.',
    ],
    tips: [
      'Use parboiled rice for the best texture and to prevent mushiness.',
      'The key to great jollof is frying the tomato paste until it darkens and loses its raw taste.',
      'Don\'t stir the rice while cooking - this helps create the prized smoky bottom layer.',
      'For extra flavor, add a piece of smoked fish or dried shrimp.',
    ],
    variations: [
      'Party Jollof: Add more peppers and cook over high heat for a smoky flavor',
      'Seafood Jollof: Add shrimp, fish, or mixed seafood',
      'Vegetarian Jollof: Use vegetable stock and add mixed vegetables',
      'Ghanaian style: Add more ginger and use less tomato paste',
    ],
    youtubeLinks: [
      {
        title: 'How to Make Perfect Jollof Rice',
        channel: 'Zeelicious Foods',
        url: 'https://www.youtube.com/watch?v=W2eKdKFSFtM',
      },
      {
        title: 'Nigerian Jollof Rice Recipe',
        channel: 'All Nigerian Recipes',
        url: 'https://www.youtube.com/watch?v=RUyRZRiWRMY',
      },
      {
        title: 'Jollof Rice - West African Recipe',
        channel: 'Chef Lola\'s Kitchen',
        url: 'https://www.youtube.com/watch?v=zfRw2WbGjPM',
      },
    ],
  },
  'suya': {
    name: 'Suya',
    country: 'West Africa',
    region: 'Nigeria, Ghana, Cameroon',
    description: 'Spicy grilled meat skewers coated in a flavorful peanut-spice blend called yaji. A popular street food enjoyed across West Africa.',
    cookingStyle: 'Grilling, barbecue',
    prepTime: '20 mins prep + 2 hours marinating, 15 mins grilling',
    servings: '4-6 people',
    images: [
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800',
    ],
    ingredients: [
      { item: '1kg beef sirloin or chicken, thinly sliced' },
      { item: '1 cup roasted peanuts, ground', substitution: 'peanut powder' },
      { item: '2 tbsp ground ginger' },
      { item: '2 tbsp paprika' },
      { item: '1 tbsp cayenne pepper', substitution: 'reduce for less heat' },
      { item: '1 tbsp garlic powder' },
      { item: '1 tbsp onion powder' },
      { item: '1 tsp ground cloves' },
      { item: '2 seasoning cubes, crushed' },
      { item: '1/4 cup vegetable oil' },
      { item: 'Salt to taste' },
      { item: 'Wooden skewers, soaked in water' },
    ],
    instructions: [
      'Mix ground peanuts with all spices, seasoning cubes, and salt to make suya spice (yaji).',
      'Thread meat slices onto soaked wooden skewers.',
      'Brush meat with oil, then generously coat with suya spice mixture.',
      'Reserve some spice mix for serving.',
      'Marinate for at least 2 hours or overnight in the refrigerator.',
      'Preheat grill or barbecue to medium-high heat.',
      'Grill skewers for 3-4 minutes per side until charred and cooked through.',
      'Serve hot with sliced onions, tomatoes, cabbage, and extra suya spice.',
    ],
    tips: [
      'Slice meat thinly and against the grain for tender suya.',
      'Don\'t skip marinating - it makes the meat more flavorful.',
      'Use a charcoal grill for authentic smoky flavor.',
      'Make extra suya spice - it stores well and can be used on other dishes.',
    ],
    variations: [
      'Chicken Suya: Use boneless chicken thighs for juicier results',
      'Fish Suya: Use firm fish like tilapia or catfish',
      'Vegetarian Suya: Use firm tofu or mushrooms',
      'Spicy Suya: Add more cayenne and scotch bonnet powder',
    ],
    youtubeLinks: [
      {
        title: 'How to Make Nigerian Suya',
        channel: 'Sisi Yemmie',
        url: 'https://www.youtube.com/watch?v=nKZVZKZ5vZc',
      },
      {
        title: 'Authentic Suya Recipe',
        channel: 'Zeelicious Foods',
        url: 'https://www.youtube.com/watch?v=8xKFJ8qfqQs',
      },
    ],
  },
  'injera': {
    name: 'Injera',
    country: 'East Africa',
    region: 'Ethiopia, Eritrea',
    description: 'A spongy, tangy flatbread made from fermented teff flour. Injera serves as both plate and utensil in Ethiopian and Eritrean cuisine.',
    cookingStyle: 'Fermentation, pan-frying',
    prepTime: '10 mins prep + 2-3 days fermentation, 30 mins cooking',
    servings: '8-10 pieces',
    images: [
      'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800',
    ],
    ingredients: [
      { item: '2 cups teff flour', substitution: 'mix with all-purpose flour if teff unavailable' },
      { item: '3 cups water' },
      { item: '1/2 tsp salt' },
      { item: '1/4 tsp baking powder (optional, for quicker rise)' },
    ],
    instructions: [
      'Mix teff flour with water in a large bowl until smooth.',
      'Cover with a clean cloth and let ferment at room temperature for 2-3 days, stirring once daily.',
      'The batter should smell slightly sour and have bubbles on top when ready.',
      'Add salt and mix well. The consistency should be like thin pancake batter.',
      'Heat a non-stick skillet or crepe pan over medium heat.',
      'Pour 1/2 cup batter in a circular motion from outside to center.',
      'Cover and cook for 2-3 minutes until holes form on surface and edges lift.',
      'Do not flip. Remove and stack on a plate, covering with a cloth.',
    ],
    tips: [
      'Fermentation is key - don\'t rush it. The sour taste is authentic.',
      'Use a non-stick pan to prevent sticking.',
      'Injera should have a spongy texture with many small holes.',
      'Store in an airtight container for up to 3 days.',
    ],
    variations: [
      'Mixed flour injera: Combine teff with barley or wheat flour',
      'Quick injera: Add club soda for instant bubbles',
      'White injera: Use white teff flour for a milder flavor',
    ],
    youtubeLinks: [
      {
        title: 'How to Make Injera - Ethiopian Flatbread',
        channel: 'Teff Love',
        url: 'https://www.youtube.com/watch?v=0pUXGYLjQxE',
      },
      {
        title: 'Traditional Injera Recipe',
        channel: 'Berhan Ethiopian Kitchen',
        url: 'https://www.youtube.com/watch?v=xZKqJ5K5K5M',
      },
    ],
  },
  'tagine': {
    name: 'Tagine',
    country: 'North Africa',
    region: 'Morocco, Algeria, Tunisia',
    description: 'A slow-cooked savory stew named after the earthenware pot it\'s cooked in. Features tender meat, vegetables, and aromatic spices.',
    cookingStyle: 'Slow cooking, braising',
    prepTime: '20 mins prep, 2 hours cooking',
    servings: '6 people',
    images: [
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    ],
    ingredients: [
      { item: '1kg lamb or chicken, cut into pieces', substitution: 'beef or chickpeas for vegetarian' },
      { item: '2 large onions, sliced' },
      { item: '3 cloves garlic, minced' },
      { item: '2 carrots, sliced' },
      { item: '2 zucchini, sliced' },
      { item: '1 cup dried apricots or prunes' },
      { item: '1 can chickpeas, drained' },
      { item: '2 tomatoes, diced' },
      { item: '2 tbsp olive oil' },
      { item: '1 tbsp ground cumin' },
      { item: '1 tbsp ground coriander' },
      { item: '1 tsp cinnamon' },
      { item: '1 tsp turmeric' },
      { item: '1 tsp paprika' },
      { item: '2 cups chicken or vegetable stock' },
      { item: 'Fresh cilantro and parsley' },
      { item: 'Salt and pepper to taste' },
    ],
    instructions: [
      'Heat olive oil in a tagine or heavy pot over medium heat.',
      'Brown meat pieces on all sides, then remove and set aside.',
      'Sauté onions and garlic until softened.',
      'Add all spices and cook for 1 minute until fragrant.',
      'Return meat to pot, add tomatoes, stock, and dried fruit.',
      'Bring to a boil, then reduce heat to low and cover.',
      'Simmer for 1.5 hours, stirring occasionally.',
      'Add carrots, zucchini, and chickpeas. Cook for 30 more minutes.',
      'Garnish with fresh herbs and serve with couscous or bread.',
    ],
    tips: [
      'Use a traditional tagine pot for authentic flavor, or a Dutch oven works well.',
      'Low and slow is the key - don\'t rush the cooking process.',
      'The dried fruit adds a sweet contrast to the savory spices.',
      'Make ahead - tagine tastes even better the next day.',
    ],
    variations: [
      'Chicken and preserved lemon tagine',
      'Lamb and prune tagine',
      'Vegetable tagine with chickpeas',
      'Fish tagine with tomatoes and peppers',
    ],
    youtubeLinks: [
      {
        title: 'Moroccan Chicken Tagine Recipe',
        channel: 'Moroccan Food',
        url: 'https://www.youtube.com/watch?v=JHDkKPZUZzQ',
      },
      {
        title: 'How to Make Tagine',
        channel: 'Food Wishes',
        url: 'https://www.youtube.com/watch?v=xZKqJ5K5K5M',
      },
    ],
  },
  'bobotie': {
    name: 'Bobotie',
    country: 'Southern Africa',
    region: 'South Africa',
    description: 'A spiced, curried meat dish with a golden egg topping. A Cape Malay classic that combines sweet and savory flavors.',
    cookingStyle: 'Baking, casserole',
    prepTime: '20 mins prep, 45 mins baking',
    servings: '6-8 people',
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    ],
    ingredients: [
      { item: '1kg ground beef or lamb', substitution: 'ground turkey or lentils' },
      { item: '2 onions, chopped' },
      { item: '2 cloves garlic, minced' },
      { item: '2 slices white bread, soaked in milk' },
      { item: '1/4 cup raisins or dried apricots' },
      { item: '1/4 cup slivered almonds' },
      { item: '2 tbsp curry powder' },
      { item: '1 tbsp turmeric' },
      { item: '1 tbsp sugar' },
      { item: '2 tbsp chutney' },
      { item: '2 tbsp vinegar' },
      { item: '3 eggs' },
      { item: '1 cup milk' },
      { item: '4 bay leaves' },
      { item: 'Salt and pepper to taste' },
    ],
    instructions: [
      'Preheat oven to 180°C (350°F).',
      'Sauté onions and garlic until soft. Add ground meat and brown.',
      'Add curry powder, turmeric, sugar, salt, and pepper. Cook for 2 minutes.',
      'Squeeze milk from bread and add bread to meat mixture.',
      'Stir in raisins, almonds, chutney, and vinegar. Mix well.',
      'Transfer to a greased baking dish and press down evenly.',
      'Push bay leaves into the top of the mixture.',
      'Beat 2 eggs with 1/2 cup milk and pour over meat.',
      'Bake for 30 minutes. Beat remaining egg with remaining milk.',
      'Pour over bobotie and bake for 15 more minutes until golden.',
      'Serve with yellow rice, chutney, and sambals.',
    ],
    tips: [
      'The egg topping should be set but still slightly wobbly.',
      'Bobotie tastes better the next day after flavors meld.',
      'Serve with traditional yellow rice (rice cooked with turmeric and raisins).',
      'Adjust curry powder to your heat preference.',
    ],
    variations: [
      'Vegetarian bobotie with lentils and mushrooms',
      'Chicken bobotie for a lighter version',
      'Extra fruity with more dried apricots',
    ],
    youtubeLinks: [
      {
        title: 'Traditional South African Bobotie',
        channel: 'SA Food Channel',
        url: 'https://www.youtube.com/watch?v=xZKqJ5K5K5M',
      },
      {
        title: 'How to Make Bobotie',
        channel: 'Tasty',
        url: 'https://www.youtube.com/watch?v=JHDkKPZUZzQ',
      },
    ],
  },
};

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const recipe = recipeDatabase[query];

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find information for &quot;{query}&quot;. Try searching for another dish!
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5" />
            Back to Search
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{recipe.name}</h1>
          <div className="flex items-center gap-2 text-lg text-gray-600 mb-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">{recipe.country}</span>
            <span className="text-gray-400">•</span>
            <span>{recipe.region}</span>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">{recipe.description}</p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-sm text-gray-500">Time</div>
              <div className="font-semibold text-gray-900">{recipe.prepTime}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-sm text-gray-500">Servings</div>
              <div className="font-semibold text-gray-900">{recipe.servings}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-sm text-gray-500">Style</div>
              <div className="font-semibold text-gray-900">{recipe.cookingStyle}</div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {recipe.images.map((img, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden shadow-lg">
              <img src={img} alt={`${recipe.name} ${idx + 1}`} className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <div>
                        <div>{ing.item}</div>
                        {ing.substitution && (
                          <div className="text-sm text-gray-500 italic">
                            Sub: {ing.substitution}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Instructions & More */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Pro Tips</h2>
              </div>
              <ul className="space-y-2">
                {recipe.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Variations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Variations to Try</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.variations.map((variation, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-3 text-gray-700">
                    {variation}
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube References */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Youtube className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
              </div>
              <div className="space-y-4">
                {recipe.youtubeLinks.map((video, idx) => (
                  <a
                    key={idx}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                        <Youtube className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                        <p className="text-sm text-gray-600">{video.channel}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading recipe...</p>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}

