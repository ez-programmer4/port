"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const [uploadError, setUploadError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    if (result.event === "success") {
      onChange(result.info.secure_url);
      setUploadError("");
    }
    setIsUploading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    console.error("Upload error:", error);
    setUploadError("Upload failed. Check Cloudinary configuration.");
    setIsUploading(false);
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {uploadError && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {uploadError}
          <p className="mt-1 text-xs">
            Check CLOUDINARY_SETUP.md for configuration help.
          </p>
        </div>
      )}

      {value ? (
        <div className="relative">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <Image
              src={value}
              alt="Upload preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset="portfolio_uploads"
          options={{
            maxFiles: 1,
            resourceType: "image",
            maxFileSize: 10000000,
            sources: ["local", "url", "camera"],
          }}
          onSuccess={handleUpload}
          onError={handleError}
          onOpen={() => setIsUploading(true)}
          onClose={() => setIsUploading(false)}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              disabled={disabled || isUploading}
              className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="w-8 h-8 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div className="text-center">
                    <p className="text-gray-600 font-medium">
                      Click to upload image
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </>
              )}
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
