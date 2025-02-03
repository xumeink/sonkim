
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
    const { formData } = req.body;
    if (!formData) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash'});

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
                    
                    각 날짜별로 ${formData.meals}끼 식사를 구체적으로 작성해주세요.
                    
                    형식:
                    - 월, 일, 요일을 한 칸씩 띄워서 적어
                    - 날짜와 요일일 밑에 한 줄씩 끼니를 적어
                    - 각 끼니는 '{서수}번째 식사'로 표시하고, 메뉴는 ':'로 구분해주세요.
                    - 메뉴는 쉼표로 구분하고, 필요 시 괄호로 재료나 설명을 추가해주세요.
                    - 모든 글자는 굵기와 크기를 같게 출력해 주세요. **, ## 등 절대 모든 글자에 효과를 넣지 마세요.
                    - 월요일부터 시작할 필요는 없으며, formData.date[0]부터 시작해서 formData.date[1]까지 시작날과 끝나는 날을 포함해서 식단을 짜.
                    - 그 외 부가 설명은 필요없어.
                    - 예:
                      1월 1일 월요일
                      첫번째 식사: 현미밥 1/2공기, 닭가슴살 야채볶음 (닭가슴살 80g, 브로콜리, 양파, 당근), 된장국 (두부, 미역, 애호박)
                      두번째 식사: 곤드레나물밥 1공기, 제육볶음 (돼지고기 100g, 양파, 고추장 양념), 김치
                      세번째 식사: 닭가슴살샐러드 (닭가슴살 100g, 삶은 계란 1개, 상추, 토마토, 오리엔탈 드레싱), 야채죽 (애호박, 양파, 당근)

                      1월 2일 화요일
                      첫번째 식사: 고구마 1개, 계란 1개, 우유 1컵
                      두번째 식사: 비빔밥 (현미밥 1공기, 시금치나물, 콩나물무침, 김, 고추장)
                      세번째 식사: 두부김치 (두부 1/2모, 김치, 돼지고기 약간), 멸치 다시마국
    `;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const data = await response.text();
    res.status(200).json({ diet: data });
  } catch (error) {
    console.error('Error generating diet:', error);
    res.status(500).json({ 
        message: 'Error generating diet',
        error: error.message || 'Unknown error occurred'
    });
  }
}