import { generateAnswer } from "@/utils/fetchChatbot";
import React, { useState } from 'react';
import styles from "../styles/styles.module.css"

export default function Chatbot({ onCBBtnClick }) {
    // 입력 데이터 임시 저장.
    const [chatData, setChatData] = useState(null);
    const [chatDataList, setChatDataList] = useState([]);

    const handleInputChange = (e) => {
        const changeData = e.target.value;
        setChatData(changeData);
    }

    const handleSendChat = async () => {
        // 유저가 보낸 메세지 저장
        const addedChatDataList = [
            ...chatDataList, 
            {"speaker": "user", contents: chatData}
        ]
        const tempChatData = chatData;
        setChatDataList(addedChatDataList);
        setChatData("");
        console.log("입력: " + tempChatData);

        try {
            const answerData = await generateAnswer(tempChatData); 
            const added2ChatDataList = [
                ...addedChatDataList,
                {speaker: "bot", contents: answerData}
            ]
            setChatDataList(added2ChatDataList);
        } catch (error) {
            console.error("식단 생성 중 오류 발생:", error);
            alert("답변 생성에 실패했습니다. 다시 시도해주세요.");
            // 에러 발생 시, 마지막으로 추가한 사용자 메시지 제거
            setChatDataList(chatDataList.slice(0, -1));
        }
    }

    const handleEnterDown = (e) => {
        if (e.key === "Enter") {
            handleSendChat();
        }
    }


    return (
        <div className={styles.chatbotContainer}>
            <button className={styles.closeBtn} onClick={ onCBBtnClick }>❌</button>
            { /* 채팅 내역 출력 */ } 
            <div  className={styles.chatContent}>
                {chatDataList && chatDataList.map((chatElem, index) => {
                    return <MessageBox chatElem={chatElem} index={index} />
                })}
            </div>
            { /* 채팅 입력창*/ }
            <div className={styles.chatInputContainer}>
                <input type="text" id={styles.chatInput} placeholder="입력하세요." value={chatData} onChange={handleInputChange} onKeyDown={handleEnterDown}></input>
                <button className={styles.sendBtn} onClick={handleSendChat}>전송</button>
            </div>
        </div>
    )

}

function MessageBox({chatElem, index}) {
    return (
        <div key={index} style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: chatElem.speaker === "user" ? "flex-end" : "flex-start", 
            margin: "10px 0" 
        }}>
            <div style={{ 
                fontWeight: "bold", 
                marginBottom: "5px" 
            }}>
                {chatElem.speaker === "user" ? "User" : "Bot"}
            </div>
            <div style={{ 
                padding: "10px", 
                borderRadius: "10px", 
                backgroundColor: chatElem.speaker === "user" ? "#ffcdcd" : "#EAEAEA",
                maxWidth: "60%", 
                wordBreak: "break-word" 
            }}>
                {chatElem.contents}
            </div>
        </div>
    );
}