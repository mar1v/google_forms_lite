import { Answer, Question } from "@shared/types";

export interface Response {
  id: string;
  answers: Answer[];
}

interface Props {
  responses: Response[];
  questions: Question[];
}

export default function ResponseList({ responses, questions }: Props) {
  return (
    <div>
      {responses.map((resp, idx) => (
        <div key={resp.id} className="border p-2 mb-2 rounded">
          <div className="font-bold mb-1">Response #{idx + 1}</div>
          {resp.answers.map((ans) => {
            const q = questions.find((q) => q.id === ans.questionId);
            return (
              <div key={ans.questionId} className="mb-1">
                <span className="font-semibold">{q?.title}:</span>{" "}
                {ans.value.join(", ")}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
