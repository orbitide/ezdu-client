import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { EdtechModules } from "@/components/modules";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Blog } from "@/components/blog";

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <EdtechModules />
            {/*<Pricing />*/}
            <Testimonials />
            {/*<Blog />*/}
            {/*<Contact />*/}
        </>
    );
}
