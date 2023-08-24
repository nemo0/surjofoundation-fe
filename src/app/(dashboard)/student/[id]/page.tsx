import React from "react";
import StudentDetails from "@/components/student/details";
import instance from "@/lib/axios";
import { cookies } from "next/headers"; // Import cookies
import { AUTH_COOKIE_NAME } from "@/lib/config";
import { IStudentResponseData } from "@/interfaces";

const getStudentDetails = async (id: string) => {
  const nextCookies = cookies();
  const token = nextCookies.get(AUTH_COOKIE_NAME)?.value;

  try {
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
