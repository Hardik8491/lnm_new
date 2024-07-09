import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Table, Badge, EyeIcon } from "lucide-react";
import React from "react";

const StudentsActivity = () => {
  return (
    <div className="grid gap-4 mt-8">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Recent Student Activities</CardTitle>
          <CardDescription>
            A summary of recent student activities and progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Course</TableHead>
                <TableHead className="hidden sm:table-cell">Grade</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">John Doe</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    john@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  Introduction to Computer Science
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    A
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-23
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <EyeIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">View</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Jane Smith</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    jane@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  Calculus I
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="outline">
                    B+
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-24
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <EyeIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">View</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Michael Johnson</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    michael@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  Introduction to Psychology
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    A-
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-25
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <EyeIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">View</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Emily Davis</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    emily@example.com
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  Introduction to Biology
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    B
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-06-26
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <EyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsActivity;
