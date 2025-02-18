import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const DailyQuiz = () => {
  const { addEcoPoints } = useAuthStore();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Check if quiz is available
  useEffect(() => {
    const lastQuizDate = localStorage.getItem('lastQuizDate');
    const today = new Date().toDateString();
    
    if (lastQuizDate !== today) {
      // Fetch new question
      fetchDailyQuestion();
    } else {
      setQuizCompleted(true);
    }
  }, []);

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;
    
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    // Calculate points based on time left and correctness
    if (correct) {
      const timeBonus = Math.max(0, timeLeft);
      const points = 2 + timeBonus; // Base 2 points + time bonus
      addEcoPoints(points);
    }

    // Mark quiz as completed for today
    localStorage.setItem('lastQuizDate', new Date().toDateString());
    setTimeout(() => setQuizCompleted(true), 3000);
  }, [selectedAnswer, currentQuestion, timeLeft, addEcoPoints]);

  // Timer countdown
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (timeLeft > 0 && currentQuestion && selectedAnswer === null) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    }
    if (timeLeft === 0 && selectedAnswer === null) {
      handleAnswer(-1);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, currentQuestion, selectedAnswer, handleAnswer]);

  const fetchDailyQuestion = async () => {
    // In a real app, fetch from API
    const sampleQuestion: Question = {
      id: 1,
      question: "Which of these materials takes the longest to decompose?",
      options: [
        "Paper bag",
        "Plastic bottle",
        "Glass bottle",
        "Aluminum can"
      ],
      correctAnswer: 2,
      explanation: "Glass bottles can take up to 1 million years to decompose naturally."
    };
    setCurrentQuestion(sampleQuestion);
    setTimeLeft(15);
  };

  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-gray-100 rounded-lg text-center"
      >
        <h3 className="text-lg font-semibold">Quiz Completed!</h3>
        <p className="text-gray-600">Come back tomorrow for a new question.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto p-4"
    >
      {currentQuestion && (
        <>
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Daily Eco Quiz</h3>
            <motion.div
              animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: timeLeft <= 5 ? Infinity : 0 }}
              className={`px-3 py-1 rounded ${
                timeLeft > 5 ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {timeLeft}s
            </motion.div>
          </div>

          <p className="mb-6 text-gray-800">{currentQuestion.question}</p>

          <div className="space-y-3">
            <AnimatePresence>
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    selectedAnswer === null
                      ? 'hover:bg-blue-50 bg-white'
                      : selectedAnswer === index
                      ? isCorrect
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      : index === currentQuestion.correctAnswer && selectedAnswer !== null
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded-lg ${
                isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              <p className="font-semibold">
                {isCorrect ? 'Correct! 🎉' : 'Not quite right 😅'}
              </p>
              <p className="mt-2 text-sm">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default DailyQuiz;