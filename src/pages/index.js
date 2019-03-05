import React from "react";
import { Link, graphql } from "gatsby";
import { Transition, animated } from "react-spring";
import styled from "styled-components";
import "confetti-js";

import BuyMeACoffee from "../components/BuyMeACoffee";
import Quote from "../components/Quote";
import Bio from "../components/bio";
import Button from "../components/Button";
import Name from "../components/Name";
import Icons from "../components/Icons";
import SEO from "../components/seo";

import { white } from "../utils/colors";

const Content = styled.div`
  background-color: ${white};
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  margin: 0;

  padding: 0 5%;

  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: flex-start;
`;

class Homepage extends React.Component {
  state = {
    items: [],
  };

  createObject = (key, component) => ({
    key,
    content: component,
  });

  async componentDidMount() {
    const name = this.createObject("name", <Name />);
    const bio = this.createObject("bio", <Bio margin={0.25} />);
    const quote = this.createObject("quote", <Quote />);
    // const work = this.createObject('work', <Button>My work</Button>);
    const blog = this.createObject(
      "blog",
      <Link to="/blog" style={{ textDecoration: "none", color: "none" }}>
        <Button>Blog</Button>
      </Link>
    );

    const offset = 250;
    const interval = 500;

    const items = [blog, quote, bio, name];

    items.map((item, index) => {
      setTimeout(
        () => this.setState({ items: [...this.state.items, item] }),
        offset + (index + 1) * interval
      );
    });

    // var confettiSettings = { target: 'my-canvas' };
    // var confetti = new window.ConfettiGenerator(confettiSettings);
    // confetti.render();

    // setTimeout(
    //   () => {
    //     this.setState({ items: [...this.state.items, this.createObject("coffee", <BuyMeACoffee />)] });
    //     console.log('executed');
    //   },
    //   5000
    // );
  }

  render() {
    const { items } = this.state;

    return (
      <Content>
          <SEO
            title="Landing"
            keywords={[
              `portfolio`,
              `frontend`,
              `designer`,
              `ux`,
              "ui",
              "builder",
              "raptis",
              "dimitris",
            ]}
          />
      {/* <canvas id="my-canvas">
      </canvas> */}
          <Transition
            items={items}
            keys={(item) => item.key}
            from={{ transform: "translate3d(-1000px, 0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(0,-1000px,0)" }}
          >
            {(item) => (props) => <div style={props}>{item.content}</div>}
          </Transition>
          <Icons />
          <BuyMeACoffee />
        </Content>
    );
  }
}

export default Homepage;

export const query = graphql`
  query {
    me: file(relativePath: { eq: "new-me.png" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
