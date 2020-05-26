import React, { Component } from "react";
import styled from "styled-components";

import { devices } from "../../config/devices.js";
import { theme } from "../../config/colorTheme";
import Prompt from "../commons/Prompt";
import TextArea from "../commons/TextArea";

const Container = styled.div`
  width: 60vw;
  margin: auto;

  @media ${devices.mobile} {
    flex-direction: column;
    height: auto;
    width: 70vw;
    margin: 3vw auto;
  }
`;

const SelectionButton = styled.button`
border-radius:.8vw;
border: solid 2px ${theme.accentColor};
background-color:${(props) =>
  props.selected == 1 ? theme.accentColor : theme.white};
transition: transform .3s;
cursor: pointer;
text-align: center;
overflow:scroll;
font-size: 1.2vw
font-family: "Roboto Slab";
font-weight: 700
color:${(props) => (props.selected == 1 ? "#FFFFFF" : theme.black)};
outline:none;
margin:1.5vw;
padding:1.5vw;

&:hover{
  transform: scale(1.04);
}

@media ${devices.mobile} {
  width: auto;
  height:auto;
  max-height:none;
  margin:2vw auto;
  font-size: 5vw;
  padding:2vw;
}
`;

const ButtonRow = styled.div`
  width: 60vw;
  diplay: flex;
  justify-content: flex-start;
`;

const ReactionWrapper = styled.div`
  min-height: 20vw;
`;

const HelpPromptContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5vw;
  margin-bottom: 1vw;
`;

const MAIN_PROMPT = "Would you like to see this drone in real life?";

const SUB_PROMPTS = [
  "Tell us why you do like to see this drone being implemented?",
  "Tell us how would you like to modify this drone?",
  "Tell us why you do not like to see this drone being implemented?",
];

const CHOICES = [
  "Yes, of course",
  "Yes, with some modifications",
  "Not at all",
];

const SECONDARY_PROMPT =
  "Do you see any intended or unintended consequences of this drone that might cause adverse effects in the Future? Please share below.";

class DroneReactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drone: props.drone,
      selection: -1,
      subText: "",
      secondaryText: "",
      reactonCreated: false,
    };
  }

  bottomDiv = null;

  updateDrone() {
    fetch("/drones/" + this.props.drone._id, {
      method: "PUT",
      body: JSON.stringify(this.state.drone),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Mode: "CORS",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //alert(JSON.stringify(data))
        console.log(data);
        
      });
  }

  saveReaction() {
    const reaction = {
      selection: this.state.selection,
      why: this.state.subText,
      cons: this.state.secondaryText,
    };
    var drone = this.state.drone;
    if (this.state.reactonCreated) {
      drone.reactions.pop();
    }
    drone.reactions.push(reaction);
    this.updateDrone();
    //alert(JSON.stringify(drone))
    this.setState({ drone: drone, reactonCreated: true });
    
  }

  render() {
    return (
      <Container onMouseLeave={()=> this.state.selection>=0 && this.saveReaction()}>
        <ReactionWrapper ref={(ref) => (this.bottomDiv = ref)}>
          <Prompt text={MAIN_PROMPT}></Prompt>
          <ButtonRow>
            {CHOICES.map((item, key) => (
              <SelectionButton
                selected={this.state.selection == key ? 1 : 0}
                onClick={() => {
                  this.setState({ selection: key });
                  window.scrollTo(0, this.bottomDiv.offsetTop);
                }}
              >
                {item}
              </SelectionButton>
            ))}
          </ButtonRow>
          {this.state.selection > -1 && (
            <div>
              <HelpPromptContainer>
                <Prompt text={SUB_PROMPTS[this.state.selection]}></Prompt>
              </HelpPromptContainer>
              <TextArea
                rows={5}
                onChangeCallback={(ev) =>
                  this.setState({ subText: ev.target.value })
                }
                value={this.state.subText}
              ></TextArea>
              <HelpPromptContainer>
                <Prompt text={SECONDARY_PROMPT}></Prompt>
              </HelpPromptContainer>
              <TextArea
                rows={5}
                onChangeCallback={(ev) =>
                  this.setState({ secondaryText: ev.target.value })
                }
                value={this.state.secondaryText}
              ></TextArea>
            </div>
          )}
        </ReactionWrapper>
        <div></div>
      </Container>
    );
  }
}

export default DroneReactions;
