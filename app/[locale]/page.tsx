import { About } from "@/components/about";
import { MediaPlayer } from "@/components/media-player";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Achievements } from "@/components/achievements";
import { Performances } from "@/components/performances";
import { UpcomingPerformances } from "@/components/upcoming-performances";

export default function Page() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white [@supports(min-height:100dvh)]:min-h-dvh">
            <Navbar />
            <main className="relative z-10 bg-background shadow-2xl">
                <Hero />
                <About />
                <MediaPlayer />
                <Experience />
                <Education />
                <Achievements />
                <Performances />
                <UpcomingPerformances />
                <Gallery />
                <Contact />
            </main>
        </div>
    );
}
