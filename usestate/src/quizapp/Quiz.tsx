import axios from 'axios';
import React, { useEffect, useState } from 'react';
import he from 'he';

const baseUrl = "https://opentdb.com/api.php?amount=5&type=multiple";

interface Quiz {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Quiz() {
  const [data, setData] = useState<Quiz[]>([]);
  const answers = data.map((quiz) => quiz.correct_answer ? [quiz.correct_answer, ...quiz.incorrect_answers].map((answer, index) => ({answer, index})) : [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl);
      setData(response.data.results);
    };
    fetchData();
  }, []);

  const decodeText = (text: string) => {
    return he.decode(text);
  };

  const handleAnswerClick = (answerIndex: number) => {
    // Do something with the answer index, such as check if it's the correct answer
  }

  return (
    <div className='flex flex-col p-6'>
      {data.map((quiz, index) => (
        <div key={index}>
          <p className='text-lg flex self-center'>{decodeText(quiz.question)}</p>
          <div className='flex justify-start gap-4 mt-5'>
            {answers[index] ? answers[index].map(({answer, index}) => (
              <button key={index} className='bg-amber-600 px-6 py-2 rounded-md text-white' onClick={() => handleAnswerClick(index)}>
                {decodeText(answer)}
              </button>
            )) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
