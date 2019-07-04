import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import SearchBar from "../components/SearchBar";
// import SearchBar from '../components/SearchBar';

class TroopMates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      email: "",
      name: "",
      results: [],
      term: "",
      filtered:[],
    };
  }

  componentDidMount() {
    this.users();
  }
  handleChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
  };
  users = () => {
    axios
      .get("https://chore-monkey.herokuapp.com/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // search = term => {
  //   let arr = this.state.users.filter(u => u.name.includes(term));
  //   console.log(arr);
  //   if (arr) {
  //     this.setState({
  //       results: arr
  //     });
  //   } else {
  //     return "no members by that name";
  //   }
  // };

  handleChangeSearch(e, m) {
  let users = m;
  if (e.target.value !== "") {
    // users = this.state.users;
    users = users.filter(user => {
      console.log(user)
      const lc = user.name.toLowerCase();
      const filter = e.target.value.toLowerCase();
      return lc.includes(filter);
    });
  } else {
    users = this.state.users;
  }
  this.setState({
    filtered: users
  });
}


  render() {
    const { name, users, results, email, term } = this.state;

    return (
      <div className="search">
          <input
          type="text"
          onChange={(e) => this.handleChangeSearch (e,this.state.users)}
          placeholder="Search Your Friends"
          /> 
        <form> </form>
        <div className="search-cards">
          {this.state.filtered.map(m => {
            return (
              <Link
                to={{
                  pathname: `/user/${m.uid}`,
                  state: {
                    groups: this.props.location.state
                  }
                }}
              >
                <div className="card hoverable">
                  <div className="card-image center-align">
                    <img src={m.profilePicture} alt="profile of user" />

                    <a
                      className="btn-floating halfway-fab waves-effect waves-light red"
                      href="www.google.com"
                    >
                      <i className="material-icons">add</i>
                    </a>
                  </div>
                  <div class="card-content">
                    <h3 className="card-title">{m.name}</h3>
                    <p>{m.location}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TroopMates;

// Let items = {this.state.users}

// handleChangeSearch(e) {
//   let users = [];
//   if (e.target.value !== "") {
//     users = this.props.items;
//     users = users.filter(item => {
//       const lc = item.toLowerCase();
//       const filter = e.target.value.toLowerCase();
//       return lc.includes(filter);
//     });
//   } else {
//     users = this.props.items;
//   }
//   this.setState({
//     filtered: users
//   });
// }

//  <input
// type="text"
// onChange={this.handleChangeSearch}
// placeholder="Search Your Friends"
// /> 