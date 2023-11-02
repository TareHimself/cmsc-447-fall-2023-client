import React from 'react';
import Nav from '../components/Nav/Nav';

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
				]}
			/>
			<div className="page">
				<section
					id="intro"
					style={{
						backgroundColor: 'red',
					}}
				>
				
				</section>
				<section
					id="about"
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
					

				</section>
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
