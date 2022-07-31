import React, { Component } from "react";
import "./spinner.scss"

export default class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <svg width="64px" height="64px" viewBox="0 0 128 128">
          <g>
            <path d="M64 128A64 64 0 0 1 18.34 19.16L21.16 22a60 60 0 1 0 52.8-17.17l.62-3.95A64 64 0 0 1 64 128z" fill="#000" />
            <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite">
            </animateTransform>
          </g>
        </svg>
      </div>

    );
  }
}