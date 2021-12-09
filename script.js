let todoInput
let errorInfo
let addBtn
let ulList
let newTodo
let popup
let popupInput
let popupInfo
let todoToEdit
let popupAddBtn
let popupCloseBtn

function main() {
    prepareDOMElements()
    prepareDOMEvents()
}
function prepareDOMElements() {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')
    popup = document.querySelector('.popup')
    popupInput = document.querySelector('.popup-input')
    popupInfo = document.querySelector('p.popup-info')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}
function prepareDOMEvents() {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

function addNewTask() {
    if(todoInput.value !== "")
    {
        newTodo = document.createElement('li')
        newTodo.setAttribute('data-id', '$')
        newTodo.textContent = todoInput.value
        ulList.append(newTodo)
        const div = document.createElement('div')
        div.classList.add('tools')
        newTodo.append(div)
        const completeBtn = document.createElement('button')
        completeBtn.classList.add('complete')
        div.append(completeBtn)
        const checkIcon = document.createElement('i')
        checkIcon.classList.add('fas')
        checkIcon.classList.add('fa-check')
        completeBtn.append(checkIcon)
        const editBtn = document.createElement('button')
        editBtn.classList.add('edit')
        editBtn.textContent = 'EDIT'
        div.append(editBtn)
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        div.append(deleteBtn)
        const crossIcon = document.createElement('i')
        crossIcon.classList.add('fas')
        crossIcon.classList.add('fa-times')
        deleteBtn.append(crossIcon)
        todoInput.value = ''
        errorInfo.textContent = ''

    }
    else
    {
        errorInfo.textContent = "Wpisz treść zadania"
    }
}
function checkClick(e)
{
    if(e.target.matches('.complete'))
    {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    }
    else if(e.target.matches('.edit'))
    {
        editTodo(e)
    }
    else if(e.target.matches('.delete'))
    {
        e.target.closest('li').remove()
        const allTodos = document.querySelectorAll('li')
        if(allTodos.length === 0)
        {
            errorInfo.textContent = 'Brak zadań na liście.'
        }
    }
}
function editTodo(e)
{
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    popup.style.display = 'flex'
}
function closePopup()
{
    popup.style.display = 'none'
    popupInfo.textContent = ''
}
function changeTodoText()
{
    if(popupInput.value !== '')
    {
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
    }
    else
    {
        popupInfo.textContent = 'Wpisz treść zadania'
    }
}
function enterKeyCheck(e)
{
    if(e.key === 'Enter')
    {
        addNewTask()
    }
}
document.addEventListener('DOMContentLoaded', main)