"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createSnippet } from "@/actions";

interface FormValues {
  title: string;
  code: string;
}

export default function SnippetNew() {
  const [formState, action] = useFormState(createSnippet, { message: "" });

  return (
    <form action={action}>
      <div className="flex m-4 justify-between items-center">
        <h3 className="font-bold">Create Snippet Page</h3>
        <Link href={`/`} className="p-2 border rounded">
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        {formState.message && (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-500">
            {formState.message}
          </div>
        )}

        <button type="submit" className="roudned p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
