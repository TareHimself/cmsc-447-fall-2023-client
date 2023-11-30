import { useCallback, useId, useState } from 'react';
// import React, { useCallback, useId, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import { CircularProgress, Stack } from '@mui/material';
import { IFileUploadResponse, IServerResponse } from '../../../types';
import { ServerUrl } from '../../../globals';
import toast from 'react-hot-toast';

// EYE IMAGES
import pwhide from './pwhide.png';
import pwshow from './pwshow.png';

// MUI USED
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import "react-datepicker/dist/react-datepicker.css";
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import Typography from '@mui/material/Typography';

// UNUSED MUI IMPORTS FOR NOW
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import { PickersLayout } from '@mui/x-date-pickers';
// import { TimeClock } from '@mui/x-date-pickers/TimeClock';
// import {
// 	usePickerLayout,
// 	PickersLayoutRoot,
// 	pickersLayoutClasses,
// 	PickersLayoutContentWrapper,
//   } from '@mui/x-date-pickers/PickersLayout';

// import { isWhiteSpaceLike } from 'typescript';

// TIME ZONES:
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');
// const TIMEZONES: PickersTimezone[] = ['default', 'system', 'UTC', 'America/Chicago'];


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
	isPasswordEnabled,
	setIsPasswordEnabled,

	expirationTime,
	setExpirationTime,
	isExpirationEnabled,
	setIsExpirationEnabled,


}: {
	file: File | undefined;
	startUpload: () => void;
	password:string;
	setPassword: (password:string) => void;
	isPasswordEnabled: boolean;
	setIsPasswordEnabled: (isEnabled: boolean) => void;

	expirationTime: Dayjs | null;
	setExpirationTime: (date: Dayjs | null) => void;
	// setExpirationTime: (time: number | null) => void;
	isExpirationEnabled: boolean;
	setIsExpirationEnabled: (isEnabled: boolean) => void;


}) {

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const today = dayjs();
	// const yesterday = dayjs().subtract(1, 'day');
	const todayStartOfTheDay = today.startOf('day');
	const maxDay = dayjs().add(3, 'day');

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
			
				<button className = 'upload-btn' style={{ fontSize: 35 }} onClick={startUpload}>
					Upload
				</button>
			</div>
		
			{/* PASSWORD OPTIONS ADDED BELOW*/}
			
			<div className="options-list">
				<div className="option">
					<div className='widget-container'>
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
									checked={isPasswordEnabled}
									onChange={(e) => {
										e.persist();
										setIsPasswordEnabled(!isPasswordEnabled);
										if (!isPasswordEnabled) {
											setPassword('');
										}
									}}
								/>
								<span className="slider round"></span>

							</label>
						</h2>

						<div className = 'option'>
						{isPasswordEnabled ? (
							<div className="password-box" style={{position: 'relative'}}>
								<input className='password-in'
									type={isPasswordVisible ? 'text':"password"} 
									required
									placeholder="Enter Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									
								/>
								<button className='pweye-btn'
									type = "button"
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
			
								>
							
									<img 
										src={isPasswordVisible ?  pwhide:pwshow}
										alt="Toggle PW Visibility"
										style={{ width: '20px', height: '20px' }} 
									/>																	
								</button>								
							</div>
					) : null}

					</div>
					</div>
				</div> 

				{/* EXPIRATION DATE BELOW */}

				<div className="option">

					<div className='widget-container'>
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
								<input className='date-time'
									type="checkbox"
									checked={isExpirationEnabled}
									onChange={() => {
										setIsExpirationEnabled(!isExpirationEnabled)
										if (!isExpirationEnabled) {
											setExpirationTime(null);
											// setShowExpirationPicker(true);
									}
								}}
								/>
								<span className="slider round"></span>
								
							</label></h2>

						<div className="option">

						{isExpirationEnabled && (

							// <div className="option">
								
								<LocalizationProvider dateAdapter={AdapterDayjs} >
			
									<Typography sx={{   position: 'relative', fontSize: '3rem', fontWeight:'bold', borderColor:'none',  justifyContent: 'center', textAlign: 'center', color: 'white',}}>	

										<DateTimePicker sx={{  justifyContent: 'center', alignContent: 'center', alignItems: 'center', position:'relative', fontSize: '2rem',fontWeight: 'bold', borderColor:'white', padding:"20px", '& input': {position: 'relative',fontSize: '1rem', color: 'white', borderColor: 'white', display:'flex',fontWeight: 'bold'}, '& label': {padding:"20px", color: 'white', fontSize:'.8rem'}, '& .css-i4bv87-MuiSvgIcon-root': {fill: 'white'} }}						
												
											defaultValue={today}											
											disablePast
											maxDate={maxDay}
											views={['year','month', 'day', 'hours', 'minutes']}

											label = "Enter Date/Time or Click Calendar"											
											viewRenderers={{
												
												hours: renderTimeViewClock,
												minutes: renderTimeViewClock,
												seconds: renderTimeViewClock,
											}}
											
											value={expirationTime}
											// onChange={setExpDate}
											onChange={setExpirationTime}
																					
											referenceDate={dayjs('2023-11-25T23:00:25.957Z')}											
											/>
											
									</Typography>

									<Typography>
									Stored value: {expirationTime == null ? 'null' : expirationTime.format()}
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
	onUploadNew
}: {
	info: IFileUploadResponse | undefined;
	onUploadNew: () => void;
}) {
	if (!info) {
		return <></>;
	}

	const accessUrl = `${window.location.origin}/access/${info.id}`

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 20
			}}
		>
			<span>
				<h2
					style={{
						color: 'white',
						fontSize: 30
					}}
				>
					{info.fileName}
				</h2>
			</span>
			
			<button style={{ fontSize: 20 }} onClick={async () => {
				await navigator.clipboard.writeText(accessUrl)
				toast("Copied")
			}}>Copy Url</button>
			<button onClick={()=>{
				window.open(`https://qr.oyintare.dev/500/ffffff/005959/${encodeURIComponent(accessUrl)}`,'_blank')
			}} style={{ fontSize: 20 }}>Generate Qr Code</button>
			<button onClick={onUploadNew} style={{ fontSize: 20 }}>Upload Another File</button>
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
	const [password, setPassword] = useState("");
	const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);


	const [expirationTime, setExpirationTime] = useState<Dayjs | null>(null);
	const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);


	console.log('Upload State', uploadState);

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


		if (isPasswordEnabled) {
			form.append('password', password);
		}

		if (isExpirationEnabled) {
			console.log("ENTERED IS EXPIRATION ENABLE ENTERED")
			form.append('expirationTime', expirationTime?.toString() || '');
		}	

		const response = await fetch(`${ServerUrl}/upload`, {
			method: 'PUT',
			body: form,
		}).then(
			(c) => c.json() as Promise<IServerResponse<IFileUploadResponse>>
		);

		if (response.error !== null) {
			setUploadState('/beforeUpload');
			toast.error("Upload Failed");
			setFilePendingUpload(undefined)
		} else {
			setUploadedFileInfo(response.data);
			setUploadState('/uploadSuccess');
		}
	}, [filePendingUpload, isPasswordEnabled, password, isExpirationEnabled, expirationTime]);

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
						isPasswordEnabled={isPasswordEnabled}
						setIsPasswordEnabled={setIsPasswordEnabled}

						setExpirationTime={setExpirationTime}
						expirationTime={expirationTime}
						isExpirationEnabled={isExpirationEnabled}
						setIsExpirationEnabled={setIsExpirationEnabled}										
					/>
				)}
				{uploadState === uploadStates[2] && <UploadingFile />}
				{uploadState === uploadStates[3] && (
					<DisplayUploadedFileInfo info={uploadedFileInfo} onUploadNew={() => {
						setUploadState('/none');
						setFilePendingUpload(undefined);
					}}/>
				)}
			</div>
		</section>
	);
}
