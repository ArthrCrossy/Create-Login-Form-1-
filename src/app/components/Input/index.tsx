import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';
import { LucideIcon } from 'lucide-react';

const inputVariants = cva(
    // Classes base para todos os inputs
    'w-full py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
    {
        variants: {
            variant: {
                default: 'border-gray-300',
                error: 'border-red-500',
            },
            hasLeftIcon: {
                true: 'pl-10',
                false: 'pl-3',
            },
            hasRightIcon: {
                true: 'pr-10',
                false: 'pr-3',
            },
        },
        defaultVariants: {
            variant: 'default',
            hasLeftIcon: false,
            hasRightIcon: false,
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
        VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
    leftIcon?: LucideIcon;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            leftIcon: LeftIcon,
            rightIcon,
            onRightIconClick,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
        const hasLeftIcon = !!LeftIcon;
        const hasRightIcon = !!rightIcon;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm mb-2 text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {LeftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LeftIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    )}
                    <input
                        id={inputId}
                        ref={ref}
                        className={cn(
                            inputVariants({
                                variant: error ? 'error' : 'default',
                                hasLeftIcon,
                                hasRightIcon,
                                className,
                            })
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <button
                            type="button"
                            onClick={onRightIconClick}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {rightIcon}
                        </button>
                    )}
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';