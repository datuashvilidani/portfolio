import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <main>
      <Header />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}