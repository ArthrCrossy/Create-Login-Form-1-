    import { useState } from 'react';
    import { useForm } from 'react-hook-form';
    import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
    import { Button } from '../../app/components/Button/index';


    interface ForgotPasswordFormData {
      email: string;
    }

    interface ForgotPasswordProps {
      onBackToLogin?: () => void;
    }

    export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
      const [emailSent, setEmailSent] = useState(false);
      const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
      } = useForm<ForgotPasswordFormData>();

      const onSubmit = (data: ForgotPasswordFormData) => {
        console.log('Password reset requested for:', data.email);
        // Handle password reset logic here
        setEmailSent(true);
      };

      if (emailSent) {
        return (
          <div className="w-full max-w-md mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h1 className="text-3xl mb-2">Check Your Email</h1>
                <p className="text-gray-600">
                  We've sent a password reset link to
                </p>
                <p className="text-gray-800 mt-2">{getValues('email')}</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  Click the link in the email to reset your password. If you don't see the email, check your spam folder.
                </p>

                <button
                  onClick={onBackToLogin}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Back to Login
                </button>

                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full text-blue-600 hover:text-blue-800 text-sm"
                >
                  Resend email
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="w-full max-w-md mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <button
              onClick={onBackToLogin}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </button>

            <div className="text-center mb-8">
              <h1 className="text-3xl mb-2">Reset Password</h1>
              <p className="text-gray-600">
                Enter your email and we'll send you a link to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="link"
              >
                Send Reset Link
              </Button>
            </form>
          </div>
        </div>
      );
    }
