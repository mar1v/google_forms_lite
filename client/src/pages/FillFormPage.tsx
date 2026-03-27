import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useParams } from "react-router-dom";
import { useGetFormQuery, useSubmitResponseMutation } from "../api/graphqlApi";
import QuestionRenderer from "../components/QuestionRenderer";

export default function FillFormPage() {
  const { id } = useParams();
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { data: form, isLoading, error } = useGetFormQuery(id ?? skipToken);
  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();

  if (!id) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-red-600">
        Form not found
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-blue-600 animate-pulse">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-red-600">
        Failed to load form
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-red-600">
        Form not found
      </div>
    );
  }

  function handleChange(questionId: string, value: string[]) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: value,
    }));
  }

  async function handleSubmit() {
    if (!id || !form) {
      return;
    }

    setSubmitError("");

    try {
      await submitResponse({
        formId: id,
        answers: form.questions.map((question) => ({
          questionId: question.id,
          value: answers[question.id] || [],
        })),
      }).unwrap();

      setSuccess(true);
    } catch {
      setSuccess(false);
      setSubmitError("Failed to submit form");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 bg-white shadow-xl rounded-2xl mt-10">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block border border-blue-600 hover:border-blue-800 rounded px-4 py-2 transition"
      >
        Back to Forms
      </Link>
      <h2 className="text-2xl font-extrabold mb-6 text-blue-700 text-center drop-shadow">
        {form.title}
      </h2>
      <div className="mb-6 text-center text-gray-600 text-lg">
        {form.description}
      </div>
      <div className="space-y-6">
        {form.questions.map((question) => (
          <div
            key={question.id}
            className="bg-gray-50 p-5 rounded-lg shadow border border-gray-200"
          >
            <div className="font-semibold mb-2 text-gray-800 text-lg">
              {question.title}
            </div>
            <QuestionRenderer
              question={question}
              value={answers[question.id]}
              onChange={(value) => handleChange(question.id, value)}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow mt-8 transition disabled:opacity-60 w-full text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {success && (
        <div className="text-green-600 mt-6 text-center font-medium text-lg">
          Form submitted successfully!
        </div>
      )}
      {submitError && (
        <div className="text-red-600 mt-6 text-center font-medium text-lg">
          {submitError}
        </div>
      )}
    </div>
  );
}
