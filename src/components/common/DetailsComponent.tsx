import { Separator } from "../ui/separator";

export const DetailsComponent = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
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
