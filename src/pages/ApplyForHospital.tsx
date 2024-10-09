import ApplyForHospitalForm from "@/components/forms/ApplyForHospitalForm";
import Footer from "@/components/widgets/Footer";
import NavBar from "@/components/widgets/NavBar";

export default function ApplyForHospital() {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center mx-auto max-w-screen-xl px-4 md:px-4 pt-2 pb-8 lg:px-8">
        <ApplyForHospitalForm />
      </div>
      <Footer />
    </div>
  )
}
