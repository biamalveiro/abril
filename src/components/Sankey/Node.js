import React from "react";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

import { sankeyParams } from "./Sankey.constants";
import { colors } from "../../constants";
import { colorRedNode, getNodeTotal } from "./Sankey.helpers";

export default function Node({ node, isActive, onClick, selectedCount }) {
  const isLeftNode = node.depth === 0;
  const nodeColor = isLeftNode ? colors.green : colorRedNode(node.name);
  const nodeHeight = node.y1 - node.y0;
  const isLabelInNode = nodeHeight > 12;
  const labelY = isLabelInNode ? nodeHeight / 2 : -2;
  const total = getNodeTotal(node);
  const counterTextAnchor = isLeftNode ? "end" : "start";
  const counterColor = isLeftNode ? colors.green : colors.red;

  return (
    <Group top={node.y0} left={node.x0} key={`node-${node.name}`}>
      <rect
        width={node.x1 - node.x0}
        height={nodeHeight}
        fill={nodeColor}
        opacity={isActive ? 1 : 0.8}
        cursor={"pointer"}
        onClick={onClick}
      />
      <Text
        y={labelY}
        dx={8}
        verticalAnchor={isLabelInNode ? "middle" : "end"}
        textAnchor="start"
        fill={
          isLabelInNode ? "white" : node.depth > 0 ? colors.red : colors.green
        }
        fontSize={12}
      >
        {node.name}
      </Text>
      {isActive && (
        <Group top={labelY} left={isLeftNode ? -8 : sankeyParams.nodeWidth + 8}>
          <Text
            verticalAnchor={"end"}
            textAnchor={counterTextAnchor}
            fontWeight="bold"
            fill={counterColor}
            fontSize={11}
          >
            {selectedCount}
          </Text>
          <Text
            dy={4}
            verticalAnchor={"start"}
            textAnchor={counterTextAnchor}
            fill={counterColor}
            fontSize={10}
          >
            {`de ${total}`}
          </Text>
        </Group>
      )}
    </Group>
  );
}
