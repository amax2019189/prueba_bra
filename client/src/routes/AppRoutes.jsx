import React from "react";
import { Routes, Route } from "react-router-dom";
import { Welcome } from "../components/ui/Welcome";
import { PostList } from "../components/posts/PostList";
import { PostForm } from "../components/posts/PostForm";
import { PostDetail } from "../components/posts/PostDetail";
// Agrega aquí más imports de páginas o componentes según sea necesario

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/publicaciones" element={<PostList />} />
    <Route path="/publicaciones/crear" element={<PostForm />} />
    <Route path="/posts/:id" element={<PostDetail />} />
  </Routes>
);
