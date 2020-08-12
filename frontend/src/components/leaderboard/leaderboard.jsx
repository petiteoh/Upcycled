import React, { Component } from "react";
import LeaderboardItem from "./leaderboard_item";
import "../../css/leaderboard/leaderboard.css";

export default class Leaderboard extends Component {
  render() {
    return (
      <>
        <div className="leaderboard-rankings">
          <div>
            <h1>Leaderboard</h1>
            <img src="" alt=""/>
          </div>
          <ul className="leaderboard-items">
            {
              // Create a this.props.leaders and map through each one
              this.props.leaders.map((user, i) => {
                return (
                  <li key={i}>
                    <LeaderboardItem user={user} rank={i + 1} />
                  </li>
                );
              })
            }
          </ul>
        </div>
      </>
    );
  }
}