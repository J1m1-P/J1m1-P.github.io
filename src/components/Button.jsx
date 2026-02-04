import { b } from "framer-motion/client";

const Button = ({text, className, id}) => {  
    return (

        <a 
        
        onClick={(e) => {
            e.preventDefault(); // To prevent reloading the screen onclick
            const target = document.getElementById('counter'); // Scroll to the section with id 'counter'
            if (target && id) {
                const offset = window.innerHeight * 0.15; // 15% offset from the top
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({top, behavior: 'smooth'})
            }
        }}
        
        className={`inline-block ${className ?? ""} cta-wrapper`}   >

            <div className="cta-button group">

                <div className="bg-circle" />

                <p className="text">
                    {text}
                </p>

                <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow" />
                </div>

            </div>

        </a>

    )
}

export default Button