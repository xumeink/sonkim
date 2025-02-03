import { generateMealPlan } from '@/utils/fetchDiet';
import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import styles from '../styles/styles.module.css'

export default function Step6({ formData, onPrev, setFormData, setStep }) {
  const style = {
    dietTable: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'fixed', // 모든 열의 너비를 고정합니다.
      border: '1px solid black',
      backgroundColor: '#fff',
    },
    dietTableThTd: { //1행(날짜, n번째 식사)
      border: '1px solid black', 
      padding: '8px',
      textAlign: 'center',
      wordWrap: 'break-word',
    },
    dietTableTd: { //메뉴
      backgroundColor: '#fff',
      wordWrap: 'break-word',
      maxWidth: '250px',
      border: '1px solid black',
    },
    dietTableDateTd: { //날짜(요일, 월, 일)
      backgroundColor: '#fff',
      wordWrap: 'break-word',
      textAlign: 'center',
      border: '1px solid black',
    },
  };
  

  const dietTableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // gemini api를 통해 받아온 식단표 정보가 있는 state
  const [diet, setDiet] = useState(null);

  // 식단표 생성하는 함수
  const handleGenerateDiet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateMealPlan(formData);
      setDiet(result);
    } catch (error) {
     console.error("식단 생성 중 오류 발생:", error);
      setError(error.message || "식단 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 생성된 답변에서 식단 데이터만 뽑아오는 함수
  const parseDietData = (diet) => {
    const lines = diet.trim().split('\n');
    const mealPlan = {}; //결과 저장 객체
    let currentDate = '';

    lines.forEach(line => {
      line = line.trim();

      const dateMatch = line.match(/^(\d{1,2}월 \d{1,2}일) ([가-힣]+)$/);
      console.log(dateMatch);
    if (dateMatch) {
      const monthDay = dateMatch[1]; // "1월 1일"
      const weekday = dateMatch[2]; // "월요일"
      currentDate = `${monthDay}\n${weekday}`; // "1월 1일 월요일"
      mealPlan[currentDate] = [];
    } else if (currentDate && line.includes(':')) {
      const [meal, menu] = line.split(':').map(item => item.trim());
      mealPlan[currentDate].push(menu);
    }
    });
    
    return mealPlan;
  }
  

  const renderDietTable = (parsedDietData, mealsCount) => {
    if (Object.keys(parsedDietData).length === 0) {
      return <p>식단 데이터가 없습니다.</p>;
    }
  
    // 헤더를 동적으로 생성합니다.
    const headers = ['날짜', ...Array.from({ length: mealsCount }, (_, i) => `${i + 1}번째 식사`)];
  
    const rows = Object.keys(parsedDietData).map((date, index) => {
      const meals = parsedDietData[date];
      while (meals.length < mealsCount) {
        meals.push('');  // 부족한 경우 빈 문자열 추가
      }
  
      return (
        <tr key={index}>
          <td style={style.dietTableDateTd}>{date}</td>
          {meals.map((meal, mealIndex) => (
            <td key={mealIndex} style={style.dietTableTd}>
              {meal}
            </td>
          ))}
        </tr>
      );
    }); 
  
    return (
      <table style={style.dietTable} id="dietTable" ref={dietTableRef}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={style.dietTableThTd}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  };

  const parsedDietData = diet ? parseDietData(diet) : [];

  const handleReset = () => {
    setFormData({
      date: [],
      goal: '',
      gender: '',
      height: 160,
      weight: 60,
      budget: '10만원 이하',
      meals: 3,
      preferences: '한식',
      allergy: '',
    });
    setStep(1);
  };

  const handleSaveAsPng = async () => {
    if (dietTableRef.current) {
      const dataUrl = await toPng(dietTableRef.current);
      saveAs(dataUrl, 'diet-plan.png');
    } else {
      console.error('Element not found');
    }
  };

  const handleSaveAsExcel = async () => {
    const parsedDietData = parseDietData(diet);
    
    // 제목과 날짜, 메뉴를 포함한 데이터 배열 생성
    const dataForSheet = [
      ['날짜', ...Array.from({ length: formData.meals }, (_, i) => `${i + 1}번째 식사`)],  // 제목 행
      ...Object.keys(parsedDietData).map(date => {
        const meals = parsedDietData[date];
        return [date, ...meals];  // 날짜와 메뉴 추가
      }),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(dataForSheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'diet-plan.xlsx');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>식단표</h2>
        {error && <p style={{ color: 'red' }}>오류: {error}</p>}
        {diet ? (
          <>
            {renderDietTable(parsedDietData, formData.meals)}
            <button className={styles.button} onClick={handleSaveAsPng} disabled={!diet}>
              PNG로 저장
            </button>
            <button className={styles.button} onClick={handleSaveAsExcel} disabled={!diet}>
              Excel로 저장
            </button>
          </>
        ) : (
            <button 
              className={styles.button} 
              onClick={handleGenerateDiet}
              disabled={isLoading}
            >
              {isLoading ? '생성 중...' : '식단표 생성'}
            </button>
        )}
        <button className={styles.button} onClick={onPrev}>
          이전
        </button>
        <button className={styles.button} onClick={handleReset}>
          새로 만들기
        </button>
      </div>
    </div>
  ); 
}