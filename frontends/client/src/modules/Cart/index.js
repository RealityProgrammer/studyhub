import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CartArea from "./CartArea"

export default function CartModules() {
	return (
		<main>
			<BreadCrumbs
				Title="Cart"
				subTitle="Cart"
			/>
			<CartArea />
			<ScrollTop />
		</main>
	)
}
