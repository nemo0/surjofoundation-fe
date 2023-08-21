"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICourse, IStudent, IStudentPayload, UserObject } from "@/interfaces";
import { studentSchema } from "@/schema";
import instance from "@/lib/axios";
import ImageDropzone from "../common/ImageDropzone";
import { capitalizeFirstLetters } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { API_BASE_URL, AUTH_COOKIE_NAME } from "@/lib/config";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

import { Notifications } from "../common/Toast";
import toast from "react-hot-toast";

import { Alert } from "../ui/alert";

const CASTES = [
  "Unreserved",
  "Scheduled Caste",
  "Scheduled Tribe",
  "Other Backward Class - A(OBC-A)",
  "Other Backward Class - B(OBC-B)",
];

const RELIGIONS = [
  "Hinduism",
  "Islam",
  "Christianity",
  "Sikhism",
  "Buddhism",
  "Jainism",
  "Zoroastrianism",
  "Judaism",
  "Others",
];

const QUALIFICATIONS = [
  "Below 10th",
  "Secondary (10th)",
  "Higher Secondary (12th)",
  "Graduate",
  "Post Graduate",
  "Others",
];

const AddStudentForm: React.FC = () => {
  const [courses, setCourses] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IStudent>({
    resolver: zodResolver(studentSchema),
  });

  React.useEffect(() => {
    const getCourses = async () => {
      const { data } = await instance.get("/course");

      const allCourses: any = [];

      data.data.map((course: ICourse) => {
        allCourses.push({
          value: course._id,
          label: course.courseName + "(" + course.courseDuration + ")",
        });
      });

      setCourses(allCourses);
    };

    getCourses();
  }, []);

  const onSubmit = async (data: IStudent) => {
    try {
      setLoading(true);
      const auth_token = getCookie(AUTH_COOKIE_NAME);

      const { data: imageData } = await axios.post(
        API_BASE_URL + "/upload",
        {
          file: data.file,
        },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imageData) {
        const decodedToken: UserObject = jwtDecode(auth_token as string);

        const centerMongoId = decodedToken?.sub;

        const payload: IStudentPayload = {
          ...data,
          fullName: capitalizeFirstLetters(data.fullName),
          guardianName: capitalizeFirstLetters(data.guardianName),
          address: capitalizeFirstLetters(data.address),
          imageLink: imageData.data.url,
          registrationCenter: centerMongoId,
          isCertificateIssued: false,
          aadhaarNumber: parseInt(data.aadhaarNumber.replace(/\s/g, "")),
          contactNumber: parseInt(data.contactNumber),
          dateOfBirth: new Date(data.dateOfBirth),
        };

        const { data: studentResponse } = await instance.post(
          "/student",
          payload
        );

        console.log("RESPONSE::", studentResponse);
      }
      setLoading(false);

      toast.success("Student added successfully", {
        position: "bottom-center",
      });
    } catch (error: any) {
      console.log(error);
      setLoading(false);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="font-medium text-black text-sm">Full Name</label>
        <input
          {...register("fullName")}
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.fullName && (
          <p className="text-red-600 text-xs">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Guardian Name</label>
        <input
          {...register("guardianName")}
          placeholder="Guardian Name"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.guardianName && (
          <p className="text-red-600 text-xs">{errors.guardianName.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Date of Birth</label>
        <input
          {...register("dateOfBirth")}
          placeholder="Date of Birth"
          type="date"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.dateOfBirth && (
          <p className="text-red-600 text-xs">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Gender</label>
        <select
          {...register("gender")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-600 text-xs">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Caste</label>
        <select
          {...register("caste")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="" disabled selected>
            Select Caste
          </option>
          {CASTES.map((caste, index) => (
            <option value={caste} key={index}>
              {caste}
            </option>
          ))}
        </select>
        {errors.caste && (
          <p className="text-red-600 text-xs">{errors.caste.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Religion</label>
        <select
          {...register("religion")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="" disabled selected>
            Select Religion
          </option>
          {RELIGIONS.map((religion, index) => (
            <option value={religion} key={index}>
              {religion}
            </option>
          ))}
        </select>
        {errors.religion && (
          <p className="text-red-600 text-xs">{errors.religion.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Aadhaar Number</label>
        <Controller
          name="aadhaarNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              placeholder="Aadhaar Number"
              maxLength={14}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              type="text"
              onChange={(e) =>
                setValue(
                  "aadhaarNumber",
                  e.target.value
                    .replace(/\D/g, "") // Remove all non-digit characters
                    .match(/.{1,4}/g)
                    ?.join(" ") || ""
                )
              }
            />
          )}
        />

        {errors.aadhaarNumber && (
          <p className="text-red-600 text-xs">{errors.aadhaarNumber.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Contact Number</label>
        <input
          {...register("contactNumber")}
          placeholder="Contact Number"
          maxLength={10}
          max={9999999999}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          type="number"
        />
        {errors.contactNumber && (
          <p className="text-red-600 text-xs">{errors.contactNumber.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Address</label>
        <textarea
          {...register("address")}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.address && (
          <p className="text-red-600 text-xs">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">
          Highest Qualification
        </label>
        <select
          {...register("highestQualification")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="" disabled selected>
            Select Highest Qualification
          </option>
          {QUALIFICATIONS.map((highestQualification, index) => (
            <option value={highestQualification} key={index}>
              {highestQualification}
            </option>
          ))}
        </select>
        {errors.highestQualification && (
          <p className="text-red-600 text-xs">
            {errors.highestQualification.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-medium text-black text-sm">Course</label>
        <select
          {...register("course")}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          <option value="" disabled selected>
            Select Course
          </option>
          {courses.map((course: any) => (
            <option key={course.value} value={course.value}>
              {course.label}
            </option>
          ))}
        </select>
        {errors.course && (
          <p className="text-red-600 text-xs">{errors.course.message}</p>
        )}
      </div>

      <div>
        <ImageDropzone
          register={register}
          onDrop={(files: Array<File>) => {
            setValue("file", files[0]);
          }}
        />
      </div>

      <Button type="submit" className="" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registering
          </>
        ) : (
          "Add Student"
        )}
      </Button>
      <Notifications />
    </form>
  );
};

export default AddStudentForm;
