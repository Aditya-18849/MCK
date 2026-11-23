import { MotionConfig } from "motion/react";
import { Hero, Nav } from "@/sections/Hero";
import { Thirteen } from "@/sections/Thirteen";
import { Coaching, Finale, Partners, Posing, Record, Road, RoomStage } from "@/sections/Sections";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Thirteen />
        <Road />
        <RoomStage />
        <Posing />
        <Record />
        <Coaching />
        <Partners />
      </main>
      <Finale />
    </MotionConfig>
  );
}
