import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from 'react-responsive';
import { Room } from '../HeroModels/Room';
import HeroLights from '../HeroModels/HeroLights';
import Particles from '../HeroModels/Particles';
import { useEffect, useState } from 'react';

const HeroExperience = () => {

    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const viewOnly = !isTablet;

    const [show, setShow] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(t);
    }, []);


    const [active, setActive] = useState(false);

    return (

        <div 
            className="w-full h-full"
            onPointerDown={() => setActive(true)}
            onPointerUp={() => setActive(false)}
            onPointerLeave={() => setActive(false)}
        >
            <Canvas 
                className={`transition-opacity duration-4000 ease-out ${
                    show ? "opacity-100" : "opacity-0"
                } ${viewOnly ? "pointer-events-none" : ""}`}

                camera={{ position: [6, 5, 15], fov: 40}}

                frameloop={active ? "always" : "demand"}
            >

                <OrbitControls 
                    enabled = {!isTablet}
                    enablePan={false}
                    enableZoom={false}
                    maxDistance={20}
                    minDistance={5}
                    minPolarAngle={Math.PI / 5}
                    maxPolarAngle={Math.PI / 2}
                
                    minAzimuthAngle={-Math.PI / 4}
                    maxAzimuthAngle={Math.PI / 3}
                />

                <HeroLights />

                <Particles count={50}/> 

                <group
                    scale={isMobile ? 0.7 : 1}
                    position={[0, -3.5, 0]}
                    rotation={[0, -Math.PI/4, 0]}
                >
                    <Room /> 
                </group>

            </Canvas>
        
        </div>

    )
}

export default HeroExperience