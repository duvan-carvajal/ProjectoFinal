import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        duoprog: resolve(__dirname, 'duoprog.html'),
        courses: resolve(__dirname, 'courses.html'),
        lesson: resolve(__dirname, 'lesson.html'),
      }
    }
  }
});

