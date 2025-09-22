import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import BlogListArea from "./BlogListArea"

export default function BlogListModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Blog List"
				subTitle="Our Blog List"
			/>
			<BlogListArea />
			<ScrollTop />
		</main>
	)
}
