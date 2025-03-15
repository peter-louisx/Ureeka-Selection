export default function About() {
  return (
    <>
      <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg mx-4 mt-4">
        <img
          src="/about.png"
          alt="Farmers working in field"
          className="object-cover"
        />
        <div className="absolute inset-0  bg-opacity-30 flex flex-col justify-end p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            We are CropFresh
            <br />
          </h1>
          <span className="text-4xl md:text-2.5xl font-bold text-white mb-2">
          CropFresh connects hardworking producers with honest clients, anywhere, anytime.
           We ensure high-quality produce reaches consumers in a fair and transparent way. 
           Trust and quality are our top priorities.
          </span>
        </div>
      </div>
    </>
  );
}
