import AboutSection from "@/src/components/ui/About/AboutSection/page";
import AboutCertificationsSection from "@/src/components/ui/About/AboutCertificationsSection/page";
import { getDictionary } from "@/lib/internalization";

export default async function About() {
    const dict = await getDictionary();

    return (
        <>
            <AboutSection dict={dict.aboutAndMore} />
            {/* <AboutCertificationsSection /> */}
        </>
    );
}