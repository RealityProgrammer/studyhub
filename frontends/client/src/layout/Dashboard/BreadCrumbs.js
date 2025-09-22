import Image from "next/image";
import {useEffect, useState} from "react";
import api from "@/route/route";

export default function DashboardBreadCrumbs() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		api.getUser()
			.then((response) => {
				setUser(response.data);
			})
	}, []);
	return (
		<div className="dashboard-banner-area-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
                        <div className="dashboard-banner-area-start bg_image">
                            <div className="author-profile-image-and-name">
                                <div
                                    className="profile-pic"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Image
                                        src={user?.imageUrl || "/images/dashboard/01.png"}
                                        width={200}
                                        height={200}
                                        alt="dashboard"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                                <div className="name-desig">
                                    <h1 className="title">{user?.fullName || "David"}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
