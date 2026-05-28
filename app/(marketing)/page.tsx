import { Hero } from "@/components/hero";
// import { Features } from "@/components/features";
// import { EdtechModules } from "@/components/modules";
// import { Pricing } from "@/components/pricing";
// import { Testimonials } from "@/components/testimonials";
// import { Blog } from "@/components/blog";
import { FreeFunEffective } from "@/components/free-fun-effective";
import { StayMotivated } from "@/components/stay-motivated";
import { PersonalizedLearning } from "@/components/personalized-learning";
import { CoinRewards } from "@/components/coin-rewards";
import { DownloadCTA } from "@/components/download-cta";

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
