import React from "react"
export default class ImgLasyLoad extends React.Component{
  constructor(props) {
    super(props);
    this.state={
    }
  }
  render() {
    const {url}=this.state;
    return (
      <div>
        <iframe style={{width:'100vw',height:"100vh",border:"none"}}  src={url}></iframe>
      </div>
    );
  }

}