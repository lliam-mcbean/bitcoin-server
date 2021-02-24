// import 'style.css'
// import * as THREE from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import * as $ from 'jquery'

// WEBGL CANVAS

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/static/BluePearl3.png')

const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height)
camera.position.z = 100
scene.add(camera)

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

let graphGroup = new THREE.Group()
let boxGrid = Math.ceil(Math.sqrt(1793))
let boxesArray = []
let stepX = -(boxGrid * 3) / 2
let stepZ = -(boxGrid * 3) / 2
let graphRotation = -Math.PI/4


for(let j = 0; j < boxGrid; j++) {
    for(let i = 0; i < boxGrid; i++) {
        const geometry = new THREE.BoxBufferGeometry(1,1,1)
        const material = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = stepX
        mesh.position.y = stepZ
        
        stepX += 3
        graphGroup.add(mesh)
        boxesArray.push(mesh)
    }
    stepZ += 3
    stepX = -(boxGrid * 3) / 2
}
graphGroup.rotation.x = graphRotation
scene.add(graphGroup)

const geometry = new THREE.PlaneGeometry(1000,1000)
const material = new THREE.MeshBasicMaterial({
    color: '#000000'
})
const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = graphRotation
scene.add(mesh)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// BITCOIN PRICE COUNTER

let bitcoinDate = document.querySelector('.bitcoin-date')
let bitcoinPrice = document.querySelector('.bitcoin-price')

let numericalBitcoinPrice = 0

$.ajax({
    type: "GET",
    url: "http://localhost:3000/public",
    dataType: "json",
    success: function(data) {
        let count = 0
        let trueCount = 0
        let onlyOnce = true

        for(let i = 0; i < data.length; i++) {
            if(data[i]['price(USD)'] > 0 && onlyOnce) {
                count = i
                trueCount = i
                onlyOnce = false
            }
        }

        const bitcoinArrayLooper = setInterval(() => {
            bitcoinDate.innerHTML = data[count]['date']
            bitcoinPrice.innerHTML = data[count]['price(USD)'] + ' $'
            numericalBitcoinPrice = data[count]['price(USD)']
            boxesArray[count - trueCount].scale.set(1,1,numericalBitcoinPrice/100)
            
            count++

            if(count === data.length) {
                clearInterval(bitcoinArrayLooper)
            }
        }, 1000);
    },
    error: function (request, status, error) {
        alert(error);
    }
 });

const clock = new THREE.Clock()

const tick = () => {
    let elapsedTime = clock.getElapsedTime()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()
