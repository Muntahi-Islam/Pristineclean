"use client";

import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, X } from "lucide-react";
import type { QuoteInput } from "@/schemas/quote";

export function StepUpload() {
  const { setValue, watch } = useFormContext<QuoteInput>();
  const images = watch("images") ?? [];
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    },
    []
  );

  const removeImage = (index: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900 mb-2">
        Upload Photos (Optional)
      </h2>
      <p className="text-navy-500 mb-8">
        Show us the areas that need attention so we can prepare an accurate
        quote.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed p-12 text-center transition-all ${
          isDragOver
            ? "border-blue-600 bg-blue-50/30"
            : "border-navy-300 hover:border-navy-400"
        }`}
      >
        <Upload
          size={40}
          className="mx-auto mb-4 text-navy-400"
        />
        <p className="text-navy-700 font-medium mb-1">
          Drag & drop images here
        </p>
        <p className="text-sm text-navy-500 mb-4">
          or click to browse (max 10 images, 8MB each)
        </p>
        <p className="text-xs text-navy-400">
          UploadThing integration ready — configure UPLOADTHING_SECRET in .env
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-6">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square bg-navy-100">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
