import type { Question, ResponseEntity } from "@shared/types";

interface Props {
  responses: ResponseEntity[];
  questions: Question[];
}

export default function ResponseList({ responses, questions }: Props) {
  const questionTitles = new Map(
    questions.map((question) => [question.id, question.title]),
  );

  return (
    <div>
      {responses.map((resp, idx) => (
        <div key={resp.id} className="border p-2 mb-2 rounded">
          <div className="font-bold mb-1">Response #{idx + 1}</div>
          {resp.answers.map((ans) => {
            return (
              <div key={ans.questionId} className="mb-1">
                <span className="font-semibold">
                  {questionTitles.get(ans.questionId) ?? "Unknown question"}:
                </span>{" "}
                {ans.value.join(", ") || "-"}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
