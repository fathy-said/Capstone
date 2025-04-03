import "cropperjs/dist/cropper.css";
import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";

import { datBases64LtoFile } from "../../utils/transform";
import { ModalDialog } from "../ModalDialog/Index";
import "./main.css";

const CropperModalBox = ({
  modalOpen,
  setModalOpen,
  image,
  handleChangeImage,
}) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      handleChangeImage(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
        datBases64LtoFile(
          cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
          // img
          image.file?.name || "file"
        )
      );
    }
  };
  // on save cropper
  const onSaveCropper = () => {
    setModalOpen({ isOpen: false, index: 0 });
    getCropData();
  };

  return (
    <>
      <ModalDialog
        onClose={() => {
          setModalOpen({ isOpen: false, index: 0 });
        }}
        isOpen={modalOpen?.isOpen}
        size="md"
      >
        <div className="box relative  mx-auto w-full max-w-[600px]  h-fit  bg-white  rounded-[12px] pt-[50px]   p-[20px]    ">
          <div className="box-ImgDialog !w-full">
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image?.path}
              viewMode={2}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
          </div>
          <button
            type="button"
            onClick={onSaveCropper}
            className="  gap-2 p-2	  mt-[20px] w-full  text-base	    font-semibold 	 bg-blue-450  text-white leading-[25.6px]   py-[10px] px-[18px] text-center  rounded-[8px]  !flex justify-center items-center "
          >
            <span>حفظ التغيير</span>
          </button>
        </div>
      </ModalDialog>
    </>
  );
};

export default CropperModalBox;
