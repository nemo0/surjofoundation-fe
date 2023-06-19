"use client";
import React, { useEffect } from "react";

import { usePathname, useParams } from "next/navigation";
import instance from "@/lib/axios";

export default function StudentDetails() {
  const { id } = useParams();

  console.log("StudentDetails: pathname: ", id);
  return <div>details: {id}</div>;
}
