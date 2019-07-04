import React, {Component} from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <section className="section">
            <List items={this.state.user} />
          </section>
          <hr />
        </div>
      </div>
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }

  handleChange(e) {
    // Variable to hold the original version of the list
    let userList = [];
    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      userList = this.props.items;
      // Use .filter() to determine which items should be displayed
      // based on the search terms
      userList = userList.filter(item => {
        // change current item to lowercase
        const lc = item.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      userList = this.props.items;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: userList
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="input"
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <ul>
          {this.state.filtered.map(item => (
            <li key={item}>
              {item} &nbsp;
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchBar;