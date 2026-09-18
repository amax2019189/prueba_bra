
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "./PostCard";
import { usePosts } from "../../hooks/usePosts";

export const PostList = () => {
  const [page, setPage] = useState(1);
  const limit = 8;
  const { posts, loading } = usePosts(page, limit);
  const navigate = useNavigate();

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  if (loading) return <div className="text-center py-10">Cargando publicaciones...</div>;
  if (!posts.length) return <div className="text-center py-10">No hay publicaciones disponibles.</div>;

  return (
    <div className="flex flex-col items-center py-10">
      <div className="flex flex-wrap gap-6 justify-center">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            title={post.title}
            content={post.content?.slice(0, 120) + (post.content?.length > 120 ? "..." : "")}
            onReadMore={() => navigate(`/posts/${post._id}`)}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-500"
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-blue-900 font-semibold">Página {page}</span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
