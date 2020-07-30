import React from "react"
import {Button,Row,Col} from "antd"
import './CssAction.less'
export default class CssAction extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      goto:false
    }
  }

  goTO=()=>{
    this.setState({goto:!this.state.goto})
  }
  render() {
    const {goto}=this.state;
    return (
      <div>
        <Row>
          <Col span={12}>
            <div className='card'>
              <div className={`front ${goto?"front-btn-1":"front-btn-2"}`}>
                <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
              </div>
              <div className={`back ${!goto?"back-btn-1":"back-btn-2"}`}>
                <div>
                  <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
                  <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
                  <button className="button">Click Here</button>
                </div>
              </div>
            </div>

            <Button
              type="primary"
              onClick={()=>{
                this.goTO()
              }}
            >
              点击翻转试试
            </Button>
          </Col>
          <Col span={12}>
            <div id="div1">
              <div id="div2">HELLO
                <div id="div3">YELLOW</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}