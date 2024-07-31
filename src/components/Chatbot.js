import React, { useState, useEffect, useRef } from 'react';
import '../css/Chatbot.css'; // 引入 CSS 檔案
import chatbotIcon from '../images/chatbot-icon.png'; // 引入聊天機器人圖示
import userAvatar from '../images/user-avatar.png'; // 使用者頭像
import botAvatar from '../images/bot-avatar.png'; // 機器人頭像

class LangflowClient {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Request Error:', error);
      throw error;
    }
  }

  async initiateSession(flowId, inputValue, stream = false, tweaks = {}) {
    const endpoint = `/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, { input_value: inputValue, tweaks: tweaks });
  }

  handleStream(streamUrl, onUpdate, onClose, onError) {
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = event => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    eventSource.onerror = event => {
      console.error('Stream Error:', event);
      onError(event);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      onClose('Stream closed');
      eventSource.close();
    });

    return eventSource;
  }

  async runFlow(flowIdOrName, inputValue, tweaks, stream = false, onUpdate, onClose, onError) {
    try {
      const initResponse = await this.initiateSession(flowIdOrName, inputValue, stream, tweaks);
      console.log('Init Response:', initResponse);
      if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
        const streamUrl = `${this.baseURL}` + initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        this.handleStream(streamUrl, onUpdate, onClose, onError);
      }
      return initResponse;
    } catch (error) {
      console.error('Error running flow:', error);
      onError('Error initiating session');
    }
  }
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null); // 用於自動捲動
  const langflowClient = new LangflowClient('http://langflow.webtw.xyz:7860', 'rmBXmOTLO_ENCtQvusG5X01uvPctvHsf'); // 更新為正確的 API URL 和 API Key

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      const userMessage = { text: input, user: true };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      // 呼叫機器人 API
      await runFlow(input);
    }
  };

  const runFlow = async (inputValue) => {
    // const flowIdOrName = '5af51bd8-5570-4592-9aef-a8399d2de06c'; //ask-llm
    const flowIdOrName = '08917f3a-486a-445c-9542-3bf117df08ba'; //ask-api
    // const tweaks = {
    //   "ChatInput-Uuesi": {},
    //   "GroqModel-qTdwH": {},
    //   "ChatOutput-N0gYt": {},
    //   "Memory-iwMxh": {},
    //   "Prompt-sEPR2": {}
    // };
    const tweaks = {
      "ChatInput-k8Ms5": {},
      "CrewAIAgentComponent-m9Vfd": {},
      "GroqModel-Iy3PZ": {},
      "ChatOutput-qg0VD": {},
      "SequentialCrewComponent-OJlUz": {},
      "SequentialTaskComponent-bbtqm": {},
      "Prompt-hjNao": {},
      "APIRequest-vfxQe": {},
      "CrewAIAgentComponent-ijLX9": {},
      "ParseData-IACVx": {},
      "SequentialTaskComponent-EmB3c": {},
      "SequentialCrewComponent-YIHRu": {},
      "Prompt-nvsjr": {},
      "Memory-9JyCX": {}
    };

    // 顯示 loading 訊息
    const loadingMessage = { text: '...', user: false };
    setMessages(prevMessages => [...prevMessages, loadingMessage]);

    langflowClient.runFlow(
      flowIdOrName,
      inputValue,
      tweaks,
      true, // 開啟流式
      (data) => {
        console.log("Received data:", data); // 確認接收到的數據
        if (data.chunk) {
          setMessages(prevMessages => {
            // 檢查最後一條消息是否為加載消息
            const lastMessage = prevMessages[prevMessages.length - 1];
            let updatedMessages = prevMessages;

            // 如果最後一條消息是加載消息，則移除它
            if (lastMessage && lastMessage.text === '...') {
              updatedMessages = prevMessages.slice(0, -1);
            }

            const lastBotMessage = updatedMessages.filter(msg => !msg.user).pop();
            // console.log("Last Bot Message:", lastBotMessage);
            const newText = lastBotMessage ? lastBotMessage.text + data.chunk : data.chunk;
            if (updatedMessages.length > 0 && !updatedMessages[updatedMessages.length - 1].user) {
              updatedMessages = updatedMessages.slice(0, -1);
            }


            return [...updatedMessages, { text: newText, user: false }];
          });
        }
      },
      (message) => {
        console.log("Stream Closed:", message);
      },
      (error) => {
        console.error("Stream Error:", error);
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.slice(0, -1); // 移除 loading 訊息
          return [...updatedMessages, { text: "Error fetching response", user: false }];
        });
      }
    );
  };

  // 自動捲動到最下方
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 清除對話歷程
  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div>
      {isOpen && (
        <div className="chatbot">
          <div className="chat-header">
            <img src={require('../images/tra_icon.png')} alt="臺鐵圖標" className="tra-icon" />
            臺鐵智能助手
            <div>
              <button className="minimize-button" onClick={() => setIsOpen(false)}>−</button>
              <button className="clear-button" onClick={clearChat}>↺</button>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.user ? 'user' : 'bot'}`}>
                <img src={message.user ? userAvatar : botAvatar} alt="頭像" className="avatar" />
                <div className="message-text">{message.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* 自動捲動的參考 */}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入訊息..."
            />
            <button type="submit">發送</button>
          </form>
        </div>
      )}
      {!isOpen && (
        <img
          src={chatbotIcon}
          alt="聊天機器人"
          className="chatbot-icon"
          onClick={() => setIsOpen(true)}
        />
      )}
    </div>
  );
}

export default Chatbot;