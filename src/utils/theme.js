// theme.js
import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode = "dark") =>
	createTheme({
		palette: {
			mode,
		},
		typography: {
			fontFamily:
				'"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, Helvetica, monospace',
		},
		components: {
			MuiInputBase: {
				styleOverrides: {
					root: {
						color: mode === "dark" ? "white" : "black",
						textShadow:
							mode === "dark"
								? "0 0 4px #fff, 0 0 8px #0ff, 0 0 12px #0ff"
								: "none",
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor: mode === "dark" ? "aqua" : "#1976d2",
							boxShadow:
								mode === "dark"
									? "0 0 5px 3px white, 0 0 20px 3px aqua"
									: "0 0 4px rgba(25,118,210,0.5)",
						},
						"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
							borderColor: mode === "dark" ? "aqua" : "#1976d2",
						},
					},
					notchedOutline: {
						borderWidth: "2px",
						borderColor: mode === "dark" ? "aqua" : "#90caf9",
						transition: "box-shadow 0.25s",
					},
				},
			},
		},
	});

