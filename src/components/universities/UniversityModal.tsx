import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Phone regex that matches exactly 10 digits after country code
const phoneRegex = /^\+\d{1,4}\d{10}$/;
const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

const universitySchema = z.object({
  name: z.string().min(1, 'University name is required'),
  location: z.string().min(1, 'Location is required'),
  commission_rate: z.number().min(0).max(100),
  contact_email: z.string().email('Invalid email').optional().nullable(),
  country_code: z.string().min(1, 'Country code is required'),
  contact_phone: z.string()
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .optional()
    .nullable(),
  website: z.string()
    .regex(websiteRegex, 'Invalid website URL')
    .optional()
    .nullable()
    .transform(val => {
      if (!val) return null;
      return val.startsWith('http') ? val : `https://${val}`;
    })
});

type UniversityFormData = z.infer<typeof universitySchema>;

interface UniversityModalProps {
  university?: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UniversityFormData) => Promise<void>;
}

const UniversityModal: React.FC<UniversityModalProps> = ({
  university,
  isOpen,
  onClose,
  onSubmit
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UniversityFormData>({
    resolver: zodResolver(universitySchema),
    defaultValues: university || {
      name: '',
      location: '',
      commission_rate: 0,
      contact_email: '',
      country_code: '+1',
      contact_phone: '',
      website: ''
    }
  });

  React.useEffect(() => {
    if (university) {
      reset(university);
    }
  }, [university, reset]);

  const handleFormSubmit = async (data: UniversityFormData) => {
    try {
      await onSubmit(data);
      toast.success(university ? 'University updated successfully' : 'University added successfully');
      onClose();
      navigate('/universities');
    } catch (error) {
      console.error('Error saving university:', error);
      toast.error('Error saving university');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{university ? 'Edit University' : 'Add University'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">University Name</label>
              <input
                {...register('name')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                {...register('location')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
              <input
                type="number"
                {...register('commission_rate', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.commission_rate && (
                <p className="mt-1 text-sm text-red-600">{errors.commission_rate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                {...register('contact_email')}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.contact_email && (
                <p className="mt-1 text-sm text-red-600">{errors.contact_email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="flex gap-2">
                <select
                  {...register('country_code')}
                  className="mt-1 w-24 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                  <option value="+86">+86</option>
                  <option value="+81">+81</option>
                </select>
                <input
                  {...register('contact_phone')}
                  placeholder="10 digits"
                  maxLength={10}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.contact_phone && (
                <p className="mt-1 text-sm text-red-600">{errors.contact_phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                {...register('website')}
                placeholder="www.example.com or https://example.com"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.website && (
                <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {university ? 'Update' : 'Save'} University
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniversityModal;