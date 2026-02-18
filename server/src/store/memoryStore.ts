import { Form, ResponseEntity } from "@shared/types";

export const forms: Form[] = [
  {
    id: "form_1",
    title: "Frontend Survey",
    description: "Simple trainee test form",
    questions: [
      {
        id: "q1",
        title: "Your name",
        type: "TEXT",
      },
      {
        id: "q2",
        title: "Favorite framework",
        type: "MULTIPLE_CHOICE",
        options: ["React", "Vue", "Angular"],
      },
      {
        id: "q3",
        title: "Used TypeScript?",
        type: "CHECKBOX",
        options: ["Yes", "No"],
      },
      {
        id: "q4",
        title: "Start date",
        type: "DATE",
      },
    ],
  },
];

export const responses: ResponseEntity[] = [];
