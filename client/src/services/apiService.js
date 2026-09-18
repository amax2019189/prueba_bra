import axios from 'axios';

const apiClient = axios.create({
  baseURL: `https://sjt-server.vercel.app/api/v1`,
  timeout: 5000,
});

// Interceptor para agregar el token JWT a las requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth services
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || 'Error al iniciar sesión',
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const formData = new FormData();
    
    // Agregar todos los campos del formulario
    Object.keys(userData).forEach(key => {
      if (key === 'profilePicture' && userData[key]) {
        formData.append('profilePicture', userData[key]);
      } else if (key !== 'confirmPassword' && userData[key]) {
        formData.append(key, userData[key]);
      }
    });

    const response = await apiClient.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || 'Error al registrar usuario',
    };
  }
};

export const getPosts = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/posts?page=${page}&limit=${limit}`);
    return response.data.posts || [];
  } catch (error) {
    const message = error.response?.data?.message || 'Error al obtener publicaciones';
    return {
      error: true,
      message,
      posts: [],
    };
  }
};

export const createCommentService = async (postId, content) => {
  try {
    const response = await apiClient.post(`/comments`, { text: content, post: postId });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error al agregar comentario",
    };
  }
};

export const getPostById = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error al obtener publicación",
    };
  }
};

export const createPostService = async (postData) => {
  try {
    const response = await apiClient.post("/posts", postData);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error al crear publicación",
    };
  }
};