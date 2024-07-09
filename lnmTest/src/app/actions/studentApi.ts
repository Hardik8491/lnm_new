export interface Student {
  success: any;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  studentId: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const createStudent = async (formData: any): Promise<Student> => {
  const response = await fetch(`${BASE_URL}/add-student`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    console.log(response);

    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(`${BASE_URL}/get-students`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error("Network response was not ok");
  }

  return data.students;
};

export const updateStudent = async (
  studentId: string,
  studentData: Partial<Student>
): Promise<Student> => {
  const response = await fetch(`${BASE_URL}/update-student/${studentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const deleteStudent = async (
  studentId: string
): Promise<{ success: boolean }> => {
  const response = await fetch(`${BASE_URL}/delete-student`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({ id: studentId }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
