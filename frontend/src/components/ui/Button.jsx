import * as React from "react"


const buttonVariants = (variant, size) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantStyles = {
        default: "text-white bg-black text-white-foreground hover:from-blue-500 hover:to-blue-700",
        destructive: "bg-gradient-to-r from-red-400 to-red-600 text-white-foreground hover:from-red-500 hover:to-red-700",
        outline: "border border-input bg-gradient-to-r from-gray-100 to-gray-300 hover:bg-gradient-to-r from-gray-200 to-gray-400 hover:text-gray-800",
        secondary: "bg-gradient-to-r from-white to-gray-200 text-secondary-foreground hover:bg-gradient-to-r from-white to-gray-300",
        ghost: "bg-white hover:bg-gradient-to-r from-orange-900 to-orange-950 hover:text-white-foreground",
        link: "text-primary underline-offset-4 hover:underline",
    };
    const sizeStyles = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };

    return `${baseStyles} ${variantStyles[variant || 'default']} ${sizeStyles[size || 'default']}`;
};

const Button = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? 'span' : "button";
        return (
            <Comp
                className={`${buttonVariants(variant, size)} ${className}`}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
