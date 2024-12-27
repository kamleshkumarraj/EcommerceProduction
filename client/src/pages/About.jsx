

const AboutUs = () => {
  return (
    <div className="text-gray-800 bg-gray-100">
      <header className="bg-[#FFF7F3]  text-gray-600 py-[2rem] text-center">
        <h1 className="text-[3rem] font-bold">About Us</h1>
        <p className="text-[1.6rem] mt-[1rem]">
          Learn more about our journey, mission, and values.
        </p>
      </header>

      <main className="max-w-[90%] mx-auto py-[4rem]">
        {/* Section 1: Company Overview */}
        <section className="mb-[4rem]">
          <h2 className="text-[2.4rem] font-semibold mb-[2rem]">Our Story</h2>
          <p className="text-[1.6rem] leading-[2.4rem]">
            Founded in 2020, our e-commerce platform began with a vision to
            revolutionize online shopping by providing a seamless, personalized
            experience. We started with just a small team of passionate
            individuals dedicated to quality, innovation, and exceptional
            customer service. Today, we proudly serve millions of customers
            worldwide, offering a diverse range of products designed to
            simplify and enhance daily life.
          </p>
        </section>

        {/* Section 2: Mission and Vision */}
        <section className="mb-[4rem]">
          <h2 className="text-[2.4rem] font-semibold mb-[2rem]">Our Mission</h2>
          <p className="text-[1.6rem] leading-[2.4rem]">
            Our mission is to empower individuals and businesses by providing
            access to high-quality products at affordable prices. We strive to
            create a platform that celebrates diversity, fosters innovation,
            and prioritizes sustainability in every aspect of our operations.
          </p>
          <h3 className="text-[2rem] font-medium mt-[2rem]">Our Vision</h3>
          <p className="text-[1.6rem] leading-[2.4rem] mt-[1rem]">
            We envision a world where online shopping is not just convenient
            but also inspiring. By combining cutting-edge technology with a
            commitment to ethical practices, we aim to set new standards in the
            e-commerce industry.
          </p>
        </section>

        {/* Section 3: Core Values */}
        <section className="mb-[4rem]">
          <h2 className="text-[2.4rem] font-semibold mb-[2rem]">Our Core Values</h2>
          <ul className="list-disc list-inside text-[1.6rem] leading-[2.4rem]">
            <li className="mb-[1rem]">Customer-Centric Approach: Putting our customers first.</li>
            <li className="mb-[1rem]">Innovation: Embracing technology to stay ahead.</li>
            <li className="mb-[1rem]">Integrity: Conducting business with honesty and transparency.</li>
            <li className="mb-[1rem]">Sustainability: Minimizing our environmental footprint.</li>
            <li className="mb-[1rem]">Diversity & Inclusion: Celebrating every individual’s uniqueness.</li>
          </ul>
        </section>

        {/* Section 4: Team Introduction */}
        <section className="mb-[4rem]">
          <h2 className="text-[2.4rem] font-semibold mb-[2rem]">Meet the Team</h2>
          <p className="text-[1.6rem] leading-[2.4rem]">
            Our success is driven by our talented and diverse team of
            professionals who are passionate about making a difference. From
            our creative designers to our tech-savvy developers and customer
            support specialists, every member of our team plays a vital role in
            delivering excellence.
          </p>
        </section>

        {/* Section 5: Contact and Social Links */}
        <section className="mb-[4rem]">
          <h2 className="text-[2.4rem] font-semibold mb-[2rem]">Stay Connected</h2>
          <p className="text-[1.6rem] leading-[2.4rem]">
            We love hearing from our customers! Follow us on social media or
            reach out via email for any inquiries or feedback.
          </p>
          <div className="flex gap-[2rem] mt-[2rem]">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 text-[1.6rem] underline"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 text-[1.6rem] underline"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 text-[1.6rem] underline"
            >
              Instagram
            </a>
          </div>
        </section>
      </main>

    </div>
  );
};

export default AboutUs;
