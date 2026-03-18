interface NavbarLinkBaseProps extends React.HTMLAttributes<HTMLElement> {
  alwaysPresent?: boolean;
  toggler?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface NavbarLinkProps extends NavbarLinkBaseProps {
  type: "link";
  href: string;
}

interface NavbarOptionProps extends NavbarLinkBaseProps {
  type?: "btn" | "wrapper";
  href?: never;
  label?: never;
}

interface HeaderNavbarLinkMegaProps extends NavbarLinkBaseProps {
  label: React.ReactNode;
  href?: never;
}

type HeaderNavbarLinkProps = NavbarLinkProps | NavbarOptionProps;

export type { HeaderNavbarLinkProps, HeaderNavbarLinkMegaProps };
