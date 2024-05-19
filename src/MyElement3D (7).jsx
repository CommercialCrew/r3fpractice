import { Environment, OrbitControls, useHelper } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { RectAreaLightUniformsLib } from "three/examples/jsm/Addons.js"
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js"

const torusGeometry = new THREE.TorusGeometry(0.4,0.1,32,32)
const torusMaterial = new THREE.MeshStandardMaterial({
    color: "#9b59b6",
    roughness: 0.5,
    metalness: 0.9
})

//RectAreaLightUniformsLib.init()


function MyElement3D(){
    useFrame((state) => {
        const time = state.clock.elapsedTime
        const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")
        smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50)

        // To make the light track the small sphere
        //smallSpherePivot.children[0].getWorldPosition(light.current.target.position)
        // To make the light move with the small sphere
        //smallSpherePivot.children[0].getWorldPosition(light.current.position)
    })

    //const light = useRef()
    //RectAreaLight Helper
    //useHelper(light, RectAreaLightHelper)

    //SpotLight Helper
    //useHelper(light, THREE.SpotLightHelper)
    
    
    //PointLight Helper
    //useHelper(light, THREE.PointLightHelper, 0.5)



    //DirectionalLight Helper

    // useHelper(light, THREE.DirectionalLightHelper)

    // const { scene } = useThree()

    // useEffect(() => {
    //     scene.add(light.current.target)
    //     return () => {
    //         scene.remove(light.current.target)
    //     }
    // },[light])
    
    return (
        <>
            <OrbitControls />

            <Environment 
                blur={0.9}
                background
                files={"./public/images/metal/autumn_field_4k.hdr"}
            />

            {/* <ambientLight color="#ff0000" intensity={5} /> */}
            {/* <hemisphereLight args={["#00f", "#f00", 7]} /> */}
            {/* <directionalLight
                ref={light}
                color={0xffffff}
                intensity={3}
                position={[0,5,0]}
                target-position={[1,0,0]}
            /> */}
            {/* <pointLight
                ref={light}
                color="#ffffff"
                intensity={20}
                position={[0,5,0]}
                distance={1}
            /> */}

            {/* <spotLight 
                ref={light}
                color={0xffffff}
                intensity={25}
                position={[0,5,0]}
                target-position={[0,0,0]}
                distance={0}
                angle={THREE.MathUtils.degToRad(30)}
                penumbra={0}
            /> */}

            {/* <rectAreaLight
                ref={light}
                color="#ffffff"
                intensity={10}
                width={2}
                height={5}
                position={[0,5,0]}
                rotation-x = {THREE.MathUtils.degToRad(-90)}
            /> */}


            <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
                <planeGeometry args={[10,10]} />
                <meshStandardMaterial
                    color="#2c3e50"
                    roughness={0.5}
                    metalness={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
                <sphereGeometry args={[1.5,64,64,0,Math.PI]} />
                <meshStandardMaterial 
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.2}
                />
            </mesh>

            {new Array(8).fill().map((item,index) => {
                return (
                    <group key={index} rotation-y={THREE.MathUtils.degToRad(45*index)}>
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


        </>
    )
}

export default MyElement3D