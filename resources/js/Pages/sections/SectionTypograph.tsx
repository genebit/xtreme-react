import { Accordion } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap";
import { twMerge } from "tailwind-merge";

type SectionTypographyProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  buttonProps?: ButtonProps;
};

export default function SectionTypography({
  className,
  buttonProps,
  ...props
}: SectionTypographyProps) {
  return (
    <div
      className={twMerge("tw-flex tw-flex-col tw-gap-5", className)}
      {...props}
    >
      <header className="tw-flex tw-flex-col tw-gap-3">
        <h4 className="tw-font-semibold">Typography Overview</h4>
        <p>
          Explore the font styles, headings, body text, links, lists, and code
          samples used throughout the interface.
        </p>
        <hr />
      </header>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Headings</Accordion.Header>
          <Accordion.Body>
            <div className="tw-flex tw-flex-row">
              <div className="tw-basis-1/4">
                <h1 className="tw-text-5xl tw-font-black tw-leading-tight">
                  Aa
                </h1>
                <h2 className="tw-text-4xl tw-font-extrabold tw-leading-snug">
                  Aa
                </h2>
                <h3 className="tw-text-2xl tw-font-extrabold tw-leading-snug">
                  Aa
                </h3>
                <h4 className="tw-text-xl tw-font-bold tw-leading-normal">
                  Aa
                </h4>
              </div>
              <div className="tw-basis-full">
                <p
                  className="tw-text-base"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  This is a sample paragraph using the <strong>Inter</strong>{" "}
                  font for body text. Inter is clean, modern, and highly
                  readable.
                </p>
                <p
                  className="tw-text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  This is a smaller text example, also using Inter. Perfect for
                  captions or fine print.
                </p>
                <small
                  className="tw-text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  This is a small text sample for disclaimers or footnotes.
                </small>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Links & Lists</Accordion.Header>
          <Accordion.Body>
            <a
              href="#"
              className="tw-text-blue-600 tw-underline hover:tw-text-blue-800"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              This is a sample link using Inter font.
            </a>
            <ul
              className="tw-list-disc tw-pl-6 tw-mt-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <li>Body font: Inter</li>
              <li>Accent/Heading font: Bigshot One</li>
              <li>Links and small text use Inter for clarity</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Blockquotes & Code</Accordion.Header>
          <Accordion.Body>
            <blockquote
              className="tw-border-l-4 tw-border-gray-300 tw-pl-4 tw-italic"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              “Typography is the craft of endowing human language with a durable
              visual form.” <br />
              <span
                className="tw-block tw-mt-2 tw-text-xs"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                — Robert Bringhurst
              </span>
            </blockquote>
            <div className="tw-mt-3">
              <span
                className="tw-text-xs tw-block"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Example of{" "}
                <code className="tw-bg-gray-100 tw-px-1 tw-rounded">code</code>{" "}
                text using Inter.
              </span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Usage Notes</Accordion.Header>
          <Accordion.Body>
            <p
              className="tw-text-base"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Use <span className="tw-font-big-shot">Bigshot One</span> for
              headings or accent text to add personality and emphasis.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
