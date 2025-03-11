import LoadingContainer from "./Loading/LoadingContainer";
import ButtonControl from "./Button";
import AvatarContainer from "./Avatar";
import CardContainer from "./Card";
import DialogContainer from "./Dialog";
import ModalComp from "./Modal";
import ScrollbarContainer from "./Scrollbar";
import SwitchContainer from "./Switch";
import TimelineContainer from "./Timeline";
import IconAnimation from "./IconAnimation";
import ReusableUploader from "./ReusableUploader";
import SuccessAnimation from "./SuccessAnimation";
import FailedAnimation from "./FailedAnimation";

export const Button = ButtonControl;
export const Avatar = AvatarContainer;
export const Card = CardContainer;
export const Dialog = DialogContainer;
export const Modal = ModalComp;
export const Scrollbar = ScrollbarContainer;
export const Switch = SwitchContainer;
export const Timeline = TimelineContainer;
export const Uploader = ReusableUploader;

export {
  messageInfo,
  messageError,
  messageSuccess,
  messageWarning,
} from "./Message";
export { setFixLoading } from "./Loading";
export const Loading = LoadingContainer;
export * from "./Confirmbox";
export * from "./Table";
export * from "./Timeline/type";

export { IconAnimation, SuccessAnimation, FailedAnimation };
