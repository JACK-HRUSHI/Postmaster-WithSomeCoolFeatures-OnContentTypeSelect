console.log("This is new project on postman");

// Utility Functions
// 1. Utility fuunction to get DOM Element from string

function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// Initialize number sof parameters

let addedParamsCount = 0;

// Hides the parametersBox initially

let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// If user clicks on params, hides the JSON box

let paramsRadio = document.getElementById("params");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none"; // none to hide it
  document.getElementById("parametersBox").style.display = "block"; // block to display it
});

// If user clicks on json, hides the PARAMETERS box

let jsonRadio = document.getElementById("json");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none"; // none to hide it
  document.getElementById("requestJsonBox").style.display = "block"; // block to display it
});

// If user clicks on + btn add more parameters

let addParam = document.getElementById("addParam");

addParam.addEventListener("click", () => {
  let newParams = document.getElementById("newParams");
  let string = ` <div class="form-row row my-3">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${
                  addedParamsCount + 2
                }</label>
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    id="parameterKey${addedParamsCount + 2}"
                    placeholder="Enter Parameter${addedParamsCount + 2}, key"
                  />
                </div>
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    id="parameterValue${addedParamsCount + 2}"
                    placeholder="Enter Parameter${addedParamsCount + 2}, value"
                  />
                </div>
                <button class="btn btn-primary col-md-1 deleteParam">-</button>
              </div>
              `;

  // Convert the element string to DOM node

  let paramEle = getElementFromString(string);
  // console.log(paramEle);
  newParams.appendChild(paramEle);

  //Add event listner to remove parameters on clicking -

  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.paramEle.remove();
    });
  }

  addedParamsCount++;
});

// If the user clicks on submit button

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //Show please wait in response box
  let response = document.getElementById("responseText");
  response.value = "Please wait....";
  // e.preventDefault();

  let url = document.getElementById("urlField").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;
  // console.log("url is ", url);
  // console.log("requestType is ", requestType);
  // console.log("contentType is ", contentType);

  // If user selects used params option instead of json, collect all the parameters in an object
  if (contentType == "params") {
    data = {};
    for (i = 0; i < addedParamsCount + 1; i++) {
      if (document.getElementById("parameterkey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterkey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
      data = JSON.stringify(data);
    }
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  console.log("url is ", url);
  console.log("requestType is ", requestType);
  console.log("contentType is ", contentType);
  console.log("data is ", data);

  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseText").value = text;
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      header: {
        "content-type": "application/jsonRadio; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseText").value = text;
      });
  }
});
