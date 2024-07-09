import mongoose, { Model } from "mongoose";

// Interface for question data
interface Question {
  text: string;
  type: string; // e.g., "multiple_choice", "open_ended"
  options: Option[];
  skill: string; // Skill associated with the question
}

interface Option {
  text: string | number | any;
}

interface Test {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  user: mongoose.Schema.Types.ObjectId; // Reference User model
  students: mongoose.Schema.Types.ObjectId[]; // Reference Student model
  questions: Question[];
}

// Define Mongoose schema for test
const testSchema = new mongoose.Schema<Test>({
  title: {
    type: String,
    required: [true, "Please enter title of test"],
  },
  description: String,
  startTime: Date,
  endTime: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference by name
  questions: [
    {
      text: {
        type: String,
        required: [true, "Please enter title of question"],
      },
      type:  {
        type: String,
        required: [true, "Please enter type"],
      },
      options: [
        {
          text: {
            type: String,
            required: [true, "Please enter option"],
          },
        },
      ],
      skill: {
        type: String,
        required: [true, "Please enter skill"],
      }, // Skill associated with the question
    },
  ],
});

// Export the Mongoose model
const testModel: Model<Test> = mongoose.model<Test>("Test", testSchema);
export default testModel;
