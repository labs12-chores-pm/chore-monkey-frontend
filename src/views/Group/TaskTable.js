import React, { Component } from "react";
import TinyPic from "../../components/TinyPic";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      editing: false,
      editTaskId: "",
      assignedTo: "",
      editingAssignedUser: false,
      editingAssignedUserTaskID: "",
    };
  }

  find = id => {
    const mem = this.props.members.filter(m => m.uid === id);
    if (mem[0]) {
      return mem[0].profilePicture;
    } else {
      return "no asignee";
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  editTask = (task) => {
    if (!this.state.editTaskId) {
      return this.setState({ editing: !this.state.editing, editTaskId: task.taskId, assignedTo: task.assignedTo });
    } else {
      return this.setState({ editing: !this.state.editing, editTaskId: "", title: "" });
    }
  };

  submit = (e) => {
    e.preventDefault();
    if (this.state.title) {
      this.props.edit({
        assignedTo: this.state.assignedTo,
        title: this.state.title,
        groupId: this.props.groupId,
      }, this.state.editTaskId)
    }
    return this.setState({ editing: !this.state.editing, editTaskId: "", title: "" });
  };

  openAssignedUserEdit(task) {
    if (!this.state.editingAssignedUser && !this.state.editingAssignedUserTaskID) {
      this.setState({
        editingAssignedUser: !this.state.editingAssignedUser,
        editingAssignedUserTaskID: task.taskId
      })
    }
  }

  submitAssignedUserEdit(task) {
    this.props.edit({
      assignedTo: this.state.assignedTo,
    }, this.state.editingAssignedUserTaskID)

    this.setState({
      editingAssignedUser: !this.state.editingAssignedUser,
      editingAssignedUserTaskID: "",
      assignedTo: ""
    })
  }


  render() {
    console.log(this.state)
    console.log(this.props.members)
    return (
      <div>
        <table className="pink striped highlight responsive-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned To: </th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.props.tasks.map(t => {
              const date = new Date(t.dueDate).toLocaleDateString("en-US");
              const photo = this.find(t.assignedTo);
              return (
                <tr>
                  <td>{t.title}</td>
                  <td onClick={() => this.openAssignedUserEdit(t)}>
                    { this.state.editingAssignedUserTaskID == t.taskId 
                      ?
                      // "8====D~~~"
                      <form>
                      <TextField
                      id="dropdown"
                      select
                      // className={classes.textField}
                      value={this.state.assignedTo}
                      name="assignedTo"
                      onChange={this.handleChange}
                      onSubmit={() => console.log("submitting")}
                      // SelectProps={{
                      //   MenuProps: {
                      //     className: classes.menu
                      //   }
                      // }}
                      margin="normal"
                    >
                      {this.props.members.map(m => (
                        <MenuItem key={m.userId} value={m.uid}>
                          {m.name}
                        </MenuItem>
                      ))}
                    </TextField>
                      <button onClick={(e) =>{ e.preventDefault(); this.submitAssignedUserEdit(t) }}> :O </button>
                    </form>
                      // </form>
                    :
                      <TinyPic photo={photo} /> }
                  </td>
                  <td>{date}</td>
                  <td>
                    <button onClick={() => this.editTask(t)}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.editing && (
          <form onSubmit={(e) => this.submit(e)}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </form>
        )}
      </div>
    );
  }
}

export default TaskTable;