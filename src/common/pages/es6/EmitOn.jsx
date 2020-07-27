import React from "react"
let fs= require('fs');
console.log(fs);
export default class EmitOn extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const name={};
    let event={
      arr:[],
      on(fn){
        this.arr.push(fn)
      },
      emit(){
        this.arr.forEach(fn=>fn())
      }
    };
    event.on(()=>{
      console.log('读取第一个');
    })
    event.on(()=>{
      console.log('读取第二个');
    })
    fs.readFile('./promise1','utf8',(err,data)=>{
      name.age=data;
      event.emit()
    })
    fs.readFile('./promise2','utf8',(err,data)=>{
      name.height=data;
      event.emit()
    })
  }

  render() {
    return(
      <div>
        发布订阅
      </div>
    )
  }

}