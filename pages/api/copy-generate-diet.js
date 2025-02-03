import { OpenAI } from 'openai';

const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { formData } = req.body;
    if (!formData) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const prompt = `다음 정보를 바탕으로 일주일 식단표를 작성해주세요:
                    식단 관리 기간: ${formData.date[0]} ~ ${formData.date[1]}
                    식단 관리 목표: ${formData.goal}
                    성별: ${formData.gender}
                    키: ${formData.height}cm
                    몸무게: ${formData.weight}kg
                    일주일 식비 예산: ${formData.budget}
                    하루 끼니 수: ${formData.meals}
                    음식 선호도: ${formData.preferences}
                    알레르기: ${formData.allergy || '없음'}
                    
                    각 날짜별로 ${formData.meals}끼 식사를 구체적으로 작성해주세요.`;

    const response = await fetch('http://localhost:11434/api/generate', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    res.status(200).json({ diet: response.trim() });
  } catch (error) {
    console.error('Error generating diet:', error);
    res.status(500).json({ 
        message: 'Error generating diet',
        error: error.message || 'Unknown error occurred'
    });
  }
}
