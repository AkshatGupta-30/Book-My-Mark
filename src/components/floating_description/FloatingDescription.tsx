import React, { useContext } from "react";
import { RefObject } from "react";
import { TopSiteContext } from "../../context/TopSiteContext";
import "./FloatingDescription.scss";

const FloatingDescription = ({
	compRef,
	index,
}: {
	compRef: RefObject<HTMLDivElement>;
	index: number;
}) => {
	const { sites, floatCard } = useContext(TopSiteContext);

	return (
		<div
			ref={compRef}
			style={{
				top: `${floatCard.y + 2}px`,
				left: `${floatCard.x + 2}px`,
			}}
			className={`floating-description ${floatCard.toggled ? "active" : null}`}
		>
			<h3>{index !== -1 && sites[index].url}</h3>
		</div>
	);
};

export default FloatingDescription;
