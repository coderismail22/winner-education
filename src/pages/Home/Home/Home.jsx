import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Services from "../Services/Services";
import TopSlider from "../TopSlider/TopSlider";
import Typewriter from "../TypewriterSection/TypewriterSection";

const Home = () => {
    return (
        <div>
            <TopSlider></TopSlider>
            <Typewriter></Typewriter>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <Services></Services>
        </div>
    );
};

export default Home