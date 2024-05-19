import './App.css'
import { Canvas } from '@react-three/fiber'
import MyElement3D from './MyElement3D'

function App() {
  return (
    <>
      <Canvas camera={{
        fov: 75,
        position: [7,7,0]

      }}>
    <MyElement3D />

      </Canvas>
    </>
  )
}

export default App
