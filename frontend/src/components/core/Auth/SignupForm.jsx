import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { validateField, getPasswordStrength } from "../../../utils/validation"
import Tab from "../../common/Tab"



function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Real-time validation
    if (touched[name]) {
      const validation = validateField(name, value, name === 'confirmPassword' ? formData.password : null);
      setErrors(prev => ({
        ...prev,
        [name]: validation.isValid ? '' : validation.message
      }));
    }
  };

  // Handle field blur for validation
  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const validation = validateField(name, value, name === 'confirmPassword' ? formData.password : null);
    setErrors(prev => ({
      ...prev,
      [name]: validation.isValid ? '' : validation.message
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const validation = validateField(field, formData[field], field === 'confirmPassword' ? formData.password : null);
      if (!validation.isValid) {
        newErrors[field] = validation.message;
      }
    });

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the validation errors");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          {/* First Name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none ${
                errors.firstName ? 'border border-red-500' : ''
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            )}
          </label>

          {/* Last Name */}
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none ${
                errors.lastName ? 'border border-red-500' : ''
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            )}
          </label>
        </div>

        {/* Email Address */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none ${
              errors.email ? 'border border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </label>


        <div className="flex gap-x-4">
          {/* Create Password */}
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none ${
                errors.password ? 'border border-red-500' : ''
              }`}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
            {password && (
              <div className="mt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-richblack-300">Password Strength:</span>
                  <span className={getPasswordStrength(password).color}>
                    {getPasswordStrength(password).level}
                  </span>
                </div>
                <div className="mt-1 h-1 bg-richblack-700 rounded">
                  <div 
                    className={`h-full rounded transition-all duration-300 ${
                      getPasswordStrength(password).score <= 2 ? 'bg-red-500' :
                      getPasswordStrength(password).score <= 3 ? 'bg-yellow-500' :
                      getPasswordStrength(password).score <= 4 ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: getPasswordStrength(password).width }}
                  ></div>
                </div>
              </div>
            )}
          </label>

          {/* Confirm Password  */}
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 outline-none ${
                errors.confirmPassword ? 'border border-red-500' : ''
              }`}
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </label>
        </div>


        <button
          type="submit"
          disabled={Object.keys(errors).some(key => errors[key]) || !firstName || !lastName || !email || !password || !confirmPassword}
          className={`mt-6 rounded-[8px] py-[8px] px-[12px] font-medium transition-all duration-200 ${
            Object.keys(errors).some(key => errors[key]) || !firstName || !lastName || !email || !password || !confirmPassword
              ? 'bg-richblack-600 text-richblack-300 cursor-not-allowed'
              : 'bg-yellow-50 text-richblack-900 hover:bg-yellow-25'
          }`}
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm