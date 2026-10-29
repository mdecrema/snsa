import Image from "next/image";

export interface Criteria {
  num: string,
  title: string,
  desc: string,
}


interface AssessmentSectionSplitDict {
  title: string,
  subtitle: string,
  criterias: {
    criteria1: {
      title: string,
      description: string
    },
    criteria2: {
      title: string,
      description: string
    },
    criteria3: {
      title: string,
      description: string
    },
    criteria4: {
      title: string,
      description: string
    },
    criteria5: {
      title: string,
      description: string
    },
  }
}

interface Props {
  dict: AssessmentSectionSplitDict;
}

export function AssessmentSectionSplit({dict}: Props) {
  const criteria = [
    {
      num: "01",
      title: dict.criterias.criteria1.title,
      desc: dict.criterias.criteria1.description,
    },
    {
      num: "02",
      title: dict.criterias.criteria2.title,
      desc: dict.criterias.criteria2.description,
    },
    {
      num: "03",
      title: dict.criterias.criteria3.title,
      desc: dict.criterias.criteria3.description,
    },
    {
      num: "04",
      title: dict.criterias.criteria4.title,
      desc: dict.criterias.criteria4.description,
    },
    {
      num: "05",
      title: dict.criterias.criteria5.title,
      desc: dict.criterias.criteria5.description,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="space-y-2 mb-12">
        <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-second">
          // {dict.subtitle}
        </span>
        <h2 className="text-3xl md:text-3xl font-bold font-cormorant text-gray-900">
          {dict.title}
        </h2>
      </div>

      {/* Grid 5/12 e 7/12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* COLONNA SINISTRA: Immagine Editorial Sticky */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="relative w-full h-[520px] overflow-hidden border border-gray-200 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
            <Image
              src="/images/laboratory-technician.jpg"
              alt="SNSA Scientific Assessment"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs p-4 border border-gray-200/60">
              <span className="text-[10px] font-mono uppercase tracking-widest text-second font-bold block">
                Standard Protocol
              </span>
              <p className="text-xs font-inter text-gray-700 mt-1">
                Rigorous evaluation across 5 core technical parameters.
              </p>
            </div>
          </div>
        </div>

        {/* COLONNA DESTRA: Listato dei 5 Criteri */}
        <div className="lg:col-span-7 divide-y divide-gray-200 border-t border-b border-gray-200">
          {criteria.map((item) => (
            <div
              key={item.num}
              className="py-6 first:pt-4 last:pb-4 group hover:bg-[#FBFBFB] px-4 -mx-4 transition-colors"
            >
              <div className="flex items-start gap-6">
                <span className="font-mono text-xs font-bold text-second pt-1">
                  {item.num}
                </span>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-sm font-bold font-inter uppercase text-gray-900 group-hover:text-second transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-inter text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}