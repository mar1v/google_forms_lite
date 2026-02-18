import type { Question } from "@shared/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  removeQuestion,
  resetForm,
  setDescription,
  setTitle,
  updateQuestion,
} from "../features/formBuilderSlice";
import { RootState } from "../store";

export function useFormBuilder() {
  const form = useSelector((state: RootState) => state.formBuilder);
  const dispatch = useDispatch();

  return {
    form,
    setTitle: (title: string) => dispatch(setTitle(title)),
    setDescription: (desc: string) => dispatch(setDescription(desc)),
    addQuestion: (q: Question) => dispatch(addQuestion(q)),
    updateQuestion: (q: Question) => dispatch(updateQuestion(q)),
    removeQuestion: (id: string) => dispatch(removeQuestion(id)),
    resetForm: () => dispatch(resetForm()),
  };
}
