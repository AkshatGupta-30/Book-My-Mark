import React, { RefObject } from "react";
import "./context_menu.scss";

const ContextMenu = ({
	contextMenuRef,
	isToggled,
	left,
	top,
}: {
	contextMenuRef: RefObject<HTMLDivElement>;
	isToggled: boolean;
	left: number;
	top: number;
}) => {
	return (
		<div
			ref={contextMenuRef}
			style={{ top: `${top + 2}px`, left: `${left + 2}px` }}
			className={`context-menu ${isToggled ? "active" : null}`}
		></div>
	);
};

export default ContextMenu;
