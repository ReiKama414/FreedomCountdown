import React, { useMemo } from "react";
import CountdownTimer from "./components/CountdownTimer";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { getAppTheme } from "./utils/theme";

function App() {
	const theme = useMemo(() => getAppTheme("dark"), []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="app-shell">
				<CountdownTimer />
				<footer className="app-footer">
					<p className="app-footer-main">
						FreedomCountdown · crafted by{" "}
						<a href="https://reikama414.vercel.app/" target="_blank" rel="noreferrer">
							ReiKama414
						</a>
					</p>
					<p className="app-footer-sub">每天離自由更近一點。</p>
				</footer>
			</div>
		</ThemeProvider>
	);
}

export default App;
