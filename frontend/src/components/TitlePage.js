import React, { useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../assets/logo.png"; // Adjust the path to your logo image

// Create a styled container for the header
const HeaderContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    color: "#1d4f7b",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(3),
    textTransform: 'uppercase'
}));

// Logo image styling
const LogoImage = styled("img")({
    height: "40px", // Adjust size as needed
    marginRight: "10px",
});

// Main title and subtitle styles
const Title = styled(Typography)({
    fontWeight: "bold",
    fontSize: "1.5rem",
});

// Subtitle styles
const Subtitle = styled(Typography)({
    fontWeight: "300",
    opacity: 1,
    fontSize: 'smaller'

});

export const Header = () => {
    const logout = useCallback(() => {
        localStorage.clear();
        window.location.reload();
    }, []);
    return (
        <HeaderContainer>
            <Box display="flex" flexGrow={'1'} alignItems="center" justifyContent="space-between">

                <Box display="flex" alignItems={'center'} >
                    <LogoImage src={Logo} alt="CBL Logo" />
                    <Box display="flex" alignItems="baseline" flexDirection={'column'}>
                        <Title>CBL Job Runner</Title>
                        <Subtitle>Manage and monitor your job executions seamlessly</Subtitle>
                    </Box>

                </Box>
                <Button variant="contained" color="error" onClick={logout}>LogO Out</Button>

            </Box>

        </HeaderContainer>
    );
};

