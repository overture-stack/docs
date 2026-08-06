import React from "react";
import MarketingPage from "../../marketing/MarketingPage";
import Hero from "../../marketing/components/Hero";
import ServicesPageSection from "../../marketing/components/ServicesPageSection";

const ASSETS = "/img/marketing/services";

export default function ServicesPage() {
  return (
    <MarketingPage
      className="ServicesPage"
      title="Overture Services"
      description="Interested by our expertise or the Overture software stack and need help getting started? Want to collaborate with us on exciting new projects? We operate as a not-for-profit organization, so all our funds are reinvested into our projects."
    >
      {/* hero */}
      <Hero
        title="Services"
        subtitle="We believe in the collective power of expertise and shared resources. If you want to collaborate here's how you can connect."
      />

      {/* top white section */}
      <ServicesPageSection
        src={`${ASSETS}/img_top_white_section.svg`}
        alt=""
        title="Technical Support"
        subtitle="Our team of professionals speaks business and dreams code. We take pride in our software and are passionate about helping others use them."
        items={["Technical audits", "Step-by-step guidance", "Troubleshooting"]}
        buttonText="Community Supports"
        contactMessage="or email us at contact@overture.bio"
      />
      {/* grey section */}
      <ServicesPageSection
        src={`${ASSETS}/img_grey_section.svg`}
        alt=""
        title="Consulting"
        subtitle="We will work autonomously or alongside your team to fully understand your business needs and integrate Overture into your projects. We will help accelerate your success at any stage of your project!"
        items={[
          "Project architecture, best practices",
          "Migration & software integration",
          "Custom development",
          "Scalability",
        ]}
        isGrey={true}
        contactMessage="Email us at contact@overture.bio"
      />

      {/* bottom white section */}
      <ServicesPageSection
        src={`${ASSETS}/img_bottom_white_section.svg`}
        alt=""
        title="Academic Collaborations"
        subtitle="We welcome collaborations in the academic domain. We have extensive experience and can team up with you as a co-applicant for your grant proposals. Our team's extensive knowledge can help deliver high-profile projects by deploying or modifying Overture and building custom solutions for joint projects."
        isNoList={true}
        contactMessage="Email us at contact@overture.bio"
      />
    </MarketingPage>
  );
}
