import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import Link from "next/link";
import { useRef } from 'react';

export default function FooterCTATwo(props) {
	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);
	
	return (
		<div className="call-to-sction bg_image shape-move" ref={shapeMoveRef}>
			<div className="title-area-left-style">
				<div className="pre-title">
					<Image src="/images/banner/bulb-2.png" alt="icon" width="22" height="22"/>
					<span>Tải ứng dụng</span>
				</div>
				<h2 className="title mb--25">Xây dựng chứng chỉ kỹ năng của bạn từ <br/> khóa học trực tuyến StudyHub
				</h2>
				<div className="finding-source">
					<Link href="#">
						<Image src="/images/cta/01.svg" alt="cta-one" width="135" height="40"/>
					</Link>
					<Link href="#">
						<Image src="/images/cta/02.svg" alt="cta-one" width="131" height="39"/>
					</Link>
				</div>
			</div>
			<div className="image-right">
				<Image src="/images/cta/03.png" alt="cta-main" width="365" height="283"/>
			</div>
			<div className="banner-shape-area-two shape-image">
				<Image className="shape one" data-speed="0.04" src="/images/cta/03.svg" alt="one" width={65}
					   height={52}/>
				<Image className="shape two" data-speed="0.04" src="/images/cta/05.svg" alt="two" width={157}
					   height={157}/>
			</div>
		</div>
	)
}
