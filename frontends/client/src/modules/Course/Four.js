import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CourseFourArea from "./CourseFourArea"

export default function CourseFourModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Danh sách khóa học"
				subTitle="Khóa học"
			/>
			<CourseFourArea />
			<ScrollTop />
		</main>
	)
}
