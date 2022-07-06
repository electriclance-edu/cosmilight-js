initializeClasses();
debug_generateResources();

function initializeClasses() {
  Resource.generateResources();
}
function debug_generateResources() {
  Resource.resources.forEach((resource)=>{
    var span = document.createElement("span");
    span.classList.add("char-" + resource.symbolSize);
    span.classList.add("char");
    span.classList.add("txt-" + resource.id);
    span.innerHTML = resource.symbol;
    document.getElementById("resources").appendChild(span);
  });
}

function buttonPress() {
  new Audio("resources/audio/thockTwo.mp3").play();
}
