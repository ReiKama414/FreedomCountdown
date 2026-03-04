const STORAGE_KEY = "freedom-countdown-state-v1";

export const loadState = () => {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch (e) {
		console.error("loadState error", e);
		return null;
	}
};

export const saveState = (state) => {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (e) {
		console.error("saveState error", e);
	}
};

export const todayKey = (d = new Date()) => d.toISOString().slice(0, 10);

