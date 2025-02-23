import React, { useState } from "react";
import { SvgIcon } from "../SvgIcon/Index";

interface CopyProps {
  data: any;
  parentClassName?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}

const CopyData: React.FC<CopyProps> = ({
  data,
  iconClassName,
  parentClassName,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data?.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (error) {
      console.error("Failed to copy data to clipboard:", error);
    }
  };

  return (
    <div
      className={`${parentClassName} flex justify-center items-center gap-2`}
    >
      <button onClick={copyToClipboard}>
        {copied ? (
          <SvgIcon name="Icon" className={`${iconClassName} w-6 h-6`} />
        ) : (
          <SvgIcon name="copy-01" className={`${iconClassName} w-6 h-6`} />
        )}
      </button>
      {children}
    </div>
  );
};

export default CopyData;
