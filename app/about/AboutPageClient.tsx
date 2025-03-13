"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPageClient() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Let's Stream</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-lg mb-4">
            Let's Stream is a feature-rich streaming platform designed to provide a seamless video streaming experience
            for movie and TV show enthusiasts.
          </p>
          <p className="mb-4">
            Our mission is to make entertainment accessible to everyone by creating a user-friendly platform that helps
            you discover and enjoy your favorite content.
          </p>
          <p className="mb-4">
            We leverage the TMDB API for comprehensive movie and series metadata, ensuring you have access to the most
            up-to-date information about your favorite shows and movies.
          </p>
          <p className="mb-6">
            Let's Stream is built with modern web technologies to provide a fast, responsive, and intuitive user
            experience across all devices.
          </p>

          <Button asChild>
            <Link href="/movies/trending">Explore Content</Link>
          </Button>
        </div>

        <div className="relative h-[300px] md:h-auto rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Let's Stream Platform"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Our Features</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Video Streaming</h3>
          <p>Stream movies and TV shows from various sources with our integrated player.</p>
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Content Discovery</h3>
          <p>Discover trending and popular content with our intuitive browsing experience.</p>
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
          <p>Find exactly what you're looking for with our powerful search and filtering options.</p>
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Personalized Profiles</h3>
          <p>Create your profile and customize your streaming experience.</p>
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Watchlists</h3>
          <p>Save movies and shows to watch later and keep track of your favorites.</p>
        </div>

        <div className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Multi-device Support</h3>
          <p>Enjoy seamless streaming on desktop, mobile, tablet, and smart TVs.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Our Technology</h2>

      <div className="bg-card p-6 rounded-lg mb-12">
        <p className="mb-4">
          Let's Stream is built with a modern tech stack to ensure the best possible user experience:
        </p>

        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Frontend:</strong> Next.js, React, Tailwind CSS
          </li>
          <li>
            <strong>Authentication:</strong> Firebase Authentication
          </li>
          <li>
            <strong>Progressive Web App:</strong> Service workers for offline access
          </li>
          <li>
            <strong>APIs:</strong> TMDB API for content metadata
          </li>
          <li>
            <strong>Deployment:</strong> Vercel, Netlify, Cloudflare Pages
          </li>
        </ul>

        <p>We're constantly improving our platform and adding new features to enhance your streaming experience.</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

      <div className="bg-card p-6 rounded-lg">
        <p className="mb-4">Have questions, suggestions, or feedback? We'd love to hear from you!</p>

        <p className="mb-2">
          <strong>Email:</strong> contact@letsstream.com
        </p>

        <p>
          <strong>Follow us on social media:</strong> @LetsStreamApp
        </p>
      </div>
    </div>
  )
}

