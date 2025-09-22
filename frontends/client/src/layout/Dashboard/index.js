import ScrollTop from '@/components/ScrollTop';
import Header from '@/layout/Header';
import DashboardBreadCrumbs from './BreadCrumbs';
import DashboardFooter from './Footer';
import DashboardSidebar from './Sidebar';

export default function DashboardLayout({children}) {
	
	return (
		<main>
			<Header />
			<DashboardBreadCrumbs />
			<div className="dashboard--area-main pt--100 pt_sm--50">
				<div className="container">
					<div className="row g-5">
						<div className="col-lg-3 rts-sticky-column-item">
							<DashboardSidebar />
						</div>
						<div className="col-lg-9">
							{ children }
						</div>
					</div>
				</div>
			</div>
			<div className="rts-section-gapTop"/>
			<DashboardFooter />
			<ScrollTop />
		</main>
	)
}
