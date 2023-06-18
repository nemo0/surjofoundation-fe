import React, { FC, useEffect } from "react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import Image from "next/image";

interface ImageDropzoneProps {
  onDrop: (files: Array<File>) => void;
  register: any;
}

const ImageDropzone: FC<ImageDropzoneProps> = ({ onDrop, register }) => {
  const dropzoneOptions: DropzoneOptions = {
    accept: {
      "image/png": [".png", ".PNG", ".jpg", ".JPG", ".jpeg", ".JPEG"],
    },
    maxFiles: 1,
    maxSize: 3500000,
    onDrop: onDrop,
  };

  const { acceptedFiles, getRootProps, getInputProps } =
    useDropzone(dropzoneOptions);

  const thumbs = acceptedFiles.map((file) => (
    <div key={file.name}>
      <Image
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="thumb"
        height={400}
        width={300}
      />
    </div>
  ));

  return (
    <section>
      <div
        {...getRootProps({
          className:
            "px-6 py-12 w-full border border-gray-400 border-dashed rounded-md",
        })}
      >
        <input
          {...getInputProps()}
          name="file" // make sure it has a name attribute to be managed by react-hook-form
          {...register("file")} // register it into react-hook-form
        />
        <p className="text-center">
          Drag & drop some images here, or click to select files
        </p>
      </div>
      {thumbs && (
        <aside className="mt-4">
          <div>{thumbs}</div>
        </aside>
      )}
    </section>
  );
};

export default ImageDropzone;
