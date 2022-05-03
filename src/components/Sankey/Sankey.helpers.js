import { scaleOrdinal } from "@visx/scale";
import { sankey, sankeyLeft } from "d3-sankey";

import data from "../../assets/ruas_limpas_no_duplicates.json";
import { roadTypes, categories } from "../../constants";
import { sankeyParams } from "./Sankey.constants";

export const prepareSankeyData = () => {
  const nodes = [];
  const links = [];

  roadTypes.forEach((type) => {
    nodes.push({
      name: type,
      type: "road",
      value: 0,
    });
  });

  categories.forEach((category) => {
    nodes.push({
      name: category,
      type: "category",
      value: 0,
    });
  });

  roadTypes.forEach((type) => {
    categories.forEach((category) => {
      links.push({
        source: type,
        target: category,
        value: 0,
      });
    });
  });

  data.forEach((road) => {
    nodes[nodes.findIndex((node) => node.name === road.tipo)].value++;
    nodes[nodes.findIndex((node) => node.name === road.categoria)].value++;
    links[
      links.findIndex(
        (link) => link.source === road.tipo && link.target === road.categoria
      )
    ].value++;
  });

  return {
    nodes,
    links,
  };
};

export const sankeyLayout = (nodes, links, width, height) => {
  const sankeyLayout = sankey()
    .nodeId((d) => d.name)
    .nodeAlign(sankeyLeft)
    .nodeWidth(sankeyParams.nodeWidth)
    .nodePadding(sankeyParams.nodePadding)
    .size([width, height]);

  return sankeyLayout({ nodes, links });
};

const colorScale = scaleOrdinal({
  domain: categories,
  range: ["#410b13", "#91171f", "#ba1f33", "#cd5d67"].reverse(),
});

export const colorRedNode = (category) => colorScale(category);

export const getNodeTotal = (node) => {
  const key = node.depth === 0 ? "tipo" : "categoria";
  return data.filter((d) => d[key] === node.name).length;
};
