import React from 'react';
import styles from './Nav.module.css'
import * as data from './links.json'
const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;

type Link = {
    label: string;
    href: string;
}

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    return (
        <div className={styles['links-container']}>
            {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles['link']}>
                        <a href={link.href}>
                            {link.label}
                        </a>
                    </div>
                )
            })}
        </div>
    )
};
const Nav: React.FC<{}> = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
                <span>Logo</span>
            </div>
            <Links links={links} />
        </nav>
    )
}


export default Nav;
/*
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
*/