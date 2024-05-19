import { Environment, OrbitControls, useAnimations, useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import * as THREE from "three"
import { useControls } from "leva"

function MyElement3D(){
    const model = useGLTF("./public/models/model.glb")
    const animations = useAnimations(model.animations, model.scene)
    const { actionName } = useControls({
        actionName: {
            value: animations.names[1],
            options: animations.names
        }
    })

    useEffect(() => {
        const action = animations.actions[actionName]
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }    
    }, [actionName])

    const [ height, setHeight ] = useState(0)
    
    useEffect(() => {
        let minY = Infinity, maxY = -Infinity

        model.scene.traverse((item) => {
            if(item.isMesh){
                const geomBbox = item.geometry.boundingBox
                if (minY > geomBbox.min.y) minY = geomBbox.min.y
                if (maxY < geomBbox.max.y) maxY = geomBbox.max.y
            }
        })

        const h = maxY - minY
        setHeight(h)
        console.log(h)
    },[model.scene])
    return (
        <>
        <OrbitControls />

        {/* Lights */}

        <Environment preset="sunset" />

        {/* models */}
        <primitive 
            scale={5}
            position-y={-(height/2)*5}
            object={model.scene} />
        </>
    )
}

export default MyElement3D