import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";
import { DesignRequest, DesignType } from "@/models";
import { parseStatusDesign } from "@/utils/helpers"; // Import hàm chuyển đổi trạng thái
import { DesignState } from "@/models/enums/DesignState";
import { useAppDispatch } from "@/redux/store/hook";
import { designActions } from "@/redux/slices/design/designSlices";
import { imageDesignActions } from "@/redux/slices/imageDesign/imageDesignSlices";
import { Uploader } from "@/components";
import { useParams } from "react-router-dom";

const statusColors: Record<DesignState, string> = {
  [DesignState.OPENING]: "text-yellow-500 border-yellow-500",
  [DesignState.CONFIRMED]: "text-green-500 border-green-500",
  [DesignState.EDITING]: "text-blue-500 border-blue-500",
  [DesignState.REJECTED]: "text-red-500 border-red-500",
  [DesignState.PREVIEWING]: "text-purple-500 border-purple-500",
};

const DesignElement = ({ id, reason, status, type, version }: DesignType) => {
  const idProject = useParams<{ id: string }>();
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const dispatch = useAppDispatch();
  const parsedStatus = parseStatusDesign(status);
  const statusClass = status
    ? statusColors[status] || "text-gray-500 border-gray-500"
    : "";

  return (
    <div>
      <Typography.Title level={5}>26/5/2202</Typography.Title>
      <div className="border-2 border-dashed border-gray-500 p-4">
        <Typography.Title level={5}>
          Thiết kế {type} phiên bản {version}
        </Typography.Title>

        {status && (
          <div
            className={`mt-2 border px-3 py-1 rounded-lg inline-block ${statusClass}`}
          >
            <Typography.Text>
              <strong>Trạng thái:</strong> {parsedStatus}
            </Typography.Text>
          </div>
        )}

        <div>
          <div>
            {" "}
            <Button
              type="primary"
              className="m-2"
              onClick={() => {
                dispatch(imageDesignActions.fetchImageDesign(id));
                handleScroll();
              }}
            >
              Xem
            </Button>
          </div>
          {reason && (
            <Typography.Text>
              <strong>Lý do:</strong> {reason}
            </Typography.Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignElement;
