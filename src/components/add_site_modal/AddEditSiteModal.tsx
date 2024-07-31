import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TopSiteContext } from "../../context/TopSiteContext";
import { MdClose } from "react-icons/md";
import "./add_site.scss";

const AddUpdateSite = ({ closeModal, i }: { closeModal: () => void; i?: number }) => {
	const { sites, addUpdateSite } = useContext(TopSiteContext);
	const [title, setTitle] = useState<string>("");
	const [url, setUrl] = useState<string>("");

	useEffect(() => {
		if (i !== undefined) {
			setTitle(sites[i!].title);
			setUrl(sites[i!].url);
		}
	}, []);

	return createPortal(
		<>
			<div className="modal-background" onClick={closeModal}></div>
			<div className="add-site">
				<MdClose className="close-btn" onClick={closeModal}></MdClose>
				<h2>{i === undefined ? "Add" : "Update"} Site</h2>
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
								addUpdateSite({ title, url }, i);
								closeModal();
							}
						}}
					>
						Save
					</button>
				</div>
			</div>
		</>,
		document.querySelector("#modal-portal")!,
	);
};

export default AddUpdateSite;
