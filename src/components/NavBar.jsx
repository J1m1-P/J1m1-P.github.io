import React, { useEffect } from 'react';
import { navLinks } from '../constants/index.js';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';

const NavBar = () => {

    const [scrolled, setScrolled] = useState(false);

    // Handling scroll effect for navbar
    useEffect(() => {

        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(true);
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>

            <div className="inner">

                <HashLink className="logo" smooth to="#hero">
                    Jimmy Pan
                </HashLink>

                <nav className="desktop">
                    <ul>
                        {navLinks.map(({link, name}) => (
                            <li key={name} className="group">
                                <HashLink smooth to={link}>
                                    <span>{name}</span>
                                    <span className="underline"/>
                                </HashLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <HashLink smooth to="#contact" className="contact-btn group">

                    <div className="inner">
                        <span>Contact Me</span>
                    </div>

                </HashLink>

            </div>

        </header>
    )

}
export default NavBar;