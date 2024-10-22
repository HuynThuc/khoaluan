import PaymentForm from "../component/Payment/Payment";
import TrainerCard from "../component/TrainerCard/trainercard";
import BookingHeader from "../component/BookingStep/BookingHeader";
import BannerService from "../component/Banner/bannerService";




function Checkout() {

    return (
        <div className="bg-white text-white">
          <BannerService/>
          <BookingHeader/>
          <TrainerCard/>
      </div>
    );
  }
  
  export default Checkout;
  