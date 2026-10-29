export const metadata = {
  title: 'Privacy Policy & Legal | Swiss Natural Skincare',
  description: 'Read our privacy policy, legal terms, and how we handle your personal data in compliance with Swiss nLPD and GDPR regulations.',
};

export default function Privacy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 font-inter text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy & Legal Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: October 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to Swiss Natural Skincare Association (SNSA). We respect your privacy and are committed to protecting your personal data in compliance with the Swiss Federal Act on Data Protection (FADP / nLPD) and, where applicable, the General Data Protection Regulation (GDPR).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Data Collected via Contact Form</h2>
          <p>
            When you fill out our contact form, we collect the following personal data:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Name and Surname</li>
            <li>Company / Organisation[cite: 6]</li>
            <li>Email address and Phone number[cite: 6]</li>
            <li>Subject and message content[cite: 6]</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Purpose of Data Processing</h2>
          <p>
            Your data is collected exclusively to process and respond to your enquiries, manage membership requests, and provide information regarding our quality marks and services[cite: 6].
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Your Rights</h2>
          <p>
            You have the right to request access, rectification, or deletion of your personal data at any time by contacting us directly at our official email address.
          </p>
        </section>
      </div>
    </main>
  );
}