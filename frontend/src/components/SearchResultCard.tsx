import { StarIcon } from "@heroicons/react/20/solid";
import { HotelType } from "../pages/MyHotels";
import { Link } from "react-router-dom";

type SearchResultCardProps = {
    hotel: HotelType;
}

const SearchResultCard = ({ hotel }: SearchResultCardProps) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px]">
                <img src={hotel.imageUrls[0]} alt={hotel.name} className="w-full h-full object-cover object-center rounded-lg" />
            </div>

            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map((_, index) => (
                                <StarIcon key={index} className="h-5 w-5 text-yellow-400" />
                            ))}
                        </span>

                        <span className="ml-1 text-sm">
                            {hotel.type}
                        </span>
                    </div>

                    <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
                        {hotel.name}
                    </Link>
                </div>

                <div>
                    <div className="line-clamp-4">
                        {hotel.description}
                    </div>
                </div>

                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                    <div className="flex gap-1 items-center">
                        {hotel.factilities.slice(0, 2).map((factility, index) => (
                            <span key={index} className="text-sm bg-slate-200 text-slate-800 px-2 py-1 rounded-lg">
                                {factility}
                            </span>
                        ))}

                        <span className="text-sm">
                            {hotel.factilities.length > 2 && `+${hotel.factilities.length - 2} more`}
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold text-blue-600">
                            ${hotel.pricePerNight} <span className="text-sm text-black">/ night</span>
                        </span>

                        <Link to={`/detail/${hotel._id}`} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 duration-300">
                            See availability
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResultCard