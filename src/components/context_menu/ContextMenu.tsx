import React, { RefObject, useContext, useState } from "react";
import "./context_menu.scss";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { TopSiteContext } from "../../context/TopSiteContext";
import AddUpdateSite from "../add_site_modal/AddEditSiteModal";

const ContextMenu = ({
	contextRef,
	index,
}: {
	contextRef: RefObject<HTMLUListElement>;
	index: number;
}) => {
	const { contextMenu, setContextMenu, removeSite } = useContext(TopSiteContext);
	const [showAddSiteModal, setShowAddSiteModal] = useState<boolean>(false);

	const closeAddSiteModal = () => {
		setShowAddSiteModal(false);
	};

	const handleOnClick = () => {
		setContextMenu((prevContextMenu) => ({
			...prevContextMenu,
			toggled: false,
		}));
		setShowAddSiteModal(true);
	};

	return (
		<>
			<ul
				ref={contextRef}
				style={{ top: `${contextMenu.y + 2}px`, left: `${contextMenu.x + 2}px` }}
				className={`context-menu ${contextMenu.toggled ? "active" : null}`}
			>
				<li className="menu-fields" onClick={handleOnClick}>
					<MdEditSquare className="field-icon" />
					<span className="field-label">Edit Site</span>
				</li>
				<li className="menu-fields" onClick={() => removeSite(index)}>
					<MdDeleteForever className="field-icon" />
					<span className="field-label">Remove</span>
				</li>
			</ul>
			{showAddSiteModal && (
				<AddUpdateSite closeModal={closeAddSiteModal} i={index} />
			)}
		</>
	);
};

export default ContextMenu;
