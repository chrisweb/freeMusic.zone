/**
 * 
 * http://requirejs.org/
 * 
 * @param {type} param
 */
require.config({
    baseUrl: 'javascripts/',
    paths: {
        'jquery': '../vendor/jquery/dist/jquery',
        'three': '../vendor/three/three',
        'GPUParticleSystem': 'THREE/GPUParticleSystem',
        'TrackballControls': 'THREE/TrackballControls',
        'dat': 'vendor/dat.gui/build/dat.gui'
    }
    
});

require([
    'jquery',
    'three',
    'GPUParticleSystem',
    'TrackballControls',
    'dat'
	
], function (
    $,
    THREE,
    GPUParticleSystem,
    TrackballControls,
    Dat
) {

    'use strict';
	
    var camera;
    var tick = 0;
    var scene;
    var renderer;
    var clock = new THREE.Clock(true);
    var controls;
    var $animationContainer = $('.animationContainer');
    var gui = new Dat.GUI();
    var options;
    var spawnerOptions;
    var particleSystem;
    
    var startUp = function startUpFunction() {

        var textures = [
            'textures/perlin-512.png',
            'textures/particle2.png'
        ];

        imagesLoader(textures, function imagesLoadedCallback(error) {

            if (!error) {

                initialize();
                animate();

            }

        });

    };

    var imagesLoader = function imagesLoader(images, callback) {

        var imagesCount = images.length;
        var loadedCount = 0;
        var i;

        for (i = 0; i < imagesCount; i++) {

            var imagePath = images[i];
            
            var $image = $(new Image());

            $image.on('load', function imageLoadedCallback() {

                loadedCount++;

                if(loadedCount === imagesCount) {
                    callback(false);
                }

            });

            $image.prop('src', imagePath);

        }

    };

    function initialize() {

        camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 100;

        scene = new THREE.Scene();

        // The GPU Particle system extends THREE.Object3D, and so you can use it as you would
        // any other scene graph component.Particle positions will be relative to the
        // position of the particle system, but you will probably only need one system for
        // your whole scene
        particleSystem = new THREE.GPUParticleSystem({
            maxParticles: 250000
        });

        scene.add(particleSystem);

        // options passed during each spawned
        options = {
            position: new THREE.Vector3(),
            positionRandomness: .3,
            velocity: new THREE.Vector3(),
            velocityRandomness: .5,
            color: 0xaa88ff,
            colorRandomness: .2,
            turbulence: .5,
            lifetime: 2,
            size: 5,
            sizeRandomness: 1
        };

        spawnerOptions = {
            spawnRate: 15000,
            horizontalSpeed: 1.5,
            verticalSpeed: 1.33,
            timeScale: 1
        };

        gui.add(options, 'velocityRandomness', 0, 3);
        gui.add(options, 'positionRandomness', 0, 3);
        gui.add(options, 'size', 1, 20);
        gui.add(options, 'sizeRandomness', 0, 25);
        gui.add(options, 'colorRandomness', 0, 1);
        gui.add(options, 'lifetime', .1, 10);
        gui.add(options, 'turbulence', 0, 1);
        gui.add(spawnerOptions, 'spawnRate', 10, 30000);
        gui.add(spawnerOptions, 'timeScale', -1, 1);

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        $animationContainer.append(renderer.domElement);

        // setup controls
        controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 5.0;
        controls.zoomSpeed = 2.2;
        controls.panSpeed = 1;
        controls.dynamicDampingFactor = 0.3;

        window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {

        requestAnimationFrame(animate);
        controls.update();

        var delta = clock.getDelta() * spawnerOptions.timeScale;
        tick += delta;

        if (tick < 0) tick = 0;

        if (delta > 0) {

            options.position.x = Math.sin(tick * spawnerOptions.horizontalSpeed) * 20;
            options.position.y = Math.sin(tick * spawnerOptions.verticalSpeed) * 10;
            options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 5;

            for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {

                // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                particleSystem.spawnParticle(options);

            }

        }

        particleSystem.update(tick);

        render();

    }

    function render() {
        renderer.render(scene, camera);
    }

    startUp();

});