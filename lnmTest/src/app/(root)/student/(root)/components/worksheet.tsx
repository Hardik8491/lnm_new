
"use client"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { setTimeout } from "timers/promises";
import toast from "react-hot-toast";


export default function StudentWorkSheet() {
  const router=useRouter();
  const handleSubmit=(e:any)=>{
    toast.success("Worksheet submitted successfully")
       router.back();
  }
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Worksheet</CardTitle>
        <CardDescription>
          Fill out the worksheet details and answer the questions.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="id">ID</Label>
            <Input id="id" placeholder="Enter ID" value="WS001" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value="01-02-2025" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-id">Student ID</Label>
            <Input
              id="student-id"
              placeholder="Enter student ID"
              value="S123"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-id">User ID</Label>
            <Input id="user-id" placeholder="Enter user ID" value="U456" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Questions</Label>
            <div className="space-y-4">
              <div>
                <div className="mb-2 font-medium">
                  What is the capital of France?
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="option1" checked />
                    <Label htmlFor="option1">Paris</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="option2" />
                    <Label htmlFor="option2">London</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="option3" />
                    <Label htmlFor="option3">Berlin</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="option4" />
                    <Label htmlFor="option4">Madrid</Label>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2 font-medium">
                  What is the largest ocean in the world?
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="option5" />
                    <Label htmlFor="option5">Atlantic Ocean</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="option6" />
                    <Label htmlFor="option6">Indian Ocean</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="option7" />
                    <Label htmlFor="option7">Arctic Ocean</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="option8" checked />
                    <Label htmlFor="option8">Pacific Ocean</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit} type="submit">Submit</Button>
      </CardFooter>
    </Card>
  );
}
