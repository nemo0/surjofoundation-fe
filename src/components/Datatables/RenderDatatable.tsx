"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./StudentDatatable";
import { columns } from "./DatatableColumns";

import React from "react";
import instance from "@/lib/axios";

import toast from "react-hot-toast";

export default function StudentDatatable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const { data } = await instance.get(
          `/student/center/my?page=1&itemsPerPage=2000`
        );
        setData(data.data);
      } catch (error: any) {
        toast.error(error.response.data.message, {
          duration: 4000,
          position: "top-center",
        });
        setData([]);
      }
    };
    getStudents();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
