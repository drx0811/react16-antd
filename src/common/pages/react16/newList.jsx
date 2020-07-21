import React from "react"
import Child from "./com/Child";

export default class NewList extends React.Component{
  static getDerivedStateFromProps(props, state) {

    return null;
  }
  constructor(props) {
    super(props);
    this.state={
      list:[
        {title:"1111",name:"11111"},
        {title:"2222",name:"2222"},
      ]
    }
  }
  del=(k)=>{
    const {list}=this.state;
    let newList=list.filter(item=>{
      return item.name!==k
    })
    this.setState({list:newList})
  }
  render() {
    const {list}=this.state;
    return(
      <div>
        {
          list.map(item=>{
            return(
              <div>{item.name}</div>
            )
          })
        }
        <Child list={list} callback={(d)=>{this.del(d)}} />
      </div>
    )
  }
}