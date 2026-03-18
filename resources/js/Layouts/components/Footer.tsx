import { Badge } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="tw-mt-10 tw-py-5 tw-text-center footer tw-flex md:tw-flex-row md:tw-justify-between tw-z-0 dark:tw-text-gray-400">
      <div className="tw-flex tw-gap-3 tw-flex-row">
        <span
          className="tw-w-[50px] tw-h-[50px] tw-rounded-full tw-flex tw-items-center tw-justify-center"
          aria-label="Sample Logo"
        >
          <img src="/assets/imgs/logo-icon.png" alt="Logo" />
        </span>
        <span className="tw-hidden tw-text-start md:tw-block">
          © Copyright 2024 genebit. All Rights Reserved. <br />
          Developed by: Johcel Gene T. Bitara <Badge>genebit</Badge>
        </span>
      </div>
      <span className="tw-hidden tw-mt-5 tw-text-end md:tw-mt-0 md:tw-block">
        Privacy Policy • Terms of Service <br />
        <small className="tw-text-muted">Release rev. 1.0.0</small>
      </span>
    </footer>
  );
}
