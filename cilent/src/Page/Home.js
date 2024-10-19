import HeroSection from "../component/HeroSection/HeroSection";
import ExploreSection from "../component/ExploreSection/ExploreSection";
import ClassSection from "../component/ClassSection/ClassSection";
import JoinSection from "../component/JoinSection/JoinSection";
import PricingSection from "../component/PricingPlan/PricingPlan";
import ServiceDetailFeature from "../component/ServiceDetailFeature/ServiceDetailFeature";
import MembershipTable from "../component/MemberShiptable/member";

import ServiceCard from "../component/ServiceCard/ServiceCard";


function Home() {

    return (
        <div className="bg-custom text-white">
        
       <HeroSection/>
       <ExploreSection/>
       <ClassSection/>
       <JoinSection/>
       <PricingSection/>
       <MembershipTable/>
    
   
     
  

      </div>
    );
  }
  
  export default Home;
  