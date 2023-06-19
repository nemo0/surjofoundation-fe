"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./StudentDatatable";
import { columns } from "./DatatableColumns";

import React from "react";
import instance from "@/lib/axios";

export default function StudentDatatable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const { data } = await instance.get(`/student?page=1&itemsPerPage=2000`);
      setData(data.data);

      console.log("StudentDatatable: data: ", data);
    };
    getStudents();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
