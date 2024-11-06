import React, { useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../assets/logo.png"; // Adjust the path to your logo image

// Styled container for the header
const HeaderContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2, 3),
    color: "#1d4f7b",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
    marginBottom: theme.spacing(4),
}));

// Logo image styling
const LogoImage = styled("img")({
    height: "50px", // Slightly larger for prominence
    marginRight: "15px",
});

// Main title and subtitle styles
const Title = styled(Typography)({
    fontWeight: "bold",
    fontSize: "1.6rem",
    color: "#1d4f7b",
});

// Subtitle styles
const Subtitle = styled(Typography)({
    fontWeight: "300",
    fontSize: "0.9rem",
    color: "#3a3a3a",
    opacity: 0.8,
});

// Button styling
const LogoutButton = styled(Button)({
    fontWeight: "bold",
    backgroundColor: "#d32f2f",
    "&:hover": {
        backgroundColor: "#b71c1c",
    },
});

export const Header = () => {
    const logout = useCallback(() => {
        localStorage.clear();
        window.location.reload();
    }, []);

    return (
        <HeaderContainer>
            <Box display="flex" alignItems="center">
                <LogoImage src={Logo} alt="CBL Logo" />
                <Box>
                    <Title>CBL Job Runner</Title>
                    <Subtitle>Manage and monitor your job executions seamlessly</Subtitle>
                </Box>
            </Box>
            <LogoutButton variant="contained" color="error" onClick={logout}>
                Log Out
            </LogoutButton>
        </HeaderContainer>
    );
};
