import Banner from "./Banner";
import Brand from "./Brand";
import Category from "./Category";
import Course from "./Course";
import JoinTeam from "./JoinTeam";
import Offer from "./Offer";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

import Counter from "@/components/Counter";
import ScrollTop from "@/components/ScrollTop";

export default function HomeTwoModule() {
	return (
		<main>
			<Banner />
			<Category />
			<Offer />
			<Course />
			<WhyChooseUs />
			<JoinTeam />
			<Counter />
			<Testimonial />
			<Brand />
			<ScrollTop />
		</main>
	)
}
