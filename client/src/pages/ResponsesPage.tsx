import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useParams } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "../api/graphqlApi";
import ResponseList from "../components/ResponseList";

export default function ResponsesPage() {
  const { id } = useParams();
  const queryArg = id ?? skipToken;
  const { data: form, isLoading: loadingForm, error: formError } =
    useGetFormQuery(queryArg);
  const { data: responses, isLoading: loadingResponses, error: responsesError } =
    useGetResponsesQuery(queryArg);

  if (!id) {
    return <div>Form not found</div>;
  }

  if (loadingForm || loadingResponses) {
    return <div>Loading...</div>;
  }

  if (formError || responsesError) {
    return <div>Failed to load responses</div>;
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block border border-blue-600 hover:border-blue-800 rounded px-4 py-2 transition"
      >
        Back to Forms
      </Link>
      <h2 className="text-2xl font-bold mb-8 text-blue-700 text-center drop-shadow">
        Responses for: {form.title}
      </h2>
      <div className="space-y-6">
        <ResponseList responses={responses ?? []} questions={form.questions} />
      </div>
    </div>
  );
}
