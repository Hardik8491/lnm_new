import mongoose, { Model } from "mongoose";

// Interface for optional skills (skillId, skillScore, skillName)
export interface ISkill {
  skillId?: string;
  skillScore?: number;
  skillName?: string;
}

// Interface for student data with test details
export interface IStudent {
  _id: mongoose.Schema.Types.ObjectId;
  firstName: String;
  lastName: String; // Required
  rollNo: String; // Required
  email: String; // Required (unique)
  mark?: number; // Optional mark
  skills?: ISkill[]; // Optional skills array
  age?: number; // Optional age
  birthdate?: Date; // Optional birthdate
  location?: String; // Optional location
  other?: any; // Optional data for anything else
  tests?: ITest[]; // Array of test objects
  avatar?: String;
}

// Interface for individual test details (testId, questions, and answers)
export interface ITest {
  testId: string;
  questions: IQuestion[]; // Array of question objects
}

// Interface for individual question data (text, type, answers)
export interface IQuestion {
  text: string;
  type: string; // e.g., "multiple_choice", "open_ended"
  answers: IAnswer[];
}

// Interface for individual answer data (text, isCorrect)
export interface IAnswer {
  text: string;
  isCorrect?: boolean; // Optional for multiple-choice questions
}

// Define Mongoose schema with type safety and unique constraints
const studentSchema = new mongoose.Schema<IStudent>({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true }, // Required and unique
  rollNo: { type: String, required: true, unique: true }, // Required and unique
  email: { type: String, required: true, unique: true }, // Required and unique
  mark: Number,
  skills: [
    {
      skillId: String,
      skillScore: Number,
      skillName: String,
    },
  ],
  age: Number,
  birthdate: Date,
  location: String,
  avatar: String,
  other: mongoose.Schema.Types.Mixed, // Allow any type for 'other' field
});

// Export the Mongoose model
const studentModel: Model<IStudent> = mongoose.model("Student", studentSchema);
export default studentModel;
