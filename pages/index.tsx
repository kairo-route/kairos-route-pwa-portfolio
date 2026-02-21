import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const { t } = useTranslation('common');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Head>
        <title>{t('hero.title')} - Kairos Route</title>
        <meta name="description" content={t('hero.description')} />
        <meta property="og:title" content="Kairos Route PWA Portfolio" />
        <meta property="og:description" content={t('hero.description')} />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <span className="font-bold text-xl tracking-widest">KAIROS ROUTE</span>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 rounded-full border border-current text-sm hover:bg-white/10 transition"
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-900 flex items-center justify-center text-4xl">⬡</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10">
          {t('hero.subtitle')}
        </p>
        <p className="text-base text-gray-500 max-w-xl mb-12">
          {t('hero.description')}
        </p>
        <div className="flex gap-4">
          <a href="#apps" className="px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-full font-semibold transition">
            {t('hero.cta')}
          </a>
        </div>
      </section>

      {/* Apps Section */}
      <section id="apps" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">{t('apps.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 mb-4 flex items-center justify-center text-2xl">⬡</div>
              <h3 className="text-xl font-semibold mb-2">{t(`apps.app${i}.name`)}</h3>
              <p className="text-gray-400 text-sm mb-4">{t(`apps.app${i}.description`)}</p>
              <a href={t(`apps.app${i}.url`)} className="text-violet-400 text-sm hover:underline">{t('apps.install')} →</a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/10 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Kairos Route. {t('footer.rights')}</p>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? 'en', ['common'])) },
});

export default Home;
