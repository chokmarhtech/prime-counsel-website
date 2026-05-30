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
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <div className="w-full overflow-hidden px-4 md:px-0">
            <Slider {...settings}>
                {clientsLogo.map((items) => (
                    <div key={items.id} className="outline-none">
                        <div className="flex h-20 md:h-24 items-center justify-center px-4 md:px-6">
                            <Image
                                src={items.logo}
                                alt={`client-image-${items.id}`}
                                className="max-h-8 md:max-h-14 w-full max-w-[100px] md:max-w-[160px] object-contain mx-auto hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}


export default Brands