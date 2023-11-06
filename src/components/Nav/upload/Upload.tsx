import React, { useCallback, useId, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import { CircularProgress, Stack } from '@mui/material';
import { IFileUploadResponse, IServerResponse } from '../../../types';
import { ServerUrl } from '../../../globals';
import toast from 'react-hot-toast';

<<<<<<< HEAD
function UploadIntro({ uploadInputId }: { uploadInputId: string }) {
=======



function UploadIntro({ uploadInputId }: { uploadInputId: string }) {

>>>>>>> js-Upload-Options-Component
	return (
		<button
			onClick={() => {
				document.getElementById(uploadInputId)?.click();
			}}
		>
			Select File
		</button>
<<<<<<< HEAD
=======
		
>>>>>>> js-Upload-Options-Component
	);
}

function UploadFileOptions({
	file,
	startUpload,
<<<<<<< HEAD
}: {
	file: File | undefined;
	startUpload: () => void;
=======
	
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

	expirationTime: number | null;
	setExpirationTime: (time: number | null) => void;
	isExpirationEnabled: boolean;
	setIsExpirationEnabled: (isEnabled: boolean) => void;



>>>>>>> js-Upload-Options-Component
}) {
	if (!file) {
		return <></>;
	}

	return (
		<div className="options-list">
			<h2
				style={{
					color: 'white',
				}}
			>
				{file.name}
			</h2>
<<<<<<< HEAD
			<div className="option"></div>
			<button style={{ fontSize: 25 }} onClick={startUpload}>
				Upload
			</button>
=======
			
			
			<button style={{ fontSize: 25 }} onClick={startUpload}>
				Upload
			</button>

			{/* PASSWORD OPTIONS ADDED BELOW*/}

			<div className="option">
				<div className='widget-container'>
					<h2
						style={{
							color: 'white',
							fontSize: 20,
							marginTop: '20px',
							// textAlign: 'justify',
							verticalAlign: 'middle',
							
						}}
					>
						Enable Password:
					</h2>

					<label className="switch">

						<input
							
							type="checkbox"
							checked={isPasswordEnabled}
							onChange={() => setIsPasswordEnabled(!isPasswordEnabled)}
						/>
						<span className="slider round"></span>

					</label>
				</div>

			</div>
			{isPasswordEnabled ? (
				<div className="option">
				<input
					type="password"
					placeholder="Enter Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				</div>
			) : null}
			{/* PASSWORD OPTIONS ADDED END*/}

			<div className="option">

				<div className='widget-container'>
					<h2
						style={{
							color: 'white',
							fontSize: 20,
							marginTop: '20px',
						}}
					>
						Enable Expiration Time:
					</h2>

					<label className="switch">
						<input
							type="checkbox"
							checked={isExpirationEnabled}
							onChange={() => setIsExpirationEnabled(!isExpirationEnabled)}
						/>
						<span className="slider round"></span>
					</label>
				</div>
			</div>

			{isExpirationEnabled ? (
				<div className="option">
				<input
					type="number"
					placeholder="Expiration Time (minutes)"
					value={expirationTime || ''}
					onChange={(e) => setExpirationTime(Number(e.target.value))}
				/>
				</div>
			) : null}

>>>>>>> js-Upload-Options-Component
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

<<<<<<< HEAD
=======
	const [password, setPassword] = useState("");
	const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

	const [expirationTime, setExpirationTime] = useState<number | null>(null);

	const [isExpirationEnabled, setIsExpirationEnabled] = useState(false);


>>>>>>> js-Upload-Options-Component
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
<<<<<<< HEAD
=======

		// added password to form data/database
		if (isPasswordEnabled) {
			form.append('password', password);
		}

		if (isExpirationEnabled) {
			form.append('expirationTime', expirationTime?.toString() || '');
		}		  
		
>>>>>>> js-Upload-Options-Component
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
<<<<<<< HEAD
	}, [filePendingUpload]);
=======

	}, [filePendingUpload, isPasswordEnabled, password, isExpirationEnabled, expirationTime]);
>>>>>>> js-Upload-Options-Component

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
<<<<<<< HEAD
=======

						setPassword={setPassword}
						password={password}
						isPasswordEnabled={isPasswordEnabled}
						setIsPasswordEnabled={setIsPasswordEnabled}

						setExpirationTime={setExpirationTime}
						expirationTime={expirationTime}
						isExpirationEnabled={isExpirationEnabled}
						setIsExpirationEnabled={setIsExpirationEnabled}

>>>>>>> js-Upload-Options-Component
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
