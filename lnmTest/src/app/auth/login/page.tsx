"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChromeIcon, Eye, EyeOff, FacebookIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/authApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [Login, { isError, data, isLoading, error, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login successful";
      toast.success(message);

      router.push("/");
    }
    if (isError) {
      if ("data" in error) {
        const ErrorData = error as any;
        toast.error(ErrorData.data.message);
      }
    }
  }, [data?.message, error, isError, isSuccess]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateEmail = (email:string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;
    return re.test(password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError(
        "Password must be 6-18 characters long and include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be 6-12 characters long and include uppercase, lowercase, number, and special character."
      );
      valid = false;
    }

    if (valid) {
      const data = {
        email,
        password,
      };
      await Login(data);

      // Proceed with form submission or further processing
      console.log("Form submitted", { email, password });
    }
  };
  const handleBack = (e: any) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto  sm:w-[450px] max-w-md p-6  rounded-lg border bg-card text-card-foreground shadow-sm "
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="edutech@example.com"
              value={email}
              autoComplete="off"
              onFocus={(e) => setEmailError("")}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="text-red-500 max-w-sm text-sm">{emailError}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative ">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="&H@rd2Gu3ss"
                autoComplete="new-password"
                className=""
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3   flex items-center text-sm leading-5 justify-end"
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
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <Button onClick={handleBack} variant={"outline"} className="w-full">
            Back
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
            Don&#x2019;t have an account?{" "}
            <Link href="/auth/register" className="underline" prefetch={false}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
