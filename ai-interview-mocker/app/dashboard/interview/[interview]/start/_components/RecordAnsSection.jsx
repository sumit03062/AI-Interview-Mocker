'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
// import moment from 'moment';

function RecordAnsSection({ MockInterviewQuestions, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [Loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Append result to answer
  useEffect(() => {
    if (results && results.length > 0) {
      const latest = results[results.length - 1];
      setUserAnswer((prevAns) => prevAns + ' ' + latest.transcript);
    }
  }, [results]);

  // Trigger feedback/save after recording
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer('');
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    const feedbackPrompt = `
      Question: ${MockInterviewQuestions[activeQuestionIndex]?.question}
      User Answer: ${userAnswer}
      Based on the question and answer, please give a rating and feedback (in 3–5 lines)
      in JSON format with 'rating' and 'feedback' fields.
    `;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert('mock_answers').values({
        mockIdRef: interviewData?.mockId,
        question: MockInterviewQuestions[activeQuestionIndex]?.question,
        correctAns: MockInterviewQuestions[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      });

      if (resp) {
        toast.success('User Answer saved successfully');
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);

    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Something went wrong while saving the answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Webcam Section */}
      <div className="relative mt-20 flex flex-col justify-center items-center bg-black rounded-lg p-5">
        <Image
          src="/webcam.png"
          alt="Webcam overlay"
          className="absolute z-0 opacity-10"
          width={300}
          height={300}
        />
        <Webcam
          mirrored={true}
          className="z-10 rounded-lg"
          style={{ height: 300, width: '100%' }}
        />
      </div>

      {/* Record Button */}
      <Button
        disabled={Loading}
        variant="outline"
        className="my-6 hover:bg-gray-100"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <span className="flex items-center gap-2 text-red-600">
            <Mic size={16} /> Stop Recording...
          </span>
        ) : (
          'Record Answer'
        )}
      </Button>

      {/* Show Answer */}
      {userAnswer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-xl text-center text-gray-800">
          <strong>Your Answer:</strong> {userAnswer}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default RecordAnsSection;
