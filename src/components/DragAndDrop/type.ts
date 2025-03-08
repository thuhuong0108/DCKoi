export const ItemTypes = {
  PARENT: 'parent',
  CHILD: 'child',
};

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
}

export interface ContextMenuProps {
  className?: string;
  menuItems: MenuItem[];
  isVisible: boolean;
  position: { x: number; y: number };
  align?: string;
  onClose: () => void;
}