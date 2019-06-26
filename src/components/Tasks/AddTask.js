// import React, { useContext, useReducer } from 'react'
// import useFormValidation from '../Auth/useFormValidation'
// import FirebaseContext from '../../firebase/context'
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ProfilePhotoTask from './TaskAvatar'

// const initialState = {
//   chore: '',
//   assigned: '',
//   date: '',
//   isDone: 'NOT COMPLETED'
// }

// function validateTask(values) {
//   let errors = {}
//   if (!values.chore || !values.assigned || !values.date) {
//     errors.values =
//       'You are missing required items.  Please complete all fields and then resubmit.'
//   }
//   return errors
// }

// export default function AddTask({ history, match }) {
//   const { firebase, user } = useContext(FirebaseContext)
//   const { handleSubmit, handleChange, errors, values } = useFormValidation(
//     initialState,
//     validateTask,
//     submitTask
//   )


//   async function submitTask() {
//     try {
//       await firebase.firestore
//         .collection(`users/${user.uid}/groups/${match.params.groupId}/tasks`)
//         .doc()
//         .set({
//           chore: values.chore,
//           assigned: values.assigned,
//           date: values.date,
//           isDone: false,
//           comments: []
//         })
//     } catch (err) {
//       console.error({ error: err.message })
//     } finally {
//       history.push(`/groups/${match.params.groupId}`)
//     }
//   }

//   return (
//     <div className="taskBackGround">
// <div className="addTaskDiv">
//     <h2 className="add-task-title">New Task</h2>
//     <form onSubmit={handleSubmit} className="addTaskForm">
//       <input
//         type="text"
//         name="chore"
//         placeholder="Add a Task"
//         value={values.chore}
//         onChange={event => handleChange(event)}
//       />

//       <label htmlFor="date" className="dueDateText">Due Date:</label>
//       <input
//         type="date"
//         id="date"
//         name="date"
//         placeholder="date"
//         value={values.date}
//         onChange={event => handleChange(event)}
//       />


//           {/* <input
//             type="text"
//             name="assigned"
//             placeholder="Assign a Person"
//             value={values.assigned}
//             onChange={event => handleChange(event)}
//           /> */}
//           <div>
//     <div>Assigned To:</div>
//     <ExpansionPanel className="grey lighten-3 editModalRound">
//           <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon/>}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//           className="pink accent-3 editModalRound"
//           >
//               <div className="modalButtonText">
//                   People In The Group!
//               </div>
//           </ExpansionPanelSummary>  
//           <ExpansionPanelDetails>
//               <div>
//         {/* Here is the loop the get list of user in a group broken code Michael*/}
//                 {/* {user.map(group => (
//                 <ProfilePhotoTask/>
//                   ))} */}
//                   <ProfilePhotoTask/>

//                 <input
//                 style= {{marginTop: "19px"}}
//                 type="text"
//                 name="assigned"
//                 placeholder="Assign a Person"
//                 value={values.assigned}
//                 onChange={event => handleChange(event)}
//               />
//               </div>
//           </ExpansionPanelDetails>
//     </ExpansionPanel>
// </div>
//       <button 
//       type="submit" 
//       value="submit" 
//       className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical submit-button">
//         {/* <input type="submit" value="submit" /> */}
//         Submit
//         </button>
//         {errors.values && <p>{errors.values}</p>}
//       </form>
//     </div>
//   </div>
//   )
// }

import React, { Component } from 'react';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProfilePhotoTask from './TaskAvatar'

class AddTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      chore:'',
      assigned: '',
      date: '',
      isDone: false,
    }
  }
  
    handleSubmit = () => {
      console.log('this is submitting')
      axios
        .post(
          'http://localhost:9000/api/tasks/',
            {
            title: this.state.chore,
            assignedTo: this.state.assigned,
            dueDate: this.state.date,
            groupId:1,
            listId:1
          })
        .then(response => {
          this.setState(
            console.log('hello tasks is working', response.data)
          )
        .catch(err => {
          console.log('task error', err)
        })
      })
    }
    handleChange(event){
      this.setState({
        [event.target.name] : event.target.value
      })
    }

    render() {
      return(
        <div className="taskBackGround">
        <div className="addTaskDiv">
            <h2 className="add-task-title">New Task</h2>
            <form onSubmit={this.handleSubmit} className="addTaskForm">
              <input
                type="text"
                name="chore"
                placeholder="Add a Task"
                value={this.state.chore}
                onChange={event => this.handleChange(event)}
              />
        
              <label htmlFor="date" className="dueDateText">Due Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="date"
                value={this.state.date}
                onChange={event => this.handleChange(event)}
              />
        
        
                  {/* <input
                    type="text"
                    name="assigned"
                    placeholder="Assign a Person"
                    value={values.assigned}
                    onChange={event => handleChange(event)}
                  /> */}
                  <div>
            <div>Assigned To:</div>
            <ExpansionPanel className="grey lighten-3 editModalRound">
                  <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="pink accent-3 editModalRound"
                  >
                      <div className="modalButtonText">
                          People In The Group!
                      </div>
                  </ExpansionPanelSummary>  
                  <ExpansionPanelDetails>
                      <div>
                {/* Here is the loop the get list of user in a group broken code Michael*/}
                        {/* {user.map(group => (
                        <ProfilePhotoTask/>
                          ))} */}
                          <ProfilePhotoTask/>
        
                        <input
                        style= {{marginTop: "19px"}}
                        type="text"
                        name="assigned"
                        placeholder="Assign a Person"
                        value={this.state.assigned}
                        onChange={event => this.handleChange(event)}
                      />
                      </div>
                  </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
              <button 
              type="submit" 
              value="submit" 
              className="waves-effect waves-light btn-large  pink hvr-shutter-out-vertical submit-button">
                {/* <input type="submit" value="submit" /> */}
                Submit
                </button>
                {/* {errors.values && <p>{errors.values}</p>} */}
              </form>
            </div>
          </div>
      )
    }
  }

  export default AddTask