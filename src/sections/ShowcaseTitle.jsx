import React from 'react';
import { Link } from 'react-router-dom';

const ShowcaseTitle = () => {

    return (
        <div className="flex items-center justify-between mt-20 mb-8 px-5 md:px-20">

            <h2 className="text-3xl md:text-4xl font-semibold text-white">
                My Projects
            </h2>


            <Link to="/projects" className="inline-block cta-wrapper">
                <button type="button" className="cta-button cta-sm group">

                    <div className="bg-circle" />

                    <p className="text">
                        More Projects
                    </p>

                    <div className="arrow-wrapper">
                        <img src="/images/arrow-right.svg" alt="arrow" />
                    </div>

                </button>
            </Link>

        </div>
        
    );
}  

export default ShowcaseTitle;