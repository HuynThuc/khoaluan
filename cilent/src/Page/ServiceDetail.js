import BannerService from "../component/Banner/bannerService";
import PricingSection from "../component/PricingPlan/PricingPlan";
import ServiceDetailFeature from "../component/ServiceDetailFeature/ServiceDetailFeature";
import MembershipTable from "../component/MemberShiptable/member";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function ServiceDetail() {
  const [serviceDetail, setServiceDetail] = useState({});
  const { id } = useParams();

  // Fetch service details by ID
  useEffect(() => {
      const fetchServiceDetailById = async () => {
          try {
              const response = await fetch(`http://localhost:3002/service/getService/${id}`);
              const data = await response.json();
              setServiceDetail(data);
          } catch (error) {
              console.error("Error fetching service details:", error);
          }
      };

      fetchServiceDetailById();
  }, [id]);

  const { image, packageName, content } = serviceDetail;

  return (
      <div className="bg-custom text-white">
          <BannerService image={image} packageName={packageName} />

          <ServiceDetailFeature content={content}/>
          <PricingSection />
          <MembershipTable />
      </div>
  );
}

export default ServiceDetail;
