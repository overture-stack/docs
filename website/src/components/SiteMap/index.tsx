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
  image: string;
  description: string;
  category: string;
}

interface Category {
  title: string;
  description: string;
}

const categories: Record<string, Category> = {
  core: {
    title: 'Core Products',
    description: 'The building blocks of the Overture genomics data platform.'
  },
  development: {
    title: 'Under Development',
    description: 'New components not quite ready for production.'
  },
  platform: {
    title: 'Platform Documentation',
    description: 'Bringing it all together into one cohesive platform.'
  },
  misc: {
    title: 'Supporting Software',
    description: 'Miscellaneous software packages created to support Overture development.'
  },
};

const products: Product[] = [
  { title: 'Song', link: 'docs/Core-Software/Song', image: iconSong, description: 'Metadata Management', category: 'core' },
  { title: 'Score', link: '/docs/Core-Software/Score', image: iconScore, description: 'File Data Transfers', category: 'core' },
  { title: 'Maestro', link: '/docs/Core-Software/Maestro', image: iconMaestro, description: 'Metadata Indexing', category: 'core' },
  { title: 'Arranger', link: '/docs/Core-Software/Arranger', image: iconArranger, description: 'Search API and UI generation', category: 'core' },
  { title: 'Stage', link: '/docs/Core-Software/Stage', image: iconStage, description: 'Front-end Data Portal UI', category: 'core' },
  { title: 'Lectern', link: '/docs/Core-Software/Lectern', image: iconStage, description: 'Tabular Data Schema Manager', category: 'development' },
  { title: 'Lyric', link: '/docs/Core-Software/Lyric', image: iconStage, description: 'Tabular Data Submission System', category: 'development' },
  { title: 'Deployment', link: '/docs/Core-Software/Deployment', image: iconStage, description: 'Server Deployment', category: 'platform' },
  { title: 'QuickStart', link: '/docs/Core-Software/QuickStart', image: iconStage, description: 'Overture QuickStart', category: 'platform' },
  { title: 'Bridge', link: '/docs/Core-Software/Supplemental-Services/Bridge', image: iconStage, description: 'Documentation Site Generation', category: 'misc' },
  { title: 'Conductor', link: '/docs/Core-Software/Supplemental-Services/Conductor', image: iconStage, description: 'Software Setup Automation', category: 'misc' },
];

const Card: React.FC<Product> = ({ title, description, link, image }) => (
  <a href={link} className={styles.card}>
    <img src={image} alt={`${title} icon`} className={styles.cardImage} />
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
              isFullWidth={category === 'core' || items.length > 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteMap;