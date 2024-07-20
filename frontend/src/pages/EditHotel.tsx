import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import ManageHotelForm from "../form/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams();
    const { data: hotel } = useQuery('fetchMyHotelById', () => apiClient.fetchMyHotelsById(hotelId || ''), {
        enabled: !!hotelId
    });
    const { showToast } = useAppContext();


    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: 'Hotel updated successfully', type: 'SUCCESS' });
        },
        onError: () => {
            showToast({ message: 'Failed to update hotel', type: 'ERROR' });
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    )
}

export default EditHotel