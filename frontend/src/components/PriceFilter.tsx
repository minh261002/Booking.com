type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
}

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
        <>
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select value={selectedPrice} onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : undefined)} className="pr-4 w-full rounded border border-slate-300 p-2">
                <option value="">Select Max Price</option>
                {[50, 100, 200, 300, 500].map((price) => (
                    <option key={price} value={price}>{price}</option>
                ))}
            </select >
        </>
    );
}

export default PriceFilter;