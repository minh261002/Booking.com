import { useForm } from "react-hook-form";
import { UserType } from "../../pages/Booking";
import { PaymentIntentResponse } from "../../api-client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../context/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../context/AppContext";

type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse;
}

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    hotelId: string;
    paymentIntentId: string;
    totalCost: number;
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const search = useSearchContext();
    const { hotelId } = useParams();

    const { showToast } = useAppContext();

    const { mutate: BookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {
        onSuccess: () => {
            showToast({ message: "Room Booked Successfully", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Failed to book room", type: "ERROR" });
        }
    });

    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn?.toISOString(),
            checkOut: search.checkOut?.toISOString(),
            hotelId: hotelId as string,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId
        }
    });

    const onSubmit = async (formData: BookingFormData) => {
        if (!stripe || !elements) return null;

        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
            }
        });

        if (result.paymentIntent?.status === "succeeded") {
            BookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
        }

    }

    return (
        <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5" onSubmit={handleSubmit(onSubmit)}>
            <span className="text-2xl font-bold">
                Confirm Your Details
            </span>

            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-semibold flex-1">
                    First Name
                    <input
                        className="border border-slate-300 rounded-md p-2 w-full mt-1"
                        type="text"
                        readOnly
                        disabled
                        defaultValue={currentUser.firstName}
                        {...register("firstName")}
                    />
                </label>

                <label className="text-gray-700 text-sm font-semibold flex-1">
                    Last Name
                    <input
                        className="border border-slate-300 rounded-md p-2 w-full mt-1"
                        type="text"
                        readOnly
                        disabled
                        defaultValue={currentUser.lastName}
                        {...register("lastName")}
                    />
                </label>
            </div>

            <label className="text-gray-700 text-sm font-semibold">
                Email
                <input
                    className="border border-slate-300 rounded-md p-2 w-full mt-1"
                    type="email"
                    readOnly
                    disabled
                    defaultValue={currentUser.email}
                    {...register("email")}
                />
            </label>

            <div className="space-y-2">
                <div className="text-xl font-semibold">
                    Payment Information
                </div>
            </div>

            <div className="bg-blue-200 p-4 rounded-md">
                <div className="font-semibold text-lg">
                    Total Price: ${paymentIntent.totalCost.toFixed(2)}
                </div>

                <div className="text-xs">
                    Includes all taxes and fees
                </div>
            </div>

            <div className="space-y-2">
                <div className="text-lg font-semibold">
                    Payment Details
                </div>

                <CardElement id="payment-element" className="border border-slate-300 rounded-md p-2" />
            </div>

            <button
                disabled={isLoading}
                className="bg-blue-500 text-white font-semibold p-2 rounded-md w-full"
                type="submit"
            >
                {isLoading ? "Booking..." : "Confirm Booking"}
            </button>
        </form>
    )
}

export default BookingForm