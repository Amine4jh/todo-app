const container = document.querySelector(".container")
const darkMode = document.querySelector(".title img")
darkMode.addEventListener("click", function() {
    if (container.classList.contains("dark")) {
        darkMode.src = "images/icon-moon.svg"
    } else {
        darkMode.src = "images/icon-sun.svg"
    }
    container.classList.toggle("dark")
    setAppearence()
})

function setAppearence() {
    if (container.classList[1]) {
        localStorage.setItem("icon", darkMode.src)
        localStorage.setItem("appearence", container.classList[1])
    } else {
        localStorage.setItem("icon", darkMode.src)
        localStorage.setItem("appearence", container.classList[0])
    }
}
function getAppearence() {
    darkMode.src = localStorage.getItem("icon")
    container.classList.add(localStorage.getItem("appearence"))
}
getAppearence()

let data = []
let id = 1;

// for (let i of data) {
//     id = i.id + 1
// }

const listContainer = document.querySelector(".list-container ul")
var input = document.querySelector("input")
var countSpan = document.getElementById("count")

function updateData(ar) {
    let count = 0;
    while (listContainer.children.length > 1) {
        listContainer.children[1].remove()
    }
    for (let i of ar) {
        id = i.id + 1
        let task = document.createElement("li")
        let taskSpan = document.createElement("span")
        let checkCircle = document.createElement("div")
        let crossIcon = document.createElement("img")
        checkCircle.innerHTML = '<img id="check" src="images/icon-check.svg">'
        taskSpan.innerHTML = i.name
        taskSpan.insertBefore(checkCircle, taskSpan.childNodes[0])
        task.appendChild(taskSpan)
        task.appendChild(crossIcon)
        crossIcon.src = "images/icon-cross.svg"
        crossIcon.id = "cross"
        listContainer.appendChild(task)
        listContainer.classList.remove("empty")
        if (i.completed) {
            task.classList.add("checked")
        } else {
            task.classList.remove("checked")
            count++
        }
        // Remove Task
        crossIcon.addEventListener("click", () => {
            if (ar === data) {
                data.splice(data.indexOf(i), 1);
            } else {
                data.splice(data.indexOf(i), 1);
                ar.splice(ar.indexOf(i), 1);
            }
            updateData(ar)
        })
        // Complete Task
        checkCircle.addEventListener("click", () => {
            if (i.completed) {
                i.completed = false
            } else {
                i.completed = true
            }
            updateData(ar)
        })
    }
    countSpan.innerText = count
    if (ar.length === 0) {
        listContainer.classList.add("empty")
    }
    setData()
}

input.addEventListener("keypress", function(e) {
    if (e.key == 'Enter') {
        if (input.value) {
            let task = {id: id, name: input.value, completed: false}
            data.push(task)
            id++
            input.value = ""
            updateData(data)
        }
    }
})

let filters = document.querySelectorAll(".filter span")
let mobileFilters = document.querySelectorAll(".filter-mobile span")

filters.forEach((e) => {
    e.addEventListener("click", function() {
        for (let i of e.parentElement.children) {
            i.classList.remove("checked")
        }
        e.classList.add("checked")
    })
})

mobileFilters.forEach((e) => {
    e.addEventListener("click", function() {
        for (let i of e.parentElement.children) {
            i.classList.remove("checked")
        }
        e.classList.add("checked")
    })
})

let filterAll = document.querySelectorAll("#all")
let filterActive = document.querySelectorAll("#active")
let filterCompleted = document.querySelectorAll("#completed")

filterAll.forEach(function(e) {
    e.addEventListener("click", function() {
        updateData(data)
    })
})

filterActive.forEach(function(e) {
    e.addEventListener("click", function() {
        let activeArray = []
        for (let i of data) {
            if (!i.completed) {
                activeArray.push(i)
            }
        }
        updateData(activeArray)
    })
})

filterCompleted.forEach(function(e) {
    e.addEventListener("click", function() {
        let completedArray = []
        for (let i of data) {
            if (i.completed) {
                completedArray.push(i)
            }
        }
        updateData(completedArray)
    })
})

let clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", function() {
    let newData = data.filter(function(e) {
        return !e.completed
    })
    data = newData
    updateData(data)
})

function setData() {
    localStorage.setItem("data", JSON.stringify(data))
}
function getData() {
    data = JSON.parse(localStorage.getItem("data"))
    updateData(data)
}
getData()

// if (listContainer.children.length > 1) {
//     listContainer.classList.remove("empty")
// }

new Sortable(listContainer, {
    animation: 300
})