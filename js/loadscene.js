import { TransformControls } from "./jsm/controls/TransformControls.js";
import { DragControls } from "./jsm/controls/DragControls.js";
//声明基础变量
let container, stats;
let currentCamera, scene, renderer; /* 声明相机、场景、渲染器变量 */
let cameraPersp, cameraOrtho; //声明透视相机（三维展示）和正交相机
let control, orbit, dragcontrol; //可视化操作控件和鼠标控件
let particleLight; /* 声明点光源 */
let dae; /* 声明模型变量 */
let plant,
    robot,
    odg_robot,
    jg,
    thl,
    cnc,
    cnc2,
    doubleRobot,
    installLid,
    loadBox,
    removeBox,
    dr; //导入产线设备
let product = new Array(20);


    function init() {
        //初始化载入、一个是渲染器、一个是相机、一个是光源，附加地板
        container = document.createElement("div");
        document.body.appendChild(container); //？
        renderer = new THREE.WebGLRenderer(); //创建渲染器对象
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        stats = new Stats();
        container.appendChild(stats.dom);

        //3D图形使用透视摄像机，（垂直视野角度，锥体的长宽比（通常是给定窗口宽度/窗口高度），摄像机视锥体近端面，远端面）
        const aspect = window.innerWidth / window.innerHeight;
        cameraPersp = new THREE.PerspectiveCamera(45, aspect, 0.01, 20000);
        cameraOrtho = new THREE.OrthographicCamera(
            -12 * aspect,
            12 * aspect,
            12,
            -12,
            0.01,
            3000
        );
        currentCamera = cameraPersp;
        currentCamera.position.set(10, 300, 10); //设置相机位置

        scene = new THREE.Scene(); //创建场景对象

        // Grid 地板
        const grid = new THREE.GridHelper(20, 100, 0xffffff, 0x444444); //创建地板对象（每一个格子的长宽，每一个方向上格子的个数，地板的长宽，中心轴颜色，格子线框颜色）
        scene.add(grid); //将地板添加到场景中

        //创建了一个光源的网格对象:该点光源是球体几何对象，材质颜色为白色
        /* particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
         scene.add( particleLight );
         // Lights
         const light = new THREE.HemisphereLight( 0xffeebb, 0xffbb00 );//创建了一个半球光
         scene.add( light );
         const pointLight = new THREE.PointLight( 0xffffff, 0.3 );//创建一个点光源，光照强度为0.3
         particleLight.add( pointLight );//把这个点光源附在这个光源网格对象上？ */
        const light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(1, 1, 1);
        scene.add(light);

        // Add the COLLADA，加载模型

        scene.add(
            dae,
            odg_robot,
            thl,
            robot,
            cnc,
            cnc2,
            installLid,
            loadBox,
            removeBox,
            dr,
            jg
        ); //将设备模型加载到场景中
        scene.add(plant); //传送带模型
        //scene.add(product);

        for (var i = 0; i < 20; i++) {
            //p = product[i];
            scene.add(product[i]);
        }

        /* 载入控件 */
        //载入移动控件，并且写入事件
        control = new TransformControls(currentCamera, renderer.domElement);
        control.addEventListener("change", render);
        control.addEventListener("dragging-changed", function (event) {
            orbit.enabled = !event.value;
        });
        // OrbitControls，鼠标控件，并且写入事件
        orbit = new OrbitControls(currentCamera, renderer.domElement);
        orbit.maxPolarAngle = Math.PI * 0.5;
        orbit.minDistance = 10;
        orbit.maxDistance = 100;
        orbit.update();
        orbit.addEventListener("change", render);

        scene.add(control);
        //DragControls拖拽控件
        dragcontrol = new DragControls(
            scene.children,
            currentCamera,
            renderer.domElement
        );
        dragcontrol.addEventListener("hoveron", function (event) {
            control.attach(robot);
        });

        //scene.add( control );
        //control.attach(robot);

        //监听鼠标、键盘事件

        window.addEventListener("resize", onWindowResize);

        window.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case 81: // Q
                    control.setSpace(control.space === "local" ? "world" : "local");
                    break;

                case 16: // Shift
                    control.setTranslationSnap(100);
                    control.setRotationSnap(THREE.MathUtils.degToRad(15));
                    control.setScaleSnap(0.25);
                    break;

                case 87: // W
                    control.setMode("translate");
                    break;

                case 69: // E
                    control.setMode("rotate");
                    break;

                case 82: // R
                    control.setMode("scale");
                    break;

                case 67: // C
                    const position = currentCamera.position.clone();

                    currentCamera = currentCamera.isPerspectiveCamera
                        ? cameraOrtho
                        : cameraPersp;
                    currentCamera.position.copy(position);

                    orbit.object = currentCamera;
                    control.camera = currentCamera;

                    currentCamera.lookAt(
                        orbit.target.x,
                        orbit.target.y,
                        orbit.target.z
                    );
                    onWindowResize();
                    break;

                case 86: // V
                    const randomFoV = Math.random() + 0.1;
                    const randomZoom = Math.random() + 0.1;

                    cameraPersp.fov = randomFoV * 160;
                    cameraOrtho.bottom = -randomFoV * 500;
                    cameraOrtho.top = randomFoV * 500;

                    cameraPersp.zoom = randomZoom * 5;
                    cameraOrtho.zoom = randomZoom * 5;
                    onWindowResize();
                    break;

                case 187:
                case 107: // +, =, num+
                    control.setSize(control.size + 0.1);
                    break;

                case 189:
                case 109: // -, _, num-
                    control.setSize(Math.max(control.size - 0.1, 0.1));
                    break;

                case 88: // X
                    control.showX = !control.showX;
                    break;

                case 89: // Y
                    control.showY = !control.showY;
                    break;

                case 90: // Z
                    control.showZ = !control.showZ;
                    break;

                case 32: // Spacebar
                    control.enabled = !control.enabled;
                    break;
            }
        });

        window.addEventListener("keyup", function (event) {
            switch (event.keyCode) {
                case 16: // Shift
                    control.setTranslationSnap(null);
                    control.setRotationSnap(null);
                    control.setScaleSnap(null);
                    break;
            }
        });

        //最后启动设备动作
        setupTween();
    }