export default function Footer() {
  return (
    <footer className="tw-mt-10 tw-text-center footer tw-flex md:tw-flex-row md:tw-justify-between tw-z-0">
      <div className="tw-flex tw-gap-3 tw-flex-row">
        <span
          className="tw-w-[50px] tw-h-[50px] tw-rounded-full tw-bg-gray-300 tw-flex tw-items-center tw-justify-center"
          aria-label="Sample Logo"
        >
          Logo
        </span>
        <span className="tw-hidden tw-text-start md:tw-block">
          © Copyright 2024 Ateneo de Naga University. All Rights Reserved.{" "}
          <br />
          Developed by: Management Information Systems
        </span>
      </div>
      <span className="tw-hidden tw-mt-5 tw-text-end md:tw-mt-0 md:tw-block">
        Privacy Policy • Terms of Service <br />
        <small className="tw-text-muted">Release rev. 1.0.0</small>
      </span>
    </footer>
  );
}
