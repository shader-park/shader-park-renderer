import * as THREE from 'three';
// import * as OrbitControls from './OrbitControls.js'
import { Sculpture } from './Sculpture.js'
import { sourceGenerator } from 'sculpture-park-core'

export const renderScene = (container, sculptureData) => {
    // const container = document.querySelector('.container');
    const scene = new THREE.Scene();
    const texture = new THREE.TextureLoader().load('fonts/msdf3.png');
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(0, 0, 2);

    const raycaster = new THREE.Raycaster();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // renderer.setClearColor('0x000000');
    // render.setClearColor('0x000000');
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 1.25;
    // controls.zoomSpeed = 0.5;
    // controls.rotateSpeed = 0.5;
    let mouse = new THREE.Vector2();
    let intersectedObject = null;

    // container.addEventListener('mousedown', this.onMouseDown, false);
    // container.addEventListener('mouseup', this.onMouseUp, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    if (sculptureData.type === "js") {
        let source = sourceGenerator(sculptureData.shaderSource);
        sculptureData.shaderSource = source.geoGLSL + source.colorGLSL;
    }
    
    let objectsToRaycast = [];
    let sculpture = new Sculpture(1, texture, sculptureData);
    scene.add(sculpture.mesh);
    objectsToRaycast.push(sculpture.mesh);


    var pointLight = new THREE.PointLight(0xffffff, 0.5);
    scene.add(pointLight);
    pointLight.position.y = 40;
    pointLight.position.x = 40;

    window.scene = scene;


    window.addEventListener('resize', onWindowResize);
    renderer.setAnimationLoop((time) => renderScene(time));

    function renderScene(time) {
        raycaster.setFromCamera(mouse, camera);
        // let intersects = raycaster.intersectObjects(objectsToRaycast);
        // if (intersects.length > 0) {
        //     const firstIntersect = intersects[0].object;
        //     firstIntersect.material.side = THREE.FrontSide;
        //     const frontSideIntersection = raycaster.intersectObjects(objectsToRaycast);
        //     if (frontSideIntersection.length > 0) {
        //         firstIntersect.material.uniforms.mouse.value = frontSideIntersection[0].point.sub(firstIntersect.position);
        //     } else {
        //         firstIntersect.material.uniforms.mouse.value = camera.position.clone().sub(firstIntersect.position);
        //     }
        //     firstIntersect.material.side = THREE.BackSide;
        //     container.style.cursor = 'pointer';
        //     intersectedObject = firstIntersect;
        // } else {
        //     container.style.cursor = 'auto';
        //     intersectedObject = null;
        // }

        // controls.update();
        sculpture.update(time);
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    function onDocumentMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }
}