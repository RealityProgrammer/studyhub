import ScrollTop from "@/components/ScrollTop";
import GradeDetailsBreadcrumbs from "@/modules/GradeDetail/Breadcrumbs";
import GradeDetail from "@/modules/GradeDetail/GradeDetail";

export default function GradeDetailsModulesFour(singleCourse) {
	console.log('singleCourse : ', singleCourse );
	return (
		<main>
			<GradeDetailsBreadcrumbs item={singleCourse?.item} />
			<GradeDetail item={singleCourse?.item} />
			<ScrollTop />
		</main>
	)
}
