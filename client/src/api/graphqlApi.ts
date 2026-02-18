import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Answer, Form, QuestionType, ResponseEntity } from "@shared/types";

export interface QuestionInput {
  title: string;
  type: QuestionType;
  options?: string[];
}

export interface CreateFormVariables {
  title: string;
  description?: string;
  questions: QuestionInput[];
}

export interface SubmitResponseVariables {
  formId: string;
  answers: Answer[];
}

interface GqlResponse<T> {
  data: T;
}

interface FormsData {
  forms: Form[];
}
interface FormData {
  form: Form | null;
}
interface CreateFormData {
  createForm: Form;
}
interface SubmitResponseData {
  submitResponse: ResponseEntity;
}
interface ResponsesData {
  responses: ResponseEntity[];
}

const gql = {
  forms: `
    query {
      forms {
        id
        title
        description
        questions { id title type options }
      }
    }
  `,
  form: `
    query($id: ID!) {
      form(id: $id) {
        id
        title
        description
        questions { id title type options }
      }
    }
  `,
  createForm: `
    mutation($title: String!, $description: String, $questions: [QuestionInput!]) {
      createForm(title: $title, description: $description, questions: $questions) {
        id
        title
        description
        questions { id title type options }
      }
    }
  `,
  submitResponse: `
    mutation($formId: ID!, $answers: [AnswerInput!]!) {
      submitResponse(formId: $formId, answers: $answers) {
        id
        formId
        answers { questionId value }
      }
    }
  `,
  responses: `
    query($formId: ID!) {
      responses(formId: $formId) {
        id
        formId
        answers { questionId value }
      }
    }
  `,
} as const;

export const graphqlApi = createApi({
  reducerPath: "graphqlApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Forms", "Responses"],

  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: { query: gql.forms },
      }),
      transformResponse: (r: GqlResponse<FormsData>) => r.data.forms,
      providesTags: ["Forms"],
    }),

    getForm: builder.query<Form | null, string>({
      query: (id) => ({
        url: "/graphql",
        method: "POST",
        body: { query: gql.form, variables: { id } },
      }),
      transformResponse: (r: GqlResponse<FormData>) => r.data.form,
      providesTags: (_result, _error, id) => [{ type: "Forms", id }],
    }),

    createForm: builder.mutation<Form, CreateFormVariables>({
      query: (variables) => ({
        url: "/graphql",
        method: "POST",
        body: { query: gql.createForm, variables },
      }),
      transformResponse: (r: GqlResponse<CreateFormData>) => r.data.createForm,
      invalidatesTags: ["Forms"],
    }),

    submitResponse: builder.mutation<ResponseEntity, SubmitResponseVariables>({
      query: (variables) => ({
        url: "/graphql",
        method: "POST",
        body: { query: gql.submitResponse, variables },
      }),
      transformResponse: (r: GqlResponse<SubmitResponseData>) =>
        r.data.submitResponse,
      invalidatesTags: ["Responses"],
    }),

    getResponses: builder.query<ResponseEntity[], string>({
      query: (formId) => ({
        url: "/graphql",
        method: "POST",
        body: { query: gql.responses, variables: { formId } },
      }),
      transformResponse: (r: GqlResponse<ResponsesData>) => r.data.responses,
      providesTags: ["Responses"],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
  useGetResponsesQuery,
} = graphqlApi;
