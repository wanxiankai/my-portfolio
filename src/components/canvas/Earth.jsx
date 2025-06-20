import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// 将经纬度转换为球面坐标的函数
const convertLatLonToSphere = (lat, lon, radius = 2.5) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

// 上海标记组件
const ShanghaiMarker = () => {
  const markerRef = useRef();

  // 上海的经纬度坐标
  const shanghaiLat = 31.2304;
  const shanghaiLon = 121.4737;

  // 计算上海在球面上的位置
  const position = convertLatLonToSphere(shanghaiLat, shanghaiLon);

  // 添加脉冲动画
  useFrame((state) => {
    if (markerRef.current) {
      const scale = 1 + 0.3 * Math.sin(state.clock.elapsedTime * 3);
      markerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* 发光的标记点 */}
      <mesh ref={markerRef} position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial
          color="#ffff00"
          toneMapped={false}
        />
      </mesh>

      {/* 外围光环效果 */}
      <mesh position={position}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 使用 Billboard 使文字始终朝向相机 */}
      <Billboard position={position}>
        <Text
          position={[0, 0.2, 0]} // 将文字置于标记点上方
          fontSize={0.15}
          color="yellow"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="black"
        >
          I am here in Shanghai
        </Text>
      </Billboard>
    </group>
  );
};

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");

  return (
    <group>
      <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
      <ShanghaiMarker />
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;