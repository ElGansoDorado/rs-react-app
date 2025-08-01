import classes from './about.module.css';

export function About() {
  return (
    <main className="container">
      <section className={classes.container}>
        <div>
          <img
            className={classes.img}
            src="https://avatars.githubusercontent.com/u/87077649?v=4"
            alt="photo"
          />
        </div>

        <div className={classes.text}>
          <h2 className={classes.title}>About me</h2>

          <h3 className={classes.name}>yakovchik denis - frontend deweloper</h3>

          <p className={classes.description}>
            Junior Frontend Developer skilled in HTML, CSS, JavaScript,
            TypeScript, React, and TanStack Query. Experienced in building
            responsive, accessible, and maintainable web interfaces.
            Knowledgeable in converting design mockups into clean code. Familiar
            with version control (Git) and basic debugging tools. Committed to
            writing efficient and scalable frontend code.
          </p>

          <ul className={classes.links}>
            <li className={classes.linkItem}>
              <a
                href="https://github.com/ElGansoDorado"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.svgrepo.com/show/445786/github.svg"
                  alt="Git Hub img"
                />
              </a>
            </li>
            <li className={classes.linkItem}>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.svgrepo.com/show/333523/discord-alt.svg"
                  alt="Discord img"
                />
              </a>
            </li>
            <li className={classes.linkItem}>
              <a
                href="https://www.linkedin.com/in/jakovchikdenis/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.svgrepo.com/show/144030/linkedin-square-logo.svg"
                  alt="LinkidIn img"
                />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <hr className={classes.divider} />

      <section className={classes.cardList}>
        <div className={classes.card}>
          <h3>Stack</h3>

          <ul>
            <li>React</li>
            <li>React router</li>
            <li>Vitest</li>
            <li>TypeScript</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>

        <div className={classes.card}>
          <h3>Project</h3>

          <p>
            React application developed using RS School courses. Implemented
            display of a list of Pokemon on the screen, search for Pokemon by
            name or id, and also added a router for moving through the pages of
            the site.
          </p>
        </div>

        <div className={classes.card}>
          <h3>External sources</h3>

          <ul>
            <li>
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
              >
                RS School React
              </a>
            </li>
            <li>
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PokemonAPI
              </a>
            </li>
            <li>
              <a
                href="https://www.svgrepo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                SVG icon
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com/shots/6063224-About-me-Portfolio-Website-UI"
                target="_blank"
                rel="noopener noreferrer"
              >
                Design
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export const Component = About;
