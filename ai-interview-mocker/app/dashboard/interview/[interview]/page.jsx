"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';





function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
   
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

        setInterviewData(result[0]);
  };

  return (
    <div className="my-10 p-5">
      <h2 className="font-bold text-2xl text-center mb-10">Let's Get Started</h2>

      {/* Parallel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* Left: Job Details */}
        <div className="flex flex-col gap-5">
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className="text-lg">
              <strong>Job Role/Position:</strong> {interviewData?.JobPosition || 'Loading...'}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong> {interviewData?.JobDesc || 'Loading...'}
            </h2>
            <h2 className="text-lg">
              <strong>Years Of Experience:</strong> {interviewData?.JobExperience || 'Loading...'}
            </h2>
          </div>

          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-800'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        {/* Right: Webcam */}
        <div className="flex flex-col items-center gap-6">
          <div className="p-6 bg-blue-100 rounded-2xl flex justify-center flex-col items-center gap-4 shadow">
            {webCamEnabled ? (
              <Webcam
                audio={true}
                mirrored={true}
                style={{ height: 300, width: 300 }}
                className="rounded-lg border"
              />
            ) : (
              <WebcamIcon className="h-24 w-24 text-gray-700" />
            )}
          </div>

          {!webCamEnabled && (
            <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
              Enable Webcam and Microphone
            </Button>
          )}
        </div>
      </div>
 
      {/* Start Button aligned right */}
      <div className='flex justify-end  mr-55 '>
        <Link href = {'/dashboard/interview/'+params.interviewId+'/start'}>
        <button className='bg-blue-700 hover:bg-blue-800 text-white
         px-10 py-2 rounded-lg shadow'>
          Start Interview
        </button>
        </Link>
      </div>
    </div>
  );
}




export default Interview;
