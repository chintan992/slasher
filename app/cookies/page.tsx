import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Let's Stream",
  description: "Cookie Policy for Let's Stream",
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p>Last updated: March 2023</p>

        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are stored on your device when you visit a website. They are widely used to
          make websites work more efficiently and provide information to the website owners.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>Let's Stream uses cookies for the following purposes:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They
            enable core functionality such as security, network management, and account access.
          </li>
          <li>
            <strong>Preference Cookies:</strong> These cookies allow us to remember choices you make and provide
            enhanced, personalized features. They may be set by us or by third-party providers whose services we have
            added to our pages.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website.
            They provide information about metrics such as the number of visitors, bounce rate, traffic source, etc.
          </li>
          <li>
            <strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites. The intention
            is to display ads that are relevant and engaging for the individual user.
          </li>
        </ul>

        <h2>3. Types of Cookies We Use</h2>
        <p>
          We use both session cookies, which expire when you close your browser, and persistent cookies, which remain on
          your device for a set period.
        </p>

        <h2>4. Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
          deliver advertisements, and so on.
        </p>

        <h2>5. Controlling Cookies</h2>
        <p>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device
          and you can set most browsers to prevent them from being placed. However, if you do this, you may have to
          manually adjust some preferences every time you visit our website and some services and functionalities may
          not work.
        </p>

        <h2>6. More Information</h2>
        <p>
          For more information about cookies and how to manage them, visit{" "}
          <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">
            www.allaboutcookies.org
          </a>
          .
        </p>

        <h2>7. Changes to This Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie
          Policy on this page and updating the "Last updated" date.
        </p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions about this Cookie Policy, please contact us at privacy@letsstream.com.</p>
      </div>
    </div>
  )
}

