import styles from '../styles/styles.module.css'
import ProgressBar from './ProgressBar';

export default function Step4({ formData, setFormData, onPrev, onNext }) {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ProgressBar step={4} totalSteps={5} />
        <h2 className={styles.heading}>음식 선호도 및 알레르기</h2>
        <label className={styles.label}>음식 선호도:</label>
        <select
          value={formData.preferences}
          onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
          className={styles.input}
        >
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="일식">일식</option>
          <option value="양식">양식</option>
        </select>
        <label className={styles.label}>알레르기 정보:</label>
        <input
          type="text"
          value={formData.allergy}
          onChange={(e) => setFormData({ ...formData, allergy: e.target.value })}
          className={styles.input}
        />
        <button className={styles.button} onClick={onPrev}>
          이전
        </button>
        <button className={styles.button} onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
}
