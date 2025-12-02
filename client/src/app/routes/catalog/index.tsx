
import { RootBoundary } from "../../../RootBoundary";
import { Product, useGetProductsQuery } from "./catalogApiSlice";
import { Card } from "../../components/card/Card";
import { CardContainer } from "../../components/card/CardContainer";
import { useMemo } from "react";
import "./catalog.css";
import { selectSearchText } from "./catalogSlice";
import { useSelector } from "react-redux";
import { SearchInput } from "../../components/card/components/filters/search";
import { CardHeader } from "../../components/card/CardHeader";

export const Catalog = () => {
    // const data = useLoaderData();
    // const [filteredData, setFilteredData] = useState<Product[]>([])
    // const [searchText, setSearchText] = useState("")

    const searchText: string = useSelector(selectSearchText);
    console.log(searchText)
    const { data, isError, isLoading, isSuccess } = useGetProductsQuery()
    /* const handleChange = useCallback(
        (text:string)=>{
            setSearchText(text);
        }
    ,[]) */
    const filteredData = useMemo(()=>{
        if(!(Array.isArray(data) && data.length > 0))
            return [];
        
        const filtered = data.filter((element: Product) => {
            return !searchText || 
            element.id.toString().toLowerCase().includes(searchText.trim().toLocaleLowerCase()) || 
            element.title.toString().toLowerCase().includes(searchText.trim().toLocaleLowerCase());
        })
        return filtered;
    },[data, searchText])
    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    else if(isError || !isSuccess) {
        return (
            <div>Error { JSON.stringify(data || {Message: "internal error"}) }</div>
        )
    }
    // const SearchInputMemo = memo(SearchInput, () => true); //true or false not good
    const filterComps = [
        <SearchInput
            key={1}
            //onChange={handleChange}
            placeholder="Search item"
        />
    ];

    return (
        <CardContainer 
            header={
                <>
                    <CardContainer.Header title="Catalog">
                        <CardContainer.Filters>
                            <>
                                {filterComps.map(elt => elt)}
                            </>
                        </CardContainer.Filters>
                    </CardContainer.Header>
                </>
            }
        >
            <div className="mt-[24px]">
            <CardHeader imageLabel="Image" idLabel="Id" titleLabel="Title" priceLabel="Price"/>
            {
                filteredData?.length > 0 ? (
                    filteredData?.map(({id, image, title, price}) => {
                        return (
                            <Card key={id} id={id} image={image} title={title} price={price}></Card>
                        )
                    })
                 
                ) : (
                    <div>The list is empty. Please update your search</div>
                )
            }
            </div>
        </CardContainer>
    )
}
  
/* const loader = async () => {
    const res = await fetch(`http://api.dropit.mock/products`,{
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res.json();
  } */

export const catalogRoute = { element: <Catalog />, /* loader, */ errorElement: <RootBoundary /> };