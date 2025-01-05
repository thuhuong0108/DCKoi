import { Input } from "antd";
type InputPros = {
  label: string;
  placeholder: string;
  value: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const FormInput = (pros: InputPros) => {
  return (
    <div className="py-2">
      <label className="text-lg"> {pros.label} </label>
      <Input
        label={pros.label}
        value={pros.value}
        placeholder={pros.placeholder}
        size="large"
      />
    </div>
  );
};

export default FormInput;
