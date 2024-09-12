import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

interface PageCard {
  title: string;
  description: React.ReactNode;
}

const siteMapList: PageCard[] = [
  {
    title: 'Song',
    description: 'This is a description for a page in the SiteMap Component',
  },
  {
    title: 'Score',
    description: 'This is a description for a page in the SiteMap Component',
  },
  {
    title: 'Maestro',
    description: 'This is a description for a page in the SiteMap Component',
  },
];

function SiteMapCard({ title, description }: PageCard) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Heading as="h3">{title}</Heading>
      </div>
      <div className="text--center padding-horiz--md">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function SiteMapCards(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {siteMapList.map((props, idx) => (
            <SiteMapCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}