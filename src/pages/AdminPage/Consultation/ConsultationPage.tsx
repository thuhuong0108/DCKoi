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

const ConsultationPage = () => {
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
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "pending",
    },
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "cancel",
    },
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "done",
    },
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
      status: "pending",
    },
    {
      fullname: "Hoang Xuan Viet",
      date: "Wed, December 11, 2024",
      time: "11:00 AM",
      phone: "0123 456 789",
      address: "10/5, 106 Street, Tang Nhon Phu A Ward, Thu Duc City",
      basepackage: "Basic package",
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
        {dataConsultation.map((item, index) => (
          <Col>
            <Consultationcard {...item} key={index} />
          </Col>
        ))}
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
