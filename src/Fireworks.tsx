"use client";

import { useEffect, useRef } from "react";

const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: any[] = [];
    const fireworks: any[] = [];

    // Snowflake class
    class Snowflake {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random();
      }

      update() {
        this.y += this.speed;
        if (this.y > height) {
          this.y = 0;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Firework class
    class Firework {
      x: number;
      y: number;
      speedY: number;
      color: string;
      explode: boolean;
      particles: any[];

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.speedY = Math.random() * -6 - 4;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.explode = false;
        this.particles = [];
      }

      update() {
        this.y += this.speedY;
        this.speedY += 0.1;
        if (this.speedY >= 0 && !this.explode) {
          this.explode = true;
          for (let i = 0; i < 30; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
          }
        }
      }

      draw() {
        if (!this.explode) {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, 4, 10);
        }
      }
    }

    class Particle {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      color: string;
      lifetime: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = color;
        this.lifetime = 50;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.lifetime -= 1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 3, 3);
      }
    }

    for (let i = 0; i < 100; i++) {
      particles.push(new Snowflake());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Snowflakes
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Fireworks
      if (Math.random() < 0.02) {
        fireworks.push(new Firework());
      }

      fireworks.forEach((f, index) => {
        f.update();
        f.draw();
        if (f.explode) {
          f.particles.forEach((p: any, i: number) => {
            p.update();
            p.draw();
            if (p.lifetime <= 0) {
              f.particles.splice(i, 1);
            }
          });
          if (f.particles.length === 0) {
            fireworks.splice(index, 1);
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />;
};

export default Fireworks;
