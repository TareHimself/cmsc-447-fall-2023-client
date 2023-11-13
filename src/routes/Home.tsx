import React from 'react';
import Nav from '../components/Nav/Nav';
import FileUpload from '../Components/FileUpload';
import UploadOpt from '../Components/UploadOpt';
import DownloadPage from '../Components/DownloadButton';


export default function Home() {
	return (
		<>
			<Nav
				links={[
					{
						label: 'Intro',
						href: '#intro',
					},
					{
						label: 'About',
						href: '#about',
					},
					{
						label: 'Contact',
						href: '#contact',
					},
					{
						label: 'TEST DOWNLOAD PAGE',
						href: '#Download-hash',
					},
				]}
			/>
			<div className="page">
				
				<section
					id="intro"
					style={{
						backgroundColor: 'red',
					}}
				>
					        <div >
						<h1>File Upload App</h1>
						<FileUpload />
					</div>
					<div>
						<h3>Upload Options:</h3>
						<UploadOpt />
						
					</div>
					

				</section>
				<section
					id="about"
					style={{
						backgroundColor: 'blue',
					}}
				></section>
				<section
					id="contact"
					style={{
						backgroundColor: 'green',
					}}
				></section>
			</div>
		</>
	);
}
