const localApiUrl = "http://localhost:50000";
const productionApiUrl = "https://library-3zla.onrender.com";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? localApiUrl : productionApiUrl);