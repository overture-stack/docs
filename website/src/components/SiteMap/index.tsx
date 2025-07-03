import React from "react";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

import iconSong from "./icons/icon-song.png";
import iconScore from "./icons/icon-score.png";
import iconMaestro from "./icons/icon-maestro.png";
import iconArranger from "./icons/icon-arranger.png";
import iconStage from "./icons/icon-stage.png";
import iconLyric from "./icons/icon-lyric.png";
import iconLectern from "./icons/icon-lectern.png";

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
    title: "Platform Tools",
    description: "Bringing it all together",
  },
  guides: {
    title: "Platform Documentation",
    description: "Platform focused guides",
  },
  core: {
    title: "Developer Documentation",
    description: "Using our software in a development context",
  },
  development: {
    title: "Under Development",
    description: "New components not quite ready for production",
  },
  standards: {
    title: "Documentation Standards",
    description:
      "Forming the foundation of documentation and development practice",
  },
};

const products: Product[] = [
  {
    title: "Prelude",
    link: "https://docs.overture.bio/docs/other-software/Prelude",
    description: "Platform Development Toolkit",
    category: "platform",
  },
  {
    title: "Quickstart",
    link: "https://docs.overture.bio/docs/other-software/Quickstart",
    description: "Locally Deployed Demo Portal",
    category: "platform",
  },
  {
    title: "Deployment Docs",
    link: "/guides/deployment-guide/",
    description: "Deploying to Production",
    category: "guides",
  },
  {
    title: "Administration Guides",
    link: "/guides/administration-guides/",
    description: "Management & Customization",
    category: "guides",
  },
  {
    title: "User Guides",
    link: "/guides/user-guides/",
    description: "Interacting with the platform",
    category: "guides",
  },
  {
    title: "API Reference",
    link: "/guides/api-reference",
    description: "Interacting with the platform's APIs",
    category: "guides",
  },
  {
    title: "Lectern",
    link: "/docs/core-software/lectern/overview",
    image: iconLectern,
    description: "Dictionary Management Service",
    category: "core",
  },
  {
    title: "Song",
    link: "docs/core-software/song/overview",
    image: iconSong,
    description: "Metadata Management Service",
    category: "core",
  },
  {
    title: "Score",
    link: "/docs/core-software/score/overview",
    image: iconScore,
    description: "File Transfer Service",
    category: "core",
  },
  {
    title: "Maestro",
    link: "/docs/core-software/maestro/overview",
    image: iconMaestro,
    description: "Metadata Indexing Service",
    category: "core",
  },
  {
    title: "Arranger",
    link: "/docs/core-software/arranger/overview",
    image: iconArranger,
    description: "Search API",
    category: "core",
  },
  {
    title: "Stage",
    link: "/docs/core-software/stage/overview",
    image: iconStage,
    description: "Web Portal Scaffolding",
    category: "core",
  },
  {
    title: "Lyric",
    link: "/docs/under-development/lyric/",
    image: iconLyric,
    description: "Tabular Data Submission Service",
    category: "development",
  },
  // {
  //   title: "Lectern-UI",
  //   link: "/docs/under-development/lyric/",
  //   image: iconLectern,
  //   description: "Data Dictionary Viewers",
  //   category: "development",
  // },
  // {
  //   title: "Arranger Charts",
  //   link: "/docs/under-development/lyric/",
  //   image: iconArranger,
  //   description: "Filterable Charting Visualizations",
  //   category: "development",
  // },
  {
    title: "Docs Setup",
    link: "/docs/other-software/Libretto",
    description: "Documentation Site",
    category: "standards",
  },
  {
    title: "Documenting Projects",
    link: "/docs/Standards/github",
    description: "Organization Standards",
    category: "standards",
  },
  {
    title: "Documenting Software",
    link: "/docs/Standards/Software/",
    description: "Software Standards",
    category: "standards",
  },
];

const Card = ({ title, description, link, image }) => (
  <a href={link} className={styles.card}>
    {image && (
      <img src={image} alt={`${title} icon`} className={styles.cardImage} />
    )}
    <Heading as="h4" className={styles.cardTitle}>
      {title}
    </Heading>
    <p className={styles.cardDescription}>{description}</p>
  </a>
);

const CategorySection = ({ category, items }) => (
  <div className={`${styles.categorySection} ${styles[category]}`}>
    <Heading as="h2" className={styles.categoryHeader}>
      {categories[category].title}
    </Heading>
    <p className={styles.categorySubheader}>
      {categories[category].description}
    </p>
    <div className={styles.cardGrid}>
      {items.map((props, idx) => (
        <Card key={idx} {...props} />
      ))}
    </div>
  </div>
);

const FundingBadge = () => (
  <div className={styles.fundingBadge}>
    <div className={styles.fundingContent}>
      <Heading as="h3" className={styles.fundingTitle}>
        Funding Contributors
      </Heading>
      <p className={styles.fundingDescription}>
        Overture is supported by grant #U24CA253529 from the National Cancer
        Institute at the US National Institutes of Health, and additional
        funding from Genome Canada, the Canada Foundation for Innovation, the
        Canadian Institutes of Health Research, Canarie, and the Ontario
        Institute for Cancer Research.
      </p>
      <a href="community/funding" className={styles.fundingLink}>
        Learn More
      </a>
    </div>
  </div>
);

const SiteMap = () => {
  const categorizedProducts = products.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {});

  const rightColumnCategories = ["core", "development"];
  const leftColumnCategories = ["platform", "guides", "standards"];

  return (
    <section className={styles.siteMap}>
      <div className={styles.container}>
        <div className={styles.mosaicLayout}>
          <div className={styles.leftColumn}>
            {leftColumnCategories.map((category) => (
              <CategorySection
                key={category}
                category={category}
                items={categorizedProducts[category] || []}
              />
            ))}
          </div>
          <div className={styles.rightColumn}>
            {rightColumnCategories.map((category) => (
              <CategorySection
                key={category}
                category={category}
                items={categorizedProducts[category] || []}
              />
            ))}
          </div>
        </div>
        <FundingBadge />
      </div>
    </section>
  );
};

export default SiteMap;
