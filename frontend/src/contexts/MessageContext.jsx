import { createContext, useState } from 'react';
import { MESSAGE_LEVELS } from '../constants/enums';

const MessageContext = createContext({
  addMessage: (
    message = {
      level: MESSAGE_LEVELS.INFO,
      message: 'No Information as of Now',
    },
  ) => {
    // message {level: error | info | success | warning, message}
    // jsdoc for above line
    /**
     * @param {object} message
     * @param {string} message.level
     * @param {string} message.message
     * @returns {void}
     * */

    console.error(message);
  },
});

export function MessageContextProvider({ children }) {
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setInterval(() => {
      setMessages((prevMessages) => prevMessages.slice(1, prevMessages.length));
    }, 5000);
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <MessageContext.Provider value={{ addMessage }}>
      {children}
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.level}`}>
            {message.message}
          </div>
        ))}
      </div>
    </MessageContext.Provider>
  );
}

export default MessageContext;
