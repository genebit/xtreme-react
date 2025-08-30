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

interface SidebarNavLinkProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  type?: "link" | "btn" | "dropdown";
  className?: string;
  children: React.ReactNode;
  items?: SidebarNavLinkItemProps[];
}

export type {
  SidebarNavLinkProps,
  SidebarNavLinkWrapperProps,
  SidebarNavLinkItemProps,
};
