"use client"
import React, { useState, useEffect } from "react";
import { deleteStudent, getStudents, Student } from "../actions/studentApi";
import { Button } from "@/components/ui/button";

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId: string) => {
   
    try {

      const response = await deleteStudent(studentId);
      if (response.success) {
        setStudents(
          students.filter((student) => student.studentId !== studentId)
        );
      } else {
        console.log(response);
        
        setError("Failed to delete student");
      }
    } catch (err) {
      console.log(err);
      
      setError("Failed to delete student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Student List</h1>
      <ul className="flex flex-col items-center justify-center gap-3 p-4 border bg-gray-200">
        {students.map((student) => (
          <li key={student.studentId}>
            {student.firstName} {student.lastName} ({student.email})
            <Button onClick={() => handleDelete(student._id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
