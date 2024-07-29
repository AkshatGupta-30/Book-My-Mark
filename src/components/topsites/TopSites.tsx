import React, { useContext, useState } from "react";
import { TopSiteContext } from "../../context/TopSiteContext";
import { IoIosAdd } from "react-icons/io";
import AddSite from "./AddSitePortal";
import TopSite from "../../models/Site";
import "./top_sites.scss";

const TopSites = () => {
	const { sites } = useContext(TopSiteContext);
	const [showModal, setShowModal] = useState<boolean>(false);
	const closeModal = () => setShowModal(false);

	return (
		<div className="top-sites">
			{sites.map((site: TopSite) => (
				<div className="site">
					<div className="img-wrapper">
						<img
							src={`https://icon.horse/icon/${site.favicon}`}
							alt=""
							loading="lazy"
							className="favicon"
						/>
					</div>
					<div className="name">{site.title}</div>
				</div>
			))}

			{sites.length < 20 && (
				<div className="site" onClick={() => setShowModal(true)}>
					<div className="img-wrapper">
						<IoIosAdd className="add-icon" />
					</div>
					<div className="name">Add Site</div>
				</div>
			)}
			{showModal && <AddSite closeModal={closeModal} />}
		</div>
	);
};

export default TopSites;
