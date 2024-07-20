import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


const GuestsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>

            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-200">
                <label className="text-gray-700 text-sm font-semibold">
                    Adults
                    <input type="number" min={1} className="border rounded w-full py-2 px-3 font-normal" {...register('adultCount', { required: "This field is required" })} />
                </label>

                <label className="text-gray-700 text-sm font-semibold">
                    Children
                    <input type="number" min={0} className="border rounded w-full py-2 px-3 font-normal" {...register('childCount', { required: "This field is required" })} />
                </label>
            </div>

            {errors.adultCount && <span className="text-red-500 text-sm font-medium">{errors.adultCount.message}</span>}
        </div>
    )
}

export default GuestsSection