import React from 'react';
import Nav from '../components/Nav/Nav';
import Upload from '../components/Nav/upload/Upload';

export default function Home() {
	return (
		<>
			<Nav
				links={[
					{
						label: 'Upload',
						href: '#upload',
					},
					{
						label: 'Intro',
						href: '#intro',
					},
					{
						label: 'Contact',
						href: '#contact',
					},
				]}
			/>
			<div className="page">
				<Upload/>
				<section
					id="intro"
					// style={{
					// 	backgroundColor: 'red',
					// }}
				>
					<h1 style={{margin:'70px'}}>FileCher: A File Sharing Platform</h1>
					<h3 style={{margin:'70px', color: "white"}}>FileCher is dedicated to providing a quick and simple way for users to share their files.
					With FileCher you can anonymously upload files and secure them through password protection and an
					automatic expiration timer.
					</h3>
				
				</section>
				{/* <section
					id="upload"
					style={{
						margin: '20px',
						border: '1px solid #FF6666',
						backgroundColor: '#FFCCCC',
						
					}}
				>
					<h1 style={{margin: '70px', backgroundColor: '#FF6666', color: 'white', textAlign: 'center', padding: "6px 12px"}}> Upload File</h1>
					<label style={{backgroundColor: '#FF6666', color: 'white'}}>
						<input type="file" style={{display: "none"}} onChange={e => console.log(e.target.files)}/>
						Select File
					</label>
					

				</section> */}
				<section
					id="contact"
					// style={{
					// 	backgroundColor: 'green',
					// }}
				>
					<h1 style={{margin:'70px'}}>Questions and concerns?</h1>
				<h3 style={{margin:'70px', color:"white"}}>Contact us at xxxxinsertemailxxx@gmail.com</h3>
				</section>
				
			</div>
		</>
	);
}
