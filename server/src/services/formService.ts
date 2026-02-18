import { Form, Question } from "@shared/types";
import { forms } from "../store/memoryStore";
import { generateId } from "../utils/id";

interface CreateFormInput {
  title: string;
  description?: string;
  questions?: Omit<Question, "id">[];
}

export const formService = {
  getAll() {
    return forms;
  },

  getById(id: string) {
    return forms.find((f) => f.id === id) || null;
  },

  create(input: CreateFormInput): Form {
    const form: Form = {
      id: generateId(),
      title: input.title,
      description: input.description,
      questions: (input.questions || []).map((q) => ({
        ...q,
        id: generateId(),
      })),
    };

    forms.push(form);
    return form;
  },
};
