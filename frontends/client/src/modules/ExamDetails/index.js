import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import ExamDetailsArea from "./ExamDetailsArea";

export default function ExamDetailsModules(singleQuiz) {

	return (
		<main>
			<BreadCrumbs
				Title="Chi tiết bài thi"
				subTitle={singleQuiz.item?.data.name || "Quiz Details"}
			/>
			<ExamDetailsArea item={singleQuiz.item} />
			<ScrollTop />
		</main>
	)
}

