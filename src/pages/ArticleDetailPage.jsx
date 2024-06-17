import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { useEffect, useState } from "react";
import ArticleProvider from "../providers/ArticleProvider";
import { Box, Typography } from "@mui/material";
import DeleteArticleDialog from "../components/DeleteArticleDialog";
import ArticleDialog from "../components/ArticleDialog";
import { BASE_URL } from "../constants";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import EditArticleHistoriesDialog from "../components/EditArticleHistoriesDialog";

const ArticleDetailPage = () => {
    const {articleWebId} = useParams();

    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));

    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState({});
    const [isNotFound, setIsNotFound] = useState(false);
    const [deleteArticleId, setDeleteArticleId] = useState(null);
    const [editArticleObj, setEditArticleObj] = useState(null);
    const [editHistoriesArticleId, setEditHistoriesArticleId] = useState(null);

    const closeEditArticleDialog = () => setEditArticleObj(null);
    const openEditArticleDialog = (article) => setEditArticleObj(article);
    const closeDeleteArticleDialog = () => setDeleteArticleId(null);
    const openDeleteArticleDialog = (article) => setDeleteArticleId(article.articleWebId);
    const closeEditHistoriesDialog = () => setEditHistoriesArticleId(null);
    const openEditHistoriesDialog = (articleId) => setEditHistoriesArticleId(articleId);

    const fetchArticle = async () => {
        setIsLoading(true);
        try {
            const articleResponse = await ArticleProvider.getArticle(articleWebId);
            setArticle(articleResponse.data);
        } catch {
            setIsNotFound(true);
        }
        setIsLoading(false);
    }

    const deleteArticleCallback = async () => {
        setDeleteArticleId(null);
        window.location.href = BASE_URL;
    };


    const editArticle = async (title, body) => {
        await ArticleProvider.editArticle(editArticleObj.articleWebId, title, body);
        article.edited = true;
        article.title = title;
        article.body = body;
        setArticle(article);
        setEditArticleObj(null);
    }

    useEffect(() => {
        fetchArticle();
    }, [])

    return isNotFound ? <Typography variant="h4" component="h1" align="center">Article Not Found</Typography> :
        <>
            <Box padding={isMedium ? "0 25%" : "0"}>
                <ArticleCard isLoading={isLoading} article={article} deleteButtonCallback={openDeleteArticleDialog} 
                    editButtonCallback={openEditArticleDialog} openHistoriesButtonCallback={openEditHistoriesDialog} />
            </Box>

            <ArticleDialog isEdit={true} key={editArticleObj} title="Edit Article" open={!!editArticleObj} 
                onClose={closeEditArticleDialog} onSubmit={editArticle} defaultTitleField={editArticleObj ? editArticleObj.title : ""} 
                defaultBodyField={editArticleObj ? editArticleObj.body : ""}/>

            <EditArticleHistoriesDialog key={editHistoriesArticleId} open={!!editHistoriesArticleId} 
                onClose={closeEditHistoriesDialog} articleWebId={editHistoriesArticleId} />

            <DeleteArticleDialog open={!!deleteArticleId} deleteCallback={deleteArticleCallback} 
                onClose={closeDeleteArticleDialog} articleWebId={deleteArticleId} />
        </>;
}

export default ArticleDetailPage;
