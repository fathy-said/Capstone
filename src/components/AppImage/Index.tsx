import { LazyLoadImage as LazyLoadImageRaw } from 'react-lazy-load-image-component';
import { FunctionComponent } from 'react';
import "react-lazy-load-image-component/src/effects/blur.css";

import "./main.css";

type Props = {
  src?: string;
  alt?: string;
  /**
   * Tailwindcss aspect ratio
   */
  ratio?: string;
  fit?: "contain" | "cover" | "fill";
  width?: number | undefined;
  height?: number | undefined;
  className?: string;
};

const LazyLoadImage = LazyLoadImageRaw as FunctionComponent<any>;

export const AppImage = ({
  src,
  alt,
  ratio = "aspect-square",
  fit = "contain",
  width = undefined,
  height = undefined,
  className = "",
  ...rest
}: Props) => {
  return (
    <>
      <div className={`appImage ${ratio} ${fit} ${className}`} {...rest}>
        <LazyLoadImage
          alt={alt}
          height={height}
          src={src}
          width={width}
          effect="blur"
        />
      </div>
    </>
  );
};
