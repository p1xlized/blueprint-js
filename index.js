// obesrvers
function Subject(){
    this.observer = [];
}

Subject.prototype = {
    subscribe: function(observer){
        this.observer.push(observer);
    },
    unsubscribe: function(observer){
        this.observer.splice(this.observer.indexOf(observer), 1);
    },
    trigger: function(){
        this.observer.forEach(function(observer){
            observer.update();
        });
    }
}
// builder export function inserts the elements to the root html, for now it takes body only later could make header, footer etc.
// ? ui functions
export function builder(body, root) {
  // Remove existing content from the root
  while (root.firstChild) {
    root.removeChild(root.firstChild);
    console.log("Removing content")
  }
  
  // Append the new body content to the root
  root.appendChild(body);
  console.log("Appending content")
}

export function text(content) {
  const p = document.createElement("p");
  p.innerText = content;
  return p;
}
// is a div that nest toghether multiple elements
// todo: should take multiple objects append toghether( append child )
export function body() {
  let content = document.createElement("div");
  for (let i = 0; i < arguments.length; i++) {
    content.appendChild(arguments[i]);
  }
  return content;
}
export function style({
  background = "white",
  height = " ",
  width = "",
  border = "",
  radius = "",
  margin = "",
  padding = "",
} = {}) {
  return `
        background-color: ${background}; 
        height: ${height}; 
        width: ${width};
        border: ${border};
        border-radius: ${radius};
        margin: ${margin};
        padding: ${padding}`;
}

export function button({ content, action } = {}) {
  const btn = document.createElement("button");
  btn.innerHTML = content;
  console.log(btn);
  if (typeof action === "function") {
    btn.addEventListener("click", action);
  } else {
    console.error("The action provided is not a function");
  }
  return btn;
}

// variables ???
// Define the Variable constructor function
function Variable(value) {
  this.value = value;
}

// Add methods to the Variable prototype to get and set the value
Variable.prototype = {
  getValue: function() {
    return this.value;
  },
  setValue: function(value) {
    this.value = value;
  }
};

// Define the mutable function
export function mutable(initialValue) {
  // Create an instance of Variable with the initial value
  const variable = new Variable(initialValue);
  
  // Return an object with methods to get and set the value
  return {
    getValue: function() {
      return variable.getValue();
    },
    setValue: function(value) {
      variable.setValue(value);
    }
  };
}

