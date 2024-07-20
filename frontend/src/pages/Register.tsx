import { useForm } from "react-hook-form"
import * as apiClient from '../api-client'
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const { showToast } = useAppContext();
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Account created successfully", type: 'SUCCESS' });
            await queryClient.invalidateQueries('validateToken');
            navigate('/');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>

            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input type="text" className="border rounded w-full p-2 font-normal" {...register('firstName', { required: "This field is require" })} />
                    {errors.firstName && <span className="text-red-500 text-sm font-medium">{errors.firstName.message}</span>}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input type="text" className="border rounded w-full p-2 font-normal" {...register('lastName', { required: "This field is require" })} />
                    {errors.lastName && <span className="text-red-500 text-sm font-medium">{errors.lastName.message}</span>}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full p-2 font-normal" {...register('email', { required: "This field is require" })} />
                {errors.email && <span className="text-red-500 text-sm font-medium">{errors.email.message}</span>}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full p-2 font-normal" {...register('password', { required: "This field is require", minLength: { value: 6, message: "Passwords must be at least 6 characters" } })} />
                {errors.password && <span className="text-red-500 text-sm font-medium">{errors.password.message}</span>}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input type="password" className="border rounded w-full p-2 font-normal" {...register('confirmPassword', {
                    validate: (val) => {
                        if (!val) {
                            return "This field is require"
                        } else if (watch('password') !== val) {
                            return "Passwords do not match"
                        }
                    }
                })} />
                {errors.confirmPassword && <span className="text-red-500 text-sm font-medium">{errors.confirmPassword.message}</span>}
            </label>

            <span className='text-sm'>
                Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
            </span>

            <button className="bg-blue-500 text-white font-bold py-2 rounded" type="submit">
                Create Account
            </button>
        </form>
    )
}

export default Register