import debounce from "lodash/debounce";
import { FunctionComponent, useCallback, useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from "react-redux";
import { selectSearchText, setSearchText } from "../../../../routes/catalog/catalogSlice";
export type SearchFunctionComponent = FunctionComponent<{/* onChange: (text:string) => void, */ placeholder?:string} >;
export const SearchInput: SearchFunctionComponent = ({/* onChange, */ placeholder}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const searchText: string = useSelector(selectSearchText);
    const handleSearchChange = useCallback(
        debounce(
          async (newSearch: string) => {
            dispatch(setSearchText({searchText: newSearch}))
            //onChange(newSearch);
          },
          200,
          { leading: false, trailing: true }
        ),
        []
        //[onChange]
      );
    return (
        <div className="w-[100%] relative">
            <div className="absolute top-0 left-[16px] w-[37px] h-[37px] flex justify-center items-center">
                <MagnifyingGlassIcon className="text-[#909090] w-[24px] h-[24px]"/>
            </div>
            <input  className="w-[100%] leading-[37px] text-[#909090] text-[14px] pl-[50px]" 
                    value={text === ""? searchText : text}
                    //value={text}
                    onChange={(event) => {
                        setText(event.target.value);
                        handleSearchChange(event.target.value);
                    }}
                    placeholder={placeholder}
                    autoFocus
            />
        </div>
    )
}