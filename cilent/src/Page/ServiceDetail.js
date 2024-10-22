import BannerService from "../component/Banner/bannerService";
import PricingSection from "../component/PricingPlan/PricingPlan";
import ServiceDetailFeature from "../component/ServiceDetailFeature/ServiceDetailFeature";
import RegistrationForm from "../component/RegisterForm/RegisterForm";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function ServiceDetail() {
    const [serviceDetail, setServiceDetail] = useState({});
    const [pricingPlans, setPricingPlans] = useState([]); 
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

        const fetchPricingPlans = async () => {
            try {
                const response = await fetch(`http://localhost:3002/gymPackage/getGymPackagesByService/${id}`);
                const data = await response.json();
                setPricingPlans(data); // Lưu các gói tập vào state
            } catch (error) {
                console.error("Error fetching pricing plans:", error);
            }
        };
        fetchPricingPlans();
        fetchServiceDetailById();
    }, [id]);

    const { image, serviceName, content} = serviceDetail;

    return (
        <div className="bg-custom text-white">
            <BannerService image={image} serviceName={serviceName} />
            <ServiceDetailFeature content={content} />
            <PricingSection pricingPlans={pricingPlans} /> {/* Truyền dữ liệu gói tập vào PricingSection */}
            <RegistrationForm/>
        </div>
    );
}

export default ServiceDetail;
