//global variables
const form_UI = document.querySelector("#myform");
const list_UI = document.getElementById("list");
let arrayToDo = [];

//functions
const addArrayToDo = activity => {
  let Item = {
    activity,
    status: false
  };
  arrayToDo.push(Item);
  return Item;
};

const saveLocalStorage = () => {
  localStorage.setItem("do", JSON.stringify(arrayToDo));
  getList();
};

const getList = () => {
  list_UI.innerHTML = "";
  arrayToDo = JSON.parse(localStorage.getItem("do"));
  if (arrayToDo == null) {
    arrayToDo = [];
  } else {
    arrayToDo.forEach(item => {
      if (!item.status) {
        list_UI.innerHTML += `<div class="alert alert-danger"><i class="material-icons float-left mx-2">work</i><b>${item.activity}</b> - ${item.status}<span class="float-right"><i class="material-icons mx-2" style="cursor: pointer;" >done</i><i class="material-icons" style="cursor: pointer;">delete</i></span></div>`;
      } else {
      list_UI.innerHTML += `<div class="alert alert-success"><i class="material-icons float-left mx-2">work</i><b>${item.activity}</b> - ${item.status}<span class="float-right"><i class="material-icons mx-2" style="cursor: pointer;" >done</i><i class="material-icons" style="cursor: pointer;">delete</i></span></div>`;
      }
    });
  }
};

const EditToDo = activity => {
  let indexArray = arrayToDo.findIndex(elem => elem.activity === activity);
  console.log(indexArray);
  arrayToDo[indexArray].status = true;
  saveLocalStorage();
};

const DeleteToDo = activity => {
  let indexArray = arrayToDo.findIndex(elem => elem.activity === activity);

  arrayToDo.splice(indexArray, 1);
  saveLocalStorage();
};

//evenListener
form_UI.addEventListener("submit", e => {
  e.preventDefault();
  let inputToDo = document.getElementById("activity").value;
  addArrayToDo(inputToDo);
  saveLocalStorage();
  form_UI.reset();
});

list_UI.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.innerHTML == "done" || e.target.innerHTML == "delete") {
    let icon = e.target.innerHTML;
    let activity = e.path[2].childNodes[1].innerHTML;
    switch (icon) {
      case "done":
        EditToDo(activity);
        break;
      case "delete":
        DeleteToDo(activity);
        break;
    }
  }
});

//start DOM
document.addEventListener("DOMContentLoaded", getList);
