import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../services/authService';

const resetSchema = z.object({
  email: z.string().email('Invalid email address')
});

type ResetFormData = z.infer<typeof resetSchema>;

const PasswordReset = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema)
  });

  const onSubmit = async (data: ResetFormData) => {
    try {
      setError('');
      await authService.initiatePasswordReset(data.email);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to initiate password reset. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
        <p className="text-gray-600">
          If an account exists for {submitted}, you will receive password reset instructions.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;