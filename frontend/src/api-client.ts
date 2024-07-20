import { SingInFormData } from './pages/Login';
import { RegisterFormData } from './pages/Register';
import { HotelSearchResponse, HotelType } from '../../backend/src/shared/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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