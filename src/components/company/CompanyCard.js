import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function CompanyCard({ name, description }) {
	return (
		<Card>
			<CardBody>
				<CardTitle tag="h5">{name}</CardTitle>
				<CardText>{description}</CardText>
			</CardBody>
		</Card>
	);
}

export default CompanyCard;
