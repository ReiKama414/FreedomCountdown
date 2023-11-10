import React from "react";
import CountdownTimer from "./components/CountdownTimer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CountdownTimer />
		</ThemeProvider>
	);
}

export default App;
