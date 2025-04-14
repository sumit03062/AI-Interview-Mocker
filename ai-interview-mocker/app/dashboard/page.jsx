"use client";

import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import { UserButton } from "@clerk/nextjs";
import InterviewList from './_components/InterviewList';

function Dashboard() {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-2xl">Dashboard</h2>
          <p className="text-gray-500"> Create and start your AI Mockup Interview</p>
        </div>
        <UserButton/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AddNewInterview />
      </div>
      {/* previous Interview List */}

      <InterviewList/>
    </div>
  );
}

export default Dashboard;
