import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { log } from "util";
import { useActivationMutation } from "@/redux/features/authApi";

export const VerifyCode = () => {
  const { token } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const [InvalidError, setInvalidError] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [activation, { isSuccess, error }] = useActivationMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      router.push("/auth/login");
    }
    if (error) {
      if ("data" in error) {
        const ErrorData = error as any;
        toast.error(ErrorData.data.message);
      } else {
        console.log("An error occurred:", error);
      }
    }
  }, [error, isSuccess, router]);

  const handleInputChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return setInvalidError(true);
    setInvalidError(false);
    if (value.length > 1) return; // Ensure only single digit input
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move focus to the previous input box if current value is removed
    if (value === "" && index > 0 && codeRefs.current[index - 1]) {
      codeRefs.current[index - 1]?.focus();
    }

    // Move focus to the next input box if available
    else if (
      value !== "" &&
      index < verificationCode.length - 1 &&
      codeRefs.current[index + 1]
    ) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const verificationNumber = Object.values(verificationCode).join("");
    console.log(verificationNumber);
    if (verificationNumber.length !== 6) {
      setInvalidError(true);
      return;
    }
    await activation({
      activationToken: token,
      activationCode: verificationNumber,
    });
  };

  const handleResend = () => {
    console.log("Resending verification code");
    toast.success("Email resent!");
    // You can add logic to resend verification code here
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Label htmlFor="code" className="font-semibold text-md">
          Verification code
        </Label>
        <div className="flex justify-center w-full items-center gap-1">
          {verificationCode.map((value, index) => (
            <Input
              key={index}
              ref={(el) => (codeRefs.current[index] = el)}
              className="w-12 h-12 text-center border rounded-md"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <Button type="submit">Verify</Button>
      </form>
      <Button onClick={handleResend} variant="secondary">
        Resend Code
      </Button>
      <form action="/logout">
        <Button variant="link">Want to use another email? Log out now.</Button>
      </form>
    </div>
  );
};
