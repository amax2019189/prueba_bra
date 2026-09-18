import React from "react";
// Feedback handled in parent components (PostList)

export const PostCard = ({ title, content, onReadMore }) => (
  <div className="mt-6 w-96 bg-white rounded-lg shadow p-6 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
      <p className="text-gray-700 text-sm">{content}</p>
    </div>
    <div className="pt-4 flex justify-end">
      <button
        onClick={onReadMore}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700 cursor-pointer transition-colors text-sm font-medium"
      >
        Leer más
      </button>
    </div>
  </div>
);
