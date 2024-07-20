import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Add New Hotel</h1>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input type="text" className="border rounded w-full p-2 font-normal" {...register('name', { required: "This field is require" })} />
                {errors.name && <span className="text-red-500 text-sm font-medium">{errors.name.message}</span>}
            </label>

            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input type="text" className="border rounded w-full p-2 font-normal" {...register('city', { required: "This field is require" })} />
                    {errors.city && <span className="text-red-500 text-sm font-medium">{errors.city.message}</span>}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input type="text" className="border rounded w-full p-2 font-normal" {...register('country', { required: "This field is require" })} />
                    {errors.country && <span className="text-red-500 text-sm font-medium">{errors.country.message}</span>}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea rows={10} className="border rounded w-full p-2 font-normal" {...register('description', { required: "This field is require" })} />
                {errors.description && <span className="text-red-500 text-sm font-medium">{errors.description.message}</span>}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Price per night
                <input type="number" className="border rounded w-full p-2 font-normal" {...register('pricePerNight', { required: "This field is require" })} />
                {errors.pricePerNight && <span className="text-red-500 text-sm font-medium">{errors.pricePerNight.message}</span>}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Star Rating
                <select {...register("starRating", { required: "This field is require" })}
                    className="border rounded w-full p-2 text-gray-800">
                    <option value="" className="text-sm font-bold">
                        Select a rating
                    </option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>{rating}</option>
                    ))}
                </select>
                {errors.starRating && <span className="text-red-500 text-sm font-medium">{errors.starRating.message}</span>}
            </label>
        </div>
    )
}

export default DetailsSection