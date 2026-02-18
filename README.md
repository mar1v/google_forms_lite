# Google Forms Lite Clone — Monorepo

Test task project — simplified Google Forms clone with form builder, form filling, and responses viewer.

## 🏗 Monorepo Structure

```
apps/
  client/     → React + TypeScript + Redux Toolkit + RTK Query
  server/     → Node.js + Express + Apollo GraphQL
packages/
  shared/     → shared TypeScript types
```

---

## 🚀 Tech Stack

### Client

- React
- TypeScript
- Redux Toolkit
- RTK Query
- React Router
- TailwindCSS

### Server

- Node.js
- Express
- Apollo Server
- GraphQL

### Shared

- Shared domain types (Form, Question, Response)

---

## ⚙️ Installation

Clone repo:

```bash
git clone https://github.com/mar1v/google_forms_lite
cd project
```

Install all dependencies (root + workspaces):

```bash
npm install
```

---

## ▶️ Run Project

### Start server

```bash
cd apps/server
npm run dev
```

Server runs at:

```
http://localhost:4000/graphql
```

GraphQL sandbox available in browser.

---

### Start client

```bash
cd apps/client
npm run dev
```

Client runs at:

```
http://localhost:5173
```

---

## 📌 Features

### Form Builder

- Create form
- Add questions
- Question types:
  - TEXT
  - MULTIPLE_CHOICE
  - CHECKBOX
  - DATE

- Dynamic options editing

### Forms List

- View all forms
- Open form details

### Fill Form

- Submit answers
- Supports all question types

### Responses Viewer

- View submitted responses
- Answers mapped to questions

---

## 🧠 Architecture Notes

- GraphQL API with Queries + Mutations
- In-memory data store (no DB required)
- Shared types imported from `packages/shared`
- RTK Query used for GraphQL requests
- Feature-based Redux slices

---

## 🔌 GraphQL Operations

### Queries

```
forms
form(id)
responses(formId)
```

### Mutations

```
createForm
submitResponse
```

---

## 🗃 Data Storage

Current implementation uses in-memory store:

```
server/store/memoryStore.ts
```

Data resets on server restart.

---

## 🧪 Testing Tips

Use GraphQL sandbox at:

```
http://localhost:4000/graphql
```

Example mutation:

```graphql
mutation {
  createForm(title: "Test", questions: [{ title: "Q1", type: TEXT }]) {
    id
  }
}
```

---

## 📄 License

Test project — educational use.
