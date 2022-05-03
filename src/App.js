import { useState } from "react";
import { isNull } from "lodash";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Sankey from "./components/Sankey";
import { colors } from "./constants";
import Title from "./components/Title";
import Table from "./components/Table/Table";
import data from "./assets/ruas_limpas_no_duplicates.json";
import GithubLink from "./components/GithubLink";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.slate,
    },
  },
});

function App() {
  const [roadType, setRoadType] = useState("Rua");
  const [category, setCategory] = useState("Liberdade");

  const roads = data.filter(
    (d) =>
      (d.categoria === category || isNull(category)) &&
      (d.tipo === roadType || isNull(roadType))
  );

  return (
    <ThemeProvider theme={theme}>
      <GithubLink />
      <div className="mt-2 ml-4 w-9/12 md:w-full">
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/dssgPT/Plotting-Good-DSSG"
            className="underline text-teal-600 hover:text-teal-800 "
          >
            #PlottingGood
          </a>
          <span className="text-slate-500 text-sm ml-1">
            3. "25 de Abril, sempre!" (22 abril - 6 de maio)
          </span>
        </p>
        <p className="text-slate-400 text-xs">
          <span className="font-bold">Fonte:</span> Open Street Map (dados
          tratados pela DSSG). <span className="font-bold">Gráfico:</span>{" "}
          Beatriz Malveiro (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/biased_bia"
            className="underline text-cyan-500 hover:text-cyan-600 "
          >
            @biased_bia
          </a>
          )
        </p>
      </div>
      <div className="mt-8 mb-4 w-full md:w-9/12 mx-auto">
        <div className="h-[80vh]">
          <Sankey
            roadType={roadType}
            category={category}
            setRoadType={setRoadType}
            setCategory={setCategory}
            selectedCount={roads.length}
          />
          <Title
            roadType={roadType}
            setRoadType={setRoadType}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-full mx-auto overflow-x-auto mt-10">
          <Table roads={roads} category={category} roadType={roadType} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
