import HeroSection from "../component/HeroSection/HeroSection";
import ExploreSection from "../component/ExploreSection/ExploreSection";
import ClassSection from "../component/ClassSection/ClassSection";
import JoinSection from "../component/JoinSection/JoinSection";
import PricingSection from "../component/PricingPlan/PricingPlan";
import ServiceDetailFeature from "../component/ServiceDetailFeature/ServiceDetailFeature";
import MembershipTable from "../component/MemberShiptable/member";
import RegistrationForm from "../component/RegisterForm/RegisterForm";
import BMICalculator from "../component/BMI/Bmi";
import ServicesSection from "../component/ServiceHome/ServiceHome";
import Calendar from "../component/Calendar/Calendar";
import ServiceCard from "../component/ServiceCard/ServiceCard";
import WeeklySchedule from "../component/WeeklySchedule/WeeklySchedule";


function Home() {

    return (
        <div className="bg-[#0a0a0a] text-white">
        
       <HeroSection/>
       <ExploreSection/>
       <ClassSection/>
       <JoinSection/>
       <PricingSection/>
       <BMICalculator/>
       <RegistrationForm/>
       <ServicesSection/>
       <Calendar/>
       <WeeklySchedule/>
      
     
    
   
     
  

      </div>
    );
  }
  
  export default Home;
  