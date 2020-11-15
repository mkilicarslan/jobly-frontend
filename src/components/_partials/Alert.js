import { Alert } from "reactstrap";

function Alert_({ color, message }) {
	return <Alert color={color}>{message}</Alert>;
}

Alert_.defaultProps = {
	color: "info",
	message: "",
};

export default Alert_;
