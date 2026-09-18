import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/useCreatePost";
import { toast } from "react-hot-toast";

export const PostForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createPost, loading } = useCreatePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createPost({ title, content });
    if (result?.error) {
      toast.error(result.message || "Error al crear publicación");
    } else {
      toast.success("¡Publicación creada exitosamente!");
      navigate("/publicaciones");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Crear Publicación</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Contenido</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={6}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors"
        disabled={loading}
      >
        {loading ? "Publicando..." : "Publicar"}
      </button>
    </form>
  );
}
