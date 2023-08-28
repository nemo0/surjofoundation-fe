import React from "react";
import StudentDatatable from "@/components/Datatables/RenderDatatable";
import { Toaster } from "react-hot-toast";
import instance from "@/lib/axios";
import { columns } from "@/components/Datatables/DatatableColumns";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/config";

const getAuthCookieData = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  return token;
};

const getStudents = async () => {
  try {
    const token = await getAuthCookieData();
    const { data } = await instance.get(
      `/student/center/my?page=1&itemsPerPage=2000`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error: any) {
    console.log(error);
  }
};

export default async function Page() {
  const students = await getStudents();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Student List</h1>
      <StudentDatatable students={students} columns={columns} />
      <Toaster />
    </div>
  );
}
