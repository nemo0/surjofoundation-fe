import React from "react";
import StudentDatatable from "@/components/Datatables/RenderDatatable";

export default async function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Student List</h1>
      <StudentDatatable />
    </div>
  );
}
