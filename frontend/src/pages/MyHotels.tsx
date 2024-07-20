import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import * as apiClient from '../api-client'
import { BuildingOffice2Icon, MapIcon, PencilSquareIcon, StarIcon, UserIcon } from '@heroicons/react/20/solid'

export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    factilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
}

export type HotelSearchResponse = {
    data: HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}

const MyHotels = () => {
    const { data: hotleData } = useQuery('fetchMyHotles', apiClient.fetchMyHotels, {
        onError: (error) => {
            alert(error)
        }
    })

    if (!hotleData) {
        return (
            <div>
                You have no hotels
            </div>
        )
    }

    return (
        <div className='space-y-5'>
            <span className='flex justify-between'>
                <h1 className='text-3xl font-bold'>My Hotels</h1>
                <Link className='flex bg-blue-600 text-white text-xl font-medium py-2 px-4 hover:bg-blue-400 duration-300' to="/add-hotel">Add New Hotel</Link>
            </span>

            <div className='grid grid-cols-1 gap-8'>
                {hotleData?.map((hotel) => (

                    <div className='grid-cols-1 flex flex-col justify-between border border-slate-300 rounded-md p-8 gap-5'>
                        <h2 className='text-2xl font-bold'>
                            {hotel.name}
                        </h2>

                        <div className='whitespace-pre-line'>
                            {hotel.description.length > 80 ? hotel.description.substring(0, 300) + '...' : hotel.description}
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <MapIcon className='h-5 w-5 mr-2' />
                                {hotel.city} - {hotel.country}
                            </div>

                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BuildingOffice2Icon className='h-5 w-5 mr-2' />
                                {hotel.type}
                            </div>

                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <UserIcon className='h-5 w-5 mr-2' />
                                {hotel.adultCount} Adults {' '}
                                -
                                {' '}
                                {hotel.childCount} Children
                            </div>

                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <StarIcon className='h-5 w-5 mr-2' />
                                {hotel.starRating} Stars Reviews
                            </div>
                        </div>

                        <span className='flex justify-end'>
                            <Link className='bg-blue-600 text-white text-xl font-medium py-2 px-4 hover:bg-blue-400 duration-300' to={`/edit-hotel/${hotel._id}`}>
                                <PencilSquareIcon className='h-5 w-5' />
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyHotels