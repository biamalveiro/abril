import React from "react";

export default function Table({ category, roadType, roads }) {
  const districts = [...new Set(roads.map((d) => d.concelho))].sort();
  return (
    <table className="min-w-full text-sm border-y-2 border-x-0 border-gray-100">
      <tbody className="divide-y divide-gray-100">
        {districts.map((district) => {
          const parishes = [
            ...new Set(
              roads
                .filter((d) => d.concelho === district)
                .map((d) => d.freguesia)
            ),
          ].sort();

          const districtRoads = roads.filter((d) => d.concelho === district);

          const firstRoads = roads
            .filter(
              (d) => d.concelho === district && d.freguesia === parishes[0]
            )
            .map((d) => d.nome)
            .sort();

          return (
            <>
              <tr valign="top" className="">
                <td
                  rowSpan={districtRoads.length}
                  className="px-4 py-2 font-medium text-gray-900 "
                >
                  <strong className="bg-slate-100 text-slate-700 px-2 py-1 mr-2 rounded text-xs font-medium">
                    {districtRoads.length}
                  </strong>
                  {district}
                </td>
                <td
                  rowSpan={firstRoads.length}
                  className="px-4 py-2 font-medium text-gray-900 "
                >
                  {parishes[0]}
                </td>
                <td className="px-4 py-2 text-gray-700 ">{firstRoads[0]}</td>
              </tr>
              {firstRoads.slice(1).map((road) => (
                <tr key={`tb-${parishes[0]}-${road}`} valign="top" className="">
                  <td className="px-4 py-2 text-gray-700 ">{road}</td>
                </tr>
              ))}
              {parishes.slice(1).map((parish) => {
                const parishRoads = roads
                  .filter(
                    (d) => d.concelho === district && d.freguesia === parish
                  )
                  .map((d) => d.nome)
                  .sort();

                return (
                  <>
                    <tr valign="top" className="">
                      <td
                        rowSpan={parishRoads.length}
                        className="px-4 py-2 font-medium text-gray-900 "
                      >
                        {parish}
                      </td>
                      <td className="px-4 py-2 text-gray-700 ">
                        {parishRoads[0]}
                      </td>
                    </tr>
                    {parishRoads.slice(1).map((road) => (
                      <tr
                        key={`tb-${parish}-${road}`}
                        valign="top"
                        className=" "
                      >
                        <td className="px-4 py-2 text-gray-700 ">{road}</td>
                      </tr>
                    ))}
                  </>
                );
              })}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
