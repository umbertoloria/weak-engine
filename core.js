const opengl = new OpenGL("#window");
const input = new Input(opengl);
document.addEventListener('keyup', input.keyUpHandle);
document.addEventListener('keydown', input.keyDownHandle);
window.onresize = input.windowResizeHandle;

opengl.setClearColor(0, 0, 0, 1);


opengl.addLayer(new MyLayer());


opengl.attachLayers();
input.init();
opengl.runLayers();
opengl.detachLayers();
