import JoinApplicationForm from "@/components/JoinApplicationForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join Makeshift — Apply" };

export default function JoinAboutYouPage() {
  return <JoinApplicationForm />;
}
