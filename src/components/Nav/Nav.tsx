import React from 'react';
import styles from './Nav.module.css';

export type NavLink = {
	label: string;
	href: string;
};

const Links: React.FC<{ links: NavLink[] }> = ({ links }) => {
	return (
		<div className={styles['links-container']}>
			{links.map((link: NavLink) => {
				return (
					<div key={link.href} className={styles['link']}>
						<a href={link.href}>{link.label}</a>
					</div>
				);
			})}
		</div>
	);
};

const Nav: React.FC<{ links: NavLink[] }> = ({ links }) => {
	return (
		<nav className={styles.navbar}>
			<div className={styles['logo-container']}>
				<a href='/'>FileCher</a>
			</div>
			<Links links={links} />
		</nav>
	);
};

export default Nav;
/*
export default function Home() {
    return (
        
    );
}
*/
