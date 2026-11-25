import { Contact } from './home/Contact';
import { Ethos } from './home/Ethos';
import { Hero } from './home/Hero';
import { Services } from './home/Services';
import { TeamSection } from './home/TeamSection';
import { WorkSection } from './home/WorkSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="sheet">
        <WorkSection />
        <TeamSection />
        <Ethos />
        <Services />
        <Contact />
      </div>
    </main>
  );
}
