import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <section
      className="md:max-w-2xl max-w-sm mx-auto z-20 my-30"
      aria-labelledby="pricing-heading"
    >
      <div className="text-center">
        {/* ✅ SECTION HEADING */}
        <h2
          id="pricing-heading"
          className="mx-auto md:text-5xl sm:text-4xl text-3xl font-semibold text-slate-700"
        >
          Choose Your Plan
        </h2>

        <p className="mt-4 sm:max-w-xl max-w-xs mx-auto text-sm sm:text-base text-gray-500">
          Start for free and scale as you grow. Compare pricing plans and find
          the perfect option for your AI-powered content creation needs.
        </p>
      </div>

      {/* ✅ PRICING TABLE */}
      <div className="mt-14 max-md:mx-8">
        <PricingTable />
      </div>
    </section>
  );
};

export default Plan;
