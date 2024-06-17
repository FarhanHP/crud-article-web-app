import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import EditHistorySection from "./EditHistorySection";
import EditArticleHistoryHelper from "../helpers/EditArticleHistoryHelper";
import ArticleProvider from "../providers/ArticleProvider";
import { Close } from "@mui/icons-material";

const EDIT_HISTORIES_PER_PAGE_COUNT = 3;
const LOADING_HISTORIES_COUNT = 3;

const EditArticleHistoriesDialog = ({
    open = false,
    articleWebId = "",
    onClose = () => {}
}) => {

    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));

    const [hasNextPage, setHasNextPage] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [editHistories, setEditHistories] = useState([]);

    const fetchAndAppendHistories = async (existingHistories) => {
        setIsFetching(true);
        const loadingHistoryObjects = EditArticleHistoryHelper.createLoadingArticleHistoriesObj(LOADING_HISTORIES_COUNT);
        const concatedHistories = existingHistories.concat(loadingHistoryObjects)
        setEditHistories(concatedHistories);
        const editHistoriesResponse = await ArticleProvider.getEditHistories(articleWebId, pageNumber, EDIT_HISTORIES_PER_PAGE_COUNT);
        const newArticles = concatedHistories.filter(history => !history.isLoading)
            .concat(EditArticleHistoryHelper.toEditHistoryUIObjects(editHistoriesResponse.data));
        setEditHistories(newArticles);
        setHasNextPage(editHistoriesResponse.pagination.hasNextPage);
        setIsFetching(false);
        setPageNumber(pageNumber + 1);
    }

    const fetchMoreHistories = async () => {
        fetchAndAppendHistories(editHistories);
    }

    useEffect(() => {
        if(!articleWebId) {
            return;
        }
        
        fetchAndAppendHistories([]);
    }, [])

    return (
        <Dialog open={open} fullWidth fullScreen={!isMedium} onClose={onClose}>
            <DialogTitle>
                <Box display="flex">
                    <Typography variant="header" flex="1" margin="auto 0">Edit Histories</Typography>
                    <IconButton size="small" onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                {editHistories.map(editHistory => (
                    <EditHistorySection key={editHistory.key} isLoading={editHistory.isLoading} 
                        editHistoryObj={{createdAt: editHistory.createdAt, title: editHistory.title, body: editHistory.body}} />
                ))}

                {hasNextPage ? <Button onClick={fetchMoreHistories} disabled={isFetching} fullWidth>
                    {isFetching ? "Loading..." : "Load More"}
                </Button> : null}
            </DialogContent>
        </Dialog>
    );
};

export default EditArticleHistoriesDialog;
