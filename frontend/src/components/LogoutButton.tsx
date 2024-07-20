import { ArrowRightIcon } from "@heroicons/react/20/solid"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../context/AppContext"

const LogoutButton = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.logout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            showToast({ message: 'Logout successful!', type: 'SUCCESS' });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        }
    })

    const handleLogout = () => {
        mutation.mutate();
    }
    return (
        <button className="flex items-center gap-3 text-blue-600 px-3 font-bold bg-white hover:bg-gray-100" onClick={handleLogout}>
            Logout
            <ArrowRightIcon className="h-5 w-5 text-blue-600" />
        </button>
    )
}

export default LogoutButton