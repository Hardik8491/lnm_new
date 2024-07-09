"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VerifyCode } from "@/components/verify-code";


import { useSearchParams } from "next/navigation";

import React from 'react'

const Verification = () => {
  const email = useSearchParams().get("email");

  return (
    <div className="w-full min-h-screen items-center justify-center flex ">
        <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          Verification code was sent to <strong>{email}</strong>. Check
          your spam folder if you can&apos;t find the email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyCode />
      </CardContent>
    </Card>
    </div>
  )
}

export default Verification
