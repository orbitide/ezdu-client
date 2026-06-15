import { Hero } from "@/components/marketing/hero";
import { FreeFunEffective } from "@/components/marketing/free-fun-effective";
import { StayMotivated } from "@/components/marketing/stay-motivated";
import { PersonalizedLearning } from "@/components/marketing/personalized-learning";
import { CoinRewards } from "@/components/marketing/coin-rewards";
import { DownloadCTA } from "@/components/marketing/download-cta";

export default function Home() {
    return (
        <>
            <Hero />
            <FreeFunEffective />
            <StayMotivated />
            <PersonalizedLearning />
            <CoinRewards />
            <DownloadCTA />
        </>
    );
}
