"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import {Textarea} from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [JobPosition, setJobPosition] = useState("");
  const [JobDesc, setJobDesc] = useState("");
  const [YearsOfExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [Jsonresponse, setJsonResponse] = useState();
  const router = useRouter
  const { user } = useUser();

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(JobPosition, JobDesc, YearsOfExperience);

    const InputPrompt = `Job Position: ${JobPosition}, Job Description: ${JobDesc}, Years of Experience: ${YearsOfExperience}. Based on the job description and experience, give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESION_COUNT} interview questions along with answers, detailed explanations, and follow-up questions.`;
    const result = await chatSession.sendMessage(InputPrompt);
    const response = await result.response;
    const text = await response.text();
    const MockjsonResp = text
    .replace("```json", "")
    .replace("```", "");
    console.log(JSON, parse(MockjsonResp));

    if (MockjsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockjsonResp,
          jobPosition: JobPosition,
          jobDesc: JobDesc,
          jobExperience: YearsOfExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format(DD - MM - YYYY),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID:", resp);
      if (resp) {
        setOpenDialog(false);

        router.push('/dashboard/interview/'+resp[0].mockId);
      }
    } else {
      console.log("Error in inserting data");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the job interview.
            </DialogTitle>
            <DialogDescription>
              Add details about your job position/role, job description, and
              years of experience.
            </DialogDescription>

            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Role / Job Position
                </label>
                <Input
                  type="text"
                  placeholder="Ex. Full Stack Developer"
                  required
                  value={JobPosition}
                  onChange={(event) => setJobPosition(event.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Description / Tech Stack (In Short)
                </label>
                <Textarea
                  placeholder="Ex. React, Angular, Node.js, MySQL"
                  required
                  value={JobDesc}
                  onChange={(event) => setJobDesc(event.target.value)}
                  className="w-full border px-3 py-2 rounded-md text-sm resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  placeholder="Ex. 1"
                  required
                  max={100}
                  value={YearsOfExperience}
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}

                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" /> 'Generating from
                      AI'{" "}
                    </>
                  ) : (
                    "start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
