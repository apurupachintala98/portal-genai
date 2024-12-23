import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const DashboardCard = ({ title, value, image, bgColor }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 3,
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: bgColor || "white",
                textAlign: "center",
                width: 200,
                height: 150,
            }}
        >
            <Box mb={1}> <img
                src={image}
                alt={title}
                style={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                }}
            /></Box>
            <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
                {title}
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
                {value}
            </Typography>
        </Paper>
    );
};

export default DashboardCard;
