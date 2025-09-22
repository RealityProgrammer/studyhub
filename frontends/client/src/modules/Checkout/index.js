import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CheckoutArea from "./CheckoutArea"
import Cupon from "./Cupon"

export default function CheckoutModules() {
	return (
		<main>
			<BreadCrumbs
				Title="Checkout"
				subTitle="Checkout"
			/>
			<CheckoutArea />
			<ScrollTop />
		</main>
	)
}
