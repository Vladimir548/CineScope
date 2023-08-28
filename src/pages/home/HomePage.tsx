'use client'
import HomeSlider from "./home-top/HomeSlider";
import {useEffect, useState} from "react";
import HomeSliderMobile from "@/pages/home/home-top/HomeSliderMobile";
import HomePopular from "@/pages/home/home-popular/HomePopular";

export default function HomePage() {
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Добавляем обработчик события только после того, как компонент монтируется в браузере
        window.addEventListener('resize', handleResize);

        // Вызываем обработчик сразу, чтобы установить начальное значение
        handleResize();

        // Убираем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            <div className="">
                {windowWidth > 545 ? (
            <HomeSlider/>
                ): (
                    <HomeSliderMobile/>
                )}
            </div>
            <div className="mt-10 mb-10">
                <HomePopular/>
            </div>
        </div>
    );
};