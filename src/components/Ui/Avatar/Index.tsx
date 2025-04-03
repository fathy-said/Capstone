import { AppImage } from "../../AppImage/Index";

type Props = {
  size?: string;
  className?: string;
  image?: string;
  text?: string;
};

export const Avatar = ({size, image, text, className = ""}: Props) => {
  const currentImage = image ? image : "/images/profile-image.png";
  return (
    <div className={`items-center overflow-hidden border ${size} ${className}`}>
      {text ? <p className="flex h-full justify-center items-center text- text-gray-400 font-bold">{text}</p> : <AppImage src={currentImage} alt="user" fit="fill" />}
    </div>
  );
};
