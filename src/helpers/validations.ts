export interface Form {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export const validateRegistration = (
  form: Form,
  setErrors: (form: Form) => void
): boolean => {
  const newErrors: Form = {}
  let isValid = true

  // Name validation
  if (!form?.name?.trim()) {
    newErrors.name = 'Name is required'
    isValid = false
  } else if (form.name.length < 2) {
    newErrors.name = 'Name must be at least 2 characters'
    isValid = false
  }

  // Email validation
  if (!form?.email?.trim()) {
    newErrors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    newErrors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (!form?.password) {
    newErrors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  // Confirm password validation
  if (form?.password !== form?.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
    isValid = false
  }
  setErrors(newErrors)
  return isValid
}

export const validateLogin = (
  form: Form,
  setErrors: (form: Form) => void
): boolean => {
  const newErrors: Form = {}
  let isValid = true

  // Email validation
  if (!form?.email?.trim()) {
    newErrors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    newErrors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (!form?.password) {
    newErrors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  setErrors(newErrors)
  return isValid
}
