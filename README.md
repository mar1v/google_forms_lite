# Google Forms Lite Clone

Google Forms Lite is a simplified clone of Google Forms built as a monorepo.  
The project includes a React client for form creation and submission, a GraphQL server for data handling, and shared TypeScript types used across both applications.

## Project Structure

```text
client/   React + TypeScript + Redux Toolkit + RTK Query + Vite
server/   Node.js + Express + Apollo Server + GraphQL
shared/   Shared TypeScript domain types
```

## Tech Stack

### Client

- React
- TypeScript
- Redux Toolkit
- RTK Query
- React Router
- Tailwind CSS
- Vite

### Server

- Node.js
- Express
- Apollo Server
- GraphQL

### Shared

- Shared TypeScript types for forms, questions, and responses

## Features

### Form Builder

- Create a new form with title and description
- Add questions dynamically
- Supported question types:
  - `TEXT`
  - `MULTIPLE_CHOICE`
  - `CHECKBOX`
  - `DATE`
- Add and remove options for multiple choice and checkbox questions

### Forms List

- View all created forms on the home page
- Open a form for filling
- Open submitted responses for a form

### Form Submission

- Fill a form based on its question types
- Submit answers through GraphQL mutations
- Display basic success and error feedback

### Responses Viewer

- View all responses for a selected form
- Display answers matched to their corresponding questions

## Application Routes

### Client Routes

- `/` - list of all forms
- `/forms/new` - form builder page
- `/forms/:id/fill` - form filling page
- `/forms/:id/responses` - responses page

### GraphQL Endpoint

- `http://localhost:4000/graphql`

## GraphQL Operations

### Queries

```graphql
forms
form(id: ID!)
responses(formId: ID!)
```

### Mutations

```graphql
createForm(title: String!, description: String, questions: [QuestionInput!])
submitResponse(formId: ID!, answers: [AnswerInput!]!)
```

## Requirements

- Node.js 20+
- npm 10+

## Installation

Install dependencies from the root and both subprojects:

```bash
npm install
npm --prefix client install
npm --prefix server install
```

## Running the Project

### Run Both Client and Server

From the root of the repository:

```bash
npm run dev
```

### Run Separately

Client:

```bash
npm run dev:client
```

Server:

```bash
npm run dev:server
```

## Local URLs

Client:

```text
http://localhost:5173
```

Server:

```text
http://localhost:4000/graphql
```

## Available Scripts

Root scripts:

```bash
npm run dev
npm run dev:client
npm run dev:server
npm run build
npm run lint
npm run typecheck:server
```

## Data Storage

The server uses an in-memory store for forms and responses.  
Data is available while the server is running and resets after restart.

## Notes

- RTK Query is used for GraphQL requests and caching on the client
- Shared domain types are stored in `shared/types.ts`
- No authentication or database is used in this project
