import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiMessageSquare,
  FiTwitter,
  FiGithub,
  FiInstagram,
} from "react-icons/fi";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the BookWorm team for support, feedback, or partnerships.",
};

const ContactPage = () => {
  return (
    <div className="bg-base-100 pb-20">
      {/* Hero Section - Matching the About Page Boldness */}
      <section className="bg-secondary text-secondary-content py-24 relative overflow-hidden">
        <div className="w-full max-w-360 mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-black mb-6 tracking-tight">
              Let&apos;s Talk.
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Have a question about your library? Found a bug? Or just want to
              say hi? Drop us a message and we&apos;ll get back to you within 24
              hours.
            </p>
          </div>
        </div>
        {/* Decorative Background Icon */}
        <FiMessageSquare className="absolute -bottom-10 -right-10 text-[300px] opacity-10 rotate-12" />
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-360 mx-auto px-4 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="card bg-base-200 shadow-2xl p-8 border border-base-200">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold opacity-50">
                      Email us at
                    </p>
                    <p className="font-medium">hello@bookworm.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold opacity-50">
                      Call us
                    </p>
                    <p className="font-medium">+1 (555) 888-READ</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold opacity-50">
                      Our HQ
                    </p>
                    <p className="font-medium">
                      101 Storybook Blvd, Fiction City
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-base-200">
                <p className="text-xs uppercase font-bold opacity-50 mb-4">
                  Follow our journey
                </p>
                <div className="flex gap-4">
                  <button className="btn btn-ghost btn-circle btn-sm text-secondary bg-secondary/10">
                    <FiTwitter />
                  </button>
                  <button className="btn btn-ghost btn-circle btn-sm text-secondary bg-secondary/10">
                    <FiGithub />
                  </button>
                  <button className="btn btn-ghost btn-circle btn-sm text-secondary bg-secondary/10">
                    <FiInstagram />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8">
            <div className="card bg-base-200 shadow-2xl border border-base-200">
              <div className="card-body p-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold">Send a Message</h3>
                  <div className="h-1.5 w-16 bg-secondary mt-2 rounded-full"></div>
                </div>

                <form className="grid md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label font-bold text-xs uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="input input-bordered focus:border-secondary focus:outline-none bg-base-200/30 h-14"
                      placeholder="e.g. Alex Johnson"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label font-bold text-xs uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="input input-bordered focus:border-secondary focus:outline-none bg-base-200/30 h-14"
                      placeholder="alex@example.com"
                    />
                  </div>
                  <div className="form-control md:col-span-2">
                    <label className="label font-bold text-xs uppercase">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="input input-bordered focus:border-secondary focus:outline-none bg-base-200/30 h-14"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="form-control md:col-span-2">
                    <label className="label font-bold text-xs uppercase">
                      Message
                    </label>
                    <textarea
                      className="textarea textarea-bordered focus:border-secondary focus:outline-none bg-base-200/30 h-40"
                      placeholder="Write your thoughts here..."
                    ></textarea>
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <button className="btn btn-secondary btn-lg gap-3 px-12 group">
                      Send Message
                      <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
