
// 코드 예시 가져온 것
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// 원래 코드
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { clientChat } = req.body;
    if (!clientChat) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'});

    const prompt = clientChat;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const data = await response.text();
    console.log(data)
    res.status(200).json({ answer: data });
  } catch (error) {
    console.error('Error generating diet:', error);
    res.status(500).json({ 
        message: 'Error generating diet',
        error: error.message || 'Unknown error occurred'
    });
  }
}