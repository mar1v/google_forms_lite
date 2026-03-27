import type { Question } from "@shared/types";

interface Props {
  question: Question;
  value: string[] | undefined;
  onChange: (val: string[]) => void;
}

export default function QuestionRenderer({ question, value, onChange }: Props) {
  switch (question.type) {
    case "TEXT":
      return (
        <input
          className="border px-2 py-1 w-full"
          value={value?.[0] || ""}
          onChange={(e) => onChange([e.target.value])}
          placeholder={question.title}
        />
      );
    case "DATE":
      return (
        <input
          type="date"
          className="border px-2 py-1 w-full"
          value={value?.[0] || ""}
          onChange={(e) => onChange([e.target.value])}
        />
      );
    case "MULTIPLE_CHOICE":
      return (
        <div>
          {(question.options || []).map((option, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name={question.id}
                checked={value?.[0] === option}
                onChange={() => onChange([option])}
              />
              {option}
            </label>
          ))}
        </div>
      );
    case "CHECKBOX":
      return (
        <div>
          {(question.options || []).map((option, index) => (
            <label key={index} className="block">
              <input
                type="checkbox"
                checked={value?.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...(value || []), option]);
                    return;
                  }

                  onChange((value || []).filter((current) => current !== option));
                }}
              />
              {option}
            </label>
          ))}
        </div>
      );
    default:
      return null;
  }
}
