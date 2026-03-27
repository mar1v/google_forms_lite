import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { Question } from "@shared/types";
import { useCreateFormMutation } from "../api/graphqlApi";
import QuestionEditor from "../components/QuestionEditor";
import {
  addQuestion,
  removeQuestion,
  resetForm,
  setDescription,
  setTitle,
  updateQuestion,
} from "../features/formBuilderSlice";
import type { AppDispatch, RootState } from "../store";

export default function CreateFormPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const form = useSelector((state: RootState) => state.formBuilder);
  const [createForm, { isLoading }] = useCreateFormMutation();
  const [error, setError] = useState("");

  function handleAddQuestion() {
    dispatch(
      addQuestion({
        id: crypto.randomUUID(),
        title: "",
        type: "TEXT",
        options: [],
      }),
    );
  }

  function handleQuestionChange(question: Question) {
    dispatch(updateQuestion(question));
  }

  async function handleSave() {
    const title = form.title.trim();

    if (!title) {
      setError("Title is required");
      return;
    }

    setError("");

    try {
      await createForm({
        title,
        description: form.description.trim() || undefined,
        questions: form.questions.map((question) => ({
          title: question.title.trim(),
          type: question.type,
          options: question.options?.filter(Boolean),
        })),
      }).unwrap();

      dispatch(resetForm());
      navigate("/");
    } catch {
      setError("Failed to create form");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 bg-white shadow-lg rounded-lg mt-8">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block border border-blue-600 hover:border-blue-800 rounded px-4 py-2 transition"
      >
        Back to Forms
      </Link>
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        Create New Form
      </h2>
      <input
        className="border border-blue-300 px-4 py-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={form.title}
        onChange={(event) => dispatch(setTitle(event.target.value))}
        placeholder="Form Title"
      />
      <textarea
        className="border border-blue-300 px-4 py-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={form.description}
        onChange={(event) => dispatch(setDescription(event.target.value))}
        placeholder="Form Description"
      />
      <div className="mb-4">
        {form.questions.map((question) => (
          <QuestionEditor
            key={question.id}
            question={question}
            onChange={handleQuestionChange}
            onRemove={() => dispatch(removeQuestion(question.id))}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddQuestion}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow mb-4 transition"
      >
        Add Question
      </button>
      <div className="flex items-center gap-4 mt-4">
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded shadow transition disabled:opacity-60"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Form"}
        </button>
        {error && <span className="text-red-500 font-medium">{error}</span>}
      </div>
    </div>
  );
}
