import React, { useState, useMemo } from 'react';
import styles from '../styles/styles.module.css';
import ProgressBar from './ProgressBar';

export default function Step2({ formData, setFormData, onNext, onPrev }) {
  const [isValid, setIsValid] = useState(true);

  const style = useMemo(() => ({
    genderButtonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px', // Add some space between the buttons and other elements
      border: isValid || formData.gender ? 'none' : '2px solid #ff7f7f', // Softer red color when gender is not selected
      padding: formData.gender ? '0' : '4px',
      borderRadius: '8px',
    },
    genderButton: {
      width: '48%', // Make buttons slightly smaller than 50% to fit side by side with some space
      padding: '10px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#ff6b8a', // Default background color
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeButton: {
      backgroundColor: '#ff81a7', // Change to light pink when active
      color: '#fff',
    },
    hoverButton: {
      backgroundColor: '#ffcbd9', // Lighter pink on hover
      color: '#ff6b8a', // Darker pink text on hover
    },
  }), [formData.gender, isValid]);

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleNext = () => {
    const heightValid = isHeightValid(formData.height);
    const weightValid = isWeightValid(formData.weight);
    const genderValid = formData.gender !== '';

    if (!heightValid || !weightValid || !genderValid) {
      setIsValid(false);
    } else {
      setIsValid(true);
      onNext();
    }
  };

  const isHeightValid = (height) => height !== '' && /^[0-9]+$/.test(height) && (height >= 140 && height <= 200);
  const isWeightValid = (weight) => weight !== '' && /^[0-9]+$/.test(weight) && (weight >= 30 && weight <= 300);
  
  const handleHeightChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    setFormData({ ...formData, height: value });
  };

  const handleWeightChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    setFormData({ ...formData, weight: value });
  };

  return (
      <div className={styles.container}>
        <ProgressBar step={2} totalSteps={5} />
        <h2 className={styles.heading}>신체 정보 입력</h2>
        <label className={styles.label}>성별:</label>
        <div style={style.genderButtonContainer}>
          <button
            style={{
              ...style.genderButton,
              ...(formData.gender === '남성' ? style.activeButton : {}),
            }}
            onClick={() => handleGenderChange('남성')}
            onMouseEnter={(e) => e.target.style.backgroundColor = style.hoverButton.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = formData.gender === '남성' ? style.activeButton.backgroundColor : style.genderButton.backgroundColor}
          >
            남성
          </button>
          <button
            style={{
              ...style.genderButton,
              ...(formData.gender === '여성' ? style.activeButton : {}),
            }}
            onClick={() => handleGenderChange('여성')}
            onMouseEnter={(e) => e.target.style.backgroundColor = style.hoverButton.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = formData.gender === '여성' ? style.activeButton.backgroundColor : style.genderButton.backgroundColor}
          >
            여성
          </button>
        </div>
        <label className={styles.label}>키 (cm):</label>
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleHeightChange}
          className={`${styles.input} ${!isValid && !isHeightValid(formData.height) ? styles.heightInvalid : ''}`}
        />
        <label className={styles.label}>몸무게 (kg):</label>
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleWeightChange}
          className={`${styles.input} ${!isValid && !isWeightValid(formData.weight) ? styles.weightInvalid : ''}`}
        />
        <button className={styles.button} onClick={onPrev}>
          이전
        </button>
        <button className={styles.button} onClick={handleNext}>
          다음
        </button>
      </div>
  );
}
