import { LucideProps, icons } from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const IconAtom: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) return null;

  return <LucideIcon {...props} />;
};

export default IconAtom;
