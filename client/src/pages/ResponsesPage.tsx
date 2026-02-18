import { useParams } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "../api/graphqlApi";
import ResponseList from "../components/ResponseList";

export default function ResponsesPage() {
  const { id } = useParams();
  const { data: form, isLoading: loadingForm } = useGetFormQuery(id!);
  const { data: responses, isLoading: loadingResp } = useGetResponsesQuery(id!);

  if (loadingForm || loadingResp) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <button
        className="text-blue-600 hover:text-blue-800 font-medium mb-4 block background-transparent border border-blue-600 hover:border-blue-800 rounded px-4 py-2 transition"
        onClick={() => window.history.back()}
      >
        ← Back to Forms
      </button>
      <h2 className="text-2xl font-bold mb-8 text-blue-700 text-center drop-shadow">
        Responses for: {form.title}
      </h2>
      <div className="space-y-6">
        <ResponseList responses={responses || []} questions={form.questions} />
      </div>
    </div>
  );
}
