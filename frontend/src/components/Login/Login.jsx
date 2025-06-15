import React, { useEffect, useState } from "react";
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
    Checkbox,
    FormControlLabel,
    LinearProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import movie from "../../assets/wallpaper4.jpg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [password, setPassword] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode") === "true";
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
        setDarkMode(savedDarkMode);
    }, []);

    const handleToggleDarkMode = () => {
        setDarkMode((prev) => {
            localStorage.setItem("darkMode", !prev);
            return !prev;
        });
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        if (value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value)) {
            setPasswordStrength(2);
        } else if (value.length >= 6) {
            setPasswordStrength(1);
        } else {
            setPasswordStrength(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setSnackbarMessage("Please fill in all the fields.");
            setShowSnackbar(true);
            return;
        }

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isUsername = /^[a-zA-Z0-9_.-]{3,}$/.test(email); // simple username rule

        if (!isEmail && !isUsername) {
            setSnackbarMessage("Enter a valid email or username (at least 3 characters).");
            setShowSnackbar(true);
            return;
        }

        if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
        } else {
            localStorage.removeItem("rememberedEmail");
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
            setSnackbarMessage(
                error.response?.status === 401
                    ? "Invalid credentials."
                    : "Login failed. Please try again."
            );
            setShowSnackbar(true);
            setPassword("");
        } finally {
            setLoading(false);
        }
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 2:
                return "success";
            case 1:
                return "warning";
            default:
                return "error";
        }
    };

    const getStrengthLabel = () => {
        switch (passwordStrength) {
            case 2:
                return "Strong";
            case 1:
                return "Medium";
            default:
                return "Weak";
        }
    };

    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center transition-all"
            style={{ backgroundImage: `url(${movie})` }}
        >
            <div
                className={`absolute inset-0 transition-colors duration-700 pointer-events-none z-0 ${
                    darkMode ? "bg-white/40" : "bg-black/40"
                }`}
            />

            <div className="absolute top-4 right-4 z-20">
                <IconButton
                    onClick={handleToggleDarkMode}
                    className="bg-white/80 rounded-full shadow"
                >
                    {darkMode ? (
                        <LightModeIcon className="text-yellow-500" />
                    ) : (
                        <DarkModeIcon className="text-blue-600" />
                    )}
                </IconButton>
            </div>

            <div
                className={`relative z-10 w-full max-w-md p-8 mx-4 rounded-xl shadow-xl transition-all duration-700 ${
                    darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                }`}
            >
                <h1 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "Open Sans" }}>
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        required
                        label="Email or Username"
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
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            style={{ color: darkMode ? "#fff" : "#000" }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                        sx={{ color: darkMode ? "#fff" : "#000" }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    {password && (
                        <div className="mt-[-12px]">
                            <LinearProgress
                                variant="determinate"
                                value={(passwordStrength + 1) * 33}
                                color={getStrengthColor()}
                            />
                            <Typography variant="caption" className="mt-1">
                                Strength: {getStrengthLabel()}
                            </Typography>
                        </div>
                    )}

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                sx={{ color: darkMode ? "#ccc" : undefined }}
                            />
                        }
                        label="Remember Me"
                    />

                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            className={`text-sm ${
                                darkMode ? "text-blue-300" : "text-blue-600"
                            } underline`}
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            bgcolor: darkMode ? "#1976d2" : undefined,
                            "&:hover": { bgcolor: darkMode ? "#1565c0" : undefined },
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="mx-3 text-sm text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        sx={{
                            color: darkMode ? "#fff" : "#000",
                            borderColor: darkMode ? "#555" : "#ccc",
                        }}
                    >
                        Login with Google
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<FacebookIcon />}
                        sx={{
                            color: darkMode ? "#fff" : "#000",
                            borderColor: darkMode ? "#555" : "#ccc",
                        }}
                    >
                        Login with Facebook
                    </Button>
                </div>

                <br />

                <Typography variant="body2" align="center" className="mt-6">
                    Don't have an account?
                    <br />
                    <Link
                        to="/register"
                        className={`underline ${darkMode ? "text-blue-300" : "text-blue-600"}`}
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