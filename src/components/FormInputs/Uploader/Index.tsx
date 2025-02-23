import { ErrorMessage } from "@hookform/error-message";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import ReactImageUploading from "react-images-uploading";
import { useUpdateEffect } from "react-use";
import { v4 as uuidv4 } from "uuid";
import { AppImage } from "../../AppImage/Index";
import CropperModalBox from "../../CropperModalBox/Index";
import { SvgIcon } from "../../SvgIcon/Index";

import { getNameFromPath } from "../../../utils/transform";
import "./main.css";
interface Props {
  placeholder: string | React.ReactNode;
  acceptType: string[];
  targetNameShow: string;
  multiple: boolean;
  showCropperModalBox: boolean;
  maxNumber?: number;
  UploadType: "FILE" | "IMAGE" | "SVG";
  name: string;
  errors: any;
  control: any;
  rules?: any;
  className?: string;
  onDelete?: () => any;
  isDelete?: boolean;
  isDisabled?: boolean;
}

type ImagesProps = {
  id?: string;
  path?: string;
  file?: any;
  downloadLink?: string;
  type?: "FILE" | "PATH";
}[];
type ModalOpenProps = { index: any; isOpen: boolean };

// handle return data width id
const returnDataWithId = (data: ImagesProps[]): ImagesProps[] => {
  const dataWithId =
    data?.map((el) => {
      return { ...el, id: uuidv4() };
    }) || [];
  return dataWithId;
};
export const Uploader = forwardRef<HTMLDivElement, Props>(
  (
    {
      acceptType = ["jpg", "gif", "png", "svg"],
      placeholder = ` SVG, PNG, JPG or GIF
       (max. 800x400px)`,
      targetNameShow = "الملف",
      name,
      control,
      rules,
      errors,
      maxNumber = 50,
      showCropperModalBox = true,
      multiple = false,
      UploadType,
      className = " w-full",
      onDelete = () => {},
      isDelete = false,
      isDisabled = false,
      ...rest
    },
    ref
  ) => {
    const [images, setImages] = useState<ImagesProps[]>([]);
    const [modalOpen, setModalOpen] = useState<ModalOpenProps>({
      isOpen: false,
      index: 0,
    });
    const onChange = useCallback((imageList) => {
      if (images?.length) {
        setImages(returnDataWithId(imageList));
        // setImages(imageList);
      } else {
        setImages(returnDataWithId(imageList));
      }
    }, []);

    const handleSetValue = (setValue) => {
      if (images?.length) {
        setValue(images);
      } else {
        setValue(null);
      }
    };

    return (
      <div ref={ref} className={` ${className}  `}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => {
            // on change
            useUpdateEffect(() => {
              handleSetValue(field?.onChange);
            }, [images]);
            // set default value
            const UpdateDataRef = useRef(true);
            useEffect(() => {
              if (field?.value?.length) {
                if (UpdateDataRef?.current && field?.value[0]?.type == "PATH") {
                  setImages(field?.value);
                  UpdateDataRef.current = false;
                }
              }
            }, [field?.value]);

            return (
              <div
                {...rest}
                className={` reactImageUploading  ${
                  errors && errors[name] ? "invalid" : ""
                }`}
              >
                <ReactImageUploading
                  multiple={multiple}
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="path"
                  acceptType={acceptType}
                  allowNonImageType={UploadType == "FILE" ? true : false}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => {
                    return isDisabled ? (
                      <>
                        {images?.length
                          ? imageList?.map((target) => {
                              return (
                                <div
                                  key={target?.id}
                                  className="my-[22px] gap-[18px] uploader rounded-[12px] py-[16px] px-[24px] w-full flex-col flex justify-center items-center bg-slate-100"
                                >
                                  <div
                                    className={` ${
                                      errors && errors[name] ? "invalid" : ""
                                    }  w-full flex justify-between items-center `}
                                  >
                                    <div className=" w-full gap-[12px] flex justify-start items-center ">
                                      {UploadType !== "FILE" ? (
                                        <AppImage
                                          src={target.path}
                                          alt="user"
                                          width={80}
                                          height={80}
                                          fit="contain"
                                          className="image-item  !object-cover !object-center rounded-[12px]   !w-[80px] !h-[80px]  flex justify-center items-center overflow-hidden"
                                        />
                                      ) : (
                                        <div>
                                          <SvgIcon
                                            name="document-upload"
                                            className="w-[32px] h-[32px] !text-gray-500 "
                                          />
                                        </div>
                                      )}

                                      <h5 className="truncate w-[180px]">
                                        {target?.type == "PATH"
                                          ? getNameFromPath(target?.path)
                                          : target?.file?.name}
                                      </h5>
                                    </div>
                                    <div className=" flex justify-center items-center gap-2">
                                      {target?.downloadLink && (
                                        <a
                                          target="_blank"
                                          href={target?.downloadLink}
                                          download
                                          className="group cursor-pointer transition-[0.3s] hover:bg-gray-100  p-2	 rounded-full"
                                        >
                                          <SvgIcon
                                            name="document-download"
                                            className="w-[25px] group-hover:text-blue-480  h-[25px]  "
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : null}
                      </>
                    ) : (
                      <>
                        <div
                          key={uuidv4()}
                          className=" w-full flex justify-center items-start flex-col gap-[11px]"
                        >
                          <div
                            onClick={onImageUpload}
                            {...dragProps}
                            className={` bg-${
                              isDragging ? "#f4ebff" : ""
                            }  w-full  upload__image-wrapper cursor-pointer h-[110px] py-[16px] px-[24px] border-[1px] border-gray-200 rounded-[12px] flex flex-row-reverse justify-between items-center hover:border-blue-480 focus:border-blue-480  transition-all duration-300 `}
                          >
                            <>
                              <>
                                <button
                                  type="button"
                                  style={{
                                    background: isDragging ? "#7F56D9" : "",
                                  }}
                                  className={`bg-${
                                    isDragging ? "blue-450" : ""
                                  }   p-[10px] !rounded-[8px]  chart-shadow `}
                                >
                                  <SvgIcon
                                    name="upload-cloud-02"
                                    className={`w-[30px] h-[30px] ${
                                      isDragging
                                        ? "text-gray-100"
                                        : "text-gray-450"
                                    } `}
                                  />
                                </button>
                                <div>
                                  <bdi className=" flex justify-center items-center gap-[4px] w-fit">
                                    <h4 className="text-sm text-upload    font-semibold 	 text-blue-480 leading-[19.6px]">
                                      {` أضغط هنا لرفع ${targetNameShow}`}
                                    </h4>
                                    <h4 className="text-sm font-normal text-gray-400 leading-[19.6px]">
                                      أو قم بسحبه هنا
                                    </h4>
                                  </bdi>
                                  <h4 className="text-xs font-normal text-gray-40 leading-[16.8px] mt-[4px]">
                                    {placeholder}
                                  </h4>
                                </div>
                              </>
                            </>
                          </div>
                        </div>
                        {images?.length
                          ? imageList?.map((target, index) => {
                              return (
                                <div
                                  key={target?.id}
                                  className="my-[22px] gap-[18px] uploader rounded-[12px] py-[16px] px-[24px] w-full flex-col flex justify-center items-center bg-slate-100"
                                >
                                  <div
                                    className={` ${
                                      errors && errors[name] ? "invalid" : ""
                                    }  w-full flex justify-between items-center `}
                                  >
                                    <div className=" w-full gap-[12px] flex justify-start items-center ">
                                      {UploadType !== "FILE" ? (
                                        <AppImage
                                          src={target.path}
                                          alt="user"
                                          width={80}
                                          height={80}
                                          fit="contain"
                                          className="image-item  !object-cover !object-center rounded-[12px]   !w-[80px] !h-[80px]  flex justify-center items-center overflow-hidden"
                                        />
                                      ) : (
                                        <div>
                                          <SvgIcon
                                            name="document-upload"
                                            className="w-[32px] h-[32px] !text-gray-500 "
                                          />
                                        </div>
                                      )}

                                      <h5 className="truncate w-[180px]">
                                        {target?.type == "PATH"
                                          ? getNameFromPath(target?.path)
                                          : target?.file?.name}
                                      </h5>
                                    </div>
                                    <div className=" flex justify-center items-center gap-2">
                                      {target?.downloadLink && (
                                        <a
                                          target="_blank"
                                          href={target?.downloadLink}
                                          download
                                          className="group cursor-pointer transition-[0.3s] hover:bg-gray-100  p-2	 rounded-full"
                                        >
                                          <SvgIcon
                                            name="document-download"
                                            className="w-[25px] group-hover:text-blue-480  h-[25px]  "
                                          />
                                        </a>
                                      )}
                                      {isDelete && (
                                        <button
                                          type="button"
                                          className="group  transition-[0.3s] hover:bg-gray-100  p-2	 rounded-full"
                                          onClick={() => {
                                            onImageRemove(index);
                                          }}
                                        >
                                          <SvgIcon
                                            name="trash"
                                            className="w-[25px] h-[25px] text-gray-500 group-hover:text-blue-480 "
                                          />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  {showCropperModalBox && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setModalOpen({
                                          isOpen: true,
                                          index: index,
                                        });
                                      }}
                                      className="  gap-2 p-2	  w-full  text-base	    font-semibold 	 bg-blue-450  text-white leading-[25.6px]   py-[10px] px-[18px] text-center  rounded-[8px]  !flex justify-center items-center "
                                    >
                                      <span>تغيير حجم الشعار</span>{" "}
                                      <SvgIcon
                                        name="maximize-4"
                                        className="w-[25px] text-white  h-[25px]"
                                      />
                                    </button>
                                  )}
                                </div>
                              );
                            })
                          : null}
                        {showCropperModalBox && (
                          <CropperModalBox
                            handleChangeImage={(base64, file) => {
                              const updatedImages = images?.map(
                                (el, targetIndex) => {
                                  if (targetIndex === modalOpen?.index) {
                                    return {
                                      ...el,
                                      path: base64,
                                      file: file,
                                    };
                                  } else {
                                    return el;
                                  }
                                }
                              );
                              setImages(updatedImages);
                              field?.onChange(updatedImages);
                            }}
                            {...{
                              modalOpen,
                              setModalOpen,
                              image: images[modalOpen?.index],
                            }}
                          />
                        )}
                      </>
                    );
                  }}
                </ReactImageUploading>
                {errors && (
                  <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => (
                      <>
                        {message && (
                          <p className="text-red-500 text-xs mt-2">{message}</p>
                        )}
                      </>
                    )}
                  />
                )}
              </div>
            );
          }}
        />
      </div>
    );
  }
);
