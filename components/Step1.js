import React, { useRef, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Korean } from 'flatpickr/dist/l10n/ko.js';
import { FaCalendarAlt } from 'react-icons/fa';
import styles from '../styles/styles.module.css';
import ProgressBar from './ProgressBar';

export default function Step1({ formData, setFormData, onNext }) {
  const flatpickrRef = useRef(null);
  const [isValid, setIsValid] = useState(true);

  const style = {
    calendarIcon: {
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      color: '#ff6b8a',
      fontSize: '1.2rem',
      cursor: 'pointer',
      zIndex: 9,
    },
    invalid: {
      border: '2px solid #ff7f7f',
    },
  };

  useEffect(() => {
    if (flatpickrRef.current && flatpickrRef.current.flatpickr) {
      flatpickrRef.current.flatpickr.close();
    }
  }, []);

  const handleDateChange = (selectedDates) => {
    if (selectedDates.length === 2) {
      // Adjust the dates to Korean Standard Time (KST)
      const kstOffset = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
      selectedDates[0] = new Date(selectedDates[0].getTime() + kstOffset);
      selectedDates[1] = new Date(selectedDates[1].getTime() + kstOffset);
      setFormData({ ...formData, date: selectedDates });
    } else {
      setFormData({ ...formData, date: selectedDates });
    }
  };

  const handleNext = () => {
    if (formData.date.length === 0 || !formData.goal) {
      setIsValid(false);
    } else {
      setIsValid(true);
      onNext();
    }
  };

  return (
      <div className={styles.container}>
        <ProgressBar step={1} totalSteps={5} />
        <h2 className={styles.heading}>식단 관리 기간 및 목적</h2>
        <label className={styles.label}>관리 기간:</label>
        <div
          className={`${styles.inputContainer} ${!isValid && !formData.date.length ? styles.invalid : ''}`}
          onClick={() => flatpickrRef.current.flatpickr.open()}
        >
          <Flatpickr
            ref={flatpickrRef}
            options={{ mode: 'range', dateFormat: 'Y-m-d', minDate: 'today', locale: Korean }}
            value={formData.date}
            onChange={handleDateChange}
            className={styles.input}
          />
          {!formData.date.length && <span className={styles.placeholder}>날짜를 선택하세요</span>}
          <FaCalendarAlt style={style.calendarIcon} />
        </div>
        <label className={styles.label}>목적:</label>
        <select
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className={`${styles.input} ${!isValid && !formData.goal ? styles.invalid : ''}`}
        >
          <option value="">선택하세요</option>
          <option value="체중감소">체중감소</option>
          <option value="체중증량">체중증량</option>
          <option value="체중유지">체중유지</option>
        </select>
        <button className={styles.button} onClick={handleNext}>
          다음
        </button>
      </div>
  );
}
