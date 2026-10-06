import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <Status />
      <Vision />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h2>Click Away</h2>
      <nav>
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a href="#vision">Vision</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <h1>Build Your Website in Minutes with Click Away</h1>
      <p>
        An AI-powered platform that helps small businesses and individuals create
        professional websites without coding.
      </p>
      <button>Get Started</button>
    </section>
  );
}

function Problem() {
  return (
    <section className="section">
      <h2>Problem</h2>
      <p>
        Small businesses struggle with high costs, lack of technical skills, and
        complex tools when trying to build a website.
      </p>
    </section>
  );
}

function Solution() {
  return (
    <section className="section">
      <h2>Solution</h2>
      <p>
        Click Away simplifies everything using AI-powered tools that help users
        generate websites quickly and easily.
      </p>
    </section>
  );
}

function Features() {
  return (
    <section className="section" id="features">
      <h2>Features</h2>
      <ul>
        <li>AI-assisted website generation</li>
        <li>Simple interface for beginners</li>
        <li>Multiple tools in one platform</li>
        <li>Instant preview system</li>
      </ul>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="how">
      <h2>How It Works</h2>
      <ol>
        <li>Choose what you want to build</li>
        <li>Enter your business details</li>
        <li>Generate a website structure</li>
        <li>Preview and customize</li>
      </ol>
    </section>
  );
}

function Status() {
  return (
    <section className="section">
      <h2>Current Status</h2>
      <p>
        Click Away is currently a demo built using HTML, CSS, and JavaScript.
        Backend features are planned for future development.
      </p>
    </section>
  );
}

function Vision() {
  return (
    <section className="section" id="vision">
      <h2>Vision</h2>
      <p>
        To make website creation as simple as clicking a button — accessible to
        everyone, everywhere.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Click Away. All rights reserved.</p>
    </footer>
  );
}