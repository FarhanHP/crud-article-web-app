import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import { useState } from "react";
import ArticleProvider from "../providers/ArticleProvider";

const DeleteArticleDialog = ({
    deleteCallback = () => {},
    onClose = () => {},
    articleWebId = "",
    open = false
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteArticle = async () => {
        setIsLoading(true);
        await ArticleProvider.deleteArticle(articleWebId);
        setIsLoading(false);
        deleteCallback();
    }

    return (
        <Dialog open={open} onClose={isLoading ? null : onClose}>
            <DialogTitle>Delete Article</DialogTitle>

            <DialogContent>
                <Typography variant="body2" align="center">
                    Do you want to delete the article ? Deleted article can't be restored.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button disabled={isLoading} onClick={onClose}>Cancel</Button>

                <Button onClick={handleDeleteArticle} disabled={isLoading} color="error" variant="contained">{isLoading ? "Deleting..." : "Delete"}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteArticleDialog;
