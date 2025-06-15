import React, { useState } from "react";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    Snackbar,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import movie from "../../assets/wallpaper4.jpg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setSnackbarMessage("Please fill in all the fields.");
            setShowSnackbar(true);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setSnackbarMessage("Invalid email format.");
            setShowSnackbar(true);
            return;
        }

        if (password.length < 4) {
            setSnackbarMessage("Password must be at least 4 characters.");
            setShowSnackbar(true);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:4000/signin", {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch (error) {
            if (error.response?.status === 401) {
                setSnackbarMessage("Invalid credentials.");
            } else {
                setSnackbarMessage("Login failed. Please try again.");
            }
            setShowSnackbar(true);
            setPassword("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center transition-all"
            style={{ backgroundImage: `url(${movie})` }}
        >
            {/* Background Overlay */}
            <div
                className={`absolute inset-0 transition-colors duration-700 pointer-events-none z-0 ${
                    darkMode ? "bg-white/30" : "bg-black/40"
                }`}
            />

            {/* Theme Toggle */}
            <div className="absolute top-4 right-4 z-20">
                <IconButton onClick={() => setDarkMode((prev) => !prev)} className="bg-white/80 rounded-full shadow">
                    {darkMode ? (
                        <LightModeIcon className="text-yellow-500" />
                    ) : (
                        <DarkModeIcon className="text-blue-600" />
                    )}
                </IconButton>
            </div>

            {/* Login Card */}
            <div
                className={`relative z-10 w-full max-w-md p-8 mx-4 rounded-xl shadow-xl transition-all duration-700 ${
                    darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
            >
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        required
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        InputProps={{
                            style: {
                                color: darkMode ? "#fff" : "#000",
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: darkMode ? "#ccc" : "#000",
                            },
                        }}
                    />

                    <FormControl variant="outlined" fullWidth required>
                        <InputLabel style={{ color: darkMode ? "#ccc" : "#000" }}>
                            Password
                        </InputLabel>
                        <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ color: darkMode ? "#fff" : "#000" }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                        sx={{
                                            color: darkMode ? "#fff" : "#000", // ✅ FIX: icon color based on theme
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            bgcolor: darkMode ? "#1976d2" : undefined,
                            "&:hover": {
                                bgcolor: darkMode ? "#1565c0" : undefined,
                            },
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <Typography variant="body2" align="center" className="mt-6">
                    Don't have an account?
                    <br />
                    <Link
                        to="/register"
                        className={`underline ${
                            darkMode ? "text-blue-300" : "text-blue-600"
                        }`}
                    >
                        Sign up
                    </Link>
                </Typography>
            </div>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={4000}
                onClose={() => setShowSnackbar(false)}
                message={snackbarMessage}
                className="fixed bottom-0 right-0 mb-8 mr-8"
            />
        </div>
    );
}
