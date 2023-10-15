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
				></section>
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
