import { OrbitControls} from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

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
        smallSpherePivot.children[0].getWorldPosition(light.current.target.position)
        // To make the light move with the small sphere
        //smallSpherePivot.children[0].getWorldPosition(light.current.position)
    })

    const light = useRef()
    // const shadowCamera = useRef()

    const { scene } = useThree()

    // shadowCamera
    // useEffect(() => {
    //     scene.add(light.current.target)
    //     shadowCamera.current = new THREE.CameraHelper(light.current.shadow.camera)
    //     scene.add(shadowCamera.current)
    //     return () => {
    //         scene.remove(light.current.target)
    //         scene.remove(shadowCamera.current)
    //     }
    // },[light.current])

    //spotLight
    useEffect(() => {
        scene.add(light.current.target)
        return () => {
            scene.remove(light.current.target)
        }
    },[light])
    

    return (
        <>
        <OrbitControls />

        {/* Lights */}
        <ambientLight intensity={0.1} />

        {/* <directionalLight
            ref={light}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-camera-left={-6}
            shadow-camera-right={6}

            shadow-mapSize={[512*4,512*4]}

            castShadow
            color={0xffffff}
            intensity={1.7}
            position={[0,5,0]}
            target-position={[0,0,0]}
        /> */}

        {/* <pointLight 
            ref={light}
            castShadow
            color="#ffffff"
            intensity={42}
            position={[0,5,0]}
        /> */}

        <spotLight 
            castShadow
            ref={light}

            shadow-radius={6}
            shadow-blurSamples={8}
            shadow-bias={-0.0001}

            shadow-mapSize={[1024/2,1024/2]}

            color={0xffffff}
            intensity={50}
            position={[0,5,0]}
            angle={THREE.MathUtils.degToRad(60)}
        />

        {/* Geometry */}
        <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)}>
            <planeGeometry args={[10,10]} />
            <meshStandardMaterial
                color="#2c3e50"
                roughness={0.5}
                metalness={0.5} 
                side={THREE.DoubleSide}
            />
        </mesh>

        <mesh castShadow receiveShadow position-y={1.7}>
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
                        castShadow receiveShadow
                        geometry={torusGeometry}
                        material={torusMaterial}
                        position={[3,0.5,0]}
                    />
                </group>
            )
        })}

        <group name="smallSpherePivot">
            <mesh castShadow receiveShadow position={[3,0.5,0]}>
                <sphereGeometry args={[0.3,32,32]} />
                <meshStandardMaterial 
                    color="#e74c3c"
                    roughness={0.2}
                    metalness={0.5}
                />
            </mesh> 
        </group>
        </>
    )
}

export default MyElement3D