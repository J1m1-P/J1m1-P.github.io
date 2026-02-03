import * as THREE from 'three'

const HeroLights = () => {

    return (
        <> 
            {/* <ambientLight intensity={0.2} color="#1A1A40" />
            <directionalLight position={[5, 5, 5]} intensity={1} /> */}

            
            {/* Lamp light */}
            <spotLight 
                position={[2, 5 ,6]} 
                angle={0.15}
                intensity={100}
                penumbra={0.2}
                color="white"
            />

            {/* Left corner room light */}
            <spotLight 
                position={[4, 5, 4]}
                angle={0.3}
                intensity={40}
                penumbra={0.5}
                color="#4CC9F0"
            />

            {/* Laptop light */}
            <spotLight 
                position={[-3, 5, 5]}
                angle={0.4}
                intensity={60}
                penumbra={1}
                color="#9D4EDD"
            />

            {/* General room light 1*/}
            <primitive
                object={new THREE.RectAreaLight("#A259FF", 8, 3, 2)}
                position={[1, 3, 4]}
                intensity={15}
                rotation={[-Math.PI/4, Math.PI/4, 0]}
            />

            {/* General room light 2*/}
            <pointLight 
                position={[0, 1, 0]}
                intensity={10}
                color="#7209B7"
            />

            {/* General room light 3*/}
            <pointLight 
                position={[1, 2, -2]}
                intensity={10}
                color="#0D00A4"
            />



        </>
    )

}

export default HeroLights