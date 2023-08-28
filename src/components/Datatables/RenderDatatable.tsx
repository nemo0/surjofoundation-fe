import { DataTable } from "./StudentDatatable";

import { IStudentTableData } from "@/interfaces";

export default function StudentDatatable({
  students,
  columns,
}: {
  students: IStudentTableData[];
  columns: any;
}) {
  return (
    <div>
      <DataTable columns={columns} data={students} />
    </div>
  );
}
