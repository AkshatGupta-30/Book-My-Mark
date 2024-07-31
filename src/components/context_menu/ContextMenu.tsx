import React, { RefObject } from "react";
import "./context_menu.scss";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";

const ContextMenu = ({
	contextMenuRef,
	isToggled,
	left,
	top,
}: {
	contextMenuRef: RefObject<HTMLUListElement>;
	isToggled: boolean;
	left: number;
	top: number;
}) => {
	return (
		<ul
			ref={contextMenuRef}
			style={{ top: `${top + 2}px`, left: `${left + 2}px` }}
			className={`context-menu ${isToggled ? "active" : null}`}
		>
			<li className="menu-fields">
				<MdEditSquare className="field-icon" />
				<span className="field-label">Edit Site</span>
			</li>
			<li className="menu-fields">
				<MdDeleteForever className="field-icon" />
				<span className="field-label">Remove</span>
			</li>
		</ul>
	);
};

export default ContextMenu;
