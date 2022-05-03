import React, { useState } from "react";
import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import { sankeyLinkHorizontal } from "d3-sankey";

import { colorRedNode } from "./Sankey.helpers";
import { colors } from "../../constants";

const linkPath = sankeyLinkHorizontal()
  .source((d) => [d.source.x1, d.y0])
  .target((d) => [d.target.x0, d.y1]);

export default function Link({ link, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Group>
      <LinearGradient
        from={colors.green}
        to={colorRedNode(link.target.name)}
        id={`gradient-${link.source.name}-${link.target.name}`}
        vertical={false}
        gradientUnits="userSpaceOnUse"
        toOffset="40%"
        fromOffset="10%"
      />
      <path
        d={linkPath(link)}
        stroke={`url('#gradient-${link.source.name}-${link.target.name}')`}
        strokeWidth={Math.max(1, link.width)}
        strokeOpacity={isActive ? 0.6 : isHovered ? 0.4 : 0.1}
        fill="none"
        className="cursor-pointer"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </Group>
  );
}
