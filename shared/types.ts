export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string[];
}

export interface ResponseEntity {
  id: string;
  formId: string;
  answers: Answer[];
}
