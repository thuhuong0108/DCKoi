import { trimText } from "@/utils/helpers";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActionDropdown from "./ActionDropdown";
import NoContentComponent from "./NoContentComponent";
import TableSkeleton from "./TableSkeleton";
import { TableProps } from "./types";
function TableComponent<T>({
  columns,
  data,
  props,
  actions,
  actionTexts,
  loading,
  actionFunctions,
  searchValue,
  disableDefaultStyles = false,
  customClassNames = {},
  renderRow,
  rowOnClick,
  enableDarkMode = true,
  enablePagination = false,
  page = 1,
  setPage,
  itemsPerPage = 0,
  totalPages,
  sortableProps = [],
  formatValue,
  noContentProps,
}: TableProps<T>) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedCells, setExpandedCells] = useState<{
    [key: string]: boolean;
  }>({});
  const [sortProp, setSortProp] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  useEffect(() => {
    if (enableDarkMode) {
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(matchMedia.matches);
      const handleChange = () => setIsDarkMode(matchMedia.matches);
      matchMedia.addEventListener("change", handleChange);
      return () => {
        matchMedia.removeEventListener("change", handleChange);
      };
    }
  }, [enableDarkMode]);
  if (loading) {
    return <TableSkeleton enableDarkMode={enableDarkMode} />;
  }
  if (!data || data.length === 0) {
    return <NoContentComponent {...noContentProps} />;
  }
  let filteredData = data;
  if (searchValue) {
    filteredData = data.filter((item) => {
      return props.some((prop) => {
        const value = item[prop as keyof T];
        return String(value).toLowerCase().includes(searchValue.toLowerCase());
      });
    });
  }
  if (filteredData.length === 0) {
    return <NoContentComponent {...noContentProps} />;
  }
  const handleSort = (col: string) => {
    if (!sortableProps.includes(col as keyof T)) return;
    if (sortProp === col) {
      if (sortOrder === "none") {
        setSortOrder("asc");
      } else if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortOrder("none");
      }
    } else {
      setSortProp(col);
      setSortOrder("asc");
    }
  };
  let sortedData = [...filteredData];
  if (sortProp && sortOrder !== "none") {
    sortedData.sort((a, b) => {
      const aVal = a[sortProp as keyof T];
      const bVal = b[sortProp as keyof T];
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return sortOrder === "asc" ? -1 : 1;
      if (aStr > bStr) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }
  let paginatedData = sortedData;
  const calculatedTotalPages =
    totalPages ?? Math.ceil(sortedData.length / itemsPerPage);
  if (enablePagination) {
    if (totalPages !== undefined) {
      paginatedData = sortedData;
    } else {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      paginatedData = sortedData.slice(startIndex, endIndex);
    }
    if (page > calculatedTotalPages && setPage) {
      setPage(calculatedTotalPages);
    }
  }
  const baseTableClassName = !disableDefaultStyles
    ? `w-full divide-y ${
        enableDarkMode && isDarkMode
          ? "bg-blue-100 text-gray-200 divide-gray-200"
          : "bg-white text-gray-900 divide-gray-200"
      }`
    : "";
  const baseTheadClassName =
    !disableDefaultStyles && enableDarkMode
      ? isDarkMode
        ? "bg-white text-black"
        : "bg-gray-50 text-gray-500"
      : "";
  const baseTbodyClassName = !disableDefaultStyles
    ? `divide-y ${
        enableDarkMode && isDarkMode ? "divide-gray-100" : "divide-gray-200"
      }`
    : "";
  const baseTrClassName = (index: number) =>
    !disableDefaultStyles
      ? index % 2 === 0
        ? isDarkMode
          ? "bg-blue-100"
          : "bg-blue-50"
        : isDarkMode
        ? "bg-blue-50"
        : "bg-blue-50"
      : "";
  const baseTdClassName = !disableDefaultStyles
    ? isDarkMode
      ? "text-black"
      : "text-gray-700"
    : "";
  const tableClassName = disableDefaultStyles
    ? customClassNames.table || ""
    : `${baseTableClassName} ${customClassNames.table || ""}`;
  const theadClassName = disableDefaultStyles
    ? customClassNames.thead || ""
    : `${baseTheadClassName} ${customClassNames.thead || ""}`;
  const tbodyClassName = disableDefaultStyles
    ? customClassNames.tbody || ""
    : `${baseTbodyClassName} ${customClassNames.tbody || ""}`;
  const thClassName = disableDefaultStyles
    ? customClassNames.th || ""
    : `px-2 py-2 sm:px-4 sm:py-4 text-left text-xs font-large uppercase tracking-wider ${
        customClassNames.th || ""
      }`;
  const trClassName = (index: number) =>
    disableDefaultStyles
      ? customClassNames.tr || ""
      : `${baseTrClassName(index)} ${customClassNames.tr || ""}`;
  const tdClassName = disableDefaultStyles
    ? customClassNames.td || ""
    : `px-2 py-2 sm:px-4 sm:py-2 text-sm ${baseTdClassName} ${
        customClassNames.td || ""
      }`;
  const displayedColumns = columns.map((col, i) => {
    let indicator = "";
    if (sortableProps.includes(props[i])) {
      if (props[i] === sortProp) {
        if (sortOrder === "asc") {
          indicator = "▲";
        } else if (sortOrder === "desc") {
          indicator = "▼";
        }
      }
    }
    return { col, indicator, prop: props[i] };
  });
  return (
    <>
      <div style={{ overflowX: "auto" }} className="pb-6 my-5">
        <table className={tableClassName} style={{ margin: 0, padding: 0 }}>
          <thead className={theadClassName}>
            <tr>
              {displayedColumns.map(({ col, indicator, prop }) => (
                <th
                  key={col}
                  scope="col"
                  className={thClassName}
                  onClick={() => handleSort(String(prop))}
                  style={{
                    cursor: sortableProps.includes(prop)
                      ? "pointer"
                      : "default",
                  }}
                >
                  {col} {indicator}
                </th>
              ))}
              {actions && actionTexts && (
                <th scope="col" className={thClassName}>
                  <span className="sr-only">{actionTexts.join(", ")}</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className={tbodyClassName}>
            {paginatedData.map((item, dataIndex) => {
              if (renderRow) {
                return (
                  <tr
                    key={dataIndex}
                    onClick={() => rowOnClick && rowOnClick(item)}
                    className={`${trClassName(dataIndex)} ${
                      rowOnClick ? "cursor-pointer" : ""
                    }`}
                  >
                    {renderRow(item, dataIndex)}
                  </tr>
                );
              }
              return (
                <tr
                  key={dataIndex}
                  onClick={() => rowOnClick && rowOnClick(item)}
                  className={`${trClassName(dataIndex)} ${
                    rowOnClick ? "cursor-pointer" : ""
                  }`}
                >
                  {props.map((prop) => {
                    let value = item[prop];
                    if (value === null || value === undefined || value === "") {
                      // value = "-" as T[keyof T];
                    }
                    const cellKey = `${dataIndex}-${String(prop)}`;
                    const isExpanded = expandedCells[cellKey];
                    let displayValue: React.ReactNode;
                    let valToFormat = String(value);
                    if (Array.isArray(value)) {
                      let displayArray: any[] = value as any[];
                      if (!isExpanded && displayArray.length > 5) {
                        displayArray = displayArray.slice(0, 5);
                      }
                      displayValue = (
                        <div
                          className="flex flex-wrap gap-1"
                          style={{
                            maxWidth: "200px",
                            overflowX: "auto",
                          }}
                        >
                          {displayArray.map((chip, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-indigo-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                            >
                              {trimText(String(chip), 20)}
                            </span>
                          ))}
                          {!isExpanded && (value as any[]).length > 5 && (
                            <span
                              className="inline-block bg-blue-100 text-gray-600 px-2 py-1 rounded-full text-xs cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedCells((prev) => ({
                                  ...prev,
                                  [cellKey]: true,
                                }));
                              }}
                            >
                              +{(value as any[]).length - 5} more
                            </span>
                          )}
                        </div>
                      );
                    } else if (
                      typeof value === "string" &&
                      value.startsWith("http")
                    ) {
                      displayValue = (
                        <Link to={value}>
                          <span
                            className="text-blue-100 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {isExpanded ? value : trimText(value, 30)}
                          </span>
                        </Link>
                      );
                    } else {
                      if (!Array.isArray(value)) {
                        if (!isExpanded) {
                          valToFormat = trimText(valToFormat, 30);
                        }
                      }
                      if (formatValue) {
                        displayValue = formatValue(
                          valToFormat,
                          String(prop),
                          item
                        );
                      } else {
                        displayValue = valToFormat;
                      }
                    }
                    if (!displayValue && !Array.isArray(value)) {
                      displayValue = valToFormat;
                    }
                    return (
                      <td
                        key={String(prop)}
                        className={tdClassName}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCells((prev) => ({
                            ...prev,
                            [cellKey]: !prev[cellKey],
                          }));
                        }}
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                  {actions && actionTexts && actionFunctions && (
                    <ActionDropdown<T>
                      item={item}
                      index={dataIndex}
                      actionTexts={actionTexts}
                      actionFunctions={actionFunctions}
                      disableDefaultStyles={disableDefaultStyles}
                      customClassNames={customClassNames}
                      enableDarkMode={enableDarkMode}
                    />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {enablePagination && page !== undefined && setPage && (
        <div>
          <Pagination
            count={calculatedTotalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            size="small"
            color="primary"
            showFirstButton
            showLastButton
          />
        </div>
      )}
    </>
  );
}
export default TableComponent;
