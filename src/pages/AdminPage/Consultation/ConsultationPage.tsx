import { Title, Consultationcard } from "@/components";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Col, Row } from "antd";
import {
  FormControl,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { useEffect, useState } from "react";
import { consultationActions, selectConsultation } from "@/redux/slices/consultation/consultationSlice";
import EmptyContent from "@/components/ui/EmptyContent";

const ConsultationPage = () => {
  const dispatch = useAppDispatch();
  // const dataConsultation = useAppSelector(selectConsultation);

  useEffect(() => {
    dispatch(
      consultationActions.fetchConsultation({
        pageNumber: 1,
        pageSize: 8
      })
    )
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const sortby = [
    {
      value: "date",
      label: "Date",
    },
    {
      value: "name",
      label: "Name",
    },
  ];

  const dataConsultation = [
      {
        id: "1",
        customerName: "Hoang Xuan Viet",
        date: "Wed, December 11, 2024",
        time: "11:00 AM",
        phone: "0123 456 789",
        address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
        packageName: "Basic package",
        standOut: true,
        status: "pending",
      },
      {
        id: "3",
        customerName: "Hoang Xuan Viet",
        date: "Wed, December 11, 2024",
        time: "11:00 AM",
        phone: "0123 456 789",
        address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
        packageName: "Basic package",
        standOut: true,
        status: "cancel",
      },
      {
        id: "2",
        customerName: "Hoang Xuan Viet",
        date: "Wed, December 11, 2024",
        time: "11:00 AM",
        phone: "0123 456 789",
        address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
        packageName: "Basic package",
        standOut: false,
        status: "done",
      },
      {
        id: "7",
        customerName: "Hoang Xuan Viet",
        date: "Wed, December 11, 2024",
        time: "11:00 AM",
        phone: "0123 456 789",
        address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
        packageName: "Basic package",
        standOut: false,
        status: "pending",
      },
      {
        id: "6",
        customerName: "Hoang Xuan Viet",
        date: "Wed, December 11, 2024",
        time: "11:00 AM",
        phone: "0123 456 789",
        address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
        packageName: "Basic package",
        standOut: false,
        status: "pending",
      },
    ];

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 min-h-full w-screen">
      <Title name="Consultations" />
      <Row className="flex flex-row justify-end my-3 gap-3">
        <Col>
          <FormControl className="w-[500px] h-[40px]">
            <OutlinedInput
              id="outlined-adornment-weight"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
                placeholder: "Search for something...",
              }}
              // onChange={handleSearch}
              className="rounded-[20px]"
            />
          </FormControl>
        </Col>
        <Col>
          <TextField
            className="w-[200px]"
            id="outlined-select-currency"
            select
            label="Sort By"
            defaultValue=""
          >
            {sortby.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Col>
      </Row>

      <Row>
        {dataConsultation?.length > 0 ? (
          dataConsultation.map((item, index) => (
            <Col>
              <Consultationcard {...item} key={index} />
            </Col>
          ))
        ) : (
          <EmptyContent title="Empty consultation" imgUrl="https://static.thenounproject.com/png/203873-200.png"/>
        )}
        {/* {dataConsultation?.data?.length > 0 ? (
          dataConsultation.data.map((item, index) => (
            <Col>
              <Consultationcard {...item} key={index} />
            </Col>
          ))
        ) : (
          <EmptyContent title="Empty consultation" imgUrl="https://static.thenounproject.com/png/203873-200.png"/>
        )} */}
      </Row>

      <Row className="flex flex-row justify-between items-stretch mt-1">
        <label>Showing data 1 to 8 of 256K entries</label>
        <Stack spacing={2}>
          <Pagination count={10} shape="rounded" />
        </Stack>
      </Row>
    </div>
  );
};

export default ConsultationPage;
