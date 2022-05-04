import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { categories, colors, roadTypes } from "../../constants";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const inputComponent = (color) =>
  styled(InputBase)(({ theme }) => ({
    "& .MuiSelect-icon": {
      fill: color,
    },
    "& .MuiInputBase-input": {
      fontWeight: "bold",
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      borderBottom: "2px solid",
      borderColor: color,
      padding: "10px 26px 0px 12px",
      transition: theme.transitions.create([
        "border-color",
        "box-shadow",
        "borderRadius",
      ]),
      "&:focus": {
        borderColor: color,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 4,
        boxShadow: `0 0 0 0.2rem ${color.replace("1)", "0.2)")}`,
      },
    },
  }));

const RoadTitleComponent = inputComponent(colors.green);
const CategoryTitleComponent = inputComponent(colors.red);

const makeDeterminer = (roadType) => {
  if (roadType === "Outro") return null;
  if (/[a-zA-Z]*o$/.test(roadType)) return "Os";
  if (/[a-zA-Z]*a$/.test(roadType) || /[a-zA-Z]*e$/.test(roadType)) return "As";
};
const makeConnector = (category) => {
  if (
    ["25 de Abril", "Salgueiro Maia", "Capitães de Abril"].indexOf(category) >
    -1
  )
    return "";
  if (category === "Liberdade") return "da";
};
const makePlural = (roadType) => `${roadType}s`;

export default function Title({
  roadType,
  category,
  setRoadType,
  setCategory,
}) {
  return (
    <div className="mx-4 flex text-3xl flex-row flex-wrap justify-center gap-3 items-center">
      <p>{makeDeterminer(roadType)}</p>
      <FormControl variant="standard">
        <Select
          width="30%"
          value={roadType}
          onChange={(evt) => setRoadType(evt.target.value)}
          input={<RoadTitleComponent />}
        >
          {roadTypes.map((roadType, i) => (
            <MenuItem
              key={`select-option-road-${i}`}
              value={roadType}
              color="secondary"
            >
              {makePlural(roadType)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <p>{makeConnector(category)}</p>
      <FormControl variant="standard">
        <Select
          width="30%"
          value={category}
          onChange={(evt) => setCategory(evt.target.value)}
          input={<CategoryTitleComponent />}
        >
          {categories.map((category, i) => (
            <MenuItem key={`select-option-categ${i}`} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
