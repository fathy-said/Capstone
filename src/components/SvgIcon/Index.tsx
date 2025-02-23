export const SvgIcon = ({
  name = "",
  prefix = "icon",
  className = "",
  ...props
}) => {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden="true" className={`icon ${name} ${className}`}>
      <use href={symbolId} />
    </svg>
  );
};
