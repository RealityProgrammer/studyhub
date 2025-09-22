import ScrollTop from "@/components/ScrollTop";
import GradeDetail from "./GradeDetail";
import GradeDetailsBreadcrumbs from "./Breadcrumbs";

export default function GradeDetailsModulesFour(singleGrade) {
	return (
		<main>
			<GradeDetailsBreadcrumbs
				type="four"
				item={singleGrade?.item}
			/>
			<GradeDetail
				type="four"
				item={singleGrade?.item}
			/>
			<ScrollTop />
		</main>
	)
}
