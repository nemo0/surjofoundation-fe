import AddStudentForm from "@/components/forms/AddStudentForm";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function page() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Add New Student</h1>
      <AddStudentForm />
      <Toaster />
    </>
  );
}
