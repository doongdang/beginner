import React, { Component } from "react";

class Product extends Component {
  render() {
    return (
      <div>
        <Logo poster={this.props.poster} />
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

class Logo extends Component {
  render() {
    return (
      <img
        src={
          this.props.poster
            ? `https://image.tmdb.org/t/p/w300${this.props.poster}`
            : require("../../assets/noPosterSmall.png")
        }
        alt="Empty"
      />
    );
  }
}

export default Product;
