document.addEventListener('DOMContentLoaded',()=>{

    let taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-new-task-btn');
    const taskList = document.getElementById('task-list');

    const addTask =(event)=>{
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText){
            return;
        }
        console.log(taskText);
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = "";
    }
addBtn.addEventListener('click',addTask);
taskInput.addEventListener('keypress', (e)=>{
    if(e.key==='Enter'){
        addTask(e);
    }
});

})