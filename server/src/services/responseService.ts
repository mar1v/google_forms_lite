import { Answer, ResponseEntity } from "@shared/types";
import { responses } from "../store/memoryStore";
import { generateId } from "../utils/id";
import { formService } from "./formService";

interface SubmitResponseInput {
  formId: string;
  answers: Answer[];
}

export const responseService = {
  getByFormId(formId: string) {
    return responses.filter((r) => r.formId === formId);
  },

  submit(input: SubmitResponseInput): ResponseEntity {
    const form = formService.getById(input.formId);

    if (!form) {
      throw new Error("Form not found");
    }

    const response: ResponseEntity = {
      id: generateId(),
      formId: input.formId,
      answers: input.answers,
    };

    responses.push(response);
    return response;
  },
};
