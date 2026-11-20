import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import BookDetailPage from "./pages/BookDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/despre" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
