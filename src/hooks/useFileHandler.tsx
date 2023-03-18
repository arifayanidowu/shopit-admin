import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const useFileHandler = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        setFile(file);
        setImage(URL.createObjectURL(file));
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    image,
    file,
  };
};

export default useFileHandler;
