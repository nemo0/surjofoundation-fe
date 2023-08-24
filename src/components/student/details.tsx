import { IStudentResponseData } from "@/interfaces";
import { Separator } from "../ui/separator";
import Image from "next/image";

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
          name="Aadharar Number"
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
          value={studentDetails?.courseDetails.courseName}
        />
        <DetailsComponent
          name="Course Duration"
          value={studentDetails?.courseDetails.courseDuration}
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

const DetailsComponent = ({ name, value }: { name: string; value: string }) => {
  return (
    <>
      <div className="flex w-full justify-between my-2 mt-4">
        <h6 className="text-gray-500 text-sm ">{name}</h6>
        <p className="text-gray-900 font-bold text-sm text-left">{value}</p>
      </div>
      <Separator />
    </>
  );
};

const addSpacesInAadharNumber = (aadharNumber: string) => {
  return aadharNumber.replace(/(.{4})/g, "$1 ").trim();
};
