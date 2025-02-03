import styles from '../styles/styles.module.css'
import ProgressBar from './ProgressBar';

export default function Step5({ formData, onPrev, onNext }) {
    const style = {
      list: {
        padding: '0',
        margin: '0',
        listStyleType: 'none',
      },
      listItem: {
        marginBottom: '8px',
        fontSize: '1rem',
      },
    };
  
    const keyMap = {
      date: '식단 관리 기간',
      goal: '식단 관리 목적',
      gender: '성별',
      height: '키',
      weight: '몸무게',
      budget: '일주일 식비 예산',
      meals: '하루 끼니 수',
      preferences: '음식 선호도',
      allergy: '알레르기 정보',
    };

    const formatDateRange = (dates) => {
      console.log('dates', dates);
      if (Array.isArray(dates) && dates.length === 2) {
        const [start, end] = dates.map((date) =>
          new Date(date).toLocaleDateString('ko-KR')
        );
        return `${start} ~ ${end}`;
      }
      return dates;
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <ProgressBar step={5} totalSteps={5} />
          <h2 className={styles.heading}>입력한 정보를 확인하세요</h2>
          <ul style={style.list}>
            {Object.entries(formData).map(([key, value]) => (
              <li key={key} style={style.listItem}>
                <strong>{keyMap[key] || key}:</strong>{' '}
                {key === 'date' ? formatDateRange(value) : Array.isArray(value) ? value.join(', ') : value || '없음'}
              </li>
            ))}
          </ul>
          <button className={styles.button} onClick={onPrev}>
            이전
          </button>
          <button className={styles.button} onClick={onNext}>
            식단표 보기
          </button>
        </div>
      </div>
    );
  }
  