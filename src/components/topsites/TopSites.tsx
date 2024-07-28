import { IoIosAdd } from "react-icons/io";
import "./top_sites.scss";

const TopSites = () => {
	return (
		<div className="top-sites">
			<div className="site">
				<div className="img-wrapper">
					<img
						src="https://icon.horse/icon/dev.to"
						alt=""
						loading="lazy"
						className="favicon"
					/>
				</div>
				<div className="name">Dev.to</div>
            </div>

			<div className="site">
				<div className="img-wrapper">
                    <IoIosAdd className="add-icon"/>
				</div>
				<div className="name">Add Site</div>
			</div>
		</div>
	);
};

export default TopSites;
