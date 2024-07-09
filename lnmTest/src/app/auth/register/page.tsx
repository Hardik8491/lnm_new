"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Ensure correct import
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "@/redux/features/authApi";
import { useSelector } from "react-redux";
export default function Register() {
  const [register, { isError, data, isLoading, error, isSuccess }] =
    useRegisterMutation();
  const err = useSelector((state: any) => state.auth.error);

  useEffect(() => {
    if (err) {
      toast.error(err);
    }

    if (isSuccess) {
      const message =
        data?.message ||
        "Registration successful! Please check your email for activation link";
      router.push(`/auth/verification?email=${email}`);
    }

    if (isError) {
      if ("data" in error) {
        const ErrorData = error as any;
        toast.error(ErrorData.data.message);
      }
    }
  }, [data?.message, error, isError, isSuccess]);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateFirstName = (firstName: string) => {
    const re = /^[a-zA-Z]{2,20}$/;
    return re.test(String(firstName).toLowerCase());
  };

  const validateLastName = (lastName: string) => {
    const re = /^[a-zA-Z]{2,20}$/;
    return re.test(String(lastName).toLowerCase());
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;
    return re.test(password);
  };

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
    if (!validateFirstName(e.target.value)) {
      setFirstNameError("Please enter a valid first name.");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value);
    if (!validateLastName(e.target.value)) {
      setLastNameError("Please enter a valid last name.");
    } else {
      setLastNameError("");
    }
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError(
        "Password must be 6-18 characters long and include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Validate all fields
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isFirstNameValid) {
      setFirstNameError("Please enter a valid first name.");
    }

    if (!isLastNameValid) {
      setLastNameError("Please enter a valid last name.");
    }

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
    }

    if (!isPasswordValid) {
      setPasswordError(
        "Password must be 6-18 characters long and include uppercase, lowercase, number, and special character."
      );
    }

    // Submit form if all fields are valid
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid
    ) {
      const data = { firstName, lastName, email, password };

      try {
        const res = await register(data);
        if (res.error) {
          console.log(res.error);

          toast.error("Registration failed");
        }
        // Handle success4
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto  sm:w-[450px] max-w-md p-6  rounded-lg border bg-card text-card-foreground shadow-sm ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                  value={firstName}
                  autoComplete="off"
                  onFocus={() => setFirstNameError("")}
                  onChange={handleFirstNameChange}
                />
                {firstNameError && (
                  <p className="text-red-500 text-sm">{firstNameError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  value={lastName}
                  autoComplete="off"
                  onFocus={() => setLastNameError("")}
                  onChange={handleLastNameChange}
                />
                {lastNameError && (
                  <p className="text-red-500 text-sm">{lastNameError}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="edutech@example.com"
                value={email}
                autoComplete="off"
                onFocus={() => setEmailError("")}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="&H@rd2Gu3ss"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 justify-end"
                >
                  {!showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 max-w-sm text-sm">{passwordError}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
            <div className="flex items-center">
              <div className="h-px flex-1 bg-border" />
              <p className="px-4 text-muted-foreground">or</p>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <FacebookIcon className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" className="w-full">
                <ChromeIcon className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              already have an account?{" "}
              <Link href="/auth/login" className="underline" prefetch={false}>
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
