import Router from "./router";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 font-sans">
      <div className="min-h-screen flex flex-col">
        <Router />
      </div>
    </div>
  );
}
