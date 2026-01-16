import Image from "next/image";
import Link from "next/link";
import {
  FiBookOpen,
  FiZap,
  FiAward,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

export const metadata = {
  title: "About Us | BookWorm",
  description:
    "Learn about BookWorm, the premier platform for organizing your personal library and tracking your reading journey.",
};

const AboutPage = () => {
  const features = [
    {
      icon: <FiBookOpen className="text-primary" />,
      title: "Smart Tracking",
      desc: "Monitor your reading progress with precision, whether by page numbers or percentages.",
    },
    {
      icon: <FiZap className="text-secondary" />,
      title: "Quick Sorting",
      desc: "Organize your collection into personalized shelves: Want to Read, Reading, and Finished.",
    },
    {
      icon: <FiShield className="text-accent" />,
      title: "Secure Library",
      desc: "Your data is private and securely stored, accessible only to you from any device.",
    },
    {
      icon: <FiAward className="text-info" />,
      title: "Goal Oriented",
      desc: "Set reading milestones and watch your personal library grow as you complete your list.",
    },
  ];

  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <section className="relative py-24 bg-base-200 flex overflow-hidden">
        <div className="w-full max-w-360 mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-extrabold mb-6 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Empowering Your Reading Journey.
            </h1>
            <p className="text-xl opacity-80 leading-relaxed mb-8">
              BookWorm was built for the modern reader. We believe that tracking
              your books should be as enjoyable as reading them. Our platform
              helps you organize, discover, and achieve your reading goals in
              one seamless interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-secondary">Join the Community</button>
              <button className="btn btn-outline btn-secondary gap-2">
                Explore Books <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-1/2 right-0 xl:right-1/5 transform -translate-y-1/2 opacity-30">
          <FiBookOpen size={400} />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 w-full max-w-360 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose BookWorm?</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="card bg-base-100 border border-base-300 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="card-body p-8">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="card-title text-xl mb-2">{f.title}</h3>
                <p className="opacity-70 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-neutral text-neutral-content py-20 overflow-hidden">
        <div className="w-full max-w-360 mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image Container - Fixed to fill space properly */}
          <div className="w-full lg:w-1/2 h-87.5 lg:h-112.5 relative">
            {/* Decorative background blur to make the image "pop" */}
            <div className="absolute -inset-4 bg-secondary/20 blur-3xl rounded-full opacity-30"></div>

            <Image
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000"
              alt="Cozy Library"
              fill
              className="rounded-3xl shadow-2xl object-cover z-10 border border-white/10"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                Our Mission
              </h2>
              <div className="h-1.5 w-20 bg-secondary rounded-full"></div>
            </div>

            <p className="text-lg lg:text-xl opacity-90 leading-relaxed max-w-xl">
              Our mission is to digitalize the personal library experience. We
              aim to bridge the gap between physical books and digital
              organization, giving readers a space to celebrate their progress
              and share their love for literature.
            </p>

            {/* daisyUI Stats - Fixed text contrast */}
            <div className="stats stats-vertical sm:stats-horizontal shadow-2xl bg-base-100 text-base-content w-full border border-base-300">
              <div className="stat place-items-center lg:place-items-start">
                <div className="stat-title font-medium">Books Tracked</div>
                <div className="stat-value text-primary text-3xl">25K+</div>
                <div className="stat-desc font-medium">Growing every day</div>
              </div>

              <div className="stat place-items-center lg:place-items-start">
                <div className="stat-title font-medium">Active Users</div>
                <div className="stat-value text-secondary text-3xl">10K+</div>
                <div className="stat-desc font-medium">Passionate readers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to start your shelf?
          </h2>
          <p className="text-lg opacity-70 mb-10">
            Sign up today and take control of your reading life. It&apos;s free,
            it&apos;s fast, and it&apos;s built for you.
          </p>
          <Link
            href="/register"
            className="btn btn-secondary btn-lg rounded-full px-12"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer-like bottom bar */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div>
          <p className="font-bold">
            BookWorm Inc. <br />
            Providing reliable tracking since 2026
          </p>
          <p>Copyright © 2026 - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
