import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Container, Typography, Box, Select, MenuItem, LinearProgress } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import zhTW from "date-fns/locale/zh-TW";

const CountdownTimer = () => {
	const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, 10) + "T08:00");
	const [workHours, setWorkHours] = useState(8);
	const [breakDuration, setBreakDuration] = useState(60);
	const [endTime, setEndTime] = useState("");
	const [countdown, setCountdown] = useState(null);
	const [todayAttendance, setTodayAttendance] = useState(null);
	const [daysWorked, setDaysWorked] = useState(0);
	const [totalWorkDays, setTotalWorkDays] = useState(0);
	const [timerId, setTimerId] = useState(null);

	useEffect(() => {
		calculateEndTime();
	}, []);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				calculateEndTime();
			} else {
				clearInterval(timerId);
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	const calculateEndTime = () => {
		clearInterval(timerId);

		// 解析上班時間字串為 Date 物件
		const start = new Date(startTime);
		const end = new Date(start);

		// 加上上班時數
		end.setHours(end.getHours() + workHours);

		// 加上午休時長
		end.setMinutes(end.getMinutes() + breakDuration);

		// 設定結果
		setEndTime(end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

		// 計算並設定倒數時間
		const now = new Date();
		const countdownTime = end - now;
		setCountdown(countdownTime);

		// console.log(end);
		// console.log(now);

		// 設定計時器，每秒更新倒數時間
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1000);
		}, 1000);
		setTimerId(timer);

		// 設定定時器，倒數結束後清除計時器
		setTimeout(() => {
			clearInterval(timer);
			setCountdown(null);
		}, countdownTime);

		// 判斷今天是否為出勤日
		setTodayAttendance(isWorkingDay(now));

		// 計算當前月份出勤日
		const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
		const totalWorkDaysOfMonth = countWorkDays(firstDayOfMonth, lastDayOfMonth);
		setTotalWorkDays(totalWorkDaysOfMonth);

		// 計算當前月份已經出勤的日數
		const daysWorkedOfMonth = countWorkDays(firstDayOfMonth, now);
		setDaysWorked(daysWorkedOfMonth);
	};

	useEffect(() => {
		return () => {
			clearInterval(timerId);
		};
	}, [timerId]);

	// 判斷是否為出勤日
	const isWorkingDay = (date) => {
		// TODO: 根據實際需求判斷是否為出勤日
		// 這裡假設星期一到星期五為出勤日
		const day = date.getDay();
		return day >= 1 && day <= 5;
	};

	// 計算指定範圍內的出勤日數
	const countWorkDays = (startDate, endDate) => {
		let count = 0;
		let currentDate = new Date(startDate);

		while (currentDate <= endDate) {
			if (isWorkingDay(currentDate)) {
				count++;
			}
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return count;
	};

	return (
		<Container maxWidth="sm">
			<Typography variant="h3" align="center" gutterBottom className="neon-green">
				FreedomCountdown
			</Typography>

			<Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
				<p className="neon-green">上班時間</p>
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={zhTW}>
					<TimePicker
						defaultValue={dayjs(startTime)}
						dayOfWeekFormatter={(_day, weekday) => {
							console.log(); // AVOID BUG
						}}
						onAccept={(data) => setStartTime(data)}
						sx={[
							{
								width: "100%",
							},
						]}
					/>
				</LocalizationProvider>

				<Box display="flex" flexDirection="row" alignItems="center" marginTop={2} gap={2} width={"100%"}>
					<Box display="flex" flexDirection="column" alignItems="center" width={"100%"}>
						<p className="neon-green">上班時數</p>
						<Select value={workHours} onChange={(e) => setWorkHours(e.target.value)} fullWidth>
							<MenuItem value={6}>6 小時</MenuItem>
							<MenuItem value={7}>7 小時</MenuItem>
							<MenuItem value={8}>8 小時</MenuItem>
							<MenuItem value={9}>9 小時</MenuItem>
							<MenuItem value={10}>10 小時</MenuItem>
						</Select>
					</Box>

					<Box display="flex" flexDirection="column" alignItems="center" width={"100%"}>
						<p className="neon-green">午休時長 (分鐘)</p>
						<Select value={breakDuration} onChange={(e) => setBreakDuration(e.target.value)} fullWidth>
							<MenuItem value={90}>90 分鐘</MenuItem>
							<MenuItem value={60}>60 分鐘</MenuItem>
							<MenuItem value={30}>30 分鐘</MenuItem>
							<MenuItem value={0}>0 分鐘</MenuItem>
						</Select>
					</Box>
				</Box>

				<button className="neon-btn" onClick={calculateEndTime}>
					計算下班時間
				</button>

				{endTime && (
					<Typography variant="h5" align="center" style={{ marginTop: "20px" }}>
						預計下班時間：{endTime}
					</Typography>
				)}

				{todayAttendance !== null && (
					<Typography variant="h5" align="center" style={{ marginTop: "20px" }}>
						今天{todayAttendance ? "是" : "不是"}出勤日
					</Typography>
				)}

				{countdown !== null && (
					<Typography variant="h5" align="center" style={{ marginTop: "20px" }}>
						倒數時間：{new Date(countdown).toISOString().substr(11, 8)}
					</Typography>
				)}

				{totalWorkDays > 0 && (
					<Typography variant="h5" align="center" style={{ marginTop: "20px" }}>
						當前月份第{daysWorked}天出勤日 / 本月份共有{totalWorkDays}天出勤日
					</Typography>
				)}

				{countdown !== null && (
					<Box style={{ width: "100%", marginTop: "20px" }}>
						<LinearProgress
							variant="determinate"
							value={(daysWorked / totalWorkDays) * 100}
							color={todayAttendance ? "primary" : "secondary"}
						/>
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default CountdownTimer;
