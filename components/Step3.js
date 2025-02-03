import styles from '../styles/styles.module.css'
import ProgressBar from './ProgressBar';

export default function Step3({ formData, setFormData, onNext, onPrev }) {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ProgressBar step={3} totalSteps={5} />
        <h2 className={styles.heading}>식비 예산 및 끼니 수</h2>
        <label className={styles.label}>일주일 식비 예산:</label>
        <select
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className={styles.input}
        >
          <option value="5만원 이하">5만원 이하</option>
          <option value="5~10만원">5~10만원</option>
          <option value="10~15만원">10~15만원</option>
          <option value="15~20만원">15~20만원</option>
          <option value="20만원 초과">20만원 초과</option>
        </select>
        <label className={styles.label}>하루 끼니 수:</label>
        <select
          value={formData.meals}
          onChange={(e) => setFormData({ ...formData, meals: e.target.value })}
          className={styles.input}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
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
