import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import InstructorArea from "./InstructorArea"

export default function InstructorModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Danh sách giảng viên"
			/>
			<InstructorArea />
			<ScrollTop />
		</main>
	)
}
