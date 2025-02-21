import React, { useState, useEffect } from "react";
import { PaginationComponentProps } from "./types";
import { Pagination } from "antd";

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPages,
  itemsPerPage,
  disableDefaultStyles = false,
  customClassNames = {},
  enableDarkMode = true,
}) => {
  const [isDarkMode, setIsDarkModeState] = useState(false);
  useEffect(() => {
    if (enableDarkMode) {
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkModeState(matchMedia.matches);
      const handleChange = () => setIsDarkModeState(matchMedia.matches);
      matchMedia.addEventListener("change", handleChange);
      return () => {
        matchMedia.removeEventListener("change", handleChange);
      };
    }
  }, [enableDarkMode]);
  const baseButtonClassName = disableDefaultStyles
    ? customClassNames.button || ""
    : `px-3 py-1 mx-1 rounded-md ${
        isDarkMode
          ? "bg-indigo-800 text-white hover:bg-indigo-700"
          : "bg-indigo-200 text-indigo-800 hover:bg-indigo-300"
      }`;
  const disabledButtonClassName = disableDefaultStyles
    ? customClassNames.buttonDisabled || ""
    : `opacity-50 cursor-not-allowed ${baseButtonClassName}`;
  const pageInfoClassName = disableDefaultStyles
    ? customClassNames.pageInfo || ""
    : `px-3 py-1 mx-1 text-sm ${
        isDarkMode ? "text-indigo-300" : "text-indigo-700"
      }`;
  return (
    <div
      className={
        disableDefaultStyles
          ? customClassNames.container || ""
          : "flex justify-center items-center mt-4"
      }
    >
      <Pagination
        total={totalPages}
        showSizeChanger
        showQuickJumper
        showTotal={(totalItem) =>
          `Tổng ${itemsPerPage} / ${totalItem} hạng mục`
        }
      />
    </div>
  );
};
export default PaginationComponent;
