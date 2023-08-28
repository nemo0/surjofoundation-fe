import React from "react";
import StudentDetails from "@/components/student/details";
import instance from "@/lib/axios";
import { cookies } from "next/headers"; // Import cookies
import { AUTH_COOKIE_NAME } from "@/lib/config";
import { IBranchDetails, IStudentResponseData } from "@/interfaces";
import BranchDetails from "@/components/branch/Details";
import StudentDatatable from "@/components/Datatables/RenderDatatable";
import { columns } from "@/components/Datatables/DatatableColumns";

const getAuthCookieData = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  return token;
};

const getBranchDetails = async (id: string) => {
  const token = await getAuthCookieData();

  try {
    const { data } = await instance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getStudentsByCenterId = async (centerId: string) => {
  const token = await getAuthCookieData();

  try {
    const { data } = await instance.get(`/student/center/${centerId}`, {
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
  const branchDetails: IBranchDetails = await getBranchDetails(params.id);

  const centerID = branchDetails?.centerId;

  const studentsByBranch = centerID
    ? await getStudentsByCenterId(centerID)
    : [];

  return (
    <div className="w-full">
      {branchDetails ? (
        <div>
          <BranchDetails branchDetails={branchDetails} />
          {studentsByBranch && studentsByBranch.length > 0 ? (
            <div className="mt-8">
              <h3>
                Students in
                <span className="font-bold"> {branchDetails.name} </span>
                branch are: {studentsByBranch.length}{" "}
              </h3>
              <StudentDatatable students={studentsByBranch} columns={columns} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-2xl font-bold">No Student Found...!</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Branch Not Found...!</h1>
        </div>
      )}
    </div>
  );
}
