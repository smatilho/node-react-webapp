import React, { Component } from "react";
import { Container, Row, CardColumns, Badge } from "reactstrap";
import CardObject from "./CardObject";
import "../App.css";

import axios from "axios";

const testCardData = [];

const itemCategories = ["all", "1", "2", "3"];

class CardCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all",
      testCardData: [],
    };
  }

  componentDidMount() {
    this.setState({
      cards: testCardData,
    });

    // this.refreshAvailability();
    axios.get("http://localhost:4000/cardColletions").then((response) => {
      console.log(response.data)
      this.setState({
        testCardData: response.data,
      });
    });
  }

  // refreshAvailability = () => {
  //   axios
  //     .get("/api/availabilities/")
  //     .then((res) => this.setState({testCardData: res.data}))
  //     .catch((err) => console.log(err));
  // }

  render() {
    const { testCardData, category } = this.state;
    return (
      <div className="subComponent-lg" id="cardCollectionBody">
        <Container>
          <header className="headerTitle text-center">
            <h1>Parking Lot Availability</h1>
            <h4>Collection of Parking Lots and Updated Capacity</h4>
          </header>
          <section className="cardCollectionBody text-center">
            {itemCategories.map((badge, index) => (
              <Badge
                key={index}
                href=""
                color={badge === category ? "dark" : "bg-light text-dark"}
                onClick={() => this.setState({ category: badge })}
              >
                {badge}
              </Badge>
            ))}

            <Row className="text-left">
              <CardColumns>
                {category !== "all"
                  ? testCardData.map((card) => {
                      console.log(card);
                      return card.lotCategory.map((catItem) => {
                        return catItem === category ? (
                          <CardObject key={card.id} card={card} />
                        ) : null;
                      });
                    })
                  : testCardData.map((card) => (
                      <CardObject key={card.id} card={card} />
                    ))}
              </CardColumns>
            </Row>
          </section>
        </Container>
      </div>
    );
  }
}

export { itemCategories };
export default CardCollection;
