import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { FreeFunEffective } from "@/components/marketing/free-fun-effective";
import { StayMotivated } from "@/components/marketing/stay-motivated";
import { PersonalizedLearning } from "@/components/marketing/personalized-learning";
import { CoinRewards } from "@/components/marketing/coin-rewards";
import { DownloadCTA } from "@/components/marketing/download-cta";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <FreeFunEffective />
            <StayMotivated />
            <PersonalizedLearning />
            <CoinRewards />
            <DownloadCTA />
            <Footer />
        </>
    );
}
