import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FactilitiesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Factilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {hotelFacilities.map((factility) => (
                    <label className="text-sm flex gap-1 text-gray-700" key={factility}>
                        <input
                            type="checkbox"
                            value={factility}
                            {...register("factilities", {
                                validate: (factilities) => {
                                    if (factilities && factilities.length > 0) {
                                        return true;
                                    } else {
                                        return "At least one factility is required";
                                    }
                                },
                            })}
                        />
                        {factility}
                    </label>
                ))}
            </div>
            {errors.factilities && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.factilities.message}
                </span>
            )}
        </div>
    );
};

export default FactilitiesSection;

