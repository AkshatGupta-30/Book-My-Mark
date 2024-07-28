import { createPortal } from "react-dom";
import "./add_site.scss";
import { MdClose } from "react-icons/md";

const AddSite = ({ closeModal }: { closeModal: () => void }) => {
	return createPortal(
		<>
			<div className="modal-background" onClick={closeModal}></div>
			<div className="add-site">
				<MdClose className="close-btn" onClick={closeModal}></MdClose>
				<h2>Add Site</h2>
				<div className="input-wrapper">
					<label>Title</label>
					<input type="text" placeholder="Website Title" />
				</div>
				<div className="input-wrapper">
					<label>URL</label>
					<input type="text" placeholder="Website Address" />
				</div>
				<div className="btns">
					<button className="cancel">Cancel</button>
					<button className="save">Save</button>
				</div>
			</div>
		</>,
		document.querySelector(".modal-portal")!,
	);
};

export default AddSite;
