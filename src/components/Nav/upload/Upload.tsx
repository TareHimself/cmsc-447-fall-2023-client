import React, { useCallback, useId, useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import { CircularProgress, Stack } from '@mui/material';
import { IFileUploadResponse, IServerResponse } from '../../../types';
import { ServerUrl } from '../../../globals';
import toast from 'react-hot-toast';

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
}: {
	file: File | undefined;
	startUpload: () => void;
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
			<div className="option"></div>
			<button style={{ fontSize: 25 }} onClick={startUpload}>
				Upload
			</button>
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
}: {
	info: IFileUploadResponse | undefined;
}) {
	if (!info) {
		return <></>;
	}

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
				await navigator.clipboard.writeText(`${window.location.origin}/access/${info.id}`)
				toast("Copied")
			}}>Copy Url</button>
			<button style={{ fontSize: 20 }}>Generate Qr Code</button>
			<button style={{ fontSize: 20 }}>Upload Another File</button>
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
		console.log('Uploading file');
		const response = await fetch(`${ServerUrl}/upload`, {
			method: 'PUT',
			body: form,
		}).then(
			(c) => c.json() as Promise<IServerResponse<IFileUploadResponse>>
		);

		if (response.error !== null) {
			setUploadState('/uploadFail');
		} else {
			setUploadedFileInfo(response.data);
			setUploadState('/uploadSuccess');
		}
	}, [filePendingUpload]);

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
					/>
				)}
				{uploadState === uploadStates[2] && <UploadingFile />}
				{uploadState === uploadStates[3] && (
					<DisplayUploadedFileInfo info={uploadedFileInfo} />
				)}
			</div>
		</section>
	);
}
