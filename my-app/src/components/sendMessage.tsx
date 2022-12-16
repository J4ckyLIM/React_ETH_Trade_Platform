import React, { useState } from 'react';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { db } from '../config/firebase/firebase';

const style = {
  form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

type SendMessageProps = {
  scroll: React.MutableRefObject<HTMLSpanElement | null>
}

const SendMessage: React.FC<SendMessageProps> = ({scroll}) => {
  const [input, setInput] = useState('');

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input === '') {
        alert('Enter a valid message')
        return
    }
    await addDoc(collection(db, 'messages'), {
        text: input,
        timestamp: serverTimestamp()
    })
    setInput('')
    // scroll.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type='text'
        placeholder='Message'
      />
      <button className={style.button} type='submit'>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
