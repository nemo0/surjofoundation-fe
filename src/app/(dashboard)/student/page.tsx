import React from "react";
import StudentDatatable from "@/components/Datatables/RenderDatatable";
import { Toaster } from "react-hot-toast";
export default async function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Student List</h1>
      <StudentDatatable />
      <Toaster />
    </div>
  );
}
