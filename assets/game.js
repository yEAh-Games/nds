window.onload = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'game.zip', true);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    if (xhr.status === 200) {
      var zipFile = xhr.response;

      // new zip
      var zip = new JSZip();

      // load
      zip.loadAsync(zipFile).then(function (zip) {

        // retrieve from archive
        zip.file("game.nds").async("blob").then(function (file) {

          // player.loadurl
          var objectUrl = URL.createObjectURL(file);
          document.getElementById("player").loadURL(objectUrl);
        });
      });
    }
  };

  xhr.send();
};

const resourceUrl = "game.zip";

function showOverlay() {
  document.getElementById("overlay").style.display = "flex";
}

function hideOverlay() {
  document.getElementById("overlay").style.display = "none";
}

function updateProgress(loaded, total) {
  const percentage = Math.round((loaded / total) * 100);
  const progressBar = document.querySelector("#progress-bar .progress-bar-fill");
  progressBar.style.width = percentage + "%";
}

// on loading failure
function showFailureMessage(errorCode) {
  const overlay = document.getElementById("overlay");
  if (errorCode !== 200) {
    const errorMessage = `<center><div>Failed to load the resource.<br>Error Code: <b>${errorCode}</b><br><br><button style="width:50px;height:25px" type='button' onclick="toggleText()"><b>Help</b></button><p id='demo' style='display: none;width:30%'>If you're on a school Chromebook, you most likely can't load the game because its storage is full and thus doesn't have enough allocated memory to load & cache large files in the browser.<br><br> You can fix this by clearing the disk. To do this, hold down <code>Esc+Refresh+Power</code> then press <code>Ctrl+D</code>. Once it loads, press enter, let it load, and press enter again. Then log in as normal. <br><br>Learn more by clicking the game page's help button, or by visiting <a href="https://arcade.yeahgames.net/tools/help/chromebook">https://arcade.yeahgames.net/tools/help/chromebook</a>.</P></div></center>`;
    overlay.innerHTML = errorMessage;
  } else {
    overlay.innerHTML = "Resource loaded successfully!";
  }
}

function toggleHiddenText() {
  const hiddenText = document.querySelector(".hidden-text");
  hiddenText.style.display = hiddenText.style.display === "none" ? "block" : "none";
}

function checkResourceLoading() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", resourceUrl, true);
  xhr.responseType = "blob";

  xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
      hideOverlay();
    } else {
      const errorCode = xhr.status;
      showFailureMessage(errorCode);
    }
  });

  xhr.addEventListener("progress", function (event) {
    if (event.lengthComputable) {
      updateProgress(event.loaded, event.total);
    }
  });

  xhr.addEventListener("error", function () {
    const errorCode = xhr.status;
    showFailureMessage(errorCode);
  });

  xhr.send();
}
showOverlay();
checkResourceLoading();


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
