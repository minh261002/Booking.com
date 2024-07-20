import React from "react";

type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchValues: (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number) => void;
}

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
    const [destination, setDestination] = React.useState<string>("");
    const [checkIn, setCheckIn] = React.useState<Date>(new Date());
    const [checkOut, setCheckOut] = React.useState<Date>(new Date());
    const [adultCount, setAdultCount] = React.useState<number>(1);
    const [childCount, setChildCount] = React.useState<number>(0);
    const [hotelId, setHotelId] = React.useState<string>("");

    const saveSearchValues = (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number, hotelId?: string) => {
        if (hotelId) {
            setHotelId(hotelId);
        }

        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
    }

    return (
        <SearchContext.Provider value={{
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            hotelId,
            saveSearchValues
        }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearchContext = () => {
    const context = React.useContext(SearchContext);
    return context as SearchContext;
};