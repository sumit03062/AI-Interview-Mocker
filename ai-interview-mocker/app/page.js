'use cient'
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to AI Interview Mocker
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Prepare for your tech interviews like a pro! Our AI Interview Mocker helps you simulate real interview scenarios with instant feedback, customized questions, and smart analysis.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">How to Use:</h2>
          <ul className="text-left list-disc list-inside text-gray-600">
            <li>Click the “Start Mock Interview” button</li>
            <li>Choose your domain and difficulty level</li>
            <li>Answer the questions asked by our AI interviewer</li>
            <li>Get instant feedback and suggestions for improvement</li>
          </ul>
        </div>

        <a href="https://congenial-space-happiness-5gxwpp97rj9gh75xx-3000.app.github.dev/dashboard"><Button className="text-white bg-blue-600 hover:bg-blue-700" >
          Start Mock Interview
        </Button></a>
      </div>
    </main>
  );
}
