import React, { useState, useEffect, Fragment } from 'react'
import uuidv4 from 'uuid'
// import FirebaseContext from '../../firebase/context'
import TaskCard from './TaskCard'
import axios from 'axios';

const urlTask = "http://localhost:9000/api/tasks/";
// const GetTasks = ({ groupId }) => {
//   const { firebase } = useContext(FirebaseContext)
//   const [tasks, setTasks] = useState([])
//   const uid = JSON.parse(localStorage.getItem('user')).uid
//   useEffect(() => {
//     const unsubscribe = firebase.firestore
//       .collection(`users/${uid}/groups/${groupId}/tasks`)
//       .onSnapshot(snapshot =>
//         setTasks(
//           snapshot.docs.map(doc => {
//             return { id: doc.id, ...doc.data() }
//           })
//         )
//       )
//     return () => {
//       unsubscribe()
//     }
//   }, [firebase.firestore, uid, groupId])

const GetTasks = ({groupId}) => {
  const [tasks, setTasks] = useState([])
  const uid = JSON.parse(localStorage.getItem('user')).uid
  useEffect(() =>{
    axios
    .get(urlTask)
    .then(response => {
      setTasks(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [uid])
// }
console.log(tasks.data)

  return (
    <div className="groupTableList">
      <table className="highlight">
        <thead>
          <tr>
            <th className="boldTable">Done</th>
            <th className="boldTable">Chore</th>
            <th className="boldTable">Assigned</th>
            <th className="boldTable">Date</th>
            <th className="boldTable">Actions</th>
          </tr>

            {tasks.length && tasks.map(task => (
             <Fragment key={uuidv4()}>
               <TaskCard
                  taskId={task.id}
                  chore={task.chore}
                  date={task.date}
                  isDone={task.isDone}
                  assigned={task.assigned}
                  groupId={groupId}
              />
             </Fragment>
           ))} 
        </thead>
      </table>
    </div>
  )

}

/*This is Ryans Work */

//   return (
//     <div>
//       {tasks.map(task => (
//         <Fragment key={uuidv4()}>
//           <TaskCard
//             taskId={task.id}
//             chore={task.chore}
//             date={task.date}
//             isDone={task.isDone}
//             assigned={task.assigned}
//             groupId={groupId}
//           />
//           <div>
//             <AddComment taskId={task.id} groupId={groupId} />
//             <GetComments taskId={task.id} groupId={groupId} />
//           </div>
//         </Fragment>
//       ))}
//     </div>
//   )
// }

export default GetTasks
