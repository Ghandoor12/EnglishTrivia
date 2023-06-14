import React, { Component } from "react";
import * as gameService from "../Services/gameService";
import ButtonChoice from "../common/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./gameStyles.css";
class Game extends Component {
  state = {
    QuestionLeft: 10,
    questions: {},
    correct: 0,

    begin: false,
    questionsCounter: 0,
    summary: false,
    barCompleted: "barCompleted",
    rank: 0,
    showSummary: false,
  };

  handleSubmit = async (value) => {
    // handle submit will handle the user submit button it will update update the counter,
    // check if the user answered correctly or no and store it in the correct answers in the state
    var myState = this.state;
    let data = myState.questions;
    let questionsCounter = myState.questionsCounter;

    let question = data[questionsCounter];
    console.log("Value:" + value);
    console.log("answer:" + question.pos);
    if (value === question.pos) {
      toast("Correct Nice Work!"); // here I am using the toast library to show the user if their answer is correct or no
      let correct = myState.correct;
      correct++;
      this.setState({ correct });
    } else {
      toast("Ops! Wrong Answer 🙄");
    }

    let QuestionLeft = myState.QuestionLeft; // getting the question left counter

    QuestionLeft--; // updating it
    questionsCounter++;
    if (questionsCounter > 9) {
      // if the questions counter is bigger than 9 this means the user answered all the question then the handle submit function will upfate the summary in the state
      let summary = myState.summary; // to run dynamically the summary part and show the user the summary button
      summary = true;
      this.setState({ summary });
    }
    this.setState({ QuestionLeft });
    this.setState({ questionsCounter });
  };
  async componentDidMount() {
    // in the component did mount function the component will call the get Random questions to get the user question from the backend and store the questions in the state
    let response = await gameService.getRandomQuestions();
    this.setState({ questions: response.data });
  }
  handleBegin = async () => {
    // this function is used when the user click begin in the beginning to update the state of begin variable in the state to false and show the users the questions
    toast("Wow so easy!");

    console.log("Begin");
    if (this.state.begin) {
      let begin = false;
      this.setState({ begin });
    } else {
      let begin = true;
      this.setState({ begin });
    }
  };

  handleSummary = async () => {
    // handle summary here is called when the user click show summary then the function will send the number of correct answers to the backend
    // using the getRank function in the gameService file and when the rank returned in the response from the backend
    // it updates the rank number in the state to be able to show it to the user
    let correct = this.state.correct;
    console.log("Handle Summary");
    let response = await gameService.getRank(correct);
    console.log(response.data.num);
    let rank = response.data.num;
    this.setState({ rank });
    let showSummary = true;
    this.setState({ showSummary });
  };
  handleRestart = async () => {
    // handle restart will run when the user click restart after seeing the summary then the component will be reloaded so that it mount again and get new random 10 question
    window.location.reload();
  };
  render() {
    return (
      <React.Fragment>
        {" "}
        <ToastContainer />
        <div className="myContainer">
          <h1 className="title">English Practice</h1>
          <h2 className="subtitle">
            {" "}
            Try to Answer these {this.state.QuestionLeft} Questions{" "}
          </h2>
          {!this.state.summary && (
            <div>
              {!this.state.begin && (
                <button
                  className="btn btn-primary m-2"
                  onClick={async (hh) => this.handleBegin("Begin")}
                >
                  {" "}
                  Begin
                </button>
              )}

              {this.state.begin && (
                <div className="">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Basic example"
                  >
                    <div
                      className="progress-bar progress-bg  progress-bar-striped progress-bar-animated" // bootstrap progress bar in the width is updated dynamically according to the number of questions solved so the bar will progress
                      style={{ width: `${this.state.questionsCounter * 10}%` }}
                    >
                      {this.state.questionsCounter * 10} %
                    </div>
                  </div>
                  <h1>
                    {" "}
                    {this.state.questions[this.state.questionsCounter].word}
                  </h1>
                  <ButtonChoice // button component in the common file that is used to not write the button component a lot of times
                    label="Noun"
                    value="noun"
                    onSubmit={(value) => {
                      this.handleSubmit(value);
                    }}
                  />
                  <ButtonChoice
                    label="Adverb"
                    value="adverb"
                    onSubmit={(value) => {
                      this.handleSubmit(value);
                    }}
                  />{" "}
                  <ButtonChoice
                    label="Adjective"
                    value="adjective"
                    onSubmit={(value) => {
                      this.handleSubmit(value);
                    }}
                  />
                  <ButtonChoice
                    label="Verb"
                    value="verb"
                    onSubmit={(value) => {
                      this.handleSubmit(value);
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {this.state.summary && ( // if summary is true will show this part
            <div>
              <h1> Summary </h1>

              <ButtonChoice
                label="Show Summary"
                onSubmit={() => {
                  this.handleSummary();
                }}
              />
              {this.state.showSummary && (
                <div>
                  <p className="summary">
                    You answered {this.state.correct} right answers out of 10{" "}
                  </p>
                  <p className="summaryRank">Your Rank is {this.state.rank} </p>
                  <ButtonChoice
                    label="Restart"
                    onSubmit={() => {
                      this.handleRestart();
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Game;
