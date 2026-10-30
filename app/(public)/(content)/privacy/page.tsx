import { getDictionary } from "@/lib/internalization";

export const metadata = {
  title: 'Privacy Policy & Legal | Swiss Natural Skincare',
  description: 'Read our privacy policy, legal terms, and how we handle your personal data in compliance with Swiss nLPD and GDPR regulations.',
};

export default async function Privacy() {
  const dict = await getDictionary();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 font-inter text-gray-800">
      <h1 className="text-3xl font-bold mb-4">{dict.privacy.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{dict.privacy.lastUpdate} October 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-2">1. {dict.privacy.sections.dataController.title}</h2>
          <p>
            {dict.privacy.sections.dataController.desc}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>{dict.privacy.sections.dataController.list.list1} <strong>Swiss Natural Skincare Association</strong></li>
            {/* <li>{dict.privacy.sections.dataController.list.list2}</li> */}
            <li>{dict.privacy.sections.dataController.list.list3} <strong>info@swissnaturalskincare.ch</strong></li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-2">2.  {dict.privacy.sections.dataTypes.title}</h2>
          <div className="mt-6 mb-6">
          <h3 className="text-base font-semibold mb-2">
            A. {dict.privacy.sections.dataTypes.points.pointA.title}
          </h3>
          <p>
            {dict.privacy.sections.dataTypes.points.pointA.desc}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>{dict.privacy.sections.dataTypes.points.pointA.list.list1}</li>
            <li>{dict.privacy.sections.dataTypes.points.pointA.list.list2}</li>
            <li>{dict.privacy.sections.dataTypes.points.pointA.list.list3}</li>
            <li>{dict.privacy.sections.dataTypes.points.pointA.list.list4}</li>
            <li>{dict.privacy.sections.dataTypes.points.pointA.list.list5}</li>
            <li>{dict.privacy.sections.dataTypes.points.pointA.list.list6}</li>
          </ul>
          <p className="mt-4">{dict.privacy.sections.dataTypes.points.pointA.desc2}</p>
          </div>
          <h3 className="text-base font-semibold mb-2">
            B. {dict.privacy.sections.dataTypes.points.pointB.title}
          </h3>
          <p>
            {dict.privacy.sections.dataTypes.points.pointB.desc}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>{dict.privacy.sections.dataTypes.points.pointB.list.list1}</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-2">3. {dict.privacy.sections.processing.title}</h2>
          <p>
            {dict.privacy.sections.processing.desc}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>{dict.privacy.sections.processing.list.list1}</li>
            <li>{dict.privacy.sections.processing.list.list2}</li>
            <li>{dict.privacy.sections.processing.list.list3}</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-2">4. {dict.privacy.sections.dataRetention.title}</h2>
          <p>
            {dict.privacy.sections.dataRetention.desc}
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-2">4. {dict.privacy.sections.sharingData.title}</h2>
          <p>
            {dict.privacy.sections.sharingData.desc}
          </p>
        </section>
        
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-2">4. {dict.privacy.sections.userRights.title}</h2>
          <p>
            {dict.privacy.sections.userRights.desc}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>{dict.privacy.sections.userRights.list.list1}</li>
            <li>{dict.privacy.sections.userRights.list.list2}</li>
            <li>{dict.privacy.sections.userRights.list.list3}</li>
            <li>{dict.privacy.sections.userRights.list.list4}</li>
            <li>{dict.privacy.sections.userRights.list.list5}</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-2">4. {dict.privacy.sections.changes.title}</h2>
          <p>
            {dict.privacy.sections.changes.desc}
          </p>
        </section>

      </div>
    </main>
  );
}