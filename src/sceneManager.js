import * as THREE from 'three';

export class SceneManager {
    constructor(scene) {
        this.scene = scene
        this.setupEnv()
        this.setupCastle()
        this.setupGround()
        this.setupTree()
    }

    setupEnv() {
        this.scene.background = new THREE.Color(0xa8bbe6)

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, .75);
        this.scene.add(ambientLight);

        const intensity = 1;
        const light = new THREE.DirectionalLight(0xFFFFFF, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(5, 0, 0);
        this.scene.add(light);
        this.scene.add(light.target);
    }

    setupCastle() {
        const geometry = new THREE.BoxGeometry(6, 2, 6);
        const brickColor = new THREE.MeshPhongMaterial({ color: 0x9c8b71 });
        const cube = new THREE.Mesh(geometry, brickColor);
        cube.translateY(.5)
        this.scene.add(cube);

        const positions = [
            [3, 1, 3],
            [-3, 1, 3],
            [-3, 1, -3],
            [3, 1, -3],
        ]


        let cylinder = new THREE.CylinderGeometry(1, 1, 2.5)
        const roofColor = new THREE.MeshPhongMaterial({ color: 0x1e4562 });
        let cone = new THREE.ConeGeometry(1.2, 2.5)

        for (let pos of positions) {
            const tower = new THREE.Mesh(cylinder, brickColor)
            tower.position.set(...pos)
            this.scene.add(tower)

            const roof = new THREE.Mesh(cone, roofColor)
            roof.position.set(...pos)
            roof.translateY(2.5)
            this.scene.add(roof)
        }

        const doorGeometry = new THREE.BoxGeometry(1, 1, .1)
        const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x6d3409 })
        const door = new THREE.Mesh(doorGeometry, doorMaterial)
        door.position.set(0,.5,-3)
        this.scene.add(door)
    }

    setupGround() {
        const plane = new THREE.PlaneGeometry(30, 30);
        const grass = new THREE.MeshPhongMaterial({ color: 0x18581c })
        const surface = new THREE.Mesh(plane, grass)
        surface.rotateX(-Math.PI / 2)
        this.scene.add(surface)
        surface.translateZ(-0.005)

        const circle = new THREE.CircleGeometry(2)
        const water = new THREE.MeshPhongMaterial({ color: 0x88e1ff })
        const puddle1 = new THREE.Mesh(circle, water);
        const puddle2 = new THREE.Mesh(circle, water);
        puddle1.rotateX(-Math.PI / 2)
        puddle1.translateY(7.5)
        puddle2.rotateX(-Math.PI / 2)
        puddle2.translateY(10.5)
        // puddle2.translateX(1)
        this.scene.add(puddle1)
        puddle2.translateZ(0.005)
        this.scene.add(puddle2)
    }

    setupTree() {
        const logGeometry = new THREE.CylinderGeometry(.1, .25, 2.5)
        const wood = new THREE.MeshPhongMaterial({ color: 0x392600 })
        const log = new THREE.Mesh(logGeometry, wood)
        log.position.set(3, .2, -7)
        this.scene.add(log)

        const leafBody = new THREE.SphereGeometry(.75)
        const leafMaterial = new THREE.MeshPhongMaterial({ color: 0x468611 })
        const leafPositions = [
            [3.3, 1.9, -6.7],
            [2.7, 2.5, -6.7],
        ]

        for (let pos of leafPositions) {
            const leafs = new THREE.Mesh(leafBody, leafMaterial)
            leafs.position.set(...pos)
            this.scene.add(leafs)
        }

        const smallLeafBody = new THREE.SphereGeometry(.5)
        const smallLeaf = new THREE.Mesh(smallLeafBody, leafMaterial)
        smallLeaf.position.set(3, 2, -7.3)
        this.scene.add(smallLeaf)
}


    animate() {
    }
}
