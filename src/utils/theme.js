// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		fontFamily:
			'"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, Helvetica, monospace',
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					color: "white",
					textShadow: "0 0 4px #fff, 0 0 8px #0ff, 0 0 12px #0ff",
					input: {
						textShadow: "0 0 4px #fff, 0 0 8px #0ff, 0 0 12px #0ff",
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "aqua",
						boxShadow: "0 0 5px 3px white, 0 0 20px 3px aqua",
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "aqua",
					},
				},
				notchedOutline: {
					borderWidth: "2px",
					borderColor: "aqua",
					transition: "box-shadow 0.25s",
				},
			},
		},
	},
});

export default theme;
