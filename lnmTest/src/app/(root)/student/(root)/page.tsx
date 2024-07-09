/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6NvOMVBNPge
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Student() {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 p-4 sm:px-6 sm:py-0">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="px-7">
              <div className="flex justify-between items-center">
                <CardTitle>Student Profile</CardTitle>
              </div>
              <CardDescription>
                View and manage the student's information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="text-2xl font-semibold">John Doe</div>
                  <div className="text-sm text-muted-foreground">Grade A</div>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" disabled />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" disabled />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john@example.com" disabled />
                </div>
                <div>
                  <Label htmlFor="grade">Grade</Label>
                  <Select id="grade" defaultValue="A" disabled>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 text-sm"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1 text-sm"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="px-7">
              <div className="flex justify-between items-center">
                <CardTitle>Student Progress</CardTitle>
              </div>
              <CardDescription>
                View the student's academic progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="attendance">Attendance</Label>
                  <Progress value={92} aria-label="92% attendance" />
                </div>
                <div>
                  <Label htmlFor="grades">Grades</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Math</div>
                      <Progress value={85} aria-label="85% in Math" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">English</div>
                      <Progress value={92} aria-label="92% in English" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Science</div>
                      <Progress value={78} aria-label="78% in Science" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">History</div>
                      <Progress value={90} aria-label="90% in History" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="assignments">Assignments</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Completed</div>
                      <Progress
                        value={95}
                        aria-label="95% assignments completed"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Late</div>
                      <Progress value={15} aria-label="15% assignments late" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="px-7">
              <div className="flex justify-between items-center">
                <CardTitle>Student Work</CardTitle>
              </div>
              <CardDescription>
                View the student's recent work and projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <div className="text-sm font-medium">Math Project</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>Math Concepts Project.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 05/12/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">English Essay</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>English Essay - The Great Gatsby.docx</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 04/28/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Science Experiment</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>Science Experiment Report.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 03/15/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="px-7">
              <div className="flex justify-between items-center">
                <CardTitle>Student Work</CardTitle>
              </div>
              <CardDescription>
                View the student's recent work and projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <div className="text-sm font-medium">Math Project</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>Math Concepts Project.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 05/12/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">English Essay</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>English Essay - The Great Gatsby.docx</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 04/28/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Science Experiment</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>Science Experiment Report.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 03/15/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="px-7">
              <div className="flex justify-between items-center">
                <CardTitle>Student Work</CardTitle>
              </div>
              <CardDescription>
                View the student's recent work and projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <div className="text-sm font-medium">Math Project</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>Math Concepts Project.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 05/12/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">English Essay</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>English Essay - The Great Gatsby.docx</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 04/28/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Science Experiment</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div>Science Experiment Report.pdf</div>
                      <div className="text-xs text-muted-foreground">
                        Submitted on 03/15/2023
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" size="icon">
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
