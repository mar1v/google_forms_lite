import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "@shared/types";

type QuestionDraft = Question;

type FormBuilderState = {
  title: string;
  description: string;
  questions: QuestionDraft[];
};

const initialState: FormBuilderState = {
  title: "",
  description: "",
  questions: [],
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    addQuestion(state, action: PayloadAction<QuestionDraft>) {
      state.questions.push(action.payload);
    },
    updateQuestion(state, action: PayloadAction<QuestionDraft>) {
      const idx = state.questions.findIndex((q) => q.id === action.payload.id);
      if (idx !== -1) state.questions[idx] = action.payload;
    },
    removeQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },
    resetForm(state) {
      state.title = "";
      state.description = "";
      state.questions = [];
    },
  },
});

export const {
  setTitle,
  setDescription,
  addQuestion,
  updateQuestion,
  removeQuestion,
  resetForm,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
