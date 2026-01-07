import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui/utils';

const buttonVariants = cva(

    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                // Botão primário (azul) - para ações principais
                primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
                // Botão outline - para OAuth e ações secundárias
                outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                // Botão ghost - para links e ações sutis
                ghost: 'text-blue-600 hover:text-blue-800 hover:bg-blue-50',
                // Botão de link - apenas texto
                link: 'text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-10 px-4 py-2',
                lg: 'h-12 px-6 text-base',
                icon: 'h-10 w-10',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';