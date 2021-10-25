// 2021 Somewhere Systems (S2) 
// Adapted from https://itnext.io/gyro-web-accessing-the-device-orientation-in-javascript-387da43eeb84

var Orientation = pc.createScript('orientation');

Orientation.attributes.add('exposeABGValues', { type: 'boolean' }); // Exposes the alpha, beta, gamma values globally for use in other scripts as Orientation.abg
Orientation.attributes.add('abg', { type: 'vec3' }); // Alpha, beta, gamma packed into a vec3
Orientation.attributes.add('orientationEnabled', { type: 'boolean' }); // Global variable, deviceOrientation tracking is active or inactive

var alpha = 0;
var beta = 0;
var gamma = 0;

Orientation.prototype.initialize = function () {
    Orientation.orientationEnabled = false;
    pc.app.on('click', this.askForDeviceOrientation, this);
};

Orientation.prototype.askForDeviceOrientation = function () {

    console.log("Requesting DeviceMotion access");

    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
            .then((state) => {
                if (state === 'granted') {
                    console.log('DeviceMotion access granted.');
                    window.addEventListener('devicemotion', handleOrientation);
                } else {
                    console.error('DeviceMotion access rejected.');
                }
            })
            .catch(console.error);
    } else {
        // Handle regular non iOS 13+ devices.
        window.addEventListener('devicemotion', handleOrientation);
    }
};

// update code called every frame
Orientation.prototype.update = function (dt) {
    if (window.DeviceOrientationEvent) {
        this.abg = new pc.Vec3(alpha, beta, gamma);
    } else {
        this.abg = new pc.Vec3(0, 0, 0);
    }
    if (this.exposeABGValues == true) {
        Orientation.abg = this.abg;
    }
};

function handleOrientation() {
    Orientation.orientationEnabled = true;
    window.addEventListener('deviceorientation', function (event) {
        alpha = event.alpha;
        beta = event.beta;
        gamma = event.gamma;
    });
}

