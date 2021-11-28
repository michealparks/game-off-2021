const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        castShadow
        intensity={0.1}
        position={[2, 2, 20]}
        color="red"
      />
      <spotLight
        intensity={2}
        position={[-5, 10, 2]}
        angle={0.2}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      <rectAreaLight
        intensity={1}
        position={[4.5, 0, 2]}
        width={10} height={10}
      />
    </>
  )
}

export default Lights