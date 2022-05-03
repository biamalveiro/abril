import React from "react";
import { Group } from "@visx/group";

import { prepareSankeyData, sankeyLayout } from "./Sankey.helpers";
import useChartDimensions from "../../hooks/use-chart-dimensions.hook";
import Link from "./Link";
import Node from "./Node";
import { isNull } from "lodash";

const data = prepareSankeyData();

function Sankey({
  roadType,
  category,
  setRoadType,
  setCategory,
  selectedCount,
}) {
  const [chartWrapperRef, dimensions] = useChartDimensions({
    marginLeft: 50,
    marginRight: 50,
  });

  const layout = sankeyLayout(
    data.nodes,
    data.links,
    dimensions.boundedWidth,
    dimensions.boundedHeight
  );

  const handleLinkClick = (link) => {
    setRoadType(link.source.name);
    setCategory(link.target.name);
  };

  const handleNodeClick = (node) => {
    if (node.depth === 0) {
      setRoadType(node.name);
      setCategory(null);
    }
    if (node.depth === 1) {
      setRoadType(null);
      setCategory(node.name);
    }
  };

  const handleClickOutside = () => {
    setRoadType("Rua");
    setCategory("Liberdade");
  };

  return (
    <div ref={chartWrapperRef} className="w-full h-5/6">
      <svg
        viewBox={[0, 0, dimensions.width, dimensions.height]}
        fill="transparent"
      >
        <rect
          width={dimensions.width}
          height={dimensions.height}
          onClick={handleClickOutside}
        />
        <Group left={dimensions.marginLeft} top={dimensions.marginTop}>
          {layout.links.map((link, index) => {
            if (link.value === 0) return null;
            const isActive =
              (roadType === link.source.name &&
                (isNull(category) || category === link.target.name)) ||
              (category === link.target.name &&
                (isNull(roadType) || roadType === link.source.name));
            return (
              <Link
                key={`link-${index}`}
                link={link}
                isActive={isActive}
                onClick={() => handleLinkClick(link)}
              />
            );
          })}
          {layout.nodes.map((node, index) => {
            if (node.value === 0) return null;
            const isActive =
              (roadType === node.name && node.depth === 0) ||
              (category === node.name && node.depth === 1);
            return (
              <Node
                key={`node-${index}`}
                node={node}
                isActive={isActive}
                onClick={() => handleNodeClick(node)}
                selectedCount={selectedCount}
              />
            );
          })}
        </Group>
      </svg>
    </div>
  );
}

export default Sankey;
