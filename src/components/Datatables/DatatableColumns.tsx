"use client";

import { ColumnDef } from "@tanstack/react-table";

import { IStudentTableData } from "@/interfaces";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export const columns: ColumnDef<IStudentTableData>[] = [
  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "courseDetails.courseName",
    header: "Course",
  },
  {
    accessorKey: "courseDetails.courseDuration",
    header: "Duration",
  },
  {
    accessorKey: "isCertificateIssued",
    header: "Certificate Issued",
    accessorFn: (data) => {
      return data.isCertificateIssued ? "Yes" : "No";
    },
  },
];
