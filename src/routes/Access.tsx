import React, { useEffect, useId, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { ServerUrl } from '../globals';
import { IFileAccessResponse, IServerResponse } from '../types';
import './access.css';

export default function Access() {
	const { infoId } = useParams();
	const [infoData, setInfoData] = useState<IFileAccessResponse | undefined>(
		undefined
	);
	const downloadButtonId = useId();

	return (
		<div
			style={{
				display: 'flex',
				width: '100vw',
				height: '100vh',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: '22px',
			}}
		>
			{infoData == undefined && (
				<>
					<button
						onClick={() => {
							toast
								.promise(
									new Promise<
										IFileAccessResponse | undefined
									>((res, rej) => {
										console.log(
											'Accessing',
											`${ServerUrl}/access/${infoId}`
										);
										fetch(`${ServerUrl}/access/${infoId}`)
											.then(
												(c) =>
													c.json() as Promise<
														IServerResponse<IFileAccessResponse>
													>
											)
											.then((c) => {
												console.log(c);
												if (c.error !== null) {
													console.error(c.error);
													rej(c.error);
												} else {
													res(c.data);
												}
											})
											.catch((e) => {
												console.error(e);
												rej(e);
											});
									}),
									{
										loading: 'Accessing File',
										success: 'Accessed File',
										error: 'Something Went Wrong',
									}
								)
								.then((c) => {
									if (c) {
										setInfoData(c);
									}
								});
						}}
					>
						Access File
					</button>
					<button
						onClick={() => {
							window.location.href = window.location.origin;
						}}
					>
						I Dont Know Why I Am Here
					</button>
				</>
			)}

			{infoData !== undefined && (
				<>
					<span>
						<h3>Name</h3>
						<h2>{infoData.filename}</h2>
					</span>
					<span>
						<h3>Mime</h3>
						<h2>{infoData.mime}</h2>
					</span>
					<span>
						<h3>Views</h3>
						<h2>{infoData.views}</h2>
					</span>
					<span>
						<h3>Size</h3>
						<h2>{`${(infoData.size / (1024 * 1024)).toFixed(
							2
						)}MB`}</h2>
					</span>
					<a
						id={downloadButtonId}
						style={{
							display: 'none',
						}}
						href={infoData.url}
						download={infoData.filename}
					></a>
					<button
						onClick={() => {
							document.getElementById(downloadButtonId)?.click();
						}}
					>
						Download
					</button>
				</>
			)}
		</div>
	);
}
