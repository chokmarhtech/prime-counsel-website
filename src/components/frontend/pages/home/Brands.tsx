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
                        <div key={items.id} className="flex h-16 items-center justify-center px-4">
                            <Image
                                src={items.logo}
                                alt={`client-image-${items.id}`}
                                className="max-h-12 w-auto object-contain transition-all duration-300"
                            />
                        </div>
                    ))}
            </Slider>
        </div>
    );
}


export default Brands