import FAQ from "../FAQ/FAQ";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Pricing from "../Pricing/Pricing";
import Services from "../Services/Services";
import Slider from "../Slider/Slider";
import Stats from "../Stats/Stats";
import Typewriter from "../TypewriterSection/TypewriterSection";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Typewriter></Typewriter>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <Services></Services>
            <Stats></Stats>
            <FAQ></FAQ>
            <Pricing></Pricing>
        </div>
    );
};

export default Home