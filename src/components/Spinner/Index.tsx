import "./main.css";

type Props = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export const Spinner = ({ className = "", size = "xs" }: Props) => {
  return (
    <div
      className={`spinner rounded-full border-2 border-brown-500/25 border-b-brown-300 ${className} ${size}`}
    ></div>
  );
};
