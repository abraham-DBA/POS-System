import { ThemeProvider } from "../providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "MokoPhones - POS System",
  description: "Mobile and phone retail POS system",
};

export default function AuthLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
