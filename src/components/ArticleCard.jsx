import { MoreHoriz } from "@mui/icons-material";
import { Card, Typography, Box, Skeleton, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ArticleHelper from "../helpers/ArticleHelper";
import { grey} from "@mui/material/colors";
import dayjs from "dayjs";

const ArticleCard = ({
    isLoading = false, 
    article = {}, 
    editButtonCallback=(article) => {}, 
    deleteButtonCallback=(article) => {}}) => {

    const displayTime = isLoading ? null : dayjs(article.createdAt * 1000).fromNow();
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleCopyLinkClick = () => {
        navigator.clipboard.writeText(ArticleHelper.createArticleLink(article.articleWebId));
        setMenuAnchor(null);
    };

    const handleEditClick = () => {
        setMenuAnchor(null);
        editButtonCallback(article);
    };

    const handleDeleteClick = () => {
        setMenuAnchor(null);
        deleteButtonCallback(article);
    };

    const title = (
        <Box display="flex">
            <Typography variant="h2" component="h2" fontSize="1.2rem" fontWeight={700} flex={1} margin="auto 0">
                {article.title}
            </Typography>

            <Box>
                <IconButton size="small" onClick={(event) => setMenuAnchor(event.currentTarget)}>
                    <MoreHoriz />
                </IconButton>

                <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={()=>setMenuAnchor(null)}>
                    <MenuItem onClick={handleCopyLinkClick}>
                        Copy Link
                    </MenuItem>
                    {article.edited && (
                        <MenuItem>
                            Show Edit History
                        </MenuItem>
                    )}
                    <MenuItem onClick={handleEditClick}>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleDeleteClick}>
                        Delete
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );

    const loadingTitle = (
        <Skeleton variant="text" fontSize="1.2rem" width="75%" />
    );

    const body = (
        <Typography variant="body2" align="justify" style={{ wordWrap: "break-word" }}>
            {article.body}
        </Typography>
    );

    const loadingBody = (
        <>
            <Skeleton variant="text" fontSize="1.2rem" width="100%" />

            <Skeleton variant="text" fontSize="1.2rem" width="100%" />

            <Skeleton variant="text" fontSize="1.2rem" width="100%" />

            <Skeleton variant="text" fontSize="1.2rem" width="75%" />
        </>
    );

    return (
        <Box margin="0.5rem">
            <Card variant="outlined">
                <Box margin="0.5rem">
                    {isLoading ? loadingTitle : title}

                    {!isLoading && (
                        <Typography variant="body2" color={grey[500]}>
                            {displayTime} {article.edited ? "(Edited)" : ""}
                        </Typography>
                    )}

                    <Box marginTop="0.5rem" />

                    {isLoading ? loadingBody : body}
                </Box>
            </Card>
        </Box>
    );
};

export default ArticleCard;
