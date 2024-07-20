import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext"
import * as apiClient from '../api-client'
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import FactilitiesFilter from "../components/FactilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStar, setSelectedStar] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFactilities, setSelectedFactilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount,
        childCount: search.childCount,
        page: page.toString(),
        stars: selectedStar,
        types: selectedHotelTypes,
        factilities: selectedFactilities,
        maxPrice: selectedPrice?.toString(),
        sortOption
    }

    const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;

        setSelectedStar((prev) => {
            if (event.target.checked) {
                return [...prev, starRating];
            } else {
                return prev.filter((star) => star !== starRating);
            }
        });
    };

    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;

        setSelectedHotelTypes((prev) => {
            if (event.target.checked) {
                return [...prev, hotelType];
            } else {
                return prev.filter((type) => type !== hotelType);
            }
        });
    }

    const handleFactilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const factility = event.target.value;

        setSelectedFactilities((prev) => {
            if (event.target.checked) {
                return [...prev, factility];
            } else {
                return prev.filter((type) => type !== factility);
            }
        });
    }

    const { data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter By:</h3>

                    <StarRatingFilter selectedStars={selectedStar} onChange={handleStarChange} />

                    <HotelTypeFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />

                    <FactilitiesFilter selectedFactilities={selectedFactilities} onChange={handleFactilitiesChange} />

                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                        {hotelData?.pagination.total} Hotels Found
                        {search.destination && ` in ${search.destination}`}
                    </span>

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="rounded border border-slate-300 p-2"
                    >
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price: Low to High</option>
                        <option value="pricePerNightDesc">Price: High to Low</option>
                    </select>
                </div>

                {hotelData?.data.map((hotel) => (
                    <SearchResultCard hotel={hotel} key={hotel._id} />
                ))}

                <div>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page) => setPage(page)} />
                </div>
            </div>
        </div>
    )
}

export default Search;
