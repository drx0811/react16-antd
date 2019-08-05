import {Form, Input, Select, Button,} from 'antd';
import React from 'react';
export default class Funs extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isnum:undefined
    }
  }
  componentDidMount() {
    this.setState({
      isnum:'2'
    })
  }

  get1=(num)=>{
    return(
      <div style={{color:"red"}}>测试时1</div>
    )
  }
  get2=(num)=>{
    return(
      <div style={{color:"green"}}>测试时2</div>
    )
  }
  getInfo=()=>{
    this.props.router.push({
      pathname: 'button_disabled',
      state: {
        name:"name",
        age:12,
        sex:'男',
      },
    })
  }
  render() {
    const {isnum}=this.state;
    return(
      <div onClick={()=>{this.getInfo()}}>
        {
          {
            '1':this.get1(1),
            '2':this.get2(2),
          }[isnum]
        }
      </div>
    )
  }
}
