"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Controller, Control, FieldErrors } from "react-hook-form";
import ErrorMsg from "../common/error-msg";

// Dynamically import QuillEditor to avoid SSR issues - must be outside component
const QuillEditor = dynamic(() => import("./quill-editor"), {
  ssr: false,
  loading: () => (
    <div className="input w-full h-[300px] rounded-md border border-gray6 px-6 py-4 text-base text-black bg-gray-50 flex items-center justify-center">
      Loading editor...
    </div>
  ),
});

interface RichTextEditorProps {
  control: Control<any>;
  name: string;
  errors: FieldErrors<any>;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  control,
  name,
  errors,
  defaultValue = "",
  placeholder = "Write your content here...",
  required = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rich-text-editor">
        <div className="input w-full h-[300px] rounded-md border border-gray6 px-6 py-4 text-base text-black bg-gray-50 flex items-center justify-center">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "Content is required!" : false,
        }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <QuillEditor
            value={field.value || ""}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        )}
      />
      {required && (
        <ErrorMsg msg={(errors?.[name]?.message as string) || ""} />
      )}
      <style dangerouslySetInnerHTML={{
        __html: `
          .rich-text-editor .ql-container {
            height: 300px;
            font-size: 14px;
          }
          .rich-text-editor .ql-editor {
            min-height: 300px;
          }
          .rich-text-editor .ql-toolbar {
            border-top: 1px solid #e5e7eb;
            border-left: 1px solid #e5e7eb;
            border-right: 1px solid #e5e7eb;
            border-bottom: none;
            border-radius: 6px 6px 0 0;
          }
          .rich-text-editor .ql-container {
            border-bottom: 1px solid #e5e7eb;
            border-left: 1px solid #e5e7eb;
            border-right: 1px solid #e5e7eb;
            border-top: none;
            border-radius: 0 0 6px 6px;
          }
        `
      }} />
    </div>
  );
};

export default RichTextEditor;

