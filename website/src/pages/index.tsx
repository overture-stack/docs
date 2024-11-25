import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';  // Import the SearchBar component

import styles from './index.module.css';
import SiteMap from '../components/SiteMap';
import Button from '../components/OvertureButton';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      {/* <Button 
        to="/guides/getting-started"
        variant="primary"
        className={styles.button}
      >
      Video Tutorial
      </Button>
      <Button 
        to="https://demo.overture.bio/" 
        variant="primary" 
        className={styles.button}
      >
        Demo Platform
      </Button> */}
        <div className={styles.searchBarContainer}>
          <SearchBar /> 
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The Overture developer documentation hub">
      <HomepageHeader />
      <main>
        <SiteMap />
      </main>
    </Layout>
  );
}