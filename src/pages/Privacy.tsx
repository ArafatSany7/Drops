export default function Privacy() {
  return (
    <div className="flex-1 bg-bg-subtle">
      <section className="w-full bg-gray-900 text-white py-16 px-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
        <p className="text-text-muted">Last updated: August 12, 2026</p>
      </section>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-bg-surface p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm prose max-w-none">
          <h2 className="text-2xl font-bold text-text-base mb-4">1. Information We Collect</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Drops collects personal information that you voluntarily provide when registering as a blood donor,
            including your name, email address, phone number, blood group, date of birth, gender, and location (district).
            This information is essential for matching donors with recipients in emergency situations.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">2. How We Use Your Information</h2>
          <p className="text-text-muted leading-relaxed mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 text-text-muted space-y-2 mb-6">
            <li>Match blood donors with recipients based on blood type and location</li>
            <li>Send emergency notifications when your blood type is needed nearby</li>
            <li>Maintain and improve our platform's services</li>
            <li>Communicate important updates about your donation status</li>
            <li>Generate anonymized statistics about blood donation trends</li>
          </ul>

          <h2 className="text-2xl font-bold text-text-base mb-4">3. Data Protection</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            We implement industry-standard security measures to protect your personal data. All passwords are
            hashed using bcrypt encryption. Data transmission is secured via HTTPS. We use JWT tokens for
            authentication, and your session data is stored securely.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">4. Information Sharing</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Your contact information (phone number, email) is only shared with potential blood recipients when
            they specifically search for donors matching your blood type and location. We never sell your personal
            data to third parties. We may share anonymized, aggregated data for research and public health purposes.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">5. Your Rights</h2>
          <p className="text-text-muted leading-relaxed mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-text-muted space-y-2 mb-6">
            <li>Access and review your personal information at any time through your profile</li>
            <li>Update or correct your personal information</li>
            <li>Toggle your availability status to control when you can be contacted</li>
            <li>Request deletion of your account and associated data</li>
            <li>Opt out of non-essential communications</li>
          </ul>

          <h2 className="text-2xl font-bold text-text-base mb-4">6. Cookies and Tracking</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Drops uses essential cookies for authentication and theme preferences. We use localStorage to
            maintain your session. We do not use third-party tracking cookies or advertising trackers.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">7. Contact Us</h2>
          <p className="text-text-muted leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:human.sany7@gmail.com" className="text-primary hover:underline">human.sany7@gmail.com</a>{' '}
            or call us at <a href="tel:01636445632" className="text-primary hover:underline">01636445632</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
