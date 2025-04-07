import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { useEffect, useRef, useState } from "react";

import { useTheme } from "@mui/material/styles";

import AppAreaInstalled from "../app-area-installed";
import AppWelcome from "../app-welcome";
import AppWidgetSummary from "../app-widget-summary";
import {
  getDataChart,
  getTotoRevenue,
  getUserStatistics,
} from "@/api/statistics";

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const [statis, setStatis] = useState<any>({
    totalUser: 0,
    totalInactiveUser: 0,
    toltalCustomer: 0,
    totalCustomerTransaction: 0,
    totalStaff: 0,
    totalIdleStaff: 0,
  });

  const theme = useTheme();

  const [data, setData] = useState<any>([]);
  const [revenue, setRevenue] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await getDataChart();
      console.log(res.data);

      if (res.isSuccess) {
        setData(res.data);
      }
    };
    const fetchData2 = async () => {
      const res = await getUserStatistics();
      if (res.isSuccess) {
        setStatis(res.data);
      }
    };
    const fetchRevenue = async () => {
      const res = await getTotoRevenue();
      if (res.isSuccess) {
        setRevenue(res.data);
      }
    };
    fetchRevenue();
    fetchData2();
    fetchData();
    setLoading(false);
  }, []);

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
            percent={10}
            total={statis.totalUser}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Tổng người dùng mới trong tháng"
            percent={10}
            total={statis.totalInactiveUser}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Tổng đơn"
            percent={10}
            total={statis.toltalCustomer}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <AppAreaInstalled
            title="Tổng đơn"
            subheader="(+43%) than last year"
            chart={{
              categories: Array.from(
                { length: 12 },
                (_, i) => `Tháng ${i + 1}`
              ),
              series: data,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppAreaInstalled
            title="Tổng thu nhập"
            subheader="(+43%) than last year"
            chart={{
              categories: Array.from(
                { length: 12 },
                (_, i) => `Tháng ${i + 1}`
              ),
              series: revenue,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
