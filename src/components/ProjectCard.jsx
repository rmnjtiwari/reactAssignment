import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardImg
} from "reactstrap";
const ProjectCard = (props) => {
    const {imgAltText,imgSrcUrl,cardTitle,description} = props
    return (
        <Card>
            <CardImg
                alt={imgAltText}
                src={imgSrcUrl}
                top
                style={{
                    width: "20%",
                    height: "20%",
                    display: "block",
                    margin: "0 auto"
                }}
            />
            <CardBody>
                <CardTitle tag="h5">{cardTitle}</CardTitle>
                <CardText>{description}</CardText>
            </CardBody>
        </Card>
    );
}

export default ProjectCard;