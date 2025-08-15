import Image from 'next/image';
import classes from './about.module.css';
import { getTranslations } from 'next-intl/server';

async function About() {
  const t = await getTranslations('About');

  return (
    <main className="container">
      <section className={classes.container}>
        <div>
          <Image
            src={'/profile.png'}
            alt="photo"
            width={300}
            height={300}
            className={classes.img}
          />
        </div>

        <div className={classes.text}>
          <h2 className={classes.title}>{t('title')}</h2>

          <h3 className={classes.name}>{t('me')}</h3>

          <p className={classes.description}>{t('about')}</p>

          <ul className={classes.links}>
            <li className={classes.linkItem}>
              <a
                href="https://github.com/ElGansoDorado"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={'https://www.svgrepo.com/show/445786/github.svg'}
                  alt="Git Hub img"
                  width={32}
                  height={32}
                  className={classes.icon}
                />
              </a>
            </li>
            <li className={classes.linkItem}>
              <a href="" target="_blank" rel="noopener noreferrer">
                <Image
                  src={'https://www.svgrepo.com/show/333523/discord-alt.svg'}
                  alt="Discord img"
                  width={32}
                  height={32}
                  className={classes.icon}
                />
              </a>
            </li>
            <li className={classes.linkItem}>
              <a
                href="https://www.linkedin.com/in/jakovchikdenis/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={
                    'https://www.svgrepo.com/show/144030/linkedin-square-logo.svg'
                  }
                  alt="LinkidIn img"
                  width={32}
                  height={32}
                  className={classes.icon}
                />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <hr className={classes.divider} />

      <section className={classes.cardList}>
        <div className={classes.card}>
          <h3>{t('name_cl1')}</h3>

          <ul>
            <li>React</li>
            <li>Next.js</li>
            <li>Zustand</li>
            <li>TypeScript</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>

        <div className={classes.card}>
          <h3>{t('name_cl2')}</h3>

          <p>{t('project')}</p>
        </div>

        <div className={classes.card}>
          <h3>{t('name_cl3')}</h3>

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

export default About;
