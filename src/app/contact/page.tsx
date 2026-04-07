export default function Contact() {
  return (
    <div className="bg-base-100 min-h-full flex flex-col bg-dot-pattern">

      {/* Form section */}
      <div className="max-w-2xl mx-auto px-6 py-20 w-full flex-1">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Get in touch</p>
        <h1 className="text-4xl font-bold text-base-content mb-2">Contact</h1>
        <p className="text-base-content/50 mb-12">Have a project in mind? Let&apos;s talk.</p>

        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control gap-1">
              <label className="label-text text-sm text-base-content/60">Name</label>
              <input type="text" placeholder="Your name" className="input input-bordered w-full" />
            </div>
            <div className="form-control gap-1">
              <label className="label-text text-sm text-base-content/60">Email</label>
              <input type="email" placeholder="your@email.com" className="input input-bordered w-full" />
            </div>
          </div>
          <div className="form-control gap-1">
            <label className="label-text text-sm text-base-content/60">Subject</label>
            <input type="text" placeholder="What's this about?" className="input input-bordered w-full" />
          </div>
          <div className="form-control gap-1">
            <label className="label-text text-sm text-base-content/60">Message</label>
            <textarea placeholder="Tell me about your project..." className="textarea textarea-bordered w-full h-36 resize-none" />
          </div>
          <button type="submit" className="btn btn-primary w-full sm:w-fit">
            Send Message →
          </button>
        </form>
      </div>

      {/* CTA Banner */}
      <section className="bg-primary text-primary-content py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Let&apos;s build something<br />remarkable together.
          </h2>
          <p className="text-primary-content/70 mb-10 text-lg">
            Currently taking on select projects. Whether you have a specific idea or just want to chat, my inbox is always open.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:hello@example.com" className="btn bg-white text-primary border-none hover:bg-white/90 gap-2">
              ✉ hello@example.com
            </a>
            <a href="#" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary gap-2">
              📅 Book a Consultation
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
