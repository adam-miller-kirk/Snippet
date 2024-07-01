import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";

interface FormValues {
  title: string;
  code: string;
}

export default function SnippetNew() {
  async function createSnippet(formDate: FormData) {
    // This needs to be a server action
    "use server";

    // Check the user's inputs and make sure they are valid
    const title = formDate.get("title") as string;
    const code = formDate.get("code") as string;

    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: { title, code },
    });

    // Redirect the user back to the root route
    redirect("/");
  }

  return (
    <form action={createSnippet}>
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

        <button type="submit" className="roudned p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
