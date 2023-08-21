import React from "react";
import AddCourseForm from "@/components/forms/AddCourseForm";
import { Toaster } from "react-hot-toast";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Add New Course</h1>

      <AddCourseForm />
      <Toaster />
    </div>
  );
}
