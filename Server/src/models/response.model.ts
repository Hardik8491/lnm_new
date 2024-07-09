import { Schema, model, Document } from 'mongoose';

interface Question {
  text: string;
  type: string;
  skill: string;
  answer: string[];
}

interface Response extends Document {
  studentId: string;
  userId?: string;
  questions: { question: Question }[];
  submittedDate: Date;
  testId: string;
}

const questionSchema = new Schema<Question>({
  text: { type: String, required: true },
  type: { type: String, required: true },
  skill: { type: String, required: true },
  answer: { type: [String], required: true },
});

const responseSchema = new Schema<Response>({
  studentId: { type: String, required: true },
  userId: { type: String, required: false },
  questions: [{ question: questionSchema }],
  submittedDate: { type: Date, required: true },
  testId: { type: String, required: true },
});
 const responseModel = model<Response>('Response', responseSchema);

 export default responseModel;