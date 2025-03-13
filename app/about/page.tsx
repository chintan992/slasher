import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About Us | Let's Stream",
  description: "Learn more about Let's Stream",
}

export default function AboutPage() {
  return <AboutPageClient />
}

