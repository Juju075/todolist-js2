window.addEventListener("load", (ev) => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log(todos); // []

  /**
   * I - Declaration conts el = document.
   */

  // I,1 - Input
  const nameInput = document.querySelector("#name"); // Name Here
  console.log(nameInput);

  // I,2- Form
  const newTodoForm = document.querySelector("#new-todo-form"); // id="new-todo-form"

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
   *
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

    // push an Object to an Array.
    todos.push(todo);

    //Now SAVE in localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    //HTMLFormElement.reset() restaure les valeurs par défaut des éléments du formulaire
    ev.target.reset();
  });
});
