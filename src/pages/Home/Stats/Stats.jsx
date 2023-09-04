import { useState } from "react";
import AnimatedNumber from "react-animated-numbers";

const Stats = () => {
  const sold = 530000;
  const students = 550000;
  const awards = 250;

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">

            <h2 className="uppercase font-sans text-3xl font-bold text-center text-blue-900 sm:text-4xl">
              Trusted by Numerous Users
            </h2>
     

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center drop-shadow-lg">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Course Sold
                </dt>

                <div className="flex flex-col items-center text-4xl font-extrabold text-blue-600 md:text-5xl">
                  <AnimatedNumber
                    includeComma
                    animateToNumber={sold}
                    locale="en-US"
                    configs={[
                      { mass: 1, tension: 220, friction: 100 },
                      { mass: 1, tension: 180, friction: 130 },
                      { mass: 1, tension: 280, friction: 90 },
                      { mass: 1, tension: 180, friction: 135 },
                      { mass: 1, tension: 260, friction: 100 },
                      { mass: 1, tension: 210, friction: 180 },
                    ]}
                  ></AnimatedNumber>
                </div>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center drop-shadow-lg">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Total Students
                </dt>
                <div className="flex flex-col items-center text-4xl font-extrabold text-blue-600 md:text-5xl">
                  <AnimatedNumber
                    includeComma
                    animateToNumber={students}
                    locale="en-US"
                    configs={[
                      { mass: 1, tension: 220, friction: 100 },
                      { mass: 1, tension: 180, friction: 130 },
                      { mass: 1, tension: 280, friction: 90 },
                      { mass: 1, tension: 180, friction: 135 },
                      { mass: 1, tension: 260, friction: 100 },
                      { mass: 1, tension: 210, friction: 180 },
                    ]}
                  ></AnimatedNumber>
                </div>
              </div>

              <div className="flex flex-col rounded-lg bg-blue-100 px-4 py-8 text-center drop-shadow-lg">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Awards
                </dt>
                <div className="flex flex-col items-center text-4xl font-extrabold text-blue-600 md:text-5xl">
                  <AnimatedNumber
                    includeComma
                    animateToNumber={awards}
                    locale="en-US"
                    configs={[
                      { mass: 1, tension: 220, friction: 100 },
                      { mass: 1, tension: 180, friction: 130 },
                      { mass: 1, tension: 280, friction: 90 },
                    ]}
                  ></AnimatedNumber>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stats;
