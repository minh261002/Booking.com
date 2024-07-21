import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker"
import { useSearchContext } from "../../context/SearchContext"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"

type Props = {
    hotelId: string,
    pricePerNight: number,
}

type GuestInfoFormData = {
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        }
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
    const minDate = new Date();
    const maxDate = new Date();

    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate('/login', { state: { from: location } });
    }

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`);
    }

    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
            <h3 className="text-md font-bold">
                ${pricePerNight} / night
            </h3>

            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                        <DatePicker
                            selected={checkIn}
                            onChange={(date) => setValue("checkIn", date as Date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full p-3 bg-white focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>

                    <div>
                        <DatePicker
                            selected={checkOut}
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="min-w-full p-3 bg-white focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                    </div>

                    <div className="flex bg-white px-2 py-2 gap-2">
                        <label className="flex items-center flex-1">
                            Adults:
                            <input
                                className="w-full p-1 font-bold focus:outline-none"
                                type="number"
                                min={1}
                                max={20}
                                {...register("adultCount", { required: "This field is required", min: { value: 1, message: "There must be at least one adult" }, valueAsNumber: true })}
                            />
                        </label>

                        <label className="flex items-center flex-1">
                            Children:
                            <input
                                className="w-full p-1 font-bold focus:outline-none"
                                type="number"
                                min={0}
                                max={20}
                                {...register("childCount", { valueAsNumber: true })}
                            />
                        </label>
                        {errors.adultCount && <span className="text-red-500">{errors.adultCount.message}</span>}
                    </div>
                    {isLoggedIn ? (
                        <button className="bg-blue-600 text-white w-full h-full font-medium hover:bg-blue-500 text-md duration-300 p-3">
                            Book Now
                        </button>
                    ) : (
                        <button className="bg-blue-600 text-white w-full h-full font-medium hover:bg-blue-500 text-md duration-300 p-3">
                            Please login to book
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default GuestInfoForm