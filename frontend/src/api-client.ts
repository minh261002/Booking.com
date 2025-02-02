import { SingInFormData } from './pages/Login';
import { RegisterFormData } from './pages/Register';
import { HotelSearchResponse, HotelType } from './pages/MyHotels';
import { UserType } from './pages/Booking';
import { BookingFormData } from './form/BookingForm/BookingForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error('Failed to get current user');
    }

    return response.json();
}

export const register = async (formData: RegisterFormData) => {

    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const login = async (formData: SingInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Invalid token');
    }
};

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }
};

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData
    });

    if (!response.ok) {
        throw new Error('Failed to add hotel');
    }

    return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hotels');
    }

    return response.json();
}

export const fetchMyHotelsById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hotel');
    }

    return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, {
        method: 'PUT',
        credentials: 'include',
        body: hotelFormData
    });

    if (!response.ok) {
        throw new Error('Failed to update hotel');
    }

    return response.json();
};

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: number;
    childCount?: number;
    page?: string;
    factilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
}

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('destination', searchParams.destination || '');
    queryParams.append('checkIn', searchParams.checkIn || '');
    queryParams.append('checkOut', searchParams.checkOut || '');
    queryParams.append('adultCount', String(searchParams.adultCount || ''));
    queryParams.append('childCount', String(searchParams.childCount || ''));
    queryParams.append('page', String(searchParams.page || ''));
    queryParams.append('maxPrice', String(searchParams.maxPrice || ''));
    queryParams.append('sortOption', searchParams.sortOption || '');

    searchParams.factilities?.forEach((facility) => {
        queryParams.append('factilities', facility);
    });

    searchParams.types?.forEach((type) => {
        queryParams.append('types', type);
    });

    searchParams.stars?.forEach((star) => {
        queryParams.append('stars', star);
    });

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if (!response.ok) {
        throw new Error('Failed to search hotels');
    }

    return response.json();
}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    return response.json();
};


export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalCost: number;
}

export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
): Promise<PaymentIntentResponse> => {
    const response = await fetch(
        `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ numberOfNights }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Error fetching payment intent");
    }

    return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('Failed to create booking');
    }

    return response.json();
};