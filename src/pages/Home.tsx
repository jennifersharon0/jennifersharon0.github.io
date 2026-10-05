import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLang } from '../i18n/useLang';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { Hero } from '../sections/Hero';
import { Journey } from '../sections/Journey';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';

export function Home() {
  const { lang, t } = useLang();
  useDocumentMeta(lang, t.meta.homeTitle, t.meta.homeDescription);

  return (
    <>
      <Hero />
      <About index={1} />
      <Projects index={2} />
      <Skills index={3} />
      <Journey index={4} />
      <Contact index={5} />
    </>
  );
}
