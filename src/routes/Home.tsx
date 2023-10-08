import React from 'react';

export default function Home() {
	return (
		<>
			<div className="nav">
				<a href="#intro">
					<div
						style={{
							backgroundColor: 'orange',
						}}
					></div>
				</a>
				<a href="#about">
					<div
						style={{
							backgroundColor: 'magenta',
						}}
					></div>
				</a>
				<a href="#contact">
					<div
						style={{
							backgroundColor: 'aquamarine',
						}}
					></div>
				</a>
			</div>
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
