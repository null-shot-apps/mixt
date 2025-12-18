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

export default function IngredientMixer() {
  const [inputMethod, setInputMethod] = useState<IngredientInput | null>(null);
  const [ingredients, setIngredients] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(null);

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
      } else if (ingredientList.includes('flour') && ingredientList.includes('sugar')) {
        // Good baking ingredients
        setResult({
          isSafe: true,
          products: [
            {
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
            },
            {
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
            }
          ]
        });
      } else if (ingredientList.includes('tomato') || ingredientList.includes('cheese')) {
        setResult({
          isSafe: true,
          products: [
            {
              name: 'Pizza',
              image: '🍕',
              category: 'Main Course',
              recipe: [
                'Prepare pizza dough and let rise',
                'Roll out dough into circle',
                'Spread tomato sauce',
                'Add mozzarella cheese',
                'Add your favorite toppings',
                'Bake at 475°F for 12-15 minutes'
              ]
            }
          ]
        });
      } else {
        setResult({
          isSafe: true,
          products: [
            {
              name: 'Custom Mix',
              image: '🥘',
              category: 'Experimental',
              recipe: [
                'Combine your ingredients',
                'Mix well',
                'Cook according to ingredient requirements',
                'Season to taste'
              ]
            }
          ]
        });
      }
      
      setAnalyzing(false);
    }, 2000);
  };

  const reset = () => {
    setInputMethod(null);
    setIngredients('');
    setResult(null);
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
    </div>
  );
}

