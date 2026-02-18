import type { Answer, Form, Question, ResponseEntity } from "@shared/types";
import { formService } from "../services/formService";
import { responseService } from "../services/responseService";

interface FormArgs {
  id: string;
}

interface ResponsesArgs {
  formId: string;
}

interface CreateFormArgs {
  title: string;
  description?: string;
  questions: Omit<Question, "id">[];
}

interface SubmitResponseArgs {
  formId: string;
  answers: Answer[];
}

type ParentType = null;

export const resolvers = {
  Query: {
    forms: (_parent: ParentType): Form[] => formService.getAll(),

    form: (_parent: ParentType, args: FormArgs): Form | null =>
      formService.getById(args.id),

    responses: (_parent: ParentType, args: ResponsesArgs): ResponseEntity[] =>
      responseService.getByFormId(args.formId),
  },

  Mutation: {
    createForm: (_parent: ParentType, args: CreateFormArgs): Form =>
      formService.create(args),

    submitResponse: (
      _parent: ParentType,
      args: SubmitResponseArgs,
    ): ResponseEntity => responseService.submit(args),
  },
};
