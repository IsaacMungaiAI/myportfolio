const ParticleBackground = () => {
  const particles = Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    />
  ));
  return (
    <div
      className="fixed inset-0 -z-10 animate-bg bg-black"
    >
      {particles}
    </div>
  );

};
export default ParticleBackground;