import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCreateFormMutation } from "../api/graphqlApi";
import QuestionEditor from "../components/QuestionEditor";
import { useFormBuilder } from "../hooks/useFormBuilder";

export default function CreateFormPage() {
  const {
    form,
    setTitle,
    setDescription,
    addQuestion,
    updateQuestion,
    removeQuestion,
    resetForm,
  } = useFormBuilder();
  const [createForm, { isLoading }] = useCreateFormMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleAddQuestion() {
    addQuestion({ id: uuidv4(), title: "", type: "TEXT", options: [] });
  }

  async function handleSave() {
    if (!form.title) {
      setError("Title is required");
      return;
    }
    try {
      await createForm({
        title: form.title,
        description: form.description,
        questions: form.questions.map((q) => ({
          title: q.title,
          type: q.type,
          options: q.options,
        })),
      }).unwrap();
      resetForm();
      navigate("/");
    } catch (e) {
      setError("Failed to create form");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 bg-white shadow-lg rounded-lg mt-8">
      <button
        className="text-blue-600 hover:text-blue-800 font-medium mb-4 block background-transparent border border-blue-600 hover:border-blue-800 rounded px-4 py-2 transition"
        onClick={() => window.history.back()}
      >
        ← Back to Forms
      </button>
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        Create New Form
      </h2>
      <input
        className="border border-blue-300 px-4 py-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={form.title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
      />
      <textarea
        className="border border-blue-300 px-4 py-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={form.description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Form Description"
      />
      <div className="mb-4">
        {form.questions.map((q, idx) => (
          <QuestionEditor
            key={q.id}
            question={q}
            onChange={(updated) => updateQuestion(updated)}
            onRemove={() => removeQuestion(q.id)}
          />
        ))}
      </div>
      <button
        onClick={handleAddQuestion}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow mb-4 transition"
        type="button"
      >
        + Add Question
      </button>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded shadow transition"
          disabled={isLoading}
        >
          Save Form
        </button>
        {error && <span className="text-red-500 font-medium">{error}</span>}
      </div>
    </div>
  );
}
