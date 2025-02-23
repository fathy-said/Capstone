import LoadingImage from "../../assets/Images/loading1.gif";
type Props = {
    isOpen: boolean,
};

function ModalLoading({ isOpen }: Props) {
    return isOpen && <div className=" w-full h-ful fixed top-0 bottom-0 left-0 right-0 bg-[#ffffffc8] z-[60] flex justify-center items-center">
        <div className=" w-full h-fit max-w-[150px] " ><img src={LoadingImage} className=" w-full h-full object-contain object-center" alt="" /></div>
    </div>;
}

export default ModalLoading;
