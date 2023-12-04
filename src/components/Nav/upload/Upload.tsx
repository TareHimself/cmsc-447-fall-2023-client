/* eslint-disable import/no-named-as-default */
import { useCallback, useId, useState } from 'react';
// import React, { useCallback, useId, useState } from 'react';
import './style.css';
import { CircularProgress, Stack } from '@mui/material';
import { IFileUploadResponse, IServerResponse } from '../../../types';
import { ServerUrl } from '../../../globals';
import axios from 'axios'
import toast from 'react-hot-toast';

// EYE IMAGES
import pwhide from './pwhide.png';
import pwshow from './pwshow.png';

// MUI USED
import * as dayjs from 'dayjs';
import { tz as dayjsTimezone } from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'react-datepicker/dist/react-datepicker.css';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import Typography from '@mui/material/Typography';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

// TIME ZONES:
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjsTimezone.setDefault(dayjsTimezone.guess());

function UploadIntro({ uploadInputId }: { uploadInputId: string }) {
	return (
		<button
			onClick={() => {
				document.getElementById(uploadInputId)?.click();
			}}
		>
			Select File
		</button>
	);
}

function UploadFileOptions({
	file,
	startUpload,

	password,
	setPassword,
	expirationTime,
	setExpirationTime,
	maxViews,
	setMaxViews
}: {
	file: File | undefined;
	startUpload: () => void;
	password: string | undefined;
	setPassword: (password: string | undefined) => void;

	expirationTime: dayjs.Dayjs | undefined;
	setExpirationTime: (date: dayjs.Dayjs | undefined) => void;
	maxViews: number | undefined;
	setMaxViews: (views: number | undefined) => void;
}) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const today = dayjs.default();
	//const maxDay = dayjs.default().add(3, 'day');

	if (!file) {
		return <></>;
	}

	return (
		<div className="home-upload">
			<div className="uploadinfo">
				<h2
					style={{
						color: 'white',
						fontSize: 40,
					}}
				>
					{file.name}
				</h2>

				<button
					className="upload-btn"
					style={{ fontSize: 35 }}
					onClick={startUpload}
				>
					Upload
				</button>
			</div>

			

			<div className="options-list">

				{/* MaxViews OPTIONS*/}
				<div className="option">
					<div className="widget-container">
						<h2
							style={{
								display: 'flex',
								color: 'white',
								fontSize: 22,
								margin: '20px',
								verticalAlign: 'middle',
								gap: '20px',
							}}
						>
							Max Views:
							<label className="switch">
								<input
									type="checkbox"
									checked={maxViews !== undefined}
									onChange={(e) => {
										e.persist();
										if(maxViews === undefined){
											setMaxViews(1)
										}
										else
										{
											setMaxViews(undefined)
										}
									}}
								/>
								<span className="slider round"></span>
							</label>
						</h2>

						<div className="option">
							{maxViews !== undefined ? (
								<div
									className="password-box"
									style={{ position: 'relative' }}
								>
									<input
										className="password-in"
										type="number"
										required
										value={maxViews}
										onChange={(e) =>
											setMaxViews(e.target.valueAsNumber)
										}
									/>
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* PASSWORD OPTIONS*/}
				<div className="option">
					<div className="widget-container">
						<h2
							style={{
								display: 'flex',
								color: 'white',
								fontSize: 22,
								margin: '20px',
								verticalAlign: 'middle',
								gap: '20px',
							}}
						>
							Password Protect:
							<label className="switch">
								<input
									type="checkbox"
									checked={password !== undefined}
									onChange={(e) => {
										e.persist();
										if(password === undefined){
											setPassword('')
										}
										else
										{
											setPassword(undefined)
										}
									}}
								/>
								<span className="slider round"></span>
							</label>
						</h2>

						<div className="option">
							{password !== undefined ? (
								<div
									className="password-box"
									style={{ position: 'relative' }}
								>
									<input
										className="password-in"
										type={
											isPasswordVisible
												? 'text'
												: 'password'
										}
										required
										placeholder="Enter Password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									<button
										className="pweye-btn"
										type="button"
										onClick={() =>
											setIsPasswordVisible(
												!isPasswordVisible
											)
										}
									>
										<img
											src={
												isPasswordVisible
													? pwhide
													: pwshow
											}
											alt="Toggle PW Visibility"
											style={{
												width: '20px',
												height: '20px',
											}}
										/>
									</button>
								</div>
							) : null}
						</div>
					</div>
				</div>

				{/* EXPIRATION DATE BELOW */}

				<div className="option">
					<div className="widget-container">
						<h2
							style={{
								display: 'flex',
								color: 'white',
								fontSize: 22,
								margin: '20px',

								verticalAlign: 'middle',
								gap: '20px',
							}}
						>
							Set Link Expiration:
							<label className="switch">
								<input
									className="date-time"
									type="checkbox"
									checked={expirationTime !== undefined}
									onChange={() => {
										if(expirationTime === undefined){
											setExpirationTime(dayjs.default())
										}
										else
										{
											setExpirationTime(undefined)
										}
									}}
								/>
								<span className="slider round"></span>
							</label>
						</h2>

						<div className="option">
							{expirationTime !== undefined && (
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
								>
									<Typography
										sx={{
											display: 'flex',
											flexDirection: 'column',
											position: 'relative',
											fontSize: '1rem',
											fontWeight: 'bold',
											borderColor: 'none',
											justifyContent: 'center',
											textAlign: 'center',
											color: 'white',
											width: '25rem',
										}}
									>
										<StaticDateTimePicker
											sx={{
												display: 'flex',
												flexDirection: 'column',
												minWidth: 'auto',
												width: '100%',
												maxWidth: '100%',
												backgroundColor: 'gray',
												justifyContent: 'center',
												position: 'relative',
												borderColor: 'white',
												alignItems: 'center',
												alignContent: 'center',
												'& .css-1u23akw-MuiButtonBase-root-MuiPickersDay-root':
													{
														display: 'flex',
														fontSize: '100%',
														color: 'white',
														margin: '.2rem',
														fontWeight: 'bold',
														widthMax: '100%',
													},
												'& .css-1b9e08i-MuiTypography-root-MuiPickersToolbarText-root.Mui-selected':
													{
														display: 'flex',
														fontSize: '2em',
														position: 'relative',
													},
												'& .css-1j9v0by-MuiClock-root':
													{
														display: 'flex',
														position: 'relative',
													},
												'& .css-cgnqp7-MuiTypography-root':
													{ display: 'flex' },
												'& .css-cyfsxc-MuiPickersCalendarHeader-labelContainer':
													{
														display: 'flex',
														fontSize: '.7rem',
														margin: '2px',
													},
												'& .css-1vooibu-MuiSvgIcon-root':
													{
														display: 'flex',
														fontSize: '1rem',
														margin: '2px',
													},
												'& .css-i4bv87-MuiSvgIcon-root':
													{ fontSize: '2em' },
												'& .css-7kirvq-MuiTypography-root-MuiPickersToolbarText-root.Mui-selected':
													{
														backgroundColor:
															'black',
														color: 'white',
													},
												'& .css-2x8kvt-MuiPickersArrowSwitcher-root-MuiTimeClock-arrowSwitcher':
													{ marginLeft: '50%' },
												'& .css-1b9e08i-MuiTypography-root-MuiPickersToolbarText-root':
													{ marginRight: '3rem' },
											}}
											defaultValue={today}
											disablePast
											minDate={today}
											//maxDate={maxDay}
											slotProps={{
												actionBar: {
													actions: ['today'],
												},
											}}
											value={expirationTime}
											onChange={(d) => {
												setExpirationTime(d ?? undefined);
											}}
											orientation="portrait"
										/>
									</Typography>

									{/* ALTERNATIVE CODE INPUT BOX */}
									{/* <Typography sx={{position: 'relative', fontSize: '1rem', fontWeight:'bold', borderColor:'none',  justifyContent: 'center', textAlign: 'center', color: 'white',}}>	
									<DateTimePicker sx={{  justifyContent: 'center', alignContent: 'center', alignItems: 'center', position:'relative', fontSize: '2rem',fontWeight: 'bold', borderColor:'white', padding:"20px", '& input': {position: 'relative',fontSize: '1rem', color: 'white', borderColor: 'white', display:'flex',fontWeight: 'bold'}, '& label': {padding:"20px", color: 'white', fontSize:'.95rem', fontStyle: 'bold'}, '& .css-i4bv87-MuiSvgIcon-root': {fill: 'white'} }}		
										label = "Enter Date/Time or Click Calendar"
										// timezone="America/New_York"
										defaultValue={today}	
										
										disablePast
										slotProps={{
											actionBar: {
												
											actions: ['accept','today'],
											},
										}}

										minDate = {today}	
										maxDate={maxDay}
										// views={['year', 'month', 'day', 'hours', 'minutes']} 
										
										viewRenderers={{
											hours: renderTimeViewClock,
											minutes: renderTimeViewClock,
											seconds: renderTimeViewClock,
										}}					
										onAccept={setExpirationTime}
																				
										referenceDate={today}											
										/>
								
								</Typography> */}

									<Typography sx={{ fontSize: '1rem' }}>
										Stored UTC Time:{' '}
										{expirationTime == null
											? 'null'
											: expirationTime.format()}
									</Typography>
								</LocalizationProvider>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function UploadingFile() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Stack sx={{ color: 'white' }}>
				<CircularProgress size={100} color="inherit" />
			</Stack>
			<h2
				style={{
					color: 'white',
				}}
			>
				Uploading
			</h2>
		</div>
	);
}

function DisplayUploadedFileInfo({
	info,
	onUploadNew,
}: {
	info: IFileUploadResponse | undefined;
	onUploadNew: () => void;
}) {
	if (!info) {
		return <></>;
	}

	const accessUrl = `${window.location.origin}/access/${info.id}`;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 20,
			}}
		>
			<span>
				<h2
					style={{
						color: 'white',
						fontSize: 30,
					}}
				>
					{info.fileName}
				</h2>
			</span>

			<button
				style={{ fontSize: 20 }}
				onClick={async () => {
					await navigator.clipboard.writeText(accessUrl);
					toast('Copied');
				}}
			>
				Copy Url
			</button>
			<button
				onClick={() => {
					window.open(
						`https://qr.oyintare.dev/500/ffffff/005959/${encodeURIComponent(
							accessUrl
						)}`,
						'_blank'
					);
				}}
				style={{ fontSize: 20 }}
			>
				Generate Qr Code
			</button>
			<button onClick={onUploadNew} style={{ fontSize: 20 }}>
				Upload Another File
			</button>
		</div>
	);
}

const uploadStates = [
	'/none',
	'/beforeUpload',
	'/uploading',
	'/uploadSuccess',
	'/uploadFail',
] as const;

type UploadStatesType = (typeof uploadStates)[0 | 1 | 2 | 3 | 4];

export default function Upload() {
	const uploadInputId = useId();

	const [uploadState, setUploadState] = useState<UploadStatesType>(
		uploadStates[0]
	);

	const [filePendingUpload, setFilePendingUpload] = useState<
		File | undefined
	>(undefined);

	const [uploadedFileInfo, setUploadedFileInfo] = useState<
		IFileUploadResponse | undefined
	>(undefined);

	// use states for option
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [maxViews, setMaxViews] = useState<undefined | number>(undefined);
	const [expirationTime, setExpirationTime] = useState<dayjs.Dayjs | undefined>(undefined);

	const onFileSelected = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.item(0) || undefined;
			if (file) {
				setFilePendingUpload(file);
				setUploadState('/beforeUpload');
			}
		},
		[]
	);

	const uploadCurrentFile = useCallback(async () => {
		if (!filePendingUpload) {
			setUploadState('/none');
			return;
		}
		setUploadState('/uploading');
		const form = new FormData();
		form.append('file', filePendingUpload);

		// add password to form data/database

		if (password !== undefined) {
			form.append('password', password);
		}

		if (expirationTime !== undefined) {
			form.append('expire', expirationTime?.toString() ?? '');
		}

		if (maxViews !== undefined) {
			form.append('maxViews', maxViews?.toString() ?? '0');
		}

		const response = await axios.put<IServerResponse<IFileUploadResponse>>(`${ServerUrl}/upload`,form,{
			onUploadProgress(progressEvent) {
				console.log("Upload progress",progressEvent.progress)
			},
		}).then(c => c.data)

		if (response.error !== null) {
			setUploadState('/beforeUpload');
			toast.error('Upload Failed');
			setFilePendingUpload(undefined);
		} else {
			setUploadedFileInfo(response.data);
			setUploadState('/uploadSuccess');
		}
	}, [filePendingUpload, password, expirationTime, maxViews]);

	return (
		<section id="upload">
			<div className="inner">
				<input
					id={uploadInputId}
					type="file"
					onChange={onFileSelected}
				/>
				{uploadState === uploadStates[0] && (
					<UploadIntro uploadInputId={uploadInputId} />
				)}
				{uploadState === uploadStates[1] && (
					<UploadFileOptions
						file={filePendingUpload}
						startUpload={uploadCurrentFile}
						setPassword={setPassword}
						password={password}
						setExpirationTime={setExpirationTime}
						expirationTime={expirationTime}
						maxViews={maxViews}
						setMaxViews={setMaxViews}
					/>
				)}
				{uploadState === uploadStates[2] && <UploadingFile />}
				{uploadState === uploadStates[3] && (
					<DisplayUploadedFileInfo
						info={uploadedFileInfo}
						onUploadNew={() => {
							setUploadState('/none');
							setFilePendingUpload(undefined);
						}}
					/>
				)}
			</div>
		</section>
	);
}
