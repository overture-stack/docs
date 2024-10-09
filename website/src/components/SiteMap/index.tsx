import React from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import iconSong from './icons/icon-song.png';
import iconScore from './icons/icon-score.png';
import iconMaestro from './icons/icon-maestro.png';
import iconArranger from './icons/icon-arranger.png';
import iconStage from './icons/icon-stage.png';

interface Product {
  title: string;
  link: string;
  image?: string;
  description: string;
  category: string;
}

interface Category {
  title: string;
  description: string;
}

const categories: Record<string, Category> = {
  platform: {
    title: 'Platform Guides',
    description: 'Bringing it all together into one cohesive platform'
  },
  core: {
    title: 'Developer Documentation',
    description: 'Using our software microservices in a development context'
  },
  development: {
    title: 'Under Development',
    description: 'New components not quite ready for production'
  },
  misc: {
    title: 'Supporting Software',
    description: 'Supporting tools in the Overture project'
  },
  standards: {
    title: 'Documentation Standards',
    description: 'Fundamental principles that form the foundation of our documentation and development practices'
  },
};

const products: Product[] = [
  { title: 'Deployment Guides', link: '/guides/deployment-guide/', description: 'Launching your Overture platform into production', category: 'platform' },
  { title: 'Administration Guides', link: '/guides/administration-guides/', description: 'Managing and customizing Overture Data Platforms', category: 'platform' },
  { title: 'User Guides', link: '/guides/user-guides/', description: 'Using Overture Data Platforms', category: 'platform' },
  { title: 'Song', link: 'docs/core-software/song/overview', image: iconSong, description: 'Metadata Management Service', category: 'core' },
  { title: 'Score', link: '/docs/core-software/score/overview', image: iconScore, description: 'File Transfer Service', category: 'core' },
  { title: 'Maestro', link: '/docs/core-software/maestro/overview', image: iconMaestro, description: 'Metadata Indexing Service', category: 'core' },
  { title: 'Arranger', link: '/docs/core-software/arranger/overview', image: iconArranger, description: 'Search API', category: 'core' },
  { title: 'Stage', link: '/docs/core-software/stage/overview', image: iconStage, description: 'Web Portal Scaffolding', category: 'core' },
  { title: 'Lectern', link: '/docs/core-software/lectern/overview', description: 'Schema Management Service', category: 'development' },
  { title: 'Lyric', link: '/docs/core-software/lyric/overview', description: 'Tabular Data Submission Service', category: 'development' },
  { title: 'Bridge', link: '/docs/other-software/Bridge', description: 'Documentation Site', category: 'misc' },
  { title: 'Conductor', link: '/docs/other-software/Conductor', description: 'Software Setup Automation', category: 'misc' },
  { title: 'Documenting Software', link: '/docs/Standards/Software/', description: 'Software Setup Automation', category: 'standards' },
  { title: 'Documenting APIs', link: '/docs/Standards/api/', description: 'Software Setup Automation', category: 'standards' },
  { title: 'Documenting Code', link: '/docs/Standards/code/', description: 'Software Setup Automation', category: 'standards' },
];

const Card: React.FC<Product> = ({ title, description, link, image }) => (
  <a href={link} className={styles.card}>
    {image && <img src={image} alt={`${title} icon`} className={styles.cardImage} />}
    <Heading as="h4" className={styles.cardTitle}>{title}</Heading>
    <p className={styles.cardDescription}>{description}</p>
  </a>
);

const CategorySection: React.FC<{ category: string, items: Product[], isFullWidth: boolean }> = ({ category, items, isFullWidth }) => (
  <div className={`${styles.categorySection} ${isFullWidth ? styles.fullWidth : ''}`}>
    <Heading as="h2" className={styles.categoryHeader}>{categories[category].title}</Heading>
    <p className={styles.categorySubheader}>{categories[category].description}</p>
    <div className={styles.cardGrid}>
      {items.map((props, idx) => (
        <Card key={idx} {...props} />
      ))}
    </div>
  </div>
);

const SiteMap: React.FC = () => {
  const categorizedProducts = products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <section className={styles.siteMap}>
      <div className={styles.container}>
        <div className={styles.categoryWrapper}>
          {Object.entries(categorizedProducts).map(([category, items]) => (
            <CategorySection 
              key={category} 
              category={category} 
              items={items} 
              isFullWidth={category === 'core' || category === 'platform' || items.length > 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteMap;