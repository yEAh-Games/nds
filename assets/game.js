function toggleText() {
    var text = document.getElementById("demo");
    if (text.style.display === "none") {
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }



  var scale = 1.0; // Initial scale value

document.getElementById("plus-button").addEventListener("click", function() {
  scale += 0.1; // Increase scale by 0.1
  document.body.style.transform = "scale(" + scale + ")";
  repositionButtons();
});

document.getElementById("minus-button").addEventListener("click", function() {
  scale -= 0.1; // Decrease scale by 0.1
  document.body.style.transform = "scale(" + scale + ")";
  repositionButtons();
});

function repositionButtons() {
  var buttonsContainer = document.getElementById("buttons-container");
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;
  var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollY = window.pageYOffset || document.documentElement.scrollTop;

  var containerWidth = buttonsContainer.offsetWidth;
  var containerHeight = buttonsContainer.offsetHeight;

  var rightOffset = (viewportWidth / scale) - containerWidth + scrollX;
  var bottomOffset = (viewportHeight / scale) - containerHeight + scrollY;

  buttonsContainer.style.right = rightOffset + "px";
  buttonsContainer.style.bottom = bottomOffset + "px";
}

// Initial positioning of the buttons
repositionButtons();

// Update the position on window resize and scroll
window.addEventListener("resize", function() {
  repositionButtons();
});

window.addEventListener("scroll", function() {
  repositionButtons();
});

document.getElementById("plus-button").addEventListener("click", function() {
  var currentScale = parseFloat(getComputedStyle(document.body).getPropertyValue("transform").split(',')[3]);
  var newScale = currentScale + 0.1; // Increase scale by 0.1
  document.body.style.transform = "scale(" + newScale + ")";
});

document.getElementById("minus-button").addEventListener("click", function() {
  var currentScale = parseFloat(getComputedStyle(document.body).getPropertyValue("transform").split(',')[3]);
  var newScale = currentScale - 0.1; // Decrease scale by 0.1
  document.body.style.transform = "scale(" + newScale + ")";
});
