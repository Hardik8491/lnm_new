"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  EllipsisVertical,
  FilePenIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import AddStudentForm from "../../student/(root)/components/add";
import { getStudents, deleteStudent, Student } from "@/app/actions/studentApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// eslint-disable-next-line @next/next/no-async-client-component
const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
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
    const prevStudents = students;
    setStudents(students.filter((student: any) => student._id !== studentId));

    try {
      const response = await deleteStudent(studentId);

      if (response.success) {
        toast.success("Student deleted successfully");
      } else {
        setStudents(prevStudents);
        setError("Failed to delete student");
      }
    } catch (err) {
      setStudents(prevStudents);
      setError("Failed to delete student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  if (loading) return <div>
     <div className="grid gap-4 mt-8">
      <Card>
        <CardHeader className="px-7">
          <div className="flex justify-between items-center">
            <CardTitle>Student List</CardTitle>
            <AddStudentForm setRefresh={setRefresh} />
          </div>
          <CardDescription>
            Manage your students and view their progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-10 ">
           Loading.....
          </div>
        </CardContent>
      </Card>
    </div>
  </div>;
  if (error) return <div>
      <div className="grid gap-4 mt-8">
      <Card>
        <CardHeader className="px-7">
          <div className="flex justify-between items-center">
            <CardTitle>Student List</CardTitle>
            <AddStudentForm setRefresh={setRefresh} />
          </div>
          <CardDescription>
            Manage your students and view their progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-10 ">
            Refresh Again....
          </div>
        </CardContent>
      </Card>
    </div>
  </div>;
  return (
    <div className="grid gap-4 mt-8">
      <Card>
        <CardHeader className="px-7">
          <div className="flex justify-between items-center">
            <CardTitle>Student List</CardTitle>
            <AddStudentForm setRefresh={setRefresh} />
          </div>
          <CardDescription>
            Manage your students and view their progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students &&
              students.map((student: any) => {
                return (
                  <Card className="w-full h-full" key={student.id}>
                    <div className="flex items-center p-4 gap-4">
                      <Avatar className="w-16 h-16 border">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>
                          {student.firstName[0] + student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">
                          {student.firstName + "" + student.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Student ID: {student?.rollNo}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Grade: 9th
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Age: {student.age}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <EllipsisVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              href="#"
                              className="flex items-center gap-2"
                              prefetch={false}
                            >
                              <FilePenIcon className="h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div
                              className="flex items-center gap-2"
                              onClick={() => handleDelete(student._id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                              Delete
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-4 p-2 flex gap-2">
                      <Link href="/student/work">
                        <Button variant="outline" size="sm">
                          View Work
                        </Button>
                      </Link>
                      <Link href="/student">
                        <Button variant="outline" size="sm">
                          Profile
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        Academics
                      </Button>
                    </div>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
