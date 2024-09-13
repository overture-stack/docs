import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import iconSong from './icons/icon-song.png';
import iconScore from './icons/icon-score.png';
import iconMaestro from './icons/icon-maestro.png';
import iconArranger from './icons/icon-arranger.png';
import iconStage from './icons/icon-stage.png';

interface SiteMap {
  title: string;
  link: string;
  image: string; 
  description: React.ReactNode;
  category: string;
}

const categoryDescriptions = {
  'Core Services': 'Forming the foundation of our genomics data management platform.',
  'In Development': 'New components not quite ready for production.',
  'Platform Documentation': 'Bringing it all together into one cohesive platform.',
};

const siteMapList: SiteMap[] = [
  {
    title: 'Song Docs',
    link: '/docs/Song/Overview',
    image: iconSong,
    description: 'Metadata Management',
    category: 'Core Services',
  },
  {
    title: 'Score Docs',
    link: '/docs/Score/Overview',
    image: iconScore,
    description: 'File Data Transfers',
    category: 'Core Services',
  },
  {
    title: 'Maestro Docs',
    link: '/docs/Maestro/Overview',
    image: iconMaestro,
    description: 'Metadata Indexing',
    category: 'Core Services',
  },
  {
    title: 'Arranger Docs',
    link: '/docs/Arranger/Overview',
    image: iconArranger,
    description: 'Search API and UI generation',
    category: 'Core Services',
  },
  {
    title: 'Stage Docs',
    link: '/docs/Stage/Overview',
    image: iconStage,
    description: 'Front-end Data Portal UI',
    category: 'Core Services',
  },
  {
    title: 'Lectern Docs',
    link: '/docs/Lectern/Overview',
    image: iconStage,
    description: 'Tabular Data Schema Manager',
    category: 'In Development',
  },
  {
    title: 'Lyric Docs',
    link: '/docs/Lyric/Overview',
    image: iconStage,
    description: 'Tabular Data Submission System',
    category: 'In Development',
  },
  {
    title: 'Deployment Docs',
    link: '/docs/Lyric/Overview',
    image: iconStage,
    description: 'Server Deployment',
    category: 'Platform Documentation',
  },
  {
    title: 'QuickStart Docs',
    link: '/docs/Lyric/Overview',
    image: iconStage,
    description: 'Overture QuickStart',
    category: 'Platform Documentation',
  },
];


function groupByCategory(items: SiteMap[]) {
  return items.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, SiteMap[]>);
}

const categorizedSiteMap = groupByCategory(siteMapList);


function CubeCard({ title, description, link, image }: SiteMap) {
  return (

    <div className={styles.cubeContainer}>
      <a href={link}>
        <div className={styles.cube}>
          <div className={clsx(styles.face, styles.front, styles.iconTitle)}>
            <img src={image} alt={`${title} icon`} className={styles.cubeImage} />
            <Heading as="h4">{description}</Heading>
          </div>
          <div className={clsx(styles.face, styles.back)}></div>
          <div className={clsx(styles.face, styles.right)}></div>
          <div className={clsx(styles.face, styles.left)}>
          <Heading as="h2" className={styles.serviceTitle}>{title}</Heading>
          </div>
          <div className={clsx(styles.face, styles.top)}></div>
          <div className={clsx(styles.face, styles.bottom)}></div></div>
        </a>
    </div>

  );
}
export default function SiteMap(): JSX.Element {
  const categorizedSiteMap = groupByCategory(siteMapList);

  return (
    <section className={styles.cards}>
      <div className="container">
        {Object.entries(categorizedSiteMap).map(([category, items]) => (
          <div key={category} className={styles.categorySection}>
            <Heading as="h2">{category}</Heading>
            <Heading as="h4">{categoryDescriptions[category]}</Heading>
            <div className={styles.cubeRow}>
              {items.map((props, idx) => (
                <CubeCard key={idx} {...props} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}