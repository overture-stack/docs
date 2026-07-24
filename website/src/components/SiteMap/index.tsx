import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type JourneyKey = "develop" | "deploy" | "use";

interface Journey {
  title: string;
  description: string;
  link: string;
}

const journeys: Record<JourneyKey, Journey> = {
  develop: {
    title: "Develop",
    description: "For developers building on, and extending Overture services.",
    link: "/develop",
  },
  deploy: {
    title: "Deploy",
    description:
      "For platform teams standing up and operating Overture platforms.",
    link: "/deploy",
  },
  use: {
    title: "Use",
    description:
      "For data consumers, submitters and administrators interacting with Overture platforms & services.",
    link: "/use",
  },
};

const PickerTile = ({ journeyKey }: { journeyKey: JourneyKey }) => {
  const journey = journeys[journeyKey];
  return (
    <a
      href={journey.link}
      className={clsx(styles.pickerTile, styles[journeyKey])}
    >
      <Heading as="h3" className={styles.pickerTitle}>
        {journey.title}
      </Heading>
      <p className={styles.pickerDescription}>{journey.description}</p>
      <span className={styles.pickerGo}>Browse {journey.title} →</span>
    </a>
  );
};

const PickerRow = () => (
  <div className={styles.pickerRow}>
    <PickerTile journeyKey="develop" />
    <PickerTile journeyKey="deploy" />
    <PickerTile journeyKey="use" />
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
        funding from the Digital Research Alliance of Canada, Genome Canada, the
        Canada Foundation for Innovation, the Canadian Institutes of Health
        Research, Canarie, and the Ontario Institute for Cancer Research.
      </p>
      <a href="community/funding" className={styles.fundingLink}>
        Learn More
      </a>
    </div>
  </div>
);

const SiteMap = () => (
  <section className={styles.siteMap}>
    <div className={styles.container}>
      <PickerRow />
      <FundingBadge />
    </div>
  </section>
);

export default SiteMap;
