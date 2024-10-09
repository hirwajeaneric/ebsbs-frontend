import { Outlet } from "react-router-dom";

const jssStyles = {
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(https://www.indiaspend.com/h-upload/old_images/1500x900_342835-covid-blood-donors1440.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 0.3s ease-in-out',
  willChange: 'background-image',
};
export default function HospitalAuthLayout() {
  return (
    <div style={jssStyles} className="flex flex-col min-h-screen justify-center items-center">
      <Outlet />
    </div>
  )
}