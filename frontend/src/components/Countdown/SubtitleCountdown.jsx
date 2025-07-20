/**
 *Coded By: Era Boy
 *Version: v0.1.0
 **/
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SubtitleCountdown() {
    const [searchParams] = useSearchParams();
    const [countdown, setCountdown] = useState(5);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const subtitleLink = searchParams.get("link");

    useEffect(() => {
        if (!subtitleLink) {
            navigate("/");
            return;
        }

        const totalSeconds = 5;
        const interval = 1000;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                const next = prev - 1;
                setProgress(((totalSeconds - next) / totalSeconds) * 100);
                if (next <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [subtitleLink, navigate]);

    if (!subtitleLink) return null;

    return (
        <div className="min-h-screen flex items-center justify-center flex-col bg-black text-white px-6 text-center">
            <Box sx={{ width: '100%', maxWidth: 400 }}>
                {countdown > 0 ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Preparing your download...
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Please wait {countdown} second{countdown > 1 ? "s" : ""}
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "#333",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#f87171", // Tailwind red-400
                                },
                                mt: 3,
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Download Ready
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            href={subtitleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                borderRadius: "999px",
                                textTransform: "none",
                                fontSize: "1rem",
                                px: 4,
                                mt: 2,
                            }}
                        >
                            Download Subtitle
                        </Button>
                    </>
                )}
            </Box>
        </div>
    );
}
