'use client';
import React from "react";
import { Lightbulb, Bot, Mic, FileText, CheckCircle } from "lucide-react";

function How() {
  const steps = [
    {
      icon: <FileText className="text-primary" size={32} />,
      title: "Step 1: Select or Create Interview",
      description:
        "Choose an existing interview category or create a custom one tailored to the role you're preparing for.",
    },
    {
      icon: <Bot className="text-primary" size={32} />,
      title: "Step 2: AI Generates Questions",
      description:
        "Our AI dynamically generates job-specific questions based on your selection using Google's Gemini Pro.",
    },
    {
      icon: <Mic className="text-primary" size={32} />,
      title: "Step 3: Speak Your Answers",
      description:
        "Use your microphone to verbally answer each question. This simulates a real-time interview scenario.",
    },
    {
      icon: <Lightbulb className="text-primary" size={32} />,
      title: "Step 4: Get Smart Feedback",
      description:
        "Receive AI-powered feedback on your answers including suggestions, clarity improvements, and confidence tips.",
    },
    {
      icon: <CheckCircle className="text-primary" size={32} />,
      title: "Step 5: Track & Improve",
      description:
        "Review your mock interview history, track progress, and refine your performance with each session.",
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-10 text-primary">How It Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              {step.icon}
              <h2 className="text-lg font-semibold">{step.title}</h2>
            </div>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default How;
