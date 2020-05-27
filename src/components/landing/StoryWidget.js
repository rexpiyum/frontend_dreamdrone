import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../config/colorTheme";
import Button from "../commons/Button";
import { animationKeyFrames } from "../../config/keyframes";

const Container = styled.div`
  width: 45vw;
// background-color:${theme.primaryColor20};
overflow-x: scroll;
position:relative;
`;

const StoryContainer = styled.div`
  margin-top: 0;
`;

const StoryWrapper = styled.div`
  display: inline-block;
  float: left;
  margin-left: 0;
  margin-top: 0;
  overflow: scroll;
  border-radius: 5vw;
  background-color: #f4f4f4;
  padding: 2vw;
`;

const Text = styled.div`
  margin: auto;
  font-family: "Patrick Hand", cursive;
  font-style: normal;
  font-weight: 200;
  font-size: 1.5vw;
  line-height: 2.3vw;
  letter-spacing: 0.03em;
  color: #020202;
  text-align: left;
  padding: 2vw 4vw;
`;

const StoryHeader = styled.div`
  margin: auto;
  font-family: "Patrick Hand", cursive;
  font-style: normal;
  font-weight: 200;
  font-size: 2vw;
  letter-spacing: 0.03em;
  color: #020202;
  text-align: center;
  margin-top: 2vw;
`;

const Image = styled.img`
  width: 90%;
`;

const Fadeout = styled.div`
  position: absolute;
  bottom: 0;
  width: 135vw;
  height: 5vw;
  background: -webkit-linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  z-index: 200;
`;

const RefreshButton = styled.button`
  background-color: ${theme.accentColor};
  padding: 1vw;
  font-family: "Roboto", sans-serif;
  font-size: 1.5vw;
  font-weight: 900;
  color: ${theme.white};
  border: 1px solid ${theme.accentColor};
  border-radius: 0.3vw;
  outline: none;
  transition: transform 0.5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const storyText = [
  "A kid who lost a leg in mine field receives a kit with a bunch of easy to assemble parts and a some drawings on how to build a flying structure from plastic bottles. Soon he builds a drone from the kit. His drone flies above an area where mines are suspected. It maps automatically the field and sends its findings through the internet, and update a map accessible from any smartphone, from a danger warning app, or from the tiny computer that he received with the kit.",
  "It is early morning in the New York city. NYPD just received a call about a bank robbery and the suspects driving a blue Mustang along interstate 86. NYPD deploys 20 hot pursuit drones over the highway. One of the them detects the Mustang and starts to follow. Mustang takes an exit and drives along a narrow bendy road. Mustang takes sharp turns but the drone is keeping up with it. NYPD officers watches the live footage from the long range feed and command the drone to emit its laser beam. Drone emits the beam at the right time, car engine stops. Before the suspects even know drone launces a net on to the car. No one is harmed, no one can move. NYPD catches the suspects.",
  "I am a free man with free thoughts. I wander leisurely anywhere where my mind tells. My chaperone reads my mind, shows me the path with its laser beams, helps me to reach the destination my mind wants.",
];

const storyHeaders = [
  "Mines Flagger",
  "Hot Pursuit",
  "Chaperone"
];

const images = [
  <Image src={require("./assets/drone_stories_mines.png")}></Image>,
  <Image src={require("./assets/drone_stories_nypd.png")}></Image>,
  <Image src={require("./assets/drone_stories_chaperone.png")}></Image>,
];
export default function StoryWidget(props) {
  const [index, setIndex] = useState(0);

  return (
    <Container>
      <StoryContainer>
        <StoryWrapper>
          {images[index]}
          <StoryHeader>
            <strong>{storyHeaders[index]}</strong>
          </StoryHeader>
          <Text>{storyText[index]}</Text>
          <RefreshButton onClick={() => setIndex((index + 1) % 3)}>
            View another story
          </RefreshButton>
        </StoryWrapper>
      </StoryContainer>
      {/* <Fadeout></Fadeout>   */}
    </Container>
  );
}
