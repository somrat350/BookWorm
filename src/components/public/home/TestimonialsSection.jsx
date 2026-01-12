"use client";

import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Book Enthusiast",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content:
        "BookWorm has completely transformed my reading experience. The community recommendations are spot-on, and I've discovered so many amazing books I would never have found otherwise!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Literature Professor",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content:
        "As an educator, I appreciate the quality of discussions and reviews on BookWorm. It's become an invaluable resource for both my teaching and personal reading.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Avid Reader",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content:
        "The personalized recommendations are incredible! BookWorm seems to know exactly what I'll love. I've read more books this year than ever before.",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Author",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content:
        "BookWorm has helped me connect with my readers in ways I never imagined. The platform makes it easy to engage with the community and get valuable feedback.",
      rating: 5,
    },
    {
      name: "Lisa Wang",
      role: "Bookstore Owner",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      content:
        "The insights I get from BookWorm help me stock the right books for my customers. It's an invaluable tool for understanding reading trends.",
      rating: 5,
    },
    {
      name: "James Miller",
      role: "Student",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      content:
        "BookWorm made reading fun again! The gamification and reading challenges keep me motivated to reach my goals.",
      rating: 5,
    },
  ];

  const TestimonialCard = ({ testimonial, colorScheme = "secondary" }) => (
    <div className="w-72 sm:w-96 mx-4">
      <div
        className={`card bg-linear-to-br ${
          colorScheme === "primary"
            ? "from-primary/5 to-secondary/5"
            : "from-secondary/5 to-accent/5"
        } shadow-lg hover:shadow-xl transition-all duration-300 h-full`}
      >
        <div className="card-body">
          <div className="flex items-center mb-4">
            <div className="avatar">
              <div
                className={`w-12 rounded-full ring ${
                  colorScheme === "primary" ? "ring-primary" : "ring-secondary"
                } ring-offset-base-100 ring-offset-2`}
              >
                <img src={testimonial.avatar} alt={testimonial.name} />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="font-bold text-base">{testimonial.name}</h3>
              <p className="text-xs opacity-70">{testimonial.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(testimonial.rating)
                    ? "text-orange-500"
                    : "text-gray-400"
                }`}
              />
            ))}
          </div>

          <blockquote className="text-sm leading-relaxed">
            <span
              className={`text-2xl ${
                colorScheme === "primary" ? "text-primary" : "text-secondary"
              } opacity-30 leading-none`}
            >
              &ldquo;
            </span>
            {testimonial.content}
            <span
              className={`text-2xl ${
                colorScheme === "primary" ? "text-primary" : "text-secondary"
              } opacity-30 leading-none`}
            >
              &rdquo;
            </span>
          </blockquote>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-base-100">
      <div className="w-full max-w-360 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Readers Say</h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Join thousands of satisfied readers who have found their perfect
            books with us
          </p>
        </div>

        {/* First Marquee - Left to Right */}
        <div className="mb-8">
          <Marquee
            speed={50}
            gradient={true}
            gradientColor="hsl(var(--b1))"
            gradientWidth={100}
            pauseOnHover={true}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`left-${index}`}
                testimonial={testimonial}
                colorScheme="secondary"
              />
            ))}
          </Marquee>
        </div>

        {/* Second Marquee - Right to Left */}
        {/* <div className="mb-16">
          <Marquee
            speed={50}
            gradient={true}
            gradientColor="hsl(var(--b1))"
            gradientWidth={100}
            pauseOnHover={true}
            direction="right"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`right-${index}`}
                testimonial={testimonial}
                colorScheme="secondary"
              />
            ))}
          </Marquee>
        </div> */}

        <div className="text-center">
          <div className="stats stats-vertical sm:stats-horizontal w-full max-w-xl shadow-lg bg-base-200">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="stat-title">Average Rating</div>
              <div className="stat-value text-primary">4.9</div>
              <div className="stat-desc">Out of 5 stars</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="stat-title">Happy Readers</div>
              <div className="stat-value text-secondary">25K+</div>
              <div className="stat-desc">And counting</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
