import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import BlogDetailsArea from "./BlogDetailsArea";

export default function BlogDetailsModules(singleBlog) {
	return (
		<main>
			<BreadCrumbs
				Title="Blog Details"
				subTitle={singleBlog.item?.title || "Blog Details"}
			/>
			<BlogDetailsArea item={singleBlog.item} />
			<ScrollTop />
		</main>
	)
}
