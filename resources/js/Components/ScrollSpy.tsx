import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { twMerge } from "tailwind-merge";
import "./ScrollSpy.css";

interface ScrollSpyLinkProps {
  jumpTo: string;
  children: React.ReactNode;
  className?: string;
}

function ScrollSpyLinkContainer({ children }: { children: React.ReactNode }) {
  return (
    <ListGroup className="tw-border-none tw-bg-transparent">
      <ScrollSpyHeader>On this Page</ScrollSpyHeader>
      {children}
    </ListGroup>
  );
}

function ScrollSpyHeader({ children }: { children: React.ReactNode }) {
  return (
    <small className="tw-uppercase tw-font-light tw-tracking-widest tw-mb-3">
      {children}
    </small>
  );
}

function ScrollSpyLink({
  jumpTo,
  children,
  className = "",
  ...props
}: ScrollSpyLinkProps) {
  const onScrollSpyNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      const headerOffset = 65;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <li className="tw-list-none">
      <a
        href={`#${jumpTo}`}
        onClick={(e) => onScrollSpyNavigate(e)}
        className={twMerge("", className)}
        {...props}
      >
        <div
          data-to-scrollspy-id={jumpTo}
          className="tw-px-3 tw-py-2 tw-no-underline tw-transition-all"
        >
          {children}
        </div>
      </a>
    </li>
  );
}

ScrollSpyLink.Link = ScrollSpyLink;
ScrollSpyLink.Container = ScrollSpyLinkContainer;

export { ScrollSpyLink };
