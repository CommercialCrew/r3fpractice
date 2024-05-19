import { OrbitControls, MeshReflectorMaterial, CubeCamera, MeshRefractionMaterial, MeshTransmissionMaterial, MeshWobbleMaterial, MeshDistortMaterial, MeshDiscardMaterial, shaderMaterial } from "@react-three/drei"
import { useControls } from "leva"
import { useLoader, extend } from "@react-three/fiber"
import { RGBELoader } from "three-stdlib"
import * as THREE from "three"

function MyElement3D(){
    const SimpleMaterial = new shaderMaterial(
        {
            uColor: new THREE.Color(1,0,0)
        },
        `
            varying vec2 vUv;

            void main(){
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        `
            uniform vec3 uColor;
            varying vec2 vUv;

            void main(){
                gl_FragColor = vec4(vUv.y * uColor, 1.0);
            }
        `
    )

    extend({ SimpleMaterial })

    // Config for MeshTransmissionMaterial
    // const config = useControls({
    //     transmissionSampler: false,
    //     backside: false,
    //     samples: { value: 10, min: 1, max: 32, step: 1},
    //     resolution: {value: 512, min: 256, max: 2048, step: 256},
    //     transmission: { value: 1, min: 0, max: 1},
    //     roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    //     thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
    //     ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    //     chromaticAberration: { value: 0.06, min: 0, max: 1 },
    //     anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    //     distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    //     distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    //     temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
    //     clearcoat: { value: 1, min: 0, max: 1 },
    //     attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    //     attenuationColor: '#ffffff',
    //     color: '#c9ffa1',
    //     bg: '#839681'

    // })

    // Texture for MeshRefractionMaterial.
    // const texture = useLoader(RGBELoader, 
    //     'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/autumn_field_puresky_4k.hdr')
    return (
        <>
            <OrbitControls />

            <ambientLight intensity={0.2} />
            <directionalLight position={[0,1,0]} />
            <directionalLight position={[1,2,8]} intensity={0.7} />


            <mesh>
                <boxGeometry />
                <simpleMaterial uColor={"green"} />
            </mesh>

            {/* MeshWobble, Distort, and DiscardMaterial */}

            {/* <mesh>
                <torusGeometry />
                <MeshWobbleMaterial factor={10} speed={100} />
                <MeshDistortMaterial distort={0.6} speed={5} />
                <MeshDiscardMaterial />
            </mesh> */}

            
            
            {/* MeshTransmissionMaterial */}

            {/* <mesh>
                <sphereGeometry args={[1.4,128,128]} />
                <MeshTransmissionMaterial
                    {...config} background={new THREE.Color(config.bg)}  />
            </mesh>

            <mesh scale={0.3}>
                <torusGeometry args={[0.5,0.2,32]} />
                <meshStandardMaterial />
            </mesh> */}



            {/* MeshRefactionMaterial */}

            {/* <CubeCamera resolution={1024} frames={1} envMap={texture}>
                {(texture) => (
                    <mesh>
                        <dodecahedronGeometry />
                        <MeshRefractionMaterial
                            envMap={texture}
                            toneMapped={false}
                            bounces={2}
                            aberrationStrength={0.03}
                            ior={2.75}
                            fresnel={1}
                            color='white'
                            fastChroma={true}
                             />
                </mesh>
                )}
            </CubeCamera> */}



            {/* MeshReflactorMaterial */}

            {/* <mesh position={[0,-0.6,0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10,10]} />
                <MeshReflectorMaterial
                    blur={[300,210]}
                    resolution={256}
                    mixBlur={0}
                    mixStrength={1}
                    roughness={0.3}
                    depthScale={0}
                    minDepthThreshold={0.9}
                    maxDepthThreshold={1}
                    color={0xfffff}
                    metalness={0.1}


                />
            </mesh>

            <mesh position={[0,0,0]}>
                <boxGeometry />
                <meshStandardMaterial color="cyan" />
            </mesh> */}
        </>
    )
}

export default MyElement3D