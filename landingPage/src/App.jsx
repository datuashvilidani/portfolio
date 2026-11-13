import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import SideNav from "./components/SideNav";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <main>
      <Header />
      <Projects />
      <Skills />
      <Contact />
      <SideNav />
    </main>
  );
}