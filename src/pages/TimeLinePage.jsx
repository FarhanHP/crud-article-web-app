import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import ArticleCard from "../components/ArticleCard";
import ArticleDialog from "../components/ArticleDialog";
import { useEffect, useState } from "react";
import ArticleHelper from "../helpers/ArticleHelper";
import ArticleProvider from "../providers/ArticleProvider";
import DeleteArticleDialog from "../components/DeleteArticleDialog";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ScreenHelper from "../helpers/ScreenHelper";
import EditArticleHistoriesDialog from "../components/EditArticleHistoriesDialog";


const ARTICLE_PER_PAGE_COUNT = 10;
const LOADING_ARTICLE_COUNT = 3;

const fabStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    margin: "1em"
}

const TimeLinePage = (props) => {

    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));

    const [hasNextPage, setHasNextPage] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [articles, setArticles] = useState([]);
    const [isOpenCreateArticleDialog, setIsOpenCreateArticleDialog] = useState(false);
    const [deleteArticleId, setDeleteArticleId] = useState(null);
    const [editArticleObj, setEditArticleObj] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [editHistoriesArticleId, setEditHistoriesArticleId] = useState(null);

    const openCreateArticleDialog = () => setIsOpenCreateArticleDialog(true);
    const closeCreateArticleDialog = () => setIsOpenCreateArticleDialog(false);
    const closeEditArticleDialog = () => setEditArticleObj(null);
    const openEditArticleDialog = (article) => setEditArticleObj(article);
    const closeEditHistoriesDialog = () => setEditHistoriesArticleId(null);
    const openEditHistoriesDialog = (articleId) => setEditHistoriesArticleId(articleId);
    const closeDeleteArticleDialog = () => setDeleteArticleId(null);
    const openDeleteArticleDialog = (article) => setDeleteArticleId(article.articleWebId);

    const fetchAndAppendArticles = async (existingArticles) => {
        setIsFetching(true);
        const loadingArticleObjects = ArticleHelper.createLoadingArticleObjects(LOADING_ARTICLE_COUNT);
        const concatedArticles = existingArticles.concat(loadingArticleObjects)
        setArticles(concatedArticles);
        const articlesResponse = await ArticleProvider.getArticles(pageNumber, ARTICLE_PER_PAGE_COUNT);
        const newArticles = concatedArticles.filter(article => !article.isLoading)
            .concat(ArticleHelper.toArticleUIObjects(articlesResponse.data));
        setArticles(newArticles);
        setHasNextPage(articlesResponse.pagination.hasNextPage);
        setIsFetching(false);
        setPageNumber(pageNumber + 1);
    }

    const fetchInitialArticles = async () => {
        setHasNextPage(true);
        setPageNumber(0)
        await fetchAndAppendArticles([]);
    };

    const deleteArticleCallback = async () => {
        await fetchInitialArticles();
        setDeleteArticleId(null);
    };

    const createArticle = async (title, body) => {
        const response = await ArticleProvider.createArticle(title, body);
        window.location.href = ArticleHelper.createArticleLink(response.data.articleWebId);
    }

    const editArticle = async (title, body) => {
        await ArticleProvider.editArticle(editArticleObj.articleWebId, title, body);
        window.location.href = ArticleHelper.createArticleLink(editArticleObj.articleWebId);
    }
    
    const onScrollToBottom = async () => {
        if(!ScreenHelper.isInBottom() || isFetching || !hasNextPage) {
            return;
        }

        fetchAndAppendArticles(articles);
    };

    useEffect(() => {
        fetchInitialArticles();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", onScrollToBottom);

        return () => { window.removeEventListener("scroll", onScrollToBottom) };
    }, [pageNumber])

    return (
        <Box flex="1">
            <Box padding={isMedium ? "0 25%" : "0"}>
                {articles.map(articleUIObject => 
                    <ArticleCard key={articleUIObject.key} isLoading={articleUIObject.isLoading} 
                        article={articleUIObject.article} deleteButtonCallback={openDeleteArticleDialog} 
                        editButtonCallback={openEditArticleDialog} openHistoriesButtonCallback={openEditHistoriesDialog} />
                )}
            </Box>

            <Fab size="small" color="primary" onClick={openCreateArticleDialog} style={fabStyle}>
                <Add />
            </Fab>

            <ArticleDialog title="Create New Article" open={isOpenCreateArticleDialog} onClose={closeCreateArticleDialog} onSubmit={createArticle}/>

            <ArticleDialog key={editArticleObj} isEdit={true} title="Edit Article" open={!!editArticleObj} onClose={closeEditArticleDialog} onSubmit={editArticle} 
                defaultTitleField={editArticleObj ? editArticleObj.title : ""} defaultBodyField={editArticleObj ? editArticleObj.body : ""}/>

            <EditArticleHistoriesDialog key={editHistoriesArticleId} open={!!editHistoriesArticleId} 
                onClose={closeEditHistoriesDialog} articleWebId={editHistoriesArticleId} />

            <DeleteArticleDialog open={!!deleteArticleId} deleteCallback={deleteArticleCallback} 
                onClose={closeDeleteArticleDialog} articleWebId={deleteArticleId} />
        </Box>
    );
}

export default TimeLinePage;