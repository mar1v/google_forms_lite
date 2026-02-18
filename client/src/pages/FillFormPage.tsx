import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetFormQuery, useSubmitResponseMutation } from "../api/graphqlApi";
import QuestionRenderer from "../components/QuestionRenderer";

export default function FillFormPage() {
  const { id } = useParams();
  const { data: form, isLoading } = useGetFormQuery(id!);
  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();
  const [answers, setAnswers] = useState<{ [questionId: string]: string[] }>(
    {},
  );
  const [success, setSuccess] = useState(false);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-blue-600 animate-pulse">
        Loading...
      </div>
    );
  if (!form)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-red-600">
        Form not found
      </div>
    );

  function handleChange(qid: string, value: string[]) {
    setAnswers((a) => ({ ...a, [qid]: value }));
  }

  async function handleSubmit() {
    if (!form) return;
    await submitResponse({
      formId: id!,
      answers: form.questions.map((q) => ({
        questionId: q.id,
        value: answers[q.id] || [],
      })),
    });
    setSuccess(true);
  }

  if (!form) return null;
  return (
    <div className="max-w-2xl mx-auto py-12 px-6 bg-white shadow-xl rounded-2xl mt-10">
      <button
        className="text-blue-600 hover:text-blue-800 font-medium mb-4 block background-transparent border border-blue-600 hover:border-blue-800 rounded px-4 py-2 transition"
        onClick={() => window.history.back()}
      >
        ← Back to Forms
      </button>
      <h2 className="text-2xl font-extrabold mb-6 text-blue-700 text-center drop-shadow">
        {form.title}
      </h2>
      <div className="mb-6 text-center text-gray-600 text-lg">
        {form.description}
      </div>
      <div className="space-y-6">
        {form.questions.map((q) => (
          <div
            key={q.id}
            className="bg-gray-50 p-5 rounded-lg shadow border border-gray-200"
          >
            <div className="font-semibold mb-2 text-gray-800 text-lg">
              {q.title}
            </div>
            <QuestionRenderer
              question={q}
              value={answers[q.id]}
              onChange={(val) => handleChange(q.id, val)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow mt-8 transition disabled:opacity-60 w-full text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {success && (
        <div className="text-green-600 mt-6 text-center font-medium text-lg animate-fade-in">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
}
