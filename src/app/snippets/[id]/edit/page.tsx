import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippetEditForm";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEdit(props: SnippetEditPageProps) {
  const id = parseInt(props.params.id);

  const snippet = await db.snippet.findFirst({
    where: { id },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${snippet.id}`} className="p-2 border rounded">
            Back
          </Link>
        </div>
      </div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
