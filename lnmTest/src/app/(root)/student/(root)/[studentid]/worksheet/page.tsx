import React from "react";
import StudentWorkSheet from "../../components/worksheet";

const Worksheet = () => {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 p-4 sm:px-6 sm:py-0">
        <StudentWorkSheet />
      </main>
    </div>
  );
};

export default Worksheet;
