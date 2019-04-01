import React, { Component } from "react";
import Loader from "./Loader.js";
import "./App.css";
import $ from "jquery";
import StaffList from "./StaffList.js";
//import fetch from "fetch";

class App extends Component {
  constructor() {
    super();
    this.state = {
      staff: []
    };
  }

  componentDidMount() {
    // fetch("http://localhost:3001/api/frontend-staff")
    //   .then(result => {
    //     return result.json();
    //   })
    //   .then(result => {
    //     let { bio } = result;
    //     //console.log(bio);
    //     return this.fetchBio(bio);
    //   })
    //   .then(staff => {
    //     console.log(staff);
    //     this.setState({
    //       staff: staff
    //     });
    //   })
    //   .catch(err => console.log(err));
    this.fetchAsync()
      .then(json => {
        let { bio } = json;
        return this.fetchBio(bio);
      })
      .then(bio => {
        this.setState({
          staff: bio
        });
      });
  }
  fetchAsync = async staff => {
    try {
      let result = await fetch("http://localhost:3001/api/frontend-staff");
      return result.json();
    } catch (err) {
      console.log("eh", err);
    }
  };
  fetchBio = async staff => {
    let fetchAll = staff.map(async member => {
      let { name, info } = member;

      // let memberinfo = await fetch(info);
      // console.log(memberinfo.json());
      // let data = memberinfo.json();
      // let { bio, image } = data;
      // return { bio, image, name };
      return fetch(info)
        .then(res => {
          return res.json();
        })
        .then(memberInfo => {
          //console.log(memberInfo);
          let obj = {
            name: name,
            bio: memberInfo.bio,
            image: memberInfo.image
          };
          return obj;
        })
        .catch(err => console.log(err));
    });
    return Promise.all(fetchAll);
  };

  render() {
    const { staff } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <Loader />
          <h2>Front-End Staff</h2>
        </div>
        <div className="App-intro">
          <div className="staff">
            {!staff.length ? <Loader /> : <StaffList staff={staff} />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
