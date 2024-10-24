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



function Home() {

    return (
        <div className="bg-[#0a0a0a] text-white">
        
       <HeroSection/>
       <ExploreSection/>
       <ServicesSection/>
       <ClassSection/>
       <JoinSection/>
       <PricingSection/>
       <RegistrationForm/>
       <BMICalculator/>
     
      
      
     
    
   
     
  

      </div>
    );
  }
  
  export default Home;
  