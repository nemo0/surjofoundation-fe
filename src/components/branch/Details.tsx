import { IBranchDetails } from "@/interfaces";
import { DetailsComponent } from "../common/DetailsComponent";

export default async function BranchDetails({
  branchDetails,
}: {
  branchDetails: IBranchDetails;
}) {
  return (
    <div className="flex gap-x-4 justify-between flex-col md:flex-row ">
      <div className="w-full">
        <DetailsComponent name="Center ID" value={branchDetails?.centerId} />
        <DetailsComponent name="Branch Name" value={branchDetails?.name} />
        <DetailsComponent
          name="Contact Number"
          value={String(branchDetails?.contactNumber)}
        />
        <DetailsComponent name="Email" value={branchDetails?.email} />
        <DetailsComponent name="Address" value={branchDetails?.address} />
        <DetailsComponent
          name="Center In Charge"
          value={branchDetails?.inCharge}
        />
      </div>
    </div>
  );
}
