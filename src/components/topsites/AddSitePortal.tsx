import { createPortal } from "react-dom";
import "./add_site.scss";
import { MdClose } from "react-icons/md";
import React, { useContext, useState } from "react";
import { TopSiteContext } from "../../context/TopSiteContext";

const AddSite = ({ closeModal }: { closeModal: () => void }) => {
	const { addSite } = useContext(TopSiteContext);
	const [title, setTitle] = useState<string>("");
	const [url, setUrl] = useState<string>("");

	return createPortal(
		<>
			<div className="modal-background" onClick={closeModal}></div>
			<div className="add-site">
				<MdClose className="close-btn" onClick={closeModal}></MdClose>
				<h2>Add Site</h2>
				<div className="input-wrapper">
					<label>Title</label>
					<input
						type="text"
						placeholder="Website Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="input-wrapper">
					<label>URL</label>
					<input
						type="text"
						placeholder="Website Address"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
				</div>
				<div className="btns">
					<button className="cancel" onClick={closeModal}>
						Cancel
					</button>
					<button
						className="save"
						onClick={() => {
							if (title && url) {
								addSite({ title, url });
								closeModal();
							}
						}}
					>
						Save
					</button>
				</div>
			</div>
		</>,
		document.querySelector(".modal-portal")!,
	);
};

export default AddSite;
