import React from "react";
import { Toaster } from "react-hot-toast";
import { CoursesDatatable } from "@/components/Datatables/CoursesDatatable";
import { UsersDatatable } from "@/components/Datatables/UsersDatatable";
import instance from "@/lib/axios";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/config";

const getAuthCookieData = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  return token;
};

const getUsers = async () => {
  try {
    const token = await getAuthCookieData();

    const { data } = await instance.get("/users", {
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
  const users = await getUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Branch List</h1>

      {users ? (
        <UsersDatatable data={users} />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p>No users found</p>
        </div>
      )}
      <Toaster />
    </div>
  );
}
