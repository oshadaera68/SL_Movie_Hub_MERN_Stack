/**
 * Coded By: Era Boy
 * Version: v0.2.1
 **/
import React, {useState} from "react";
import {
    Box,
    Button,
    createTheme,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axios from "axios";

const languages = ["Malayalam", "Telugu", "Tamil", "Hindi", "English", "Korean"];
const videoCopies = ["HDRip", "WebRip", "WEB-DL", "BluRay", "DVDScr", "CamCopy", "HDTV"];

export default function UploadForm() {
    const [formData, setFormData] = useState({
        title: "",
        date: dayjs(),
        imageUrl: "",
        imageFile: null,
        language: "",
        videoCopy: "",
        altTitle: "",
        description: "",
        subtitleBy: "",
        subtitleWebsite: "",
        subtitleDownloadLink: "",
    });

    const [previewSrc, setPreviewSrc] = useState("");
    const [errors, setErrors] = useState({});
    const [darkMode, setDarkMode] = useState(true);


    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

        if (value.trim() === "") {
            setErrors((prev) => ({...prev, [name]: "This field is required"}));
        } else {
            setErrors((prev) => {
                const updated = {...prev};
                delete updated[name];
                return updated;
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({...formData, imageFile: file});
            setPreviewSrc(URL.createObjectURL(file));
        }
    };

    const handleImageUrlBlur = () => {
        if (formData.imageUrl) {
            setPreviewSrc(formData.imageUrl);
        }
    };

    const handleDateChange = (date) => {
        setFormData({...formData, date});
    };

    const validateForm = () => {
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!["imageFile", "imageUrl"].includes(key) && (!value || (typeof value === "string" && value.trim() === ""))) {
                newErrors[key] = "This field is required";
            }
        });

        if (!formData.imageFile && !formData.imageUrl) {
            newErrors.image = "Upload a file or provide a valid image URL";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const payload = {
                title: formData.title,
                releaseDate: formData.date.toISOString(), // convert dayjs to ISO string
                imageURL: formData.imageUrl,
                language: formData.language,
                videoCopy: formData.videoCopy,
                altTitle: formData.altTitle,
                description: formData.description,
                subtitledBy: formData.subtitleBy,
                subtitleWebsite: formData.subtitleWebsite,
                downloadLink: formData.subtitleDownloadLink,
            };

            try {
                await axios.post("http://localhost:4000/movie/new-movie", payload);
                alert("Movie submitted successfully!");

                // Reset form
                setFormData({
                    title: "",
                    date: dayjs(),
                    imageUrl: "",
                    imageFile: null,
                    language: "",
                    videoCopy: "",
                    altTitle: "",
                    description: "",
                    subtitleBy: "",
                    subtitleWebsite: "",
                    subtitleDownloadLink: "",
                });
                setPreviewSrc("");
                setErrors({});
            } catch (error) {
                console.error("Upload failed:", error);
                alert("Upload failed. Check console for details.");
            }
        }
    };


    return (<ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: darkMode ? "#121212" : "#f4f4f4",
                    color: darkMode ? "#fff" : "#000",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        mt: 6,
                        mb: 4,
                        maxWidth: 900,
                        mx: "auto",
                        borderRadius: 4,
                        bgcolor: darkMode ? "#1e1e1e" : "#fff",
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Upload a New Movie</Typography>
                        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                            {darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} mt={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Movie Title"
                                    name="title"
                                    fullWidth
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Release Date"
                                        value={formData.date}
                                        onChange={handleDateChange}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true, error: !!errors.date, helperText: errors.date,
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Image URL"
                                    name="imageUrl"
                                    fullWidth
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    onBlur={handleImageUrlBlur}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="outlined" component="label">
                                    Upload Image
                                    <input type="file" hidden onChange={handleImageChange}/>
                                </Button>
                                {errors.image && (<Typography color="error" variant="caption" sx={{ml: 2}}>
                                        {errors.image}
                                    </Typography>)}
                            </Grid>

                            {previewSrc && (<Grid item xs={12}>
                                    <img
                                        src={previewSrc}
                                        alt="Preview"
                                        style={{
                                            width: "100%", maxHeight: 300, objectFit: "contain", borderRadius: 8,
                                        }}
                                    />
                                </Grid>)}

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Language"
                                    name="language"
                                    fullWidth
                                    value={formData.language}
                                    onChange={handleInputChange}
                                    error={!!errors.language}
                                    helperText={errors.language}
                                >
                                    {languages.map((lang) => (<MenuItem key={lang} value={lang}>
                                            {lang}
                                        </MenuItem>))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Video Copy"
                                    name="videoCopy"
                                    fullWidth
                                    value={formData.videoCopy}
                                    onChange={handleInputChange}
                                    error={!!errors.videoCopy}
                                    helperText={errors.videoCopy}
                                >
                                    {videoCopies.map((copy) => (<MenuItem key={copy} value={copy}>
                                            {copy}
                                        </MenuItem>))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Alt Title"
                                    name="altTitle"
                                    fullWidth
                                    value={formData.altTitle}
                                    onChange={handleInputChange}
                                    error={!!errors.altTitle}
                                    helperText={errors.altTitle}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    error={!!errors.description}
                                    helperText={errors.description}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Subtitle By"
                                    name="subtitleBy"
                                    fullWidth
                                    value={formData.subtitleBy}
                                    onChange={handleInputChange}
                                    error={!!errors.subtitleBy}
                                    helperText={errors.subtitleBy}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Subtitle Website"
                                    name="subtitleWebsite"
                                    fullWidth
                                    value={formData.subtitleWebsite}
                                    onChange={handleInputChange}
                                    error={!!errors.subtitleWebsite}
                                    helperText={errors.subtitleWebsite}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Subtitle Download Link"
                                    name="subtitleDownloadLink"
                                    fullWidth
                                    value={formData.subtitleDownloadLink}
                                    onChange={handleInputChange}
                                    error={!!errors.subtitleDownloadLink}
                                    helperText={errors.subtitleDownloadLink}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    sx={{borderRadius: "999px", mt: 1, py: 1.5}}
                                >
                                    Upload Movie
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                {/* Footer */}
                <Divider sx={{my: 2, borderColor: darkMode ? "#333" : "#ccc"}}/>
                <footer className="text-center py-6 border-t border-zinc-800 text-gray-400">
                    &copy; 2025 SL Movies Hub. All rights reserved.
                </footer>
            </Box>
        </ThemeProvider>);
}
