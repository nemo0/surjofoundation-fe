import React from "react";
import StudentDetails from "@/components/student/details";
import instance from "@/lib/axios";
import { IStudentResponseData } from "@/interfaces";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/config";

const getAuthCookieData = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  return token;
};

const getStudentDetails = async (id: string) => {
  try {
    const token = await getAuthCookieData();
    const { data } = await instance.get(`/student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const studentDetails: IStudentResponseData = await getStudentDetails(
    params.id
  );

  return (
    <div>
      {studentDetails ? (
        <StudentDetails studentDetails={studentDetails} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Student Not Found...!</h1>
        </div>
      )}
    </div>
  );
}
