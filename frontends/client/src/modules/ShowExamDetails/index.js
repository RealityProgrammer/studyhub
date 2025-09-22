import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import ExamDetailsPoint from "@/modules/ShowExamDetails/ExamDetails";

export default function ExamDetails(singleQuiz) {

    return (
        <main>
            <BreadCrumbs
                Title="Chi tiết bài thi"
                subTitle={singleQuiz.item?.data.name || "Quiz Details"}
            />
            <ExamDetailsPoint item={singleQuiz.item} />
            <ScrollTop />
        </main>
    )
}
