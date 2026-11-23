import { MotionConfig } from "motion/react";
import { WhatsAppFloat } from "@/components/whatsapp";
import { Hero, Nav } from "@/sections/Hero";
import { Thirteen } from "@/sections/Thirteen";
import { Transformations } from "@/sections/Transformations";
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
        <Transformations />
        <Coaching />
        <Partners />
      </main>
      <Finale />
      <WhatsAppFloat />
    </MotionConfig>
  );
}
