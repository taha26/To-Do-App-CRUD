// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const clearAll = document.querySelector(".clearAll");

// onkeyup event
inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value; //getting user entered value
  if (userEnteredValue.trim() != 0) { //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
}

// showTasks(); //calling showTask function

addBtn.onclick = () => { //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value

  axios.post(`http://localhost:3000/item`, {
    text: userEnteredValue
  })
    .then(function (response) {
      console.log(response.data);
      getData(); //calling showTask function
      addBtn.classList.remove("active"); //unactive the add button once the task added

    })
    .catch(function (error) {
      console.log(error);
    })

}

// delete task function
const deleteTask = (eachTodo) => {

  axios.delete(`http://localhost:3000/todo/${eachTodo._id}`).then((response) => {
    console.log("Respo", response)
    // document.querySelector("#message").innerHTML = response.data.message
    // setTimeout(() => {
    //     document.querySelector("#message").innerHTML = ""
    // }, 2000);

    getAllTodos();
  })


    .catch(() => {

      console.log("error: ", error);
    })


}

// delete all tasks function
deleteAllBtn.onclick = () => {
  console.log("idid")
  //   listArray = []; //empty the array
  //   localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  //   showTasks(); //call the showTasks function
}

// let text_add = document.querySelector("#listChild");

const getData = () => {

  axios.get(`http://localhost:3000/todos`)
    .then(function (response) {
      console.log(response.data);


      response.data.data.map((eachTodo) => {
        console.log('eachTodo', eachTodo.text)
        // text_add.appendChild(eachTodo)
        // document.querySelector("#listChild").innerHTML += eachTodo
        // todoList.innerHTML += eachTodo
        // todoList.innerHTML += `<br>`
        // document.querySelector("#listChild").innerHTML += '<br>'

        const pendingTasksNumb = document.querySelector(".pendingTasks");
        pendingTasksNumb.textContent = response.data.data.length; //passing the array length in pendingtask
        if (response.data.data.length > 0) { //if array length is greater than 0
          deleteAllBtn.classList.add("active"); //active the delete button
        } else {
          deleteAllBtn.classList.remove("active"); //unactive the delete button
        }
        let newLiTag = "";
        //   listArray.forEach((element, index) => {
        newLiTag = `<li>${eachTodo.text}<span class="icon" onclick="deleteTask(${eachTodo})"><i class="fas fa-trash"></i></span></li>`;
        //   });
        todoList.innerHTML += newLiTag; //adding new li tag inside ul tag
        inputBox.value = ""; //once task added leave the input field blank
      })

    })
    .catch(function (error) {
      console.log(error);
    })
}

// setInterval(getData, 1000);
getData();
// getData()
let userInput = document.querySelector("#userInput")

const addItems = () => {
  // axios.post(`http://localhost:3000/item`, {
  //     text: userInput
  // })
  //     .then(function (response) {
  //         console.log(response.data);


  //         // response.data.data.map(eachTodo => {
  //         //     text_add.appendChild(eachTodo)
  //         //     // document.getElementsByClassName(".fa-trash").innerHTML += eachTodo
  //         //     // document.getElementsByClassName(".fa-trash").innerHTML += '<br>'
  //         // })

  //     })
  //     .catch(function (error) {
  //         console.log(error);
  //     })
}


clearAll.onclick = () => {
  axios.delete(`http://localhost:3000/todos`).then(() => {
    getData(); todoList.innerHTML = ''; const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = null; }).catch(() => { console.log("error: ", error); })
  }