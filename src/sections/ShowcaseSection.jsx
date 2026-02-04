import React from 'react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {

    const sectionRef = useRef(null);
    const project1Ref = useRef(null);
    const project2Ref = useRef(null);
    const project3Ref = useRef(null);
    
    // Projects section animation
    useGSAP(() => {

        const ctx = gsap.context(() => {

            const projects = [project1Ref.current, project2Ref.current, project3Ref.current];

            projects.forEach((card, index) => {
                gsap.fromTo(
                    card, 
                    {
                        y: 50, opacity: 0
                    },
                    {
                        y: 0, opacity: 1, duration: 0.4, delay: 0.1 * (index + 1), 
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 100%', 
                            // once: true, 
                            // force3D: true
                        }
                    }
                );
            });

            gsap.fromTo(
                sectionRef.current, 
                {opacity: 0}, 
                {opacity: 1, duration: 1}
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" ref={sectionRef} className="app-showcase pt-0">

            <div className="w-full ">

                <div className="showcaselayout">

                    {/* LEFT */}
                    <div className="first-project-wrapper" ref={project1Ref}>
                        {/* TODO: Change it to my own project
                        First Project */}

                        <div className="image-wrapper">
                            <img src="/images/project1.png" alt="Ryde" /> 
                        </div>

                        <div className="text-content">
                            <h2>On-Demand Rides Made Simple with a Powerful, User-Friendly App called Ryde</h2> 
                        </div>

                        <p className="text-white-50 md:text-xl">
                            An app built with React Native, Redux, Node.js, Express, and MongoDB that allows users to book rides quickly and easily. The app features real-time tracking, secure payments, and a user-friendly interface, making it the perfect solution for on-demand transportation needs.
                        </p>

                    </div>

                    {/* RIGHT */}

                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={project2Ref}>

                            <div className="image-wrapper bg-[#ffefdb]">
                                <img src="/images/project2.png" alt="Library Management Platform" />
                            </div>

                            <h2>Library Management Platform</h2>

                        </div>

                        <div className="project" ref={project3Ref}>

                            <div className="image-wrapper bg-[#ffe7eb]">
                                <img src="/images/project3.png" alt="YC Directory" />
                            </div>

                            <h2>YC Directory</h2>

                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}
export default ShowcaseSection