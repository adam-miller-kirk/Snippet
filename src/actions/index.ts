"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formDate: FormData
) {
  const title = formDate.get("title") as string;
  const code = formDate.get("code") as string;
  let formValue = { message: "" };

  try {
    // Check the user's inputs and make sure they are valid

    if (typeof title !== "string") {
      formValue.message = "Title must be string";
      return formValue;
    } else if (title.length < 3) {
      formValue.message = "Title must be longer";
      return formValue;
    } else if (code.length < 10) {
      formValue.message = "code must be longer";
      return formValue;
    }

    // throw new Error("Failed to save to database");

    // Create a new record in the database
    await db.snippet.create({ data: { title, code } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      formValue.message = error.message;
    } else {
      formValue.message = "There was an issue";
    }
    return formValue;
  }

  // Redirect the user back to the root route
  redirect("/");
}
