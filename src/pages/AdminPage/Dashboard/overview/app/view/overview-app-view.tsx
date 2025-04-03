import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { useRef, useState } from "react";

import { useTheme } from "@mui/material/styles";

import AppAreaInstalled from "../app-area-installed";
import AppWelcome from "../app-welcome";
import AppWidgetSummary from "../app-widget-summary";

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const myRef = useRef(null);

  const [totalUser, setTotalUser] = useState<any>({
    percent_increase: 0,
    total: 0,
  });

  const [totalNewUser, setTotalNewUser] = useState<any>({
    total: 0,
    percent_increase: 0,
  });

  const [totalIncome, setTotalIncome] = useState<any>({
    total: 0,
    percent: 0,
  });

  const theme = useTheme();

  return (
    <Container maxWidth={true ? false : "xl"}>
      <Grid container spacing={4}>
        <Grid xs={12} md={12}>
          <AppWelcome
            title={`Mừng bạn trở lại  👋 \n `}
            description="Hãy sẵn sàng theo dõi tiến độ, tối ưu hóa quy trình và biến mọi kế hoạch thành hiện thực."
            // img={<SeoIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Tổng người dùng"
            percent={totalUser.percent_increase}
            total={totalUser.total}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Tổng người dùng mới trong tháng"
            percent={totalNewUser.percent_increase}
            total={totalNewUser.total}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Tổng đơn"
            percent={totalIncome?.percent}
            total={totalIncome?.total}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <AppAreaInstalled
            title="Tổng đơn xây dựng"
            subheader="(+43%) than last year"
            chart={{
              categories: Array.from(
                { length: 12 },
                (_, i) => `Tháng ${i + 1}`
              ),
              series: [
                {
                  year: "2023",
                  data: [
                    {
                      name: "Đơn xây dựng",
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 22, 22, 22],
                    },
                  ],
                },
                {
                  year: "2024",
                  data: [
                    {
                      name: "Đơn xây dựng",
                      data: [15, 45, 38, 55, 52, 68, 75, 95, 155],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <AppAreaInstalled
            title="Tổng đơn bảo dưỡng"
            subheader="(+43%) than last year"
            chart={{
              categories: Array.from(
                { length: 12 },
                (_, i) => `Tháng ${i + 1}`
              ),
              series: [
                {
                  year: "2023",
                  data: [
                    {
                      name: "Đơn bảo dưỡng",
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 22, 22, 22],
                    },
                  ],
                },
                {
                  year: "2024",
                  data: [
                    {
                      name: "Đơn bảo dưỡng",
                      data: [15, 45, 38, 55, 52, 68, 75, 95, 155],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <AppAreaInstalled
            title="Tổng thu nhập"
            subheader="(+43%) than last year"
            chart={{
              categories: Array.from(
                { length: 12 },
                (_, i) => `Tháng ${i + 1}`
              ),
              series: [
                {
                  year: "2023",
                  data: [
                    {
                      name: "Tổng thu nhập",
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 22, 22, 22],
                    },
                  ],
                },
                {
                  year: "2024",
                  data: [
                    {
                      name: "Tổng thu nhập",
                      data: [15, 45, 38, 55, 52, 68, 75, 95, 155],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
