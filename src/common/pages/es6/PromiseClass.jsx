import React from "react"
import promise from "./promise";
export class PromiseClass extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        classPromise
      </div>
    );
  }
}

class PromiseClassObj {
  constructor(exeArray) {
    this.value=undefined;
    this.status="pending";
    this.reason=undefined;
    let resolve=(data)=> {
      if (this.status==="pending") {
        this.value=data;
        this.status="resolve";
      }
    }
    let reject=(data)=>{
      if (this.status==="pending") {
        this.reason=data;
        this.status="reject";
      }
    }

    exeArray(resolve,reject)
  }
  then(res,err){
    if (this.status==="resolve") {
      res(this.value)
    }
    if (this.status==="reject") {
      err(this.reason)
    }
  }
}
let PromiseClasss= new PromiseClassObj((resolve,reject)=>{
  reject(222);resolve(111);
});
PromiseClasss.then(res=>{console.log(res)},err=>{console.log(err)})

// PromiseClass.then(res=>{console.log(res);},err=>{console.log(err);})