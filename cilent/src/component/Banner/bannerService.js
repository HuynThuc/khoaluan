import React, { useState, useEffect, useCallback, useMemo } from 'react';
const BannerService = ({image, packageName}) => {
    return (
      <div class="relative font-sans top-28 before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-35 before:z-10">
  
         <img src={`/images/dichvu-dt.jpg`} alt="Banner Image" class="absolute inset-0 w-full h-full object-cover" />
        <div class="min-h-[700px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        </div>
        <div class="absolute bottom-12 left-64 z-50 text-white">
            <h1 class="shop-page-title is-xlarge pb-2 ">{packageName}</h1>
            <div class="is-small">
              <nav class="woocommerce-breadcrumb breadcrumbs">
                <a href="">Trang chủ / Dịch vụ</a>
               
              </nav>
            </div>
          </div>
      </div>
      
    );
};

export default BannerService;
