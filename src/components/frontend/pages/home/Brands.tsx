"use client"

import { clientsLogo } from "@/constants";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const Brands = () => {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <div className="">
            <Slider {...settings}>
                {clientsLogo.map((items) => (
                        <div key={items.id} className="flex h-24 items-center justify-center px-6">
                            <Image
                                src={items.logo}
                                alt={`client-image-${items.id}`}
                                className="max-h-12 md:max-h-14 w-auto max-w-[160px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                            />
                        </div>
                    ))}
            </Slider>
        </div>
    );
}


export default Brands