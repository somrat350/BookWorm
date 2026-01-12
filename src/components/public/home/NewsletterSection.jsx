"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-20 bg-linear-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <span className="text-6xl mb-4 block">📬</span>
            <h2 className="text-4xl font-bold mb-4">
              Stay Updated with BookWorm
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Get weekly book recommendations, author interviews, and exclusive
              content delivered to your inbox. Join our community of passionate
              readers!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="input input-lg w-full bg-white text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-secondary btn-lg"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Subscribed!
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {isSubscribed && (
              <div className="alert alert-success mt-4 max-w-md mx-auto">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Thank you for subscribing! Check your email for confirmation.
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Weekly Picks</h3>
              <p className="text-sm opacity-80">
                Curated book recommendations from our expert team
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="font-bold text-lg mb-2">Author Spotlights</h3>
              <p className="text-sm opacity-80">
                Exclusive interviews and insights from your favorite authors
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="font-bold text-lg mb-2">Exclusive Offers</h3>
              <p className="text-sm opacity-80">
                Special discounts and early access to new releases
              </p>
            </div>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>Join 15,000+ subscribers • No spam, unsubscribe anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
