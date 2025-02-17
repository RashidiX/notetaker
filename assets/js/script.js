// Wait until the HTML document is fully loaded and parsed
document.addEventListener("DOMContentLoaded", () => {
    // Get the input field for entering new tasks by its ID "taskInput"
    const taskInput = document.getElementById("taskInput");

    // Get the button used to add new tasks by its ID "addTask"
    const addTaskBtn = document.getElementById("addTask");

    // Get the container (likely an unordered list) that will hold the task items by its ID "taskList"
    const taskList = document.getElementById("taskList");

    // ---------------------------
    // Function: loadTasks
    // ---------------------------
    // This function retrieves stored tasks from local storage, parses them from JSON,
    // and then displays them in the UI by generating HTML for each task.
    //function loadTasks() {
        // Get the JSON string from local storage with key "tasks", parse it into an object,
        // or use an empty array if nothing is stored.
        //const task = JSON.parse(localStorage.getItem("tasks")) || [];
        
        // Convert the tasks array into HTML string by mapping each task to its HTML representation.
        // NOTE: There is a potential typo here: the parameters used in createTaskHTML do not match the ones defined.
        // It calls createTaskHTML(task, text, task.completed) but it should likely be createTaskHTML(task.text, task.completed)
        // to pass the task text and completion status.
        //taskList.innerHTML = task.map(task => createTaskHTML(task.text, task.completed)).join("");
    //}

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToUI(task.text, task.completed));
    }

    // ---------------------------
    // Function: saveTasks
    // ---------------------------
    // This function gathers the current tasks from the UI,
    // then saves them as a JSON string into local storage.
   // function saveTasks() {
        // Create an array from the list items (li elements) within the taskList container.
        // For each li, create an object with the task text and whether it is marked as completed.
        //const tasks = Array.from(taskList.children).map(li => ({
            // Get the text content from the first child node of the li (which should be the task text)
            //text: li.firstChild.textContent,
            // Check if the li has the "completed" class to determine if the task is completed
            //completed: li.classList.contains("completed")
       // }));
        
        // Convert the tasks array into a JSON string and save it to local storage with key "tasks"
        //localStorage.setItem("tasks", JSON.stringify(tasks));
   // }

   function saveTasks(){
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.firstChild.textContent,
        completed: li.classList.contains("commpleted")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
   }


    // ---------------------------
    // Function: createTaskHTML
    // ---------------------------
    // This function creates the HTML structure for a task.
    // It returns the outerHTML of the created list item as a string.
    //function createTaskHTML(taskText, completed) {
        // Create a new list item (li) element
       // const li = document.createElement("li");
        // Set its text content to the task text provided as a parameter
        //li.textContent = taskText;
        
        // If the task is marked as completed, add the "completed" class to style it differently
       // if (completed) li.classList.add("completed");

        // ---------------------------
        // Event Listener: Mark Task as Complete
        // ---------------------------
        // When the li is clicked, toggle the "completed" class to mark it as complete/incomplete
       // li.addEventListener("click", () => {
           // li.classList.toggle("completed");
            // Save the updated tasks to local storage after toggling
           // saveTasks();
       // });
function createTaskHTML(taskText, completed){
    const li = document.createElement("li");
    li.textContent = taskText;
    if(completed)li.classList.add("completed");
        li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });
}
        // ---------------------------
        // Create and Setup Delete Button
        // ---------------------------
        // Create a button element that will be used to delete the task
        const deleteBtn = document.createElement("button");
        // Set its text to "X" (a common symbol for deletion)
        deleteBtn.textContent = "X";
        // Add a CSS class "delete-btn" to style the button (if needed)
        deleteBtn.classList.add("delete-btn");
        
        // Add an event listener to the delete button to handle task deletion
        deleteBtn.addEventListener("click", (e) => {
            // Prevent the click event from bubbling up to the li click event (which toggles completion)
            e.stopPropagation();
            // Remove the parent li element from the UI
            li.remove();
            // Save the updated tasks list to local storage
            saveTasks();
        });

        // Append the delete button to the li so it appears with the task text
        li.appendChild(deleteBtn);

        // Return the full HTML string of the li element, which includes the task text and delete button
        return li.outerHTML;
    }

    // ---------------------------
    // Function: addTaskToUI
    // ---------------------------
    // This function is similar to createTaskHTML but directly adds the new task element to the taskList in the DOM.
    function addTaskToUI(taskText, completed = false) {
        // Create a new li element
        const li = document.createElement("li");
        // Set its text to the task text provided
        li.textContent = taskText;
        // If the task is completed, add the "completed" class
        if (completed) li.classList.add("completed");

        // Add an event listener to toggle the completion status when clicked
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            // Save the updated tasks list to local storage
            saveTasks();
        });

        // Create a delete button for this task
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        
        // When the delete button is clicked, prevent event bubbling, remove the li, and update local storage
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        // Append the delete button to the li element
        li.appendChild(deleteBtn);
        // Append the complete li element to the taskList container in the DOM
        taskList.appendChild(li);
        // Save the new task list to local storage
        saveTasks();
    }

    // ---------------------------
    // Event Listener: Add Task Button
    // ---------------------------
    // This adds functionality to the button that creates a new task.
    addTaskBtn.addEventListener("click", () => {
        // Only add the task if the input field has non-whitespace text
        if (taskInput.value.trim()) {
            // Call addTaskToUI to create and add the task to the UI
            addTaskToUI(taskInput.value);
            // Clear the input field after adding the task
            taskInput.value = "";
        }
    });

    // ---------------------------
    // Initial Setup: Load Existing Tasks
    // ---------------------------
    // When the page is loaded, retrieve and display any tasks stored in local storage.
    loadTasks();
});
