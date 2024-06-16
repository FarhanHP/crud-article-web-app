import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MAX_TITLE_LENGTH = 20;
const MAX_BODY_LENGTH = 500;

const ArticleDialog = ({
    open = false,
    onClose = () => {},
    onSubmit = async (title, subtitle) => {},
    title = "",
    defaultTitleField = "",
    defaultBodyField = "",
    isEdit = false
}) => {

    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));

    const [titleValue, setTitleValue] = useState(defaultTitleField);
    const [bodyValue, setBodyValue] = useState(defaultBodyField);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitDisable, setIsSubmitDisable] = useState(true);

    const onTitleChange = (event) => {
        const newValue = event.target.value;

        verifyValue();

        if(newValue.trim().length <= 0) {
            setTitleValue("");
            setIsSubmitDisable(true);
            return;
        }

        setTitleValue(newValue.replace(/\n/g, "").slice(0, MAX_TITLE_LENGTH))
    };

    const onBodyChange = (event) => {
        const newValue = event.target.value;

        verifyValue();

        if(newValue.trim().length <= 0) {
            setBodyValue("");
            setIsSubmitDisable(true);
            return;
        }

        setBodyValue(newValue.replace(/\n/g, "").slice(0, MAX_BODY_LENGTH))
    };

    const verifyValue = () => {
        setIsSubmitDisable((titleValue === defaultTitleField && bodyValue === defaultBodyField) || 
            bodyValue.trim().length <= 0 || titleValue.trim().length <= 0);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        await onSubmit(titleValue, bodyValue);
        setIsLoading(false);
    }

    return (
        <Dialog open={open} onClose={isLoading ? null : onClose} fullScreen={!isMedium} fullWidth>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <Box margin="1rem 0">
                    <TextField label={`Title (${titleValue.length}/${MAX_TITLE_LENGTH})`} 
                        required fullWidth value={titleValue} onChange={onTitleChange} />
                </Box>

                <Box margin="1rem 0">
                    <TextField minRows={4} multiline label={`Body (${bodyValue.length}/${MAX_BODY_LENGTH})`} 
                        required fullWidth value={bodyValue} onChange={onBodyChange} />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button disabled={isLoading} onClick={onClose}>Cancel</Button>

                <Button disabled={isLoading || isSubmitDisable} variant="contained" onClick={handleSubmit}>
                    {isLoading ? isEdit ? "Editting..." : "Creating..." : isEdit ? "Edit" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ArticleDialog;
