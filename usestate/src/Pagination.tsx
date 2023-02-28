import React, { useState } from "react";

const sliding = ["slide1", "slide2", "slide3"];

export default function Pagination() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliding.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === sliding.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-blue-300 to-neutral-50 gap-3 p-5">
      <div className="w-full h-1/2 flex justify-center gap-4 overflow-hidden">
        {sliding.map((s, index) => {
          const slideStyle = {
            transform: `translateX(${
              (index - currentSlide) * 100 // move slide left or right based on the current slide index
            }%)`,
          };
          return (
            <div key={index} className="bg-slate-500 h-full w-11/12" style={slideStyle}>
              {s}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between p-5">
        <button onClick={handlePrevSlide}>Prev</button>
        <button onClick={handleNextSlide}>Next</button>
      </div>
    </div>
  );
}
