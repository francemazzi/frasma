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

      <main className="min-h-screen bg-gradient-to-b from-sand-50 to-green-50">
        <header className="bg-green-800 text-white py-6">
          <div className="container mx-auto px-4">
            <Link href="/" className="text-2xl font-bold hover:text-sand-300 transition-colors">
              Frasma
            </Link>
          </div>
        </header>

        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-4xl font-bold text-green-800 mb-12">Blog</h1>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                <time className="text-sm text-gray-500">{post.date}</time>
                <h2 className="text-2xl font-semibold text-green-700 mt-2 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-green-600 font-medium hover:text-green-800 transition-colors"
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
