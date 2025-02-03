export async function generateAnswer(clientChat) {
  const response = await fetch('/api/chatbot-api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ clientChat }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate chatbot answer');
  }

  const data = await response.json();
  return data.answer;
}
