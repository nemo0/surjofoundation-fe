"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICourse } from "@/interfaces";
import { courseSchema } from "@/schema";
import instance from "@/lib/axios";
import { capitalizeFirstLetters } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddCourseForm: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ICourse>({
    resolver: zodResolver(courseSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: ICourse) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        courseName: capitalizeFirstLetters(data.courseName),
        courseCode: data?.courseCode
          ? data?.courseCode.replace(/\s/g, "").toUpperCase()
          : "",
      };

      const { data: courseResponse } = await instance.post("/course", payload);

      console.log(courseResponse);
      setLoading(false);

      toast.success("Course Added Successfully", {
        duration: 4000,
        position: "bottom-center",
      });

      router.push("/courses");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong", {
        duration: 4000,
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="font-medium text-black text-sm">Course Name</label>
        <Input
          {...register("courseName")}
          placeholder="Course Name"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.courseName && (
          <p className="text-red-600 text-xs">{errors.courseName.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Course Code</label>
        <Input
          {...register("courseCode")}
          placeholder="Course Code"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.courseCode && (
          <p className="text-red-600 text-xs">{errors.courseCode.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">
          Course Duration
        </label>
        <select
          {...register("courseDuration")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="" disabled selected>
            Select Course Duration
          </option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="12 Months">12 Months</option>
          <option value="24 Months">24 Months</option>
        </select>
        {errors.courseDuration && (
          <p className="text-red-600 text-xs">
            {errors.courseDuration.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">
          Course Description
        </label>
        <textarea
          {...register("courseDescription")}
          placeholder="Course Description"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.courseDescription && (
          <p className="text-red-600 text-xs">
            {errors.courseDescription.message}
          </p>
        )}
      </div>

      <Button type="submit" className="" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding
          </>
        ) : (
          "Add Course"
        )}
      </Button>
    </form>
  );
};

export default AddCourseForm;
