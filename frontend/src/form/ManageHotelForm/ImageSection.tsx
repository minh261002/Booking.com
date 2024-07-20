import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


const ImageSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <label className="text-gray-700 text-sm font-semibold">
                    Upload Images
                    <input type="file" accept="image/*" multiple className="border rounded w-full py-2 px-3 font-normal" {...register('imageFiles', {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length;

                            if (totalLength === 0) {
                                return "Please upload at least one image";
                            } else if (totalLength > 6) {
                                return "You can upload up to 5 images";
                            } else {
                                return true;
                            }
                        }
                    })} />
                </label>
                {errors.imageFiles && <span className="text-red-500 text-sm font-medium">{errors.imageFiles.message}</span>}
            </div>
        </div>
    )
}

export default ImageSection