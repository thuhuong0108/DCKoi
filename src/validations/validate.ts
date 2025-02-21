import * as yup from "yup";
export const validateDemo = yup.object().shape({
    name: yup.string().required().max(50),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});
export interface ParseResult {
	data: object | null;
	error: object | null;
	errorArr: Record<string, string>
}


export const validateLogin =  yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});