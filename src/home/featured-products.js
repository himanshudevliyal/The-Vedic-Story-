"use client";

const FeaturedProducts = () => {
  return (
    <section className="py-20 ">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Large featured card */}
          <div className="group bg-primary/20 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center hover:shadow-xl transition-all duration-300">
            <div className="flex-1 p-10">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1 rounded-full mb-6">
                25% OFF
              </span>

              <h3 className="text-4xl font-semibold italic text-foreground mb-4">
                BloodFlow Plus
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-foreground">
                  $70.00
                </span>
                <span className="text-sm line-through text-muted-foreground">
                  $95.00
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-6">
                Including tax
              </p>

              <button className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition">
                Shop Now
              </button>
            </div>

            <div className="relative w-full md:w-1/2 aspect-square p-6">
              <img
                src="/img/chair-min.png"
                alt="BloodFlow Plus"
                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="group bg-orange-50 rounded-3xl p-6 flex items-center hover:shadow-lg transition">
              <div className="flex-1">
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  25% OFF
                </span>
                <h3 className="text-2xl  italic font-semibold mb-2">
                  Hand Sanitizer
                </h3>
                <p className="text-lg font-bold">$22.90</p>
                <span className="text-xs text-muted-foreground">
                  Including tax
                </span>
              </div>

              <div className="w-32 aspect-square">
                <img
                  src="/img/chair-min.png"
                  alt="Hand Sanitizer"
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-pink-50 rounded-3xl p-6 flex items-center justify-between hover:shadow-lg transition">
              <div className=" w-32 ">
                <img
                  src="/img/chair-min.png"
                  alt="Body Lotion"
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="  aspect-square pr-5">
                <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  25% OFF
                </span>
                <h3 className="text-2xl  italic font-semibold mb-2">
                  Body Lotion
                </h3>
                <p className="text-lg font-bold">$29.00</p>
                <span className="text-xs text-muted-foreground">
                  Including tax
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
