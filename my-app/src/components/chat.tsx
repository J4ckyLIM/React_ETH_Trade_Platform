import React, { useState, useEffect, useRef } from 'react';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase/firebase';
import Message from './message';
import SendMessage from './sendMessage';

const style = {
  main: `flex flex-col p-[10px]`,
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const scroll = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages: any[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main className={style.main}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </main>
      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  );
};

export default Chat;
