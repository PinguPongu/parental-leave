import Link from 'next/link';

const HomeScreen = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-10 sm:px-6">
      <section className="w-full rounded-xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Directorate of Labour
        </p>
        <h1 className="mt-3 text-3xl text-[var(--gov-navy-950)]">
          Parental Leave Application
        </h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          Complete the digital application in a guided set of steps. Information can be updated before final submission.
        </p>
        <div className="mt-6">
          <Link
            href="/application/applicant"
            className="inline-flex items-center rounded-md bg-[var(--gov-navy-900)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--gov-navy-950)]"
          >
            Start Application
          </Link>
        </div>
      </section>
    </main>
  )}

  export default HomeScreen;
