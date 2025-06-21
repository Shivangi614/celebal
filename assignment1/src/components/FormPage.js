
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Validation function returns errors object
  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'First Name is required';
    if (!form.lastName) newErrors.lastName = 'Last Name is required';
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Valid email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (
      !form.phone ||
      !/^\+\d{1,3}\s\d{10}$/.test(form.phone)
    )
      newErrors.phone = 'Valid phone number required (e.g. +91 9876543210)';
    if (!form.country) newErrors.country = 'Country is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan))
      newErrors.pan = 'Valid PAN is required (e.g. ABCDE1234F)';
    if (!form.aadhar || !/^\d{12}$/.test(form.aadhar))
      newErrors.aadhar = 'Valid Aadhar is required (12 digits)';
    return newErrors;
  };

  // Run validation on every input change for live error updates
  useEffect(() => {
    setErrors(validate());
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      navigate('/display', { state: form });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Render all fields dynamically including country & city for error display
  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: showPassword ? 'text' : 'password' },
    { name: 'phone', label: 'Phone (+countryCode space number)', type: 'text' },
    { name: 'pan', label: 'PAN Number', type: 'text' },
    { name: 'aadhar', label: 'Aadhar Number', type: 'text' },
  ];

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Registration Form</h2>

      {fields.map(({ name, label, type }) => (
        <div key={name} style={{ marginBottom: 12 }}>
          <label>{label}*</label><br />
          <input
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
          />
          {name === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              style={{ marginLeft: 8 }}
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          )}
          {errors[name] && (
            <div style={{ color: 'red', marginTop: 4 }}>{errors[name]}</div>
          )}
        </div>
      ))}

    
      <div style={{ marginBottom: 12 }}>
        <label>Country*</label><br />
        <select name="country" value={form.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
        {errors.country && (
          <div style={{ color: 'red', marginTop: 4 }}>{errors.country}</div>
        )}
      </div>

      
      <div style={{ marginBottom: 12 }}>
        <label>City*</label><br />
        <select name="city" value={form.city} onChange={handleChange}>
          <option value="">Select City</option>
          {form.country === 'India' && (
            <>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </>
          )}
          {form.country === 'USA' && (
            <>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
            </>
          )}
        </select>
        {errors.city && (
          <div style={{ color: 'red', marginTop: 4 }}>{errors.city}</div>
        )}
      </div>

      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Submit
      </button>
    </form>
  );
}

export default FormPage;
