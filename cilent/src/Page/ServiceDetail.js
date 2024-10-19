import BannerService from "../component/Banner/bannerService";
import PricingSection from "../component/PricingPlan/PricingPlan";
import ServiceDetailFeature from "../component/ServiceDetailFeature/ServiceDetailFeature";
import MembershipTable from "../component/MemberShiptable/member";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function ServiceDetail() {
  const [serviceDetail, setServiceDetail] = useState({});
  const [pricingPlans, setPricingPlans] = useState([]); // Thêm state để lưu các gói tập
  const { id } = useParams();

  // Fetch service details by ID
  useEffect(() => {
      const fetchGymPackagesById = async () => {
          try {
              const response = await fetch(`http://localhost:3002/service/getService/${id}`);
              const data = await response.json();
              setServiceDetail(data);
          } catch (error) {
              console.error("Error fetching service details:", error);
          }
      };

    
      fetchGymPackagesById();
     // Gọi API lấy các gói tập theo serviceId
  }, [id]);

  const { image, packageName } = serviceDetail;

  return (
      <div className="bg-custom text-white">
          <BannerService image={image} packageName={packageName} />
          <ServiceDetailFeature />
          <PricingSection/>
          <MembershipTable/>
           {/* Truyền dữ liệu gói tập vào PricingSection */}
      </div>
  );
}

export default ServiceDetail;