import { IStudentResponseData } from "@/interfaces";
import Image from "next/image";
import { DetailsComponent } from "../common/DetailsComponent";

export default async function StudentDetails({
  studentDetails,
}: {
  studentDetails: IStudentResponseData;
}) {
  return (
    <div className="flex gap-x-4 justify-between flex-col md:flex-row ">
      <div className="md:w-10/12 w-full md:order-1 order-2">
        <DetailsComponent name="Name" value={studentDetails?.fullName} />
        <DetailsComponent
          name="Guardian Name"
          value={studentDetails?.guardianName}
        />
        <DetailsComponent
          name="Aadhaar Number"
          value={addSpacesInAadharNumber(String(studentDetails?.aadhaarNumber))}
        />
        <DetailsComponent
          name="Contact Number"
          value={String(studentDetails?.contactNumber)}
        />
        <DetailsComponent name="Address" value={studentDetails?.address} />
        <DetailsComponent
          name="Registration Number"
          value={studentDetails?.registrationNumber}
        />
        <DetailsComponent
          name="Registration Center Name"
          value={studentDetails?.registrationCenterDetails.name}
        />
        <DetailsComponent
          name="Registration Center ID"
          value={studentDetails?.registrationCenterDetails.centerId}
        />
        <DetailsComponent
          name="Course Name"
          value={studentDetails?.courseDetails?.courseName}
        />
        <DetailsComponent
          name="Course Duration"
          value={studentDetails?.courseDetails?.courseDuration}
        />
      </div>
      <div className="md:w-2/12 w-full md:order-2 order-1">
        <Image
          src={studentDetails?.imageLink}
          alt="Profile Picture"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
}

const addSpacesInAadharNumber = (aadharNumber: string) => {
  return aadharNumber.replace(/(.{4})/g, "$1 ").trim();
};
