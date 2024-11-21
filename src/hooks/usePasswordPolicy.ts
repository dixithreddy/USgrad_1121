import { useState, useCallback } from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordStrength {
  score: number;
  feedback: {
    warning?: string;
    suggestions: string[];
  };
}

export const usePasswordPolicy = () => {
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: { suggestions: [] }
  });

  const checkPasswordStrength = useCallback((password: string) => {
    const result = zxcvbn(password);
    setStrength({
      score: result.score,
      feedback: result.feedback
    });
    return result.score >= 3;
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar &&
      checkPasswordStrength(password)
    );
  }, [checkPasswordStrength]);

  return {
    strength,
    checkPasswordStrength,
    validatePassword
  };
};