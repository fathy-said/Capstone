import "./main.css";

type Props = {
  text?: string;
  className?: string;
  type?: "danger" | "success" | "info" | "warning" | "infinit";
};

export const Badge = ({
  text = "مرحلة تلقى الطلبات",
  type = "info",
  className = "",
}: Props) => {
  return <p className={`badge ${type} ${className}`}>{text}</p>;
};
