'use client';
import { Button } from '@/components/ui/button'
import React from 'react'

function InterviewitemCard({interview}) {

  const router = userRouter();
  const onStart = ()=>{
    router.push('/dashboard/interview/'+interview?.mockId)
  }

  const onFeedbackPress=()=>{
    router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
  }
  return (
    <div className='boarder shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-primary'>{interview?.jobposition}</h2>
      <h2 className='text-sm text-gray-500'>{interview?.jobExpress}years of Experience</h2>
      <h2 className='text-xs text-gray-400'>Create At:{interview.createAt}</h2>
      <div className='flex justify-between mt-2'>
        <Button size="sm" variante="outline" className="w-full"
        onClick={onFeedbackPress}>Feedback</Button>
        <Button size="sm" className="w-full" onClick={onStart}>Start</Button>

      </div>
    </div>
  )
}

export default InterviewitemCard
