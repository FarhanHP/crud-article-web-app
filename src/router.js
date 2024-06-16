import { createBrowserRouter } from "react-router-dom"; 
import TimeLinePage from "./pages/TimeLinePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TimeLinePage />
    }, {
        path:"/article/:articleWebId",
        element: <ArticleDetailPage />
    }
]);

export default router;
