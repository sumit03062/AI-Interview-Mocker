"use client";
import { db } from '@/utils/db';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';

function StartInterviw(params) {

    const[interviewData, setInterviewData] = useState();
    const [MockInterviewQuestions, setMockInterviewQuestions] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    useEffect(()=>{
        GetInterviewDetails ();
    },[]);
    const GetInterviewDetails = async () => {
      const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
    
      if (!result || result.length === 0) {
        console.error("No mock interview found with this ID:", params.interviewId);
        return;
      }
    
      try {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestions(jsonMockResp);
        setInterviewData(result[0]);
      } catch (error) {
        console.error("Error parsing jsonMockResp:", error);
      }
    };
    
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
           {/* Question*/}
           <QuestionSection 
           MockInterviewQuestions={MockInterviewQuestions}
           activeQuestionIndex={activeQuestionIndex}
           />

           {/* video / Audio Recording */}
           <RecordAnsSection
           MockInterviewQuestions={MockInterviewQuestions}
           activeQuestionIndex={activeQuestionIndex}
           interviewData={interviewData}
           />
        </div>

        <div className='flex justify-end gap-6'>
          {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex -1)}>previous Question</Button>}
          {activeQuestionIndex!=MockInterviewQuestions?.length-1&&
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex +1)}>Next Question</Button>}
          {activeQuestionIndex==MockInterviewQuestions?.length-1&&
          <Link href={'/dashboard/interview'+interviewData?.mockId+"/feedback"}>
          <Button>End Interview</Button></Link>}
        </div>
    </div>
  )
}

export default StartInterviw