export default function InputField({
        label,
        id,
        name,
        type = "text",
        required,
        step,
        placeholder,
        error,
        defaultValue,
}: {
        label: string;
        id: string;
        name: string;
        type: string;
        required?: boolean;
        step?: string;
        placeholder?: string;
        error?: string[];
        defaultValue?: string | number;
}) {
        return (
                <div>
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                                {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                                type={type}
                                id={id}
                                name={name}
                                step={step}
                                required={required}
                                placeholder={placeholder}
                                defaultValue={defaultValue}
                                className="block w-full rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 transition text-sm p-2.5"
                        />
                        {error && <p className="mt-1 text-sm text-red-600">{error.join(", ")}</p>}
                </div>
        );
}
