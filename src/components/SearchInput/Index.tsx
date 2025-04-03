import { SvgIcon } from "../SvgIcon/Index"

export const SearchInput = () => {
    return (
        <div className="flex items-center gap-3 border border-gray-200 rounded-lg overflow-hidden px-6">
            <SvgIcon name="search" className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="أبحث عن " className="focus:outline-none" />
        </div>
    )
}