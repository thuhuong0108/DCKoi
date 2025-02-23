import {
  Banner,
  DesignTemplate,
  PackageField,
  Title
} from "@/components";
import useForm from "@/hooks/useForm";
import { ProjectType } from "@/models";
import { projectActions } from "@/redux/slices/project/projectSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validateProject } from "@/validations/validate";
import { Box, Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { Col, Row } from "antd";
import { useState } from "react";

const Contact = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const { loading, regField, regHandleSubmit } = useForm({
    values: {
      customerName: "",
      address: "",
      phone: "",
      email: "",
      area: 0,
      depth: 0,
      packageId: "",
      note: "",
      templatedesignid: ""
    },
    validationSchema: validateProject,
    onSubmit: async (values: ProjectType) => {
      console.log(values);
      
      dispatch(projectActions.createProject(values));
    },
  });

  const dataPackage = [
    {
      key: "1",
      item: "Setting-out of Drainage",
      description: "Set out as shown in the drawings.",
      unit: "sum",
      quantity: 1,
    },
    {
      key: "2",
      item: "Excavation",
      description:
        "Excavate foundation trench to a minimum depth of 0.3m (plus 0.25m sideways to allow working space)",
      unit: "m3",
      quantity: 15,
    },
    {
      key: "3",
      item: "Blinding",
      description:
        "Cast 75mm blinding under blockwork with concrete of ratio 1:3:6. slope towards south",
      unit: "m3",
      quantity: 2.75,
    },
  ];

  const [design, setDesign] = useState("Use template design");

  const handleDesignChange = (event) => {
    setDesign(event.target.value);
  };

  return (
    <div>
      <Banner />
      <Row className="p-5">
        <Col span={16} offset={4}>
          <Box component="form"
            onSubmit={regHandleSubmit}>
            <Title name="BASE INFOMATION" />
            <TextField
              fullWidth
              label="Fullname"
              margin="normal"
              variant="outlined"
              {...regField("customerName")}
              error={Boolean(regField("customerName").error)}
              helperText={regField("customerName").error}
            />
            <TextField
              fullWidth
              label="Phone number"
              margin="normal"
              variant="outlined"
              {...regField("phone")}
              error={Boolean(regField("phone").error)}
              helperText={regField("phone").error}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              {...regField("email")}
              error={Boolean(regField("email").error)}
              helperText={regField("email").error}
            />
            <TextField
              fullWidth
              label="Address"
              margin="normal"
              variant="outlined"
              {...regField("address")}
              error={Boolean(regField("address").error)}
              helperText={regField("address").error}
            />

            <div className="flex justify-between space-x-4">
              <TextField
                fullWidth
                label="Estimated area of koi pond to be built"
                margin="normal"
                variant="outlined"
                {...regField("area")}
                error={Boolean(regField("area").error)}
                helperText={regField("area").error}
              />
              <TextField
                fullWidth
                label="Koi pond construction depth"
                margin="normal"
                variant="outlined"
                {...regField("depth")}
                error={Boolean(regField("depth").error)}
                helperText={regField("depth").error}
              />
            </div>

            <Title name="PACKAGE" />
            <div className="my-3 space-y-3">
              <Select
                fullWidth
                displayEmpty
                margin="dense"
                variant="outlined"
                {...regField("packageId")}
                error={Boolean(regField("packageId").error)}
              >
                <MenuItem value="basic">Basic Package</MenuItem>
                <MenuItem value="standard">Standard Package</MenuItem>
                <MenuItem value="premium">Premium Package</MenuItem>
              </Select>

              <PackageField label="Pond layout" data={dataPackage} />
            </div>

            <Title name="DESIGN TEMPLATE" />
            <div className="my-4">
              <FormControl component="fieldset">
                <RadioGroup row value={design} onChange={handleDesignChange}>
                  <FormControlLabel value="Use template design" control={<Radio />} label="Use template design" />
                  <FormControlLabel value="Design a new layout" control={<Radio />} label="Design a new layout" />
                </RadioGroup>
              </FormControl>
              {design === "Design a new layout" ? null : (
                <Row className="flex flex-row justify-between my-5">
                  <DesignTemplate />
                  <DesignTemplate />
                  <DesignTemplate />
                </Row>
              )}
            </div>

            <Title name="NOTE" />
            <TextField
              fullWidth
              label="Special request"
              margin="normal"
              variant="outlined"
              {...regField("note")}
              error={Boolean(regField("note").error)}
              helperText={regField("note").error}
            />

            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {isLoading ? "Loading..." : "Send request"}
              </Button>
            </div>
          </Box>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
