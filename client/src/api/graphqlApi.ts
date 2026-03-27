import type { BaseQueryFn, FetchBaseQueryError } from "@reduxjs/toolkit/query";
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
  data?: T;
  errors?: { message: string }[];
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

type GraphqlError = {
  status: "GRAPHQL_ERROR";
  data: string;
};

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

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:4000",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const graphqlBaseQuery: BaseQueryFn<
  { query: string; variables?: unknown },
  unknown,
  FetchBaseQueryError | GraphqlError
> = async ({ query, variables }, api, extraOptions) => {
  const result = await rawBaseQuery(
    {
      url: "/graphql",
      method: "POST",
      body: { query, variables },
    },
    api,
    extraOptions,
  );

  if ("error" in result) {
    return { error: result.error };
  }

  const response = result.data as GqlResponse<unknown>;

  if (response.errors?.length) {
    return {
      error: {
        status: "GRAPHQL_ERROR",
        data: response.errors.map((error) => error.message).join(", "),
      },
    };
  }

  return { data: response.data };
};

export const graphqlApi = createApi({
  reducerPath: "graphqlApi",
  baseQuery: graphqlBaseQuery,
  tagTypes: ["Forms", "Responses"],
  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({ query: gql.forms }),
      transformResponse: (data: FormsData) => data.forms,
      providesTags: ["Forms"],
    }),
    getForm: builder.query<Form | null, string>({
      query: (id) => ({ query: gql.form, variables: { id } }),
      transformResponse: (data: FormData) => data.form,
      providesTags: (_result, _error, id) => [{ type: "Forms", id }],
    }),
    createForm: builder.mutation<Form, CreateFormVariables>({
      query: (variables) => ({ query: gql.createForm, variables }),
      transformResponse: (data: CreateFormData) => data.createForm,
      invalidatesTags: ["Forms"],
    }),
    submitResponse: builder.mutation<ResponseEntity, SubmitResponseVariables>({
      query: (variables) => ({ query: gql.submitResponse, variables }),
      transformResponse: (data: SubmitResponseData) => data.submitResponse,
      invalidatesTags: ["Responses"],
    }),
    getResponses: builder.query<ResponseEntity[], string>({
      query: (formId) => ({ query: gql.responses, variables: { formId } }),
      transformResponse: (data: ResponsesData) => data.responses,
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
