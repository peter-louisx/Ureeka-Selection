export default function About() {
  const values = [
    {
      icon: "✓",
      title: "Quality Assurance",
      description:
        "We maintain strict quality standards for all produce on our platform, ensuring only the best reaches consumers.",
    },
    {
      icon: "⚖️",
      title: "Fair Pricing",
      description:
        "Our transparent pricing model ensures farmers receive fair compensation while consumers get value for money.",
    },
    {
      icon: "🔄",
      title: "Reliability",
      description:
        "We guarantee timely deliveries and maintain consistent supply chains throughout the year.",
    },
    {
      icon: "🌿",
      title: "Sustainability",
      description:
        "We promote and support environmentally conscious farming practices and sustainable agriculture.",
    },
  ];

  return (
    <>
     <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg mx-4 mt-4">
  {/* <img
    src="/about.png"
    alt="Farmers working in field"
    className="w-full h-full object-cover"
  /> */}
  <div className="absolute inset-0 bg-green-50 p-6 flex flex-col justify-end">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">We are CropFresh</h1>
    <span className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
      CropFresh connects hardworking producers with honest clients, anywhere, anytime. We ensure high-quality
      produce reaches consumers in a fair and transparent way.
    </span>
  </div>
</div>


      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To revolutionize agricultural commerce by creating transparent, efficient, and sustainable connections
            between producers and consumers, ensuring fair value for everyone involved in the food supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-600 text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We promote environmentally friendly farming practices and work with producers who share our commitment to
              sustainability.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-600 text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fair Trade</h3>
            <p className="text-gray-600">
              We ensure farmers receive fair compensation for their hard work, creating a more equitable agricultural
              economy.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-600 text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We never compromise on quality, ensuring only the fresh and best produce reaches our customers.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="flex justify-center items-center"> {/* Use flexbox to center the content */}
            <div className="text-center max-w-3xl"> {/* Limit text width for better alignment */}
              <p className="text-lg text-gray-600 mb-4">
                CropFresh began with a simple idea: connect farmers directly with consumers to create a
                more efficient and fair agricultural marketplace.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our founder, Louis Andrew, grew up on a family farm and witnessed firsthand the challenges farmers face in
                getting fair prices for their produce. After working in agricultural technology for over a decade, she
                decided to create a solution.
              </p>
              <p className="text-lg text-gray-600">
                Today, CropFresh works with over 500 farmers across the country, helping them reach consumers directly
                while ensuring they receive fair compensation for their hard work.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Partner Farmers</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">50k+</div>
            <div className="text-gray-600">Customers</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Organic Produce</div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xl">{value.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
