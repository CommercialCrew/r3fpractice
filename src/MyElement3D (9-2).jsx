import { AccumulativeShadows, ContactShadows, OrbitControls, RandomizedLight, SoftShadows } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useControls } from "leva"

//Geometry & material (Global)
const torusGeometry = new THREE.TorusGeometry(0.4,0.1,32,32)
const torusMaterial = new THREE.MeshStandardMaterial({
    color: "#9b59b6",
    roughness: 0.5,
    metalness: 0.9
})


function MyElement3D(){
    useFrame((state) => {
        const time = state.clock.elapsedTime
        const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")
        smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 30)

        // To make the light track the small sphere
        //smallSpherePivot.children[0].getWorldPosition(light.current.target.position)
        // To make the light move with the small sphere
        //smallSpherePivot.children[0].getWorldPosition(light.current.position)
    })

    // SoftShadows
    // const config = useControls({
    //     size: { value: 25, min: 0, max: 100 },
    //     focus: { value: 0, min: 0, max: 10},
    //     samples: { value: 10, min: 1, max: 100, step: 1 }
    // })

    //const light = useRef()

    //const { scene } = useThree()

    

    return (
        <>
        <OrbitControls />

        {/* SoftShadows */}
        {/* <SoftShadows 
            {...config}
        /> */}

        {/* Lights */}
        <ambientLight intensity={0.1} />

        <directionalLight
            //ref={light}

            //castShadow
            color={0xffffff}
            intensity={1}
            position={[0,5,0]}
        />

        <ContactShadows 
            position={[0,0,0]}
            scale={10}
            resolution={256}
            color="#ff0000"
            opacity={1}
            blur={1}
        />

        {/* Geometry */}
        {/* <mesh  rotation-x={THREE.MathUtils.degToRad(-90)}>
            <planeGeometry args={[10,10]} />
            <meshStandardMaterial
                color="#2c3e50"
                roughness={0.5}
                metalness={0.5} 
                side={THREE.DoubleSide}
            />
        </mesh> */}

        <mesh  position-y={1.7}>
            <torusKnotGeometry args={[1,0.2,128,32]} />
            <meshStandardMaterial 
                color="#ffffff"
                roughness={0.1}
                metalness={0.2}
            />
        </mesh>

        {new Array(10).fill().map((item,index) => {
            return(
                <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
                    <mesh 
                        geometry={torusGeometry}
                        material={torusMaterial}
                        position={[3,0.5,0]}
                    />
                </group>
            )
        })}

        <group name="smallSpherePivot">
            <mesh position={[3,0.5,0]}>
                <sphereGeometry args={[0.3,32,32]} />
                <meshStandardMaterial 
                    color="#e74c3c"
                    roughness={0.2}
                    metalness={0.5}
                />
            </mesh> 
        </group>
{/* 
        <AccumulativeShadows
            position={[0,0.1,0]}
            scale={12}
            color="#000000"
            opacity={0.7}
            alphaTest={1}
            frames={Infinity}
            temporal
            blend={30}
        >

            <RandomizedLight 
                radius={0.5}
                ambient={0.21}
                intensity={1.5}
                position={[5,3,0]}
            />

            <RandomizedLight 
                amount={1}
                radius={0.5}
                ambient={0.21}
                intensity={0.6}
                position={[-5,3,5]}
            />
        </AccumulativeShadows> */}
        </>
    )
}

export default MyElement3D