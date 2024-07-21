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
    const [destination, setDestination] = React.useState<string>(() => sessionStorage.getItem('destination') || "");
    const [checkIn, setCheckIn] = React.useState<Date>(() => new Date(sessionStorage.getItem('checkIn') || new Date().toISOString()));
    const [checkOut, setCheckOut] = React.useState<Date>(() => new Date(sessionStorage.getItem('checkOut') || new Date().toISOString()));
    const [adultCount, setAdultCount] = React.useState<number>(() => parseInt(sessionStorage.getItem('adultCount') || "1"));
    const [childCount, setChildCount] = React.useState<number>(() => parseInt(sessionStorage.getItem('childCount') || "0"));
    const [hotelId, setHotelId] = React.useState<string>(() => sessionStorage.getItem('hotelId') || "");

    const saveSearchValues = (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number, hotelId?: string) => {
        if (hotelId) {
            setHotelId(hotelId);
        }

        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);

        sessionStorage.setItem('destination', destination);
        sessionStorage.setItem('checkIn', checkIn.toISOString());
        sessionStorage.setItem('checkOut', checkOut.toISOString());
        sessionStorage.setItem('adultCount', adultCount.toString());
        sessionStorage.setItem('childCount', childCount.toString());
        if (hotelId) {
            sessionStorage.setItem('hotelId', hotelId);
        }

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