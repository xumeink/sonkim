/*
export async function fetchDiet(formData) {
  try {
    const response = await fetch('/api/generate-diet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData }),
    });
    const data = await response.json();
    return data.diet;
  } catch (error) {
    console.error('Error generating diet:', error);
    throw error;
  }
}
*/
export async function generateMealPlan(formData) {
  const response = await fetch('/api/generate-diet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formData }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate meal plan');
  }

  const data = await response.json();
  return data.diet;
}
