import React, { useEffect } from 'react';
import { navLinks } from '../constants/index.js';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';

const NavBar = () => {

    // Handling scroll effect for navbar
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {

        const handleScroll = () => {
            const isScrolled = window.scrollY > 5;
            setScrolled(true);
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    // Handling fade-in effect for navbar
    const [show, setShow] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(t);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled'}`}>

            <div className={`inner 
                transition-all duration-1000 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                }`}
            >

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