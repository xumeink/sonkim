import React, { useState, useEffect } from 'react';
import styles from '../styles/styles.module.css'
import Cookies from 'js-cookie';
import Bot from "@/public/bot-svgrepo-com.svg?url";
 
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';
import Step4 from '../components/Step4';
import Step5 from '../components/Step5';
import Step6 from '../components/Step6';
import Alert from '../components/Alert';
import Chatbot from '@/components/chatbot';

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
  const [showAlert, setShowAlert] = useState(false);
  const [isChatbot, setIsChatbot] = useState(false);

  //상태 복원
  useEffect(() => {
    const savedFormData = Cookies.get('formData')
    const savedStep = Cookies.get('step');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    if (savedStep) {
      setStep(parseInt(savedStep, 10));
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }, []); 

  //상태 저장(만료기간: 1분)
  useEffect(() => {
    Cookies.set('formData', JSON.stringify(formData), {expires: 1/1440});
    Cookies.set('step', step.toString(), {expires: 1/1440});
  }, [formData, step]);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const handleCBBtnClick = () => isChatbot? setIsChatbot(false) : setIsChatbot(true);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} onNext={handleNextStep} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 6:
        return <Step6 formData={formData} onPrev={handlePrevStep} setFormData={setFormData} setStep={setStep} />;
      default:
        return null;
    }
  };

  return (
    <div id={styles.wrapper}>
      {showAlert && <Alert message="새로고침 되었습니다" />}
      {renderStep()}
      {isChatbot && <Chatbot onCBBtnClick={handleCBBtnClick} />}
      <button className={styles.chatbotIcon} onClick={handleCBBtnClick}>
        <img src={Bot} alt="Bot Icon" width={"80%"} />
      </button>
    </div>
  );
}
