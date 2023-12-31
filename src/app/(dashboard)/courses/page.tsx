import React from "react";
import { Toaster } from "react-hot-toast";
import { CoursesDatatable } from "@/components/Datatables/CoursesDatatable";
import instance from "@/lib/axios";
import { ICourse } from "@/interfaces";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/config";

const getAuthCookieData = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  return token;
};

const getCourses = async () => {
  try {
    const token = await getAuthCookieData();
    const { data } = await instance.get("/course", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Page() {
  const courses: ICourse[] = await getCourses();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Courses List</h1>

      {courses ? (
        <CoursesDatatable data={courses} />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p>No courses found</p>
        </div>
      )}
      <Toaster />
    </div>
  );
}
