import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/Book-My-Mark/",
	server: {
		open: true,
		port: 3000,
	},
});
