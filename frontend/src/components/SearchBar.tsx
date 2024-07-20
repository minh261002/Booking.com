import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext"
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navgate = useNavigate();

    const search = useSearchContext();
    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navgate("/search");
    }

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
            <div className="flex flex-row items-center flex-1 bg-white p-3">
                <GlobeAsiaAustraliaIcon className="h-6 w-6 text-gray-400" />
                <input
                    placeholder="Where are you going?"
                    type="text"
                    className="text-md w-full focus:outline-none ml-3"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>

            <div className="flex bg-white px-2 py-2 gap-2">
                <label className="flex items-center">
                    Adults:
                    <input
                        className="w-full p-1 font-bold focus:outline-none"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(e) => setAdultCount(parseInt(e.target.value))}
                    />
                </label>

                <label className="flex items-center">
                    Children:
                    <input
                        className="w-full p-1 font-bold focus:outline-none"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(e) => setChildCount(parseInt(e.target.value))}
                    />
                </label>
            </div>

            <div>
                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in"
                    className="min-w-full p-3 bg-white focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>

            <div>
                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-out"
                    className="min-w-full p-3 bg-white focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>

            <div className="flex gap-1">
                <button className="w-2/3 bg-blue-600 text-white h-full p-3 font-medium text-md hover:bg-blue-400 duration-300" type="submit">
                    Search
                </button>

                <button className="w-2/3 bg-red-600 text-white h-full p-3 font-medium text-md hover:bg-red-400 duration-300">
                    Clear
                </button>
            </div>
        </form>
    )
}

export default SearchBar