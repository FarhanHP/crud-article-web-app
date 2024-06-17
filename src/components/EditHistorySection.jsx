import { Box, Card, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import LoadingTitle from "./LoadingTitle";
import LoadingBody from "./LoadingBody";

const EditHistorySection = ({
    isLoading = false,
    editHistoryObj = {
        createdAt: 0,
        title: "",
        body: ""
    }
}) => {

    const displayTime = dayjs(editHistoryObj.createdAt * 1000).fromNow();

    const title = (
        <Typography variant="h2" component="h2" fontSize="1.2rem" 
            fontWeight={700} flex={1} margin="auto 0">
            {editHistoryObj.title}
        </Typography>
    );

    const body = (
        <Typography variant="body2" align="justify" style={{ wordWrap: "break-word" }}>
            {editHistoryObj.body}
        </Typography>
    );

    return (
        <Box margin="0.5rem 0">
            <Typography variant="body2" color={grey[500]}>
                {displayTime}
            </Typography>

            <Card variant="outlined">
                <Box margin="0.5rem">
                    {isLoading ? <LoadingTitle/> : title}

                    <Box marginTop="0.5rem" />

                    {isLoading ? <LoadingBody /> : body}
                </Box>
            </Card>
        </Box>
    );
};

export default EditHistorySection;
