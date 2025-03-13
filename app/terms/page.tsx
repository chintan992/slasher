import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Let's Stream",
  description: "Terms of Service for Let's Stream",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p>Last updated: March 2023</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Let's Stream, you agree to be bound by these Terms of Service. If you do not agree to
          these terms, please do not use our service.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will provide notice of significant changes by
          posting the new terms on our website. Your continued use of Let's Stream after such modifications constitutes
          your acceptance of the revised terms.
        </p>

        <h2>3. Using Our Service</h2>
        <p>
          Let's Stream provides a platform for discovering and streaming movies and TV shows. We do not host any content
          ourselves but provide links to third-party streaming services.
        </p>

        <h2>4. User Accounts</h2>
        <p>
          To access certain features of our service, you may need to create an account. You are responsible for
          maintaining the confidentiality of your account information and for all activities that occur under your
          account.
        </p>

        <h2>5. Prohibited Activities</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use our service for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to any part of our service</li>
          <li>Interfere with or disrupt our service or servers</li>
          <li>Collect or store personal data about other users without their consent</li>
          <li>Use our service to distribute malware or other harmful code</li>
        </ul>

        <h2>6. Intellectual Property</h2>
        <p>
          All content, features, and functionality of Let's Stream, including but not limited to text, graphics, logos,
          and software, are owned by Let's Stream or its licensors and are protected by copyright, trademark, and other
          intellectual property laws.
        </p>

        <h2>7. Disclaimer of Warranties</h2>
        <p>
          Let's Stream is provided "as is" without warranties of any kind, either express or implied. We do not
          guarantee that our service will be uninterrupted, secure, or error-free.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          In no event shall Let's Stream be liable for any indirect, incidental, special, consequential, or punitive
          damages arising out of or related to your use of our service.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in
          which Let's Stream operates, without regard to its conflict of law provisions.
        </p>

        <h2>10. Contact Us</h2>
        <p>If you have any questions about these Terms of Service, please contact us at support@letsstream.com.</p>
      </div>
    </div>
  )
}

