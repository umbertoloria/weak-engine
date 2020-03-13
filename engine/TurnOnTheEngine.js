// OpenGL Context
const openglCtx = new GLContextManager("#window");

// Layer Stack
const layerStack = new LayerStack();

// Input Bindings
function eventsCallback(e) {
	if (e.type === "WindowResize")
		openglCtx.setViewport(e.width, e.height);
	layerStack.event(e);
}

const input = new Input(eventsCallback);
document.addEventListener('keyup', input.keyUpHandle);
document.addEventListener('keydown', input.keyDownHandle);
window.onresize = input.windowResizeHandle;

// User definitions
layersDefinition(layerStack);
const clearColor = clearColorDefinition();
openglCtx.setClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);

// Initialization
layerStack.attachLayers(openglCtx);
input.init();

function gameloop() {
	let then = 0;

	function loop(now) {
		now *= 0.001;
		const ts = now - then;
		then = now;

		// if (now > 3) {
		// 	finalize();
		// 	return;
		// }

		layerStack.updateLayers(ts);
		openglCtx.clear();
		layerStack.drawLayers();
		requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);

}

gameloop();

// function finalize() {
// 	alert("addio");
// 	layerStack.detachLayers();
// }
