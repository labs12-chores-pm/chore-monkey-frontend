import React, { useContext, useState } from 'react'
import FirebaseContext from '../../firebase/context'
import Tooltip from "@material-ui/core/Tooltip"
import TaskModal from './TaskModal'
// import GetTasks from './GetTasks';



const TaskCard = ({ taskId, chore, assigned, date, isDone, groupId }) => {
  const { firebase, user } = useContext(FirebaseContext)

  async function deleteTask() {
    await firebase.firestore
      .collection(`users/${user.uid}/groups/${groupId}/tasks`)
      .doc(taskId)
      .delete()
  }


  return  (
        <tr>
          <th className="switch" >       
            <label>
              <input type="checkbox"></input>
              <span className="checked"></span>          
            </label>
                    
          </th>
          <th>{chore}</th>
          <th>{assigned}</th>
          <th>{date}</th>
          <th>
            <Tooltip title="Assign Person">
              <button className="tableActionButtons btn-floating waves-effect waves-light btn blue lighten-1">
                <i className="material-icons">person_add</i>
              </button>
            </Tooltip>

            <Tooltip title="Edit"> 
              <span>
                <TaskModal
                taskId={taskId}
                chore={chore}
                date={date}
                isDone={isDone}
                assigned={assigned}
                groupId={groupId}
                />
              </span>
            </Tooltip>  

            <Tooltip title="Delete">
              <button className="tableActionButtons btn-floating waves-effect waves-light btn red darken-1" onClick={deleteTask}>
                <i className="material-icons">delete</i>
                
              </button>
            </Tooltip> 
          </th>
        </tr>
  ) 
}

export default TaskCard
