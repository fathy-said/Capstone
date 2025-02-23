type Props = {
  items: string[];
};

export const BreadCrumb = ({items}: Props) => {
  return (
    <div className="flex items-center gap-x-2">
      {items?.map((item, index) => (
        <p
          key={index}
          className="text-xl lg:text-2xl text-brown-400 flex items-center gap-x-2"
        >
          {item} {index < items?.length - 1 ? <span>&lt;</span> : null}
        </p>
      ))}
    </div>
  );
};
