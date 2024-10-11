import React from 'react';
import styles from './styles.module.css';

const FundingStatement: React.FC = () => (
  <div className={styles.fundingStatement}>
    <div className={styles.fundingStatementInner}>
      <h4 className={styles.fundingStatementTitle}>Supported by</h4>
      <p className={styles.fundingStatementText}>
        Grant #U24CA253529 from the National Cancer Institute at the US National Institutes of Health
      </p>
    </div>
  </div>
);

export default FundingStatement;