(function() {

var container = document.getElementById("container");
container.addEventListener("drop", onDrop, false);
container.addEventListener("dragover", stop, false);
container.addEventListener("dragenter", stop, false);
container.style.width = window.innerWidth+"px";
container.addEventListener("click", onClick, false);

function stop(e) {
  e.preventDefault();
  e.stopPropagation();
}

function onDrop(e) {
  stop(e);
  var file = e.dataTransfer.files[0];
  displayFile(file);
}

function onClick() {
  var hiddenInput = document.getElementById("hidden-input");
  hiddenInput.addEventListener("change", function changeListener(event) {
    displayFile(event.target.files[0]);
    event.target.removeEventListener("change", changeListener, false);
  }, false);
  hiddenInput.click();
}

function displayFile(file) {
  var reader = new FileReader();
  container.innerHTML = "";
  reader.onload = function(e) {
    var arrayBuffer = new Uint8Array(e.target.result);
    console.log("about to create spans for "+arrayBuffer.byteLength+" bytes");
    for(var i = 0; i < arrayBuffer.byteLength/3-1; i++) {
      var r = arrayBuffer[i*3+0].toString(16);
      if(r.length < 2) r = "0"+r;
      var g = arrayBuffer[i*3+1].toString(16);
      if(g.length < 2) g = "0"+g;
      var b = arrayBuffer[i*3+2].toString(16);
      if(b.length < 2) b = "0"+b;
      var span = document.createElement("span");
      span.style.color = "#"+r+g+b;
      span.textContent = r+g+b;
      container.appendChild(span);
    }

    container.style.width = document.documentElement.clientWidth+"px";
  };
  reader.readAsArrayBuffer(file);
}

})();
