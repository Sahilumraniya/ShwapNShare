import React, { useId } from "react";

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
    }, ref) {
    const id = useId();
    return (
        <div className={`w-full`}>
            {label && (
                <label htmlFor={id} className="inline-block mb-1 pl-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${className}`}
                {...props}
                ref={ref}
            />
        </div>
    );
});

export default Input;
