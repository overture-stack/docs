import React from "react";

/**
 * Every icon the marketing pages can render, by name.
 *
 * Docusaurus hands SVG imports to SVGR, which returns a React component
 * rather than a URL, so these are addressed by path into
 * `static/img/marketing/icons/` instead of imported as modules.
 */
const icons: Record<string, string> = {
  aboutUsExtensible: "/img/marketing/icons/aboutUsExtensible.svg",
  aboutUsModular: "/img/marketing/icons/aboutUsModule.svg",
  aboutUsOpenSource: "/img/marketing/icons/aboutUsOpenSource.svg",
  aboutUsReusable: "/img/marketing/icons/aboutUsReusable.svg",
  arrowDownNavbar: "/img/marketing/icons/arrow_down_navbar.svg",
  arrowDown: "/img/marketing/icons/arrow_down.svg",
  arrowLeftBlack: "/img/marketing/icons/arrow-left-black.svg",
  arrowLeftBlue: "/img/marketing/icons/arrow-left-blue.svg",
  arrowLeftRound: "/img/marketing/icons/arrow_left_round.svg",
  arrowRight: "/img/marketing/icons/arrow_right.svg",
  arrowRightBlack: "/img/marketing/icons/arrow-right-black.svg",
  arrowRightMagenta: "/img/marketing/icons/arrow_right_magenta.svg",
  arrowRightRound: "/img/marketing/icons/arrow_right_round.svg",
  arrowsRight: "/img/marketing/icons/arrows_right.svg",
  assistance: "/img/marketing/icons/icon_assistance.svg",
  barGraph: "/img/marketing/icons/bar_graph.svg",
  bigData: "/img/marketing/icons/big-data.svg",
  cardStack: "/img/marketing/icons/card_stack.svg",
  checkmark: "/img/marketing/icons/checkmark.svg",
  chevronGrey: "/img/marketing/icons/chevron-grey.svg",
  chevronMagenta: "/img/marketing/icons/chevron-magenta.svg",
  cloudWeather: "/img/marketing/icons/cloud-weather.svg",
  cloud: "/img/marketing/icons/cloud.svg",
  cloudSquare: "/img/marketing/icons/cloud_square.svg",
  cog: "/img/marketing/icons/cog.svg",
  copy: "/img/marketing/icons/copy.svg",
  customizable: "/img/marketing/icons/customizable.svg",
  data: "/img/marketing/icons/data.svg",
  database: "/img/marketing/icons/database.svg",
  dna: "/img/marketing/icons/dna.svg",
  download: "/img/marketing/icons/download.svg",
  emailUs: "/img/marketing/icons/email-us.svg",
  exploreDocs: "/img/marketing/icons/explore-docs.svg",
  extensible: "/img/marketing/icons/extensible.svg",
  feedback: "/img/marketing/icons/icon_feedback.svg",
  fingerSnap: "/img/marketing/icons/finger_snap.svg",
  githubGrey: "/img/marketing/icons/github_grey.svg",
  githubMagenta: "/img/marketing/icons/github_magenta.svg",
  githubWhite: "/img/marketing/icons/github_white.svg",
  githubYellow: "/img/marketing/icons/github_yellow.svg",
  githubFindUs: "/img/marketing/icons/github-find-us.svg",
  graphCycle: "/img/marketing/icons/graph_cycle.svg",
  gridGlass: "/img/marketing/icons/grid_magnifying_glass.svg",
  history: "/img/marketing/icons/history.svg",
  identifyNeeds: "/img/marketing/icons/identify-needs.svg",
  joinCommunity: "/img/marketing/icons/join-community.svg",
  kafka: "/img/marketing/icons/kafka.svg",
  lock: "/img/marketing/icons/lock.svg",
  lockCode: "/img/marketing/icons/lock_code.svg",
  magnify: "/img/marketing/icons/magnify.svg",
  mail: "/img/marketing/icons/mail.png",
  notes: "/img/marketing/icons/notes.svg",
  notes2: "/img/marketing/icons/notes2.svg",
  pageWhite: "/img/marketing/icons/page_white.svg",
  palette: "/img/marketing/icons/palette.svg",
  play: "/img/marketing/icons/play.svg",
  power: "/img/marketing/icons/power.svg",
  productAdministrativeUI: "/img/marketing/icons/productAdministrativeUI.svg",
  productArranger: "/img/marketing/icons/productArranger.svg",
  productArrangerWhite: "/img/marketing/icons/productArrangerWhite.svg",
  productBilling: "/img/marketing/icons/productBilling.svg",
  productBillingWhite: "/img/marketing/icons/productBillingWhite.svg",
  productBuiltInUIComponents: "/img/marketing/icons/productBuiltInUIComponents.svg",
  productCloudSupport: "/img/marketing/icons/productCloudSupport.svg",
  productDMS: "/img/marketing/icons/productDMS.svg",
  productDMSWhite: "/img/marketing/icons/productDMSWhite.svg",
  productEgo: "/img/marketing/icons/productEgo.svg",
  productEgoWhite: "/img/marketing/icons/productEgoWhite.svg",
  productEnrolment: "/img/marketing/icons/productEnrolment.svg",
  productEnrolmentWhite: "/img/marketing/icons/productEnrolmentWhite.svg",
  productHighTransfer: "/img/marketing/icons/productHighTransfer.svg",
  productJukebox: "/img/marketing/icons/productJukebox.svg",
  productJukeboxWhite: "/img/marketing/icons/productJukeboxWhite.svg",
  productMaestro: "/img/marketing/icons/productMaestro.svg",
  productMaestroWhite: "/img/marketing/icons/productMaestroWhite.svg",
  productMetadataTracking: "/img/marketing/icons/productMetadataTracking.svg",
  productMetadataValidation: "/img/marketing/icons/productMetadataValidation.svg",
  productMultipleIndexLevels: "/img/marketing/icons/productMultipleIndexLevels.svg",
  productMultipleSongsIndex: "/img/marketing/icons/productMultipleSongsIndex.svg",
  productOnco: "/img/marketing/icons/productOnco.svg",
  productOncoWhite: "/img/marketing/icons/productOncoWhite.svg",
  productPersona: "/img/marketing/icons/productPersona.svg",
  productPersonaWhite: "/img/marketing/icons/productPersonaWhite.svg",
  productRiff: "/img/marketing/icons/productRiff.svg",
  productRiffWhite: "/img/marketing/icons/productRiffWhite.svg",
  productSamtools: "/img/marketing/icons/productSamtools.svg",
  productScalable: "/img/marketing/icons/productScalable.svg",
  productScore: "/img/marketing/icons/productScore.svg",
  productScoreWhite: "/img/marketing/icons/productScoreWhite.svg",
  productSearchAPI: "/img/marketing/icons/productSearchAPI.svg",
  productSingleSignOn: "/img/marketing/icons/productSingleSignOn.svg",
  productSlackIntegration: "/img/marketing/icons/productSlackIntegration.svg",
  productSong: "/img/marketing/icons/productSong.svg",
  productSongWhite: "/img/marketing/icons/productSongWhite.svg",
  productStateControls: "/img/marketing/icons/productStateControls.svg",
  productStateless: "/img/marketing/icons/productStateless.svg",
  rocketWhite: "/img/marketing/icons/rocket_white.svg",
  search: "/img/marketing/icons/search.svg",
  searchBar: "/img/marketing/icons/searchBar.svg",
  security: "/img/marketing/icons/security.svg",
  share: "/img/marketing/icons/share.svg",
  shield: "/img/marketing/icons/shield.svg",
  slack: "/img/marketing/icons/icon_slack.svg",
  slackJoin: "/img/marketing/icons/slack-join.svg",
  smileyFace: "/img/marketing/icons/smileyFace.svg",
  slackNew: "/img/marketing/icons/icon_slack_new.svg",
  softwareEngineers: "/img/marketing/icons/software-engineers.svg",
  spiral: "/img/marketing/icons/spiral.svg",
  star: "/img/marketing/icons/star.svg",
  support: "/img/marketing/icons/icon_support.svg",
  target: "/img/marketing/icons/target.svg",
  unsmileyFace: "/img/marketing/icons/unsmileyFace.svg",
  user: "/img/marketing/icons/user.svg",
  vennDiagram: "/img/marketing/icons/venn_diagram.svg",
  xGrey: "/img/marketing/icons/x-grey.svg",
};

export type IconProps = {
  /**
   * Required, so a decorative icon has to say so with `alt=""` rather than
   * silently shipping an unlabelled image.
   */
  alt: string;
  img: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
};

export function Icon({ alt, img, size, className, style }: IconProps) {
  return (
    <img
      alt={alt}
      className={`${className ? className : ""} Icon`}
      src={icons[img]}
      style={{ width: size, height: "auto", ...style }}
    />
  );
}
