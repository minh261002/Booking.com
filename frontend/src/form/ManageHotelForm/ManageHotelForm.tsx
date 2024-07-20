import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FactilitiesSection from "./FactilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImageSection";
import { HotelType } from "../../pages/MyHotels";
import { useEffect } from "react";

export type HotelFormData = {
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
    imageFiles: FileList;
    imageUrls: string[];
    lastUpdated: Date;
}

type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
}

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(hotel);
    }, [hotel, reset]);

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();

        if (hotel) {
            formData.append('hotelId', hotel._id);
        }

        formData.append('name', formDataJson.name);
        formData.append('city', formDataJson.city);
        formData.append('country', formDataJson.country);
        formData.append('description', formDataJson.description);
        formData.append('type', formDataJson.type);
        formData.append('pricePerNight', String(formDataJson.pricePerNight));
        formData.append('starRating', String(formDataJson.starRating));
        formData.append('adultCount', String(formDataJson.adultCount));
        formData.append('childCount', String(formDataJson.childCount));

        formDataJson.factilities.forEach((facility, index) => {
            formData.append(`factilities[${index}]`, facility);
        });

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append('imageFiles', imageFile);
        });

        onSave(formData);
    })
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FactilitiesSection />
                <GuestsSection />
                <ImageSection />

                <button
                    disabled={isLoading}
                    type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm