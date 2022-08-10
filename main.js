window.addEventListener("load", (ev) => {
  //parse
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log("variable todos ", todos); // []

  /**
   * I - Declaration conts el = document.
   */

  // I,1 - Input
  const nameInput = document.querySelector("#name"); // Name Here
  console.log(nameInput);

  // I,2- Form
  const newTodoForm = document.querySelector("#new-todo-form"); // id="new-todo-form"
  console.log("variable newTodoForm ", newTodoForm);

  // =====================================================

  /**
   * II - Add Events & Save Values (submit).
   */

  //1 - Set Value in localStorage from
  const username = localStorage.getItem("username") || "";
  nameInput.value = username;

  //Add Event | Event: Typing (change)
  nameInput.addEventListener("change", (ev) => {
    localStorage.setItem("username", ev.target.value);
  });

  // =====================================================

  /**
   * Form submit > save value in localStorage
   */
  //2 -  Get values to submit in new todo element before submission.
  newTodoForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    //target input name content | { collection de valeurs à recuperer}.
    // Format JSon
    const todo = {
      content: ev.target.elements.content.value,
      category: ev.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime() // numeric
    };
    console.log("variable todo", todo);

    // push an Object to an Array. (Resultat [] du Listing)

    todos.push(todo);

    //Now SAVE in localStorage Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
    localStorage.setItem("todos", JSON.stringify(todos));

    // Now RESET Form
    //HTMLFormElement.reset() restaure les valeurs par défaut des éléments du formulaire
    ev.target.reset();
    DisplayTodos();
  });
});

function DisplayTodos() {
  // =====================================================

  //template (contenu) > Listing donc une boucle foreach du resultat
  /**
           <div class="todo-item done">
            <label for=""
              ><input type="checkbox" /><span class="bubble business"></span
            ></label>
            <div class="todo-content">
              <input type="text" value="Make a video" readonly />
            </div>
            <div class="actions">
              <button class="edit">Edit</button
              ><button class="delete">Delete</button>
            </div>
          </div> 
 */

  //Ciblage de l'emplacement d'affichage.
  const todoList = document.getElementById("todo-list"); // ok main div de section
  //Declaration
  todoList.innerHTML = "";

  // =====================================================

  //snippet (fre->)
  todos.forEach((todo) => {
    //Container Element
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item"); // + class=""

    /**
     * 1- Main div SubElements creation <div>  <element></element>  </div>
     */
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div"); //ok
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    //Configuration of inputs
    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    //Css Blue or Pink radio
    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("bussiness");
    }

    //Add classlist
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    //inner Text >texteici<
    //console.log(todo.content); // ok
    //content.innerHTML = `INSERTION ICI`; //ok

    content.innerHTML = `<input type="text" value ="${todo.content}" readonly/>`; // Attention cloture balise
    console.log(content);
    edit.innerHTML = `Edit`;
    deleteButton.innerHTML = `Delete`;

    /**
     * 2- Subelements  <div><element>  <element></element>  </element></div>
     */
    //element.appendChild ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié.
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);

    //Ajout d l'element principal <div></div>
    todoItem.appendChild(label); //
    todoItem.appendChild(content); // Todo title
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem); // main div

    //check radio
    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (ev) => {
      todo.done = ev.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
    });
  }); // End Foreach
}
