import { Question } from "@shared/types";

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
          {(question.options || []).map((opt, idx) => (
            <label key={idx} className="block">
              <input
                type="radio"
                name={question.id}
                checked={value?.[0] === opt}
                onChange={() => onChange([opt])}
              />
              {opt}
            </label>
          ))}
        </div>
      );
    case "CHECKBOX":
      return (
        <div>
          {(question.options || []).map((opt, idx) => (
            <label key={idx} className="block">
              <input
                type="checkbox"
                checked={value?.includes(opt)}
                onChange={(e) => {
                  if (e.target.checked) onChange([...(value || []), opt]);
                  else onChange((value || []).filter((v) => v !== opt));
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      );
    default:
      return null;
  }
}
