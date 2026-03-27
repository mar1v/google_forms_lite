import type { Form } from "@shared/types";
import { Link } from "react-router-dom";
import { useGetFormsQuery } from "../api/graphqlApi";

export default function HomePage() {
  const { data: forms, isLoading, error } = useGetFormsQuery();

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 drop-shadow">
        Google Forms Lite
      </h1>
      <Link
        to="/forms/new"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow mb-8 block w-fit mx-auto transition"
      >
        Create New Form
      </Link>
      {isLoading && (
        <div className="text-center text-blue-600 text-lg animate-pulse mb-6">
          Loading...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 text-lg mb-6">
          Error loading forms
        </div>
      )}
      {!isLoading && !error && !forms?.length && (
        <div className="text-center text-gray-500 text-lg mb-6">
          No forms yet. Create your first one.
        </div>
      )}
      <ul className="space-y-6">
        {forms?.map((form: Form) => (
          <li
            key={form.id}
            className="bg-white p-6 rounded-xl shadow border border-gray-200"
          >
            <div className="font-bold text-lg text-gray-800 mb-1">
              {form.title}
            </div>
            <div className="text-gray-500 mb-2">{form.description}</div>
            <div className="mt-2 flex gap-3">
              <Link
                to={`/forms/${form.id}/fill`}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-4 py-1 rounded transition"
              >
                View Form
              </Link>
              <Link
                to={`/forms/${form.id}/responses`}
                className="bg-green-100 hover:bg-green-200 text-green-700 font-medium px-4 py-1 rounded transition"
              >
                View Responses
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
