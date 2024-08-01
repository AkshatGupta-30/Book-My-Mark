import React, { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { TopSiteContext } from "../../context/TopSiteContext";
import { IoIosAdd } from "react-icons/io";
import AddUpdateSite from "../add_site_modal/AddEditSiteModal";
import TopSite from "../../models/Site";
import "./top_sites.scss";
import ContextMenu from "../context_menu/ContextMenu";
import FloatingDescription from "../floating_description/FloatingDescription";

const TopSites = () => {
	const {
		sites,
		setContextMenu,
		setFloatCard,
		defaultSecondaryItem: defaultSecondaryItem,
	} = useContext(TopSiteContext);
	const topSitesRef = useRef<HTMLDivElement>(null);
	const addSiteRef = useRef<HTMLDivElement>(null);
	const contextMenuRef = useRef<HTMLUListElement>(null);
	const floatCardRef = useRef<HTMLDivElement>(null);
	const [showAddSiteModal, setShowAddSiteModal] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(-1);
	const latestMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	let floatTimeout: NodeJS.Timeout;

	const closeAddSiteModal = () => {
		setShowAddSiteModal(false);
	};

	const handleOnEnter = (ev: React.MouseEvent<HTMLAnchorElement>, i: number) => {
		ev.preventDefault();
		floatTimeout = setTimeout(() => {
			if (floatCardRef.current) {
				const childCurrCard = document.getElementsByClassName("site")[i];
				const childCurrCardAttr = childCurrCard.getBoundingClientRect();
				const floatCardAttr = floatCardRef.current.getBoundingClientRect();
				const isLeft = ev.clientX + floatCardAttr.width < window?.innerWidth;
				const isTop =
					childCurrCardAttr.y +
						childCurrCardAttr.height +
						floatCardAttr.height >
					window?.innerHeight;

				setIndex(i);
				setFloatCard({
					x: isLeft
						? latestMousePos.current.x
						: latestMousePos.current.x - floatCardAttr.width,
					y: isTop
						? childCurrCardAttr.y - floatCardAttr.height - 5
						: childCurrCardAttr.y + childCurrCardAttr.height + 2,
					toggled: true,
				});
			}
		}, 800);
	};

	const handleOnClick = () => {
		setContextMenu(defaultSecondaryItem);
		setShowAddSiteModal(true);
	};

	const handleOnContextMenu = (ev: MouseEvent, i: number) => {
		ev.preventDefault();
		clearTimeout(floatTimeout);
		setFloatCard(defaultSecondaryItem);

		const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();
		const isLeft = ev.clientX < window?.innerWidth;

		if (contextMenuAttr) {
			setIndex(i);
			setContextMenu({
				x: isLeft ? ev.clientX : ev.clientX - contextMenuAttr.width,
				y: ev.clientY,
				toggled: true,
			});
		}
	};

	const handleOnLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
		ev.preventDefault();
		clearTimeout(floatTimeout);
		setIndex(-1);
		setFloatCard(defaultSecondaryItem);
	};

	useEffect(() => {
		function mouseMoveHandler(ev: Event | MouseEvent): void {
			ev.preventDefault();
			const e = ev as MouseEvent;
			latestMousePos.current = { x: e.clientX, y: e.clientY };
		}

		function clickHandler(ev: Event): void {
			//* - Check if the contextMenuRef.current exists and is not a descendant of the clicked target
			if (
				contextMenuRef.current &&
				!contextMenuRef.current.contains(ev.target as Node)
			)
				setContextMenu(defaultSecondaryItem);
		}

		function contextHandler(ev: Event): void {
			const target: HTMLElement = ev.target as HTMLElement;
			if (
				//* - If context menu is active
				contextMenuRef.current &&
				//* - If element(parent - top-sites) clicked does not contains className site
				!target.classList.contains("site") &&
				//* - If toSiteRef exists
				topSitesRef.current &&
				//* - If element clicked has descendant className site or add site button clicked
				(target.querySelector(".site") || addSiteRef.current?.contains(target))
			)
				setContextMenu(defaultSecondaryItem);
		}

		document.addEventListener("mousemove", mouseMoveHandler);
		document.addEventListener("click", clickHandler);
		document.addEventListener("contextmenu", contextHandler);

		return () => {
			document.removeEventListener("click", clickHandler);
			document.removeEventListener("contextmenu", contextHandler);
			document.removeEventListener("mousemove", mouseMoveHandler);
		};
	}, []);

	return (
		<div className="top-sites" ref={topSitesRef}>
			{sites.map((site: TopSite, i: number) => (
				<a
					key={i}
					href={`http://${site.url}`}
					className="site"
					onContextMenu={(ev) => handleOnContextMenu(ev, i)}
					onMouseEnter={(ev) => handleOnEnter(ev, i)}
					onMouseLeave={handleOnLeave}
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
			{showAddSiteModal && <AddUpdateSite closeModal={closeAddSiteModal} />}
			<ContextMenu contextRef={contextMenuRef} index={index} />
			<FloatingDescription compRef={floatCardRef} index={index} />
		</div>
	);
};

export default TopSites;
