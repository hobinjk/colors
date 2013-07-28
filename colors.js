(function() {
var multiple = 2;
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
    arrayBuffer = new Uint8Array(e.target.result);
    console.log("about to create spans for "+arrayBuffer.byteLength+" bytes");
    displayFileTick();
  };
  reader.readAsArrayBuffer(file);
}
var index = 0;
var arrayBuffer;
function displayFileTick() {
  var i = index;
  //for(var i = index; i < arrayBuffer.byteLength-multiple; i += multiple) {
    var r, g, b;
    var span = document.createElement("span");

    if(multiple == 3) {
      //8 8 8
      r = arrayBuffer[i+0].toString(16);
      if(r.length < 2) r = "0"+r;
      g = arrayBuffer[i+1].toString(16);
      if(g.length < 2) g = "0"+g;
      b = arrayBuffer[i+2].toString(16);
      if(b.length < 2) b = "0"+b;
      span.textContent = r+g+b;
    } else {
      //5 6 5
      var data = (arrayBuffer[i+0] << 8) | arrayBuffer[i+1];
      r = ((data >> 11)*8).toString(16);
      g = (((data >> 5) & 63)*4).toString(16);
      b = ((data & 31)*8).toString(16);

      data = data.toString(16);
      while(data.length < 4) data = "0"+data;
      span.textContent = data;
    }
    if(r.length < 2) r = "0"+r;
    if(g.length < 2) g = "0"+g;
    if(b.length < 2) b = "0"+b;
    span.style.color = "#"+r+g+b;
    container.appendChild(span);
  //}
  index += multiple;
  if(index + multiple < arrayBuffer.byteLength)
    requestAnimationFrame(displayFileTick);
  else
    container.style.width = document.documentElement.clientWidth+"px";
}

})();
