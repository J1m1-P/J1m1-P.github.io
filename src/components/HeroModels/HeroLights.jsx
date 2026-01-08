const HeroLights = () => {

    return (
        <> 
            {/* <ambientLight intensity={0.2} color="#1A1A40" />
            <directionalLight position={[5, 5, 5]} intensity={1} /> */}

            <spotLight 
                position={[2, 5 ,6]} 
                angle={0.15}
                intensity={100}
                penumbra={0.2}
                color="white"
            />

            <spotLight 
                position={[4, 5, 4]}
                angle={0.3}
                intensity={40}
                penumbra={0.5}
                color="#4CC9F0"
            />

        </>
    )

}

export default HeroLights