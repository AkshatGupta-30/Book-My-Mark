import React, { RefObject, useContext } from "react";
import "./context_menu.scss";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { TopSiteContext } from "../../context/TopSiteContext";

const ContextMenu = ({ contextRef }: { contextRef: RefObject<HTMLUListElement> }) => {
	const { contextMenu, removeSite } = useContext(TopSiteContext);

	return (
		<ul
			ref={contextRef}
			style={{ top: `${contextMenu.y + 2}px`, left: `${contextMenu.x + 2}px` }}
			className={`context-menu ${contextMenu.toggled ? "active" : null}`}
		>
			<li className="menu-fields">
				<MdEditSquare className="field-icon" />
				<span className="field-label">Edit Site</span>
			</li>
			<li className="menu-fields" onClick={() => removeSite(contextMenu.index)}>
				<MdDeleteForever className="field-icon" />
				<span className="field-label">Remove</span>
			</li>
		</ul>
	);
};

export default ContextMenu;
