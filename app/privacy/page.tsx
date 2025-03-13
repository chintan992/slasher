import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Let's Stream",
  description: "Privacy Policy for Let's Stream",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p>Last updated: March 2023</p>

        <h2>1. Introduction</h2>
        <p>
          At Let's Stream, we respect your privacy and are committed to protecting your personal data. This Privacy
          Policy explains how we collect, use, and safeguard your information when you use our service.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, email address, and other information you provide when creating
            an account.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you use our service, including viewing history and
            preferences.
          </li>
          <li>
            <strong>Device Information:</strong> Information about your device, browser, and IP address.
          </li>
          <li>
            <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to
            enhance your experience and collect information about how you use our service.
          </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain our service</li>
          <li>Improve and personalize your experience</li>
          <li>Communicate with you about our service</li>
          <li>Monitor usage of our service</li>
          <li>Detect, prevent, and address technical issues</li>
        </ul>

        <h2>4. Sharing Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>
            <strong>Service Providers:</strong> Third-party companies that help us provide and improve our service.
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by law or to protect our rights.
          </li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of
          transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
          security.
        </p>

        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>The right to access your personal information</li>
          <li>The right to correct inaccurate information</li>
          <li>The right to delete your information</li>
          <li>The right to restrict or object to processing</li>
          <li>The right to data portability</li>
        </ul>

        <h2>7. Children's Privacy</h2>
        <p>
          Our service is not intended for children under 13 years of age. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2>8. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@letsstream.com.</p>
      </div>
    </div>
  )
}

