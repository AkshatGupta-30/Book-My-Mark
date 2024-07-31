import React, { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { TopSiteContext } from "../../context/TopSiteContext";
import { IoIosAdd } from "react-icons/io";
import AddSite from "../add_site_modal/AddSiteModal";
import TopSite from "../../models/Site";
import "./top_sites.scss";
import ContextMenu from "../context_menu/ContextMenu";

interface ContextMenuInterface {
	x: number;
	y: number;
	toggled: boolean;
}

const defaultContextMenu = {
	x: 0,
	y: 0,
	toggled: false,
} as ContextMenuInterface;

const TopSites = () => {
	const { sites } = useContext(TopSiteContext);
	const contextMenuRef = useRef<HTMLDivElement>(null);
	const addSiteRef = useRef<HTMLDivElement>(null);
	const topSitesRef = useRef<HTMLDivElement>(null);
	const [showAddSiteModal, setShowAddSiteModal] = useState<boolean>(false);
	const [contextMenu, setContextMenu] =
		useState<ContextMenuInterface>(defaultContextMenu);

	const closeAddSiteModal = () => {
		setShowAddSiteModal(false);
	};

	const handleOnContextMenu = (ev: MouseEvent) => {
		ev.preventDefault();
		const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();
		const isLeft = ev.clientX < window?.innerWidth;

		if (contextMenuAttr)
			setContextMenu({
				x: isLeft ? ev.clientX : ev.clientX - contextMenuAttr.width,
				y: ev.clientY,
				toggled: true,
			});
	};

	const handleOnClick = () => {
		setContextMenu(defaultContextMenu);
		setShowAddSiteModal(true);
	};

	useEffect(() => {
		function clickHandler(ev: Event): void {
			//* - Check if the contextMenuRef.current exists and is not a descendant of the clicked target
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(ev.target as Node)
			) {
				setContextMenu(defaultContextMenu);
			}
		}

		function contextHandler(ev: Event): void {
			const target: HTMLElement = ev.target as HTMLElement;
			//* - Check if the siteRef.current exists and is not a descendant of the clicked target, and if the contextMenuRef.current exists and is not a descendant of the clicked target
			if (
				//* - If context menu is active
				contextMenuRef.current &&
				//* - If element clicked is other than context menu
				!contextMenuRef.current.contains(target) &&
				//* - If element(parent - top-sites) clicked does not contains className site
				!target.classList.contains("site") &&
				//* - If toSiteRef exists
				topSitesRef.current &&
				//* - If element clicked has descendant className site or add site button clicked
				(target.querySelector(".site") || addSiteRef.current?.contains(target))
			) {
				setContextMenu(defaultContextMenu);
			}
		}

		document.addEventListener("click", clickHandler);
		document.addEventListener("contextmenu", contextHandler);

		return () => {
			document.removeEventListener("click", clickHandler);
			document.removeEventListener("contextmenu", contextHandler);
		};
	});

	return (
		<div className="top-sites" ref={topSitesRef}>
			{sites.map((site: TopSite, index: number) => (
				<a
					key={index}
					href={`http://${site.url}`}
					className="site"
					onContextMenu={handleOnContextMenu}
				>
					<div className="img-wrapper">
						<img
							src={`https://icon.horse/icon/${site.favicon}`}
							alt=""
							loading="lazy"
							className="favicon"
						/>
					</div>
					<div className="name">{site.title}</div>
				</a>
			))}

			{sites.length < 20 && (
				<div ref={addSiteRef} className="site" onClick={handleOnClick}>
					<div className="img-wrapper">
						<IoIosAdd className="add-icon" />
					</div>
					<div className="name">Add Site</div>
				</div>
			)}
			{showAddSiteModal && <AddSite closeModal={closeAddSiteModal} />}
			<ContextMenu
				contextMenuRef={contextMenuRef}
				isToggled={contextMenu.toggled}
				left={contextMenu.x}
				top={contextMenu.y}
			/>
		</div>
	);
};

export default TopSites;
