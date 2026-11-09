import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Menu, X } from "lucide-react";
import GameLabsModal from "./components/GameLabsModal";

import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiSpringboot,
  SiPostgresql,
  SiPython,
  SiNodedotjs,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss,
  SiElectron,
  SiLinux,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";
import "./App.css";

const projects = [
  {
    number: "01",
    name: "GameLabs",
    category: "Desktop Application",
    description:
      "Launcher de jogos para PC com integração a emuladores, suporte a controles, biblioteca centralizada e sistema de licenciamento.",
    stack: ["React", "TypeScript", "Electron"],
    image: "/images/Gamelabs.png",
  },
];

const fallingLeaves = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${4 + ((i * 13) % 27)}%`,
  delay: `${-(i * 1.9)}s`,
  duration: `${7 + (i % 5) * 1.6}s`,
  size: 13 + (i % 4) * 5,
}));

function FallingLeaves() {
  return (
    <div className="falling-leaves" aria-hidden="true">
      {fallingLeaves.map((leaf) => (
        <span
          key={leaf.id}
          className="falling-leaf"
          style={{
            left: leaf.left,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
            width: leaf.size,
            height: leaf.size,
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path
              d="M50 6 L60 24 L75 16 L72 35 L91 39 L76 52 L85 66 L61 65 L54 83 L50 96 L46 83 L39 65 L15 66 L24 52 L9 39 L28 35 L25 16 L40 24 Z"
              fill="#b71916"
              stroke="#e64a24"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M50 18 L50 90 M50 49 L30 38 M50 56 L72 40"
              fill="none"
              stroke="#73100d"
              strokeWidth="2"
              opacity="0.65"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

function LanternGlow() {
  return (
    <div className="lantern-effects" aria-hidden="true">
      <span className="lantern-glow glow-one" />
      <span className="lantern-glow glow-two" />
      <span className="lantern-glow glow-three" />
      <span className="lantern-glow glow-four" />
    </div>
  );
}

const technologies = [
  { name: "Java", Icon: FaJava },
  { name: "Spring Boot", Icon: SiSpringboot },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React", Icon: SiReact },
  { name: "Electron", Icon: SiElectron },
  { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS3", Icon: SiCss },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Python", Icon: SiPython },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Docker", Icon: SiDocker },
  { name: "Linux", Icon: SiLinux },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gameLabsOpen, setGameLabsOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-symbol">鳥居</span>
          JHONATA<span>.DEV</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          {[
            ["Início", "#home"],
            ["Sobre", "#sobre"],
            ["Projetos", "#projetos"],
            ["Tecnologias", "#tecnologias"],
            ["Idiomas", "#idiomas"],
            ["Contato", "#contato"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-overlay" />
        <LanternGlow />
        <FallingLeaves />

        <div className="hero-content">
          <p className="eyebrow">SOFTWARE ENGINEERING STUDENT</p>

          <h1>
            JHONATA<span>.DEV</span>
          </h1>

          <p className="hero-description">
            Construindo aplicações, explorando tecnologias e transformando
            ideias em software.
          </p>

          <div className="hero-actions">
            <a href="#projetos" className="button primary">
              Ver Projetos <ArrowRight size={18} />
            </a>

            <a href="#sobre" className="button secondary">
              Sobre Mim
            </a>
          </div>
        </div>

        <a href="#sobre" className="scroll-indicator">
          <span>EXPLORE</span>
          <ArrowDown size={23} />
        </a>
      </section>

      <section id="sobre" className="content-section about-section">
        <div className="section-inner reveal">
          <p className="section-kicker">01 / A JORNADA</p>

          <h2>
            Cada grande projeto
            <br />
            começa com uma ideia.
          </h2>

          <p className="section-description">
            Sou Jhonata Azevedo, estudante de Engenharia de Software, com foco
            em desenvolvimento backend e interesse em criar aplicações, jogos e
            experiências digitais.
          </p>

          <p className="section-description">
            Estou construindo minha trajetória por meio de estudos, projetos
            práticos e evolução contínua.
          </p>

          <div className="profile-card">
            <img
              src="/images/profile.png"
              alt="Retrato de Jhonata Azevedo"
              className="profile-photo"
              loading="lazy"
            />

            <div className="profile-details">
              <span className="profile-label">DESENVOLVEDOR EM FORMAÇÃO</span>

              <h3>Jhonata Azevedo</h3>

              <p>
                Engenharia de Software
                <br />
                Backend & Aplicações
              </p>

              <span className="profile-availability">
                <span className="availability-dot" />
                Aberto a oportunidades de estágio
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="projetos" className="content-section projects-section">
        <div className="section-inner">
          <div className="section-heading reveal">
            <p className="section-kicker">02 / CRIAÇÕES</p>

            <h2>Projetos selecionados.</h2>

            <p>Ideias transformadas em experiências e aplicações.</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.number}>
                <button
                  type="button"
                  className="project-open"
                  aria-label={`Ver detalhes do projeto ${project.name}`}
                  onClick={() => setGameLabsOpen(true)}
                >
                  <div className="project-art">
                    <img
                      src={project.image}
                      alt={`Interface do projeto ${project.name}`}
                      className="project-image"
                      loading="lazy"
                    />
                    <span>{project.number}</span>
                  </div>

                  <div className="project-info">
                    <p className="project-category">{project.category}</p>

                    <h3>{project.name}</h3>

                    <p>{project.description}</p>

                    <div className="tags">
                      {project.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  <span className="project-open-hint">
                    Ver detalhes e imagens
                    <ArrowRight size={16} />
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tecnologias" className="content-section skills-section">
        <div className="section-inner reveal">
          <p className="section-kicker">03 / FERRAMENTAS</p>

          <h2>Tecnologias & aprendizado.</h2>

          <p className="section-description">
            Ferramentas que utilizo ou estou estudando para desenvolver soluções
            cada vez melhores.
          </p>

          <div className="skills-grid">
            {technologies.map(({ name, Icon }) => (
              <div className="skill-item" key={name}>
                <Icon className="technology-icon" aria-hidden="true" />
                <strong>{name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="idiomas" className="content-section languages-section">
        <div className="section-inner reveal">
          <p className="section-kicker">04 / COMUNICAÇÃO GLOBAL</p>

          <h2>Idiomas.</h2>

          <p className="section-description">
            Desenvolvendo minhas habilidades em inglês para ampliar minhas
            oportunidades de colaboração e atuação internacional.
          </p>

          <div className="languages-grid">
            <article className="language-card">
              <span className="language-flag">🇺🇸</span>

              <div>
                <h3>Inglês</h3>
                <p>Básico • Em desenvolvimento</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="contato" className="content-section contact-section">
        <div className="section-inner reveal">
          <p className="section-kicker">05 / PRÓXIMO CAPÍTULO</p>

          <h2>Vamos construir algo?</h2>

          <p className="section-description">
            Estou aberto a oportunidades de estágio, colaboração e novos
            desafios em desenvolvimento.
          </p>

          <div className="contact-links">
            <a
              href="https://github.com/JNSXINC"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/jhonata-s-azevedo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href={`https://wa.me/5521979606555?text=${encodeURIComponent(
                "Olá, Jhonata! Tudo bem? 👋 Conheci seu portfólio e gostaria de saber mais sobre seus serviços de desenvolvimento. Podemos conversar sobre um projeto?",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
      </section>

      <GameLabsModal
        open={gameLabsOpen}
        onClose={() => setGameLabsOpen(false)}
      />

      <footer>
        <span>JHONATA.DEV</span>
        <p>Feito com React, TypeScript e dedicação.</p>
        <a href="#home">Voltar ao início ↑</a>
      </footer>
    </main>
  );
}
