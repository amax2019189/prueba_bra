import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createCommentService } from "../../services/apiService";
import { CommentModal } from "./CommentModal";
import { usePostDetail } from "../../hooks/usePostDetail";
import { toast } from "react-hot-toast";

export const PostDetail = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const { post, loading, error, fetchPost } = usePostDetail(id);

  const handleAddComment = async (content) => {
    setCommentLoading(true);
    const result = await createCommentService(id, content);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success("Comentario agregado");
      fetchPost();
      setModalOpen(false);
    }
    setCommentLoading(false);
  };

  if (loading) return <div className="text-center py-10">Cargando publicación...</div>;
  if (error) {
    toast.error(error);
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }
  if (!post) return <div className="text-center py-10">No se encontró la publicación.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <div className="text-sm text-gray-500 mb-2">Autor: {post.author?.username || post.author?.name}</div>
      <div className="text-xs text-gray-400 mb-6">Publicado: {new Date(post.createdAt).toLocaleString()}</div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-900">Comentarios</h3>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
        >
          Agregar comentario
        </button>
      </div>

      <div className="space-y-4">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 rounded p-3">
              <div className="text-gray-800 text-sm mb-1">{comment.text}</div>
              <div className="text-xs text-gray-500">Por: {comment.author?.username || comment.author?.name} | {new Date(comment.createdAt).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-400">No hay comentarios aún.</div>
        )}
      </div>

      <CommentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddComment}
        loading={commentLoading}
      />
    </div>
  );
}
