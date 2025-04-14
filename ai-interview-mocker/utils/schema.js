import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";


export const MockInterview = pgTable("mockinterview", {
    id: serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
    jobDesc: varchar("jobDesc", { length: 500 }).notNull(),
    jobExperience: varchar("jobExperience", { length: 50 }).notNull(),
    createdBy: varchar("createdBy", { length: 100 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    mockId: varchar("mockId", { length: 50 }).notNull(),
});

export const UserAnswer = pgTable ("userAnswer",{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar("question").notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text("feedback"),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createAt:varchar('createdAt'),
})