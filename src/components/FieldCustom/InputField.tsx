type inputType = "text" | "password";

interface InputFieldProps {
    label: string;
    id: string;
    type?: inputType;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const InputField = ({
    label,
    id,
    type = "text",
    value,
    onChange,
    placeholder,
}: InputFieldProps) => (
    <div className="flex flex-col mb-4">
        <label htmlFor={id} className="font-medium text-lg text-left text-black">
            {label}
        </label>
        <input
            type={type}
            id={id}
            className="px-4 py-3 mt-2 border border-gray-300 rounded-md bg-white text-black outline-none"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);

export default InputField;