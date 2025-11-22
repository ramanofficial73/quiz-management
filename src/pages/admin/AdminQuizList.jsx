import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminQuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/api/admin/quizzes");
        setQuizzes(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load quizzes. Please try again later.");
        setQuizzes([]); // Optional: clear quizzes
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/admin")} // Go back to previous page
          className="mb-6 text-blue-500 hover:underline"
        >
          &larr; Back
        </button>

        <h1 className="text-4xl font-bold mb-8 text-gray-800">All Quizzes</h1>

        {/* Loading */}
        {loading && <p className="text-gray-700">Loading quizzes...</p>}

        {/* Error */}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Empty list */}
        {!loading && quizzes.length === 0 && !error && (
          <div className="text-gray-600">No quizzes available.</div>
        )}

        {/* Quiz list */}
        <div className="grid gap-6">
          {!loading &&
            quizzes.length > 0 &&
            quizzes.map((q) => (
              <div
                key={q.id}
                className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition border border-gray-200"
              >
                <h2 className="font-semibold text-2xl text-gray-900">
                  {q.title}
                </h2>
                <p className="text-gray-600 mt-2 mb-6">{q.description}</p>

                <div className="flex gap-4">
                  <Link to={`/admin/quizzes/${q.id}/view-questions`}>
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all">
                      View Questions
                    </button>
                  </Link>

                  <Link to={`/admin/quizzes/${q.id}/questions`}>
                    <button className="px-5 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-all">
                      Add Questions
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
