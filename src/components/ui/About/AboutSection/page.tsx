// src/components/ui/AboutSection.tsx
'use client';

export default function AboutSection() {
  return (
    <section className="w-full bg-[#FAF9F6] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* TOP SECTION: Editorial Headlines & 2-Column Text */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Titles */}
          <div className="space-y-1 text-center">
            <h2 className="text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
              Siamo Sensibili e attenti alle esigenze del cliente
            </h2>
            <p className="text-xl sm:text-2xl text-gray-500 font-light">
              We are sensitive and attentive to the needs of the customer
            </p>
          </div>

          {/* Two-Column Paragraph Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
            {/* Left Column (Italian) */}
            <p>
              Leader nella produzione e distribuzione di integratori alimentari,
              dermocosmesi e dispositivi medici, da oltre vent'anni presente nei
              canali farmacia, parafarmacia ed erboristeria. La nostra azienda è
              particolarmente sensibile ed attenta alle esigenze del consumatore.
            </p>

            {/* Right Column (English) */}
            <p>
              Leader in the production and distribution of food supplements,
              dermocosmetics and medical devices, for over twenty years it has
              been present in the pharmacy, parapharmacy and herbalist channels.
              Our company is particularly sensitive and attentive to the needs of the
              consumer.
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION: Split Feature Banner (Image + Blue Accent Box) */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px] shadow-sm overflow-hidden">
          
          {/* Left Column: Building/Architectural Photo (7 Cols) */}
          <div className="md:col-span-7 relative min-h-[300px] md:min-h-full bg-gray-200">
            <img
              src="/images/headquarter.jpg" 
              alt="Company Headquarters"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Deep Blue Mission Box (5 Cols) */}
          <div className="md:col-span-5 bg-sixth text-white p-8 sm:p-12 flex flex-col justify-center space-y-6">
            
            {/* Mission Section Header */}
            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-light text-white">
                La nostra missione
              </h3>
              <p className="text-lg font-serif italic text-white font-light">
                Our mission
              </p>
            </div>

            {/* Mission Copy (Italian & English) */}
            <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed text-blue-50">
              <p>
                Offrire ai nostri clienti prodotti sicuri, efficaci e di qualità, sviluppati specificatamente per il benessere, la salute e la bellezza del corpo.
              </p>
              <p className="italic text-white">
                To offer our customers safe, efficient and quality products, specifically developed for the well-being, health and beauty of the body.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}