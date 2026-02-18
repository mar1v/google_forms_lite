import { Question, QuestionType } from "@shared/types";
import React, { useState } from "react";

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
  const [local, setLocal] = useState(question);

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const type = e.target.value as QuestionType;
    setLocal({
      ...local,
      type,
      options: type === "TEXT" || type === "DATE" ? [] : local.options || [""],
    });
    onChange({
      ...local,
      type,
      options: type === "TEXT" || type === "DATE" ? [] : local.options || [""],
    });
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocal({ ...local, title: e.target.value });
    onChange({ ...local, title: e.target.value });
  }

  function handleOptionChange(idx: number, value: string) {
    const options = [...(local.options || [])];
    options[idx] = value;
    setLocal({ ...local, options });
    onChange({ ...local, options });
  }

  function addOption() {
    const options = [...(local.options || []), ""];
    setLocal({ ...local, options });
    onChange({ ...local, options });
  }

  function removeOption(idx: number) {
    const options = (local.options || []).filter((_, i) => i !== idx);
    setLocal({ ...local, options });
    onChange({ ...local, options });
  }

  return (
    <div className="border p-2 mb-2 rounded">
      <input
        className="border px-2 py-1 mr-2"
        value={local.title}
        onChange={handleTitleChange}
        placeholder="Question title"
      />
      <select
        value={local.type}
        onChange={handleTypeChange}
        className="border px-2 py-1 mr-2"
      >
        {typeOptions.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <button onClick={onRemove} className="btn btn-sm bg-red-500 text-white">
        Remove
      </button>
      {(local.type === "MULTIPLE_CHOICE" || local.type === "CHECKBOX") && (
        <div className="mt-2">
          {(local.options || []).map((opt, idx) => (
            <div key={idx} className="flex items-center mb-1">
              <input
                className="border px-2 py-1 mr-2"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
              />
              <button
                onClick={() => removeOption(idx)}
                className="btn btn-sm bg-red-400 text-white"
              >
                x
              </button>
            </div>
          ))}
          <button
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
