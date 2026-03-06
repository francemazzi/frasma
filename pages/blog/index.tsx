import Head from "next/head";
import Link from "next/link";
import Footer from "../../components/organism/Footer";

const posts = [
  {
    slug: "seminai",
    title: "SeminAI: lo sviluppo di una piattaforma AI su cui sto lavorando",
    excerpt:
      "Sto sviluppando SeminAI, una piattaforma che integra intelligenza artificiale per trasformare il modo in cui lavoriamo con i dati e i processi.",
    date: "2026-03-06",
  },
  {
    slug: "freelancedev",
    title: "Trovami su FreelanceDEV: la piattaforma per freelancer italiani",
    excerpt:
      "Come funziona FreelanceDEV e perché è una piattaforma interessante per trovare il freelancer giusto per i tuoi progetti tech.",
    date: "2026-03-06",
  },
];

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog - Frasma</title>
        <meta
          name="description"
          content="Blog di Frasma - articoli su sviluppo software, freelancing e tecnologia"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-farm-bg font-poppins">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-farm-bg/80 border-b border-farm-border">
          <nav className="section-farm py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-farm-text tracking-tight hover:opacity-70 transition-opacity"
            >
              Frasma
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-sage-600 hover:text-sage-500 transition-colors"
            >
              Blog
            </Link>
          </nav>
        </header>

        <section className="section-farm py-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-farm-text mb-12">Blog</h1>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-farm-surface rounded-2xl border border-farm-border p-8 hover:shadow-md transition-shadow"
              >
                <time className="text-sm text-farm-secondary">{post.date}</time>
                <h2 className="text-2xl font-semibold text-farm-text mt-2 mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-sage-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-farm-secondary leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-sage-600 font-medium hover:text-sage-500 transition-colors"
                >
                  Leggi di più →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
