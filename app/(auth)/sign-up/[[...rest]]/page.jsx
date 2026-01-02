'use client'

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SignUp 
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </div>
  );
}
