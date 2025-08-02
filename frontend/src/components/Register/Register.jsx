/**
 * Coded By: Era Boy
 * Version: v0.2.2
 **/

import movie2 from '../../assets/wallpaper5.jpg';
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
  LinearProgress,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    password: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();
  const handleMouseUpPassword = (e) => e.preventDefault();

  const isValidIdentifier = (identifier) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9._-]{3,}$/;
    return emailPattern.test(identifier) || usernamePattern.test(identifier);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { name, identifier, password, role } = formData;

    // if (!name || !identifier || !password || !role) {
    //   setSnackbar({ open: true, message: "Please fill in all fields." });
    //   return;
    // }

    // if (!isValidIdentifier(identifier)) {
    //   setSnackbar({ open: true, message: "Enter a valid email or username." });
    //   return;
    // }

    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.post("http://localhost:4000/signup/new-user", formData);
      navigate("/login");
    } catch (err) {
      setSnackbar({ open: true, message: "Registration failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center transition-all"
          style={{ backgroundImage: `url(${movie2})` }}
      >
        <div
            className={`absolute inset-0 transition-colors duration-700 pointer-events-none z-0 ${
                darkMode ? "bg-white/40" : "bg-black/40"
            }`}
        />

        <div className="absolute top-4 right-4 z-10">
          <IconButton
              onClick={() => {
                setDarkMode((prev) => {
                  localStorage.setItem("darkMode", !prev);
                  return !prev;
                });
              }}
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
          <h1 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "Poppins" }}>
            Sign Up
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
                required
                name="name"
                label="Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  style: {
                    color: darkMode ? '#fff' : '#000',
                  }
                }}
                InputLabelProps={{
                  style: {
                    color: darkMode ? '#ccc' : undefined,
                  }
                }}
            />

            <TextField
                required
                name="identifier"
                label="Email or Username"
                fullWidth
                value={formData.identifier}
                onChange={handleChange}
                InputProps={{
                  style: {
                    color: darkMode ? '#fff' : '#000',
                  }
                }}
                InputLabelProps={{
                  style: {
                    color: darkMode ? '#ccc' : undefined,
                  }
                }}
            />

            <FormControl variant="outlined" fullWidth required>
              <InputLabel style={{ color: darkMode ? '#ccc' : undefined }}>Password</InputLabel>
              <OutlinedInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  sx={{
                    input: {
                      color: darkMode ? '#fff' : '#000',
                    },
                  }}
              />
            </FormControl>

            <Box>
              <LinearProgress
                  variant="determinate"
                  value={passwordStrength}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: darkMode ? '#333' : '#eee',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor:
                          passwordStrength < 50
                              ? 'red'
                              : passwordStrength < 75
                                  ? 'orange'
                                  : 'green',
                    },
                  }}
              />
              <Typography variant="caption" sx={{ color: darkMode ? '#ccc' : '#555' }}>
                Password strength
              </Typography>
            </Box>

            <TextField
                required
                name="address"
                label="Address"
                fullWidth
                value={formData.address}
                onChange={handleChange}
                InputProps={{
                  style: {
                    color: darkMode ? '#fff' : '#000',
                  }
                }}
                InputLabelProps={{
                  style: {
                    color: darkMode ? '#ccc' : undefined,
                  }
                }}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ bgcolor: darkMode ? "#1976d2" : undefined }}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300" />
              <span className="mx-3 text-sm text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>

            <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{ color: darkMode ? "#fff" : "#000", borderColor: darkMode ? "#555" : "#ccc" }}
            >
              Sign up with Google
            </Button>

            <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon />}
                sx={{ color: darkMode ? "#fff" : "#000", borderColor: darkMode ? "#555" : "#ccc" }}
            >
              Sign up with Facebook
            </Button>
          </form>

          <Typography variant="body2" align="center" className="mt-6">
            Already have an account? <br />
            <Link
                to="/login"
                className={`underline ${darkMode ? "text-blue-300" : "text-blue-600"}`}
            >
              Sign In
            </Link>
          </Typography>

          <Snackbar
              open={snackbar.open}
              autoHideDuration={4000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
          />
        </div>
      </div>
  );
}
