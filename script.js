document.addEventListener('DOMContentLoaded',()=>{

    let taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-new-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector(".empty-image");
    const todosContainer = document.querySelector(".todos-container");
    const progressLine = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');


    const toggleEmptyState = ()=>{
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width =taskList.children.length > 0 ? '100%':'50%'
    }

    const updateProgress = ()=>{
      const tasks = taskList.querySelectorAll('li');
      const completedTasks = taskList.querySelectorAll('.completed');
      const totalTasks = tasks.length;
      const completedCount = completedTasks.length;
      progressNumbers.textContent = `${completedCount}/${totalTasks}`;
      const percent = totalTasks === 0 ? 0 : (completedCount / totalTasks) * 100;
      progressLine.style.width = `${percent}%`;
 
        
    }

    const addTask =(event)=>{
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText){
            return;
        }
        console.log(taskText);
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkBox" class="checkBox">
        <span class="task-text">${taskText}</span>
        <div class="task-bottons">
           <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
           <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
           </div>`;   

        const checkBox = li.querySelector('.checkBox');  

        const editBtn= li.querySelector('.edit-btn');
        if (checkBox.checked){
            li.classList.add('completed');
            editBtn.disabled =true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';

        }

        checkBox.addEventListener('change', ()=>{
            const isChecked = checkBox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity= isChecked ? '0.5' :'1';
            editBtn.style.pointerEvents= isChecked ?'none':'auto';
            updateProgress();
        })
        editBtn.addEventListener('click', ()=>{
            if(!checkBox.checked){
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                updateProgress();
                toggleEmptyState();
            }
        }) 

        li.querySelector('.delete-btn').addEventListener('click',()=>{
        li.remove();
        updateProgress();
        toggleEmptyState();
        })   
        taskList.appendChild(li);
        updateProgress();
        taskInput.value = "";
        toggleEmptyState();
    }
addBtn.addEventListener('click',addTask);
taskInput.addEventListener('keypress', (e)=>{
    if(e.key==='Enter'){
        addTask(e);
    }
});

})