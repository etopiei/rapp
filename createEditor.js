var myTextArea = document.getElementById('code');
var editor = CodeMirror.fromTextArea(myTextArea, {
    lineNumbers: true,
    theme: "base16-light"
  });

var modeInput = document.getElementById("mode");

function change() {

  console.log(modeInput.options[modeInput.selectedIndex].value);
  editor.setOption("mode", modeInput.options[modeInput.selectedIndex].value);

}
