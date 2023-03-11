import axios from 'axios';
import React, { useEffect, useState } from 'react';
import he from 'he';
import { nanoid } from 'nanoid';

const baseUrl = "https://opentdb.com/api.php?amount=5&type=multiple";

interface Quiz {
  answers: any;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Answer {
  answer: string;
  id: string;
  isCorrect: boolean;
}

interface QuizWithAnswers extends Quiz {
  answers: Answer[];
}

export default function Quiz() {
  const [data, setData] = useState<Quiz[]>([]);
  const [quizzesWithAnswers, setQuizzesWithAnswers] = useState<QuizWithAnswers[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl);
      const quizzes = response.data.results.map((quiz: Quiz) => {
        const shuffledAnswers = [
          { answer: quiz.correct_answer, id: nanoid(), isCorrect: true },
          { answer: quiz.incorrect_answers[0], id: nanoid(), isCorrect: false },
          { answer: quiz.incorrect_answers[1], id: nanoid(), isCorrect: false },
          { answer: quiz.incorrect_answers[2], id: nanoid(), isCorrect: false },
        ].sort(() => Math.random() - 0.5);
        return {
          ...quiz,
          answers: shuffledAnswers,
        };
      });
      setData(quizzes);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setQuizzesWithAnswers(data);
  }, [data]);

  const decodeText = (text: string) => {
    return he.decode(text);
  };

  const handleAnswerClick = (quizIndex: number, answerIndex: number) => {
    const newQuizzesWithAnswers = [...quizzesWithAnswers];
    const selectedQuiz = newQuizzesWithAnswers[quizIndex];
    const selectedAnswer = selectedQuiz.answers[answerIndex];

    if (selectedAnswer.isCorrect) {
      console.log('Correct answer!');
      selectedAnswer.isCorrect = true;
    } else {
      console.log('Incorrect answer!');
      selectedAnswer.isCorrect = false;
    }

    setQuizzesWithAnswers(newQuizzesWithAnswers);
  };

  return (
    <div className='flex flex-col p-6'>
      {quizzesWithAnswers.map((quiz, quizIndex) => (
        <div key={quizIndex}>
          <p className='text-lg flex self-center'>{decodeText(quiz.question)}</p>
          <div className='flex justify-start gap-4 mt-5'>
            {quiz.answers.map((answer, answerIndex) => (
              <button
                key={answer.id}
                className={`${
                  answer.isCorrect ? 'bg-green-300' : 'bg-red-300'
                } px-6 py-2 rounded-md text-white`}
                onClick={() => handleAnswerClick(quizIndex, answerIndex)}
                disabled={answer.isCorrect !== undefined}
              >
                {decodeText(answer.answer)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
