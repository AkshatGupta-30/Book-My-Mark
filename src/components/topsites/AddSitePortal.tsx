import { createPortal } from "react-dom";
import "./add_site.scss";

const AddSite = ({ closeModal }: { closeModal: () => void }) => {
	return createPortal(
		<>
			<div className="modal-background" onClick={closeModal}></div>
			<div className="add-site"></div>
		</>,
		document.querySelector(".modal-portal")!,
	);
};

export default AddSite;
