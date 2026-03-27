import type { ChangeEvent } from "react";
import type { Question, QuestionType } from "@shared/types";

interface Props {
  question: Question;
  onChange: (q: Question) => void;
  onRemove: () => void;
}

const typeOptions: QuestionType[] = [
  "TEXT",
  "MULTIPLE_CHOICE",
  "CHECKBOX",
  "DATE",
];

export default function QuestionEditor({
  question,
  onChange,
  onRemove,
}: Props) {
  function handleTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    const type = e.target.value as QuestionType;

    onChange({
      ...question,
      type,
      options:
        type === "TEXT" || type === "DATE"
          ? []
          : question.options?.length
            ? question.options
            : [""],
    });
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange({ ...question, title: e.target.value });
  }

  function handleOptionChange(idx: number, value: string) {
    const options = [...(question.options || [])];
    options[idx] = value;
    onChange({ ...question, options });
  }

  function addOption() {
    onChange({ ...question, options: [...(question.options || []), ""] });
  }

  function removeOption(idx: number) {
    onChange({
      ...question,
      options: (question.options || []).filter((_, i) => i !== idx),
    });
  }

  return (
    <div className="border p-2 mb-2 rounded">
      <input
        className="border px-2 py-1 mr-2"
        value={question.title}
        onChange={handleTitleChange}
        placeholder="Question title"
      />
      <select
        value={question.type}
        onChange={handleTypeChange}
        className="border px-2 py-1 mr-2"
      >
        {typeOptions.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onRemove}
        className="btn btn-sm bg-red-500 text-white"
      >
        Remove
      </button>
      {(question.type === "MULTIPLE_CHOICE" ||
        question.type === "CHECKBOX") && (
        <div className="mt-2">
          {(question.options || []).map((opt, idx) => (
            <div key={idx} className="flex items-center mb-1">
              <input
                className="border px-2 py-1 mr-2"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
              />
              <button
                type="button"
                onClick={() => removeOption(idx)}
                className="btn btn-sm bg-red-400 text-white"
              >
                x
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="btn btn-sm bg-green-500 text-white"
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
}
