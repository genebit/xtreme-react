interface SidebarNavLinkWrapperProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarNavLinkItemProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
}

interface SidebarNavLinkBaseProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  items?: SidebarNavLinkItemProps[];
}

interface SidebarLinkProps extends SidebarNavLinkBaseProps {
  type?: "link";
  href: string;
}

interface SidebarLinkOtherProps extends SidebarNavLinkBaseProps {
  type?: "btn" | "dropdown";
  href?: never;
}

type SidebarNavLinkProps = SidebarLinkProps | SidebarLinkOtherProps;

export type {
  SidebarNavLinkProps,
  SidebarNavLinkWrapperProps,
  SidebarNavLinkItemProps,
};
