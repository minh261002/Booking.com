import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export type SingInFormData = {
    email: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SingInFormData>();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const location = useLocation();

    const mutation = useMutation(apiClient.login, {
        onSuccess: () => {
            showToast({ message: 'Login successful!', type: 'SUCCESS' });
            queryClient.invalidateQueries('validateToken');
            navigate(location.state?.from?.pathname || '/');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    });

    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Login</h2>

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

            <span className='text-sm'>
                Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link>
            </span>

            <button className="bg-blue-500 text-white font-bold py-2 rounded" type="submit">
                Login
            </button>
        </form>
    )
}

export default Login