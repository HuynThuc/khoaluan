import BannerService from "../component/Banner/bannerService";
import ServiceCard from "../component/ServiceCard/ServiceCard";


function Service() {

    return (
        <div className="bg-custom text-white">
       <BannerService/>  
       <ServiceCard/>
      </div>
    );
  }
  
  export default  Service;
  