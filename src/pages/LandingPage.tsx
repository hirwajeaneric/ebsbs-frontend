import Banner from "@/components/widgets/Banner";
import Footer from "@/components/widgets/Footer";
import NavBar from "@/components/widgets/NavBar";

export default function LandingPage() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <NavBar />
            <Banner />
            <Footer />
        </div>
    )
}
