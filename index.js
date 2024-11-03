function update(builder) {
  builder(body(
      text("Hello world!"), 
      text(`Value: ${value.get()}`), 
      button({ 
          content: "Click me!", 
          action: () => {
              value.set(value.get() + 1); 
          }
      })
  ), root);
}

value.subscribe(update);

update();


// Builder function to manipulate the DOM
export function builder(content, root) {
  while (root.firstChild) {
      root.removeChild(root.firstChild);
      console.log("Removing content");
  }
  
  root.appendChild(content);
  console.log("Appending content");
}

// Create a Subject for tracking variable changes
const subject = new Subject();

export const main = {
  update: function() {
      const newContent = document.createElement('div');
      newContent.innerText = trackedVariable;
      builder(newContent, document.body);
  }
};

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
