export default function Terms() {
  return (
    <div className="flex-1 bg-bg-subtle">
      <section className="w-full bg-gray-900 text-white py-16 px-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Terms of Service</h1>
        <p className="text-text-muted">Last updated: August 12, 2026</p>
      </section>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-bg-surface p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm prose max-w-none">
          <h2 className="text-2xl font-bold text-text-base mb-4">1. Acceptance of Terms</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            By accessing and using the Drops platform, you accept and agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services. These terms apply to all users,
            including donors, recipients, and visitors.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">2. Eligibility</h2>
          <p className="text-text-muted leading-relaxed mb-4">To register as a blood donor on Drops, you must:</p>
          <ul className="list-disc pl-6 text-text-muted space-y-2 mb-6">
            <li>Be at least 18 years of age</li>
            <li>Be in good general health</li>
            <li>Provide accurate and truthful information during registration</li>
            <li>Have a valid email address and phone number</li>
            <li>Meet the medical eligibility criteria for blood donation in Bangladesh</li>
          </ul>

          <h2 className="text-2xl font-bold text-text-base mb-4">3. User Responsibilities</h2>
          <p className="text-text-muted leading-relaxed mb-4">As a user of Drops, you agree to:</p>
          <ul className="list-disc pl-6 text-text-muted space-y-2 mb-6">
            <li>Provide accurate information about your blood type, health status, and availability</li>
            <li>Keep your profile information up to date</li>
            <li>Respond to blood requests in a timely manner when you are marked as available</li>
            <li>Not misuse the platform for any unlawful purpose</li>
            <li>Not harass or send unsolicited messages to other users</li>
            <li>Maintain the confidentiality of your account credentials</li>
          </ul>

          <h2 className="text-2xl font-bold text-text-base mb-4">4. Medical Disclaimer</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Drops is a platform that connects blood donors with recipients. We are not a medical provider and
            do not provide medical advice. All blood donations should be conducted at authorized medical facilities
            following proper medical protocols. Users should consult with healthcare professionals before donating blood.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">5. Platform Usage</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Drops provides a matching service between donors and recipients. We do not guarantee the availability
            of donors for any specific blood type or location. Response times may vary based on donor availability.
            We reserve the right to suspend or terminate accounts that violate these terms.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">6. Limitation of Liability</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            Drops shall not be held liable for any damages arising from the use of our platform, including but
            not limited to delays in finding donors, inaccurate user information, or complications arising from
            blood transfusions. The platform is provided "as is" without warranties of any kind.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">7. Modifications</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            We reserve the right to modify these Terms of Service at any time. Users will be notified of
            significant changes via email. Continued use of the platform after modifications constitutes
            acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-bold text-text-base mb-4">8. Contact</h2>
          <p className="text-text-muted leading-relaxed">
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:legal@drops.com.bd" className="text-primary hover:underline">legal@drops.com.bd</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
