import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Đây là alias giúp bạn sử dụng @ thay vì viết đường dẫn tuyệt đối từ /src
    },
  },
});
