import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter
} from "reactstrap";
import "../App.css";

const CardObject = ({ card }) => {
  const { header, subtitle, title, footer } = card;
  
  const imgHref =header.replace(/\s/g, '')
  console.log(imgHref)
  // require("../img/" + imgHref + ".jpg")
  return (
        <Card body color="light" flex>
            <CardHeader tag="h3">{header}</CardHeader>
            <CardImg src={process.env.PUBLIC_URL + '/' + imgHref + '.jpg'} alt="alt text" width="100%"/>
            <CardBody>
              
              <CardTitle tag="h4">{title} Title</CardTitle>
              <CardSubtitle ><h6>{subtitle}</h6></CardSubtitle>
              {/* <Button color="dark" size="sm" classheader="float-right" href="">
                <h5>Predictions</h5>
              </Button> */}
            </CardBody>
            <CardFooter>
              <small classheader="text-muted" inverse>
                {footer}
              </small> </CardFooter>
        </Card> 

  );
};
export default CardObject;