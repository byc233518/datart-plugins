function ThreeDModelViewerPlugin({ dHelper }) { // dHelper might provide utility functions from Datart

  // 1. Metadata and Icon
  const svgIcon = `<svg t="1648382327134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3998" width="200" height="200"><path d="M864.757183 264.990257l-319.895751-191.573154c-10.116405-6.057973-21.48943-9.086959-32.861432-9.086959a63.915705 63.915705 0 0 0-32.861432 9.086959l-319.895751 191.573154a63.961754 63.961754 0 0 0-31.099298 54.873771v390.954133a63.960731 63.960731 0 0 0 31.980365 55.391565l319.895751 184.692442c9.894348 5.713119 20.937868 8.569166 31.980365 8.569166s22.086018-2.856048 31.980365-8.569166l319.895751-184.692442a63.959707 63.959707 0 0 0 31.980365-55.391565v-390.954133a63.959707 63.959707 0 0 0-31.099298-54.873771zM512 128.289851l288.778032 172.937725-289.062511 173.228343-288.603047-173.161828 288.887526-173.00424z m-319.895751 228.989322l287.621697 172.573427v347.022575L192.104249 710.817138V357.279173zM543.686676 877.214912V529.862833l288.209075-172.71669v353.670995L543.686676 877.214912z" p-id="3999"></path></svg>`;


  const pluginId = 'datart-3d-model-viewer-singlefile'; // Unique ID

  return {
    // --------------------------------------------------
    // Plugin Metadata (Similar to datart.config.js)
    // --------------------------------------------------
    meta: {
      id: pluginId,
      name: '3D车间', // Plugin Name
      icon: svgIcon,
      requirements: [ // Define data requirements (can be minimal initially)
        {
          // Example: Allow any dimension/metric, primarily for triggering updates
          group: 1,     // Requires at least one dimension
          aggregate: 1, // Requires at least one metric
        },
      ],
    },

    // --------------------------------------------------
    // External Dependencies (Loaded by Datart)
    // --------------------------------------------------
    dependency: [
      // Use specific, stable versions from a CDN like unpkg or jsdelivr
      "/custom-chart-plugins/libs/threejs/three.min.js",
      "/custom-chart-plugins/libs/threejs/stats.min.js",
      "/custom-chart-plugins/libs/threejs/GLTFLoader.js",
      "/custom-chart-plugins/libs/threejs/OrbitControls.js",
      // Add other loaders (FBXLoader, OBJLoader, MTLLoader) or libs if needed
      // 'https://unpkg.com/three@0.150.1/examples/jsm/loaders/FBXLoader.js',
    ],

    // --------------------------------------------------
    // Configuration (User settings in Datart UI)
    // --------------------------------------------------
    config: {
      datas: [
        // Keep data config minimal if not immediately binding data to the model
        {
          label: 'dimension', // Or a more descriptive name like 'triggerDimension'
          key: 'dimension',
          required: false, // Make optional if just used to trigger updates
          type: 'group',
          limit: 1, // Limit to one for simplicity if not used for binding
        },
        {
          label: 'metrics', // Or 'triggerMetric'
          key: 'metrics',
          required: false, // Optional
          type: 'aggregate',
          limit: 1,
        },
        // You can add more specific data configs later for binding
        // (e.g., equipmentId, statusValue as shown in the previous example)
      ],
      styles: [
        {
          label: 'style.group.basic',
          key: 'basic',
          comType: 'group',
          rows: [
            {
              label: 'style.modelUrl',
              key: 'modelUrl',
              default: '',
              comType: 'input',
              options: {
                placeholder: 'Enter URL of .glb or .gltf file',
              },
              required: true,
            },
            {
              label: 'style.backgroundColor',
              key: 'backgroundColor',
              default: '#f0f0f0',
              comType: 'fontColor',
            },
            {
              label: 'style.cameraFOV',
              key: 'cameraFOV',
              default: 60,
              comType: 'inputNumber',
              options: {
                min: 30,
                max: 120,
                step: 1
              }
            },
            {
              label: 'style.cameraNear',
              key: 'cameraNear',
              default: 0.1,
              comType: 'inputNumber',
              options: {
                min: 0.01,
                max: 1,
                step: 0.1
              }
            },
            {
              label: 'style.cameraFar',
              key: 'cameraFar',
              default: 2000,
              comType: 'inputNumber',
              options: {
                min: 100,
                max: 10000,
                step: 100
              }
            },
            {
              label: 'style.cameraPosition',
              key: 'cameraPosition',
              default: { x: 0, y: 1.5, z: 5 },
              comType: 'group',
              rows: [
                {
                  label: 'style.cameraPositionX',
                  key: 'x',
                  default: 0,
                  comType: 'inputNumber',
                  options: {
                    min: -10,
                    max: 10,
                    step: 0.1
                  }
                },
                {
                  label: 'style.cameraPositionY',
                  key: 'y',
                  default: 1.5,
                  comType: 'inputNumber',
                  options: {
                    min: 0,
                    max: 10,
                    step: 0.1
                  }
                },
                {
                  label: 'style.cameraPositionZ',
                  key: 'z',
                  default: 5,
                  comType: 'inputNumber',
                  options: {
                    min: 1,
                    max: 20,
                    step: 0.1
                  }
                }
              ]
            },
            {
              label: 'style.cameraTarget',
              key: 'cameraTarget',
              default: { x: 0, y: 0, z: 0 },
              comType: 'group',
              rows: [
                {
                  label: 'style.cameraTargetX',
                  key: 'x',
                  default: 0,
                  comType: 'inputNumber',
                  options: {
                    min: -10,
                    max: 10,
                    step: 0.1
                  }
                },
                {
                  label: 'style.cameraTargetY',
                  key: 'y',
                  default: 0,
                  comType: 'inputNumber',
                  options: {
                    min: -10,
                    max: 10,
                    step: 0.1
                  }
                },
                {
                  label: 'style.cameraTargetZ',
                  key: 'z',
                  default: 0,
                  comType: 'inputNumber',
                  options: {
                    min: -10,
                    max: 10,
                    step: 0.1
                  }
                }
              ]
            }
          ]
        },
        {
          label: 'style.group.interaction',
          key: 'interaction',
          comType: 'group',
          rows: [
            {
              label: 'style.enableControls',
              key: 'enableControls',
              default: true,
              comType: 'switch',
            }
          ]
        },
        {
          label: 'style.group.lighting',
          key: 'lighting',
          comType: 'group',
          rows: [
            {
              label: 'style.ambientLightIntensity',
              key: 'ambientLightIntensity',
              default: 0.6,
              comType: 'inputNumber',
              options: {
                min: 0,
                max: 2,
                step: 0.1
              }
            },
            {
              label: 'style.directionalLightIntensity',
              key: 'directionalLightIntensity',
              default: 0.8,
              comType: 'inputNumber',
              options: {
                min: 0,
                max: 2,
                step: 0.1
              }
            },
            {
              label: 'style.directionalLightColor',
              key: 'directionalLightColor',
              default: '#ffffff',
              comType: 'fontColor'
            }
          ]
        },
        {
          label: 'style.group.controls',
          key: 'controls',
          comType: 'group',
          rows: [
            {
              label: 'style.enableDamping',
              key: 'enableDamping',
              default: true,
              comType: 'switch'
            },
            {
              label: 'style.dampingFactor',
              key: 'dampingFactor',
              default: 0.05,
              comType: 'inputNumber',
              options: {
                min: 0.01,
                max: 0.5,
                step: 0.01
              }
            },
            {
              label: 'style.enableAutoRotate',
              key: 'enableAutoRotate',
              default: false,
              comType: 'switch'
            },
            {
              label: 'style.autoRotateSpeed',
              key: 'autoRotateSpeed',
              default: 2.0,
              comType: 'inputNumber',
              options: {
                min: 0.1,
                max: 10,
                step: 0.1
              }
            }
          ]
        }
      ],
      i18ns: [
        {
          lang: 'zh-CN',
          translation: {
            style: {
              group: { 
                basic: '基础设置', 
                interaction: '交互设置',
                lighting: '光照设置',
                controls: '控制设置'
              },
              modelUrl: '模型 URL',
              backgroundColor: '背景颜色',
              enableControls: '启用鼠标交互',
              cameraFOV: '相机视场角',
              cameraNear: '相机近平面',
              cameraFar: '相机远平面',
              ambientLightIntensity: '环境光强度',
              directionalLightIntensity: '平行光强度',
              directionalLightColor: '平行光颜色',
              enableDamping: '启用阻尼效果',
              dampingFactor: '阻尼系数',
              enableAutoRotate: '启用自动旋转',
              autoRotateSpeed: '自动旋转速度',
              cameraPosition: '相机位置',
              cameraPositionX: '相机X坐标',
              cameraPositionY: '相机Y坐标',
              cameraPositionZ: '相机Z坐标',
              cameraTarget: '相机目标点',
              cameraTargetX: '目标X坐标',
              cameraTargetY: '目标Y坐标',
              cameraTargetZ: '目标Z坐标'
            }
          }
        },
        {
          lang: 'en-US',
          translation: {
            style: {
              group: { 
                basic: 'Basic Settings', 
                interaction: 'Interaction Settings',
                lighting: 'Lighting Settings',
                controls: 'Control Settings'
              },
              modelUrl: 'Model URL',
              backgroundColor: 'Background Color',
              enableControls: 'Enable Mouse Interaction',
              cameraFOV: 'Camera FOV',
              cameraNear: 'Camera Near Plane',
              cameraFar: 'Camera Far Plane',
              ambientLightIntensity: 'Ambient Light Intensity',
              directionalLightIntensity: 'Directional Light Intensity',
              directionalLightColor: 'Directional Light Color',
              enableDamping: 'Enable Damping',
              dampingFactor: 'Damping Factor',
              enableAutoRotate: 'Enable Auto Rotate',
              autoRotateSpeed: 'Auto Rotate Speed',
              cameraPosition: 'Camera Position',
              cameraPositionX: 'Camera X',
              cameraPositionY: 'Camera Y',
              cameraPositionZ: 'Camera Z',
              cameraTarget: 'Camera Target',
              cameraTargetX: 'Target X',
              cameraTargetY: 'Target Y',
              cameraTargetZ: 'Target Z'
            }
          }
        }
      ]
    },

    // --------------------------------------------------
    // Internal Plugin State (Managed by the instance)
    // --------------------------------------------------
    container: null,    // DOM element
    window: null,       // Reference to window object from context
    document: null,     // Reference to document object from context
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    model: null,
    reqId: null,        // For requestAnimationFrame
    clock: null,        // For animations or controls damping
    THREE: null,        // To store reference loaded from window
    GLTFLoader: null,   // To store reference
    OrbitControls: null,// To store reference
    options: {},        // To store current options

    // --------------------------------------------------
    // Lifecycle Methods
    // --------------------------------------------------

    onMount(options, context) {
      if (options.containerId === undefined || !context.document || !context.window) {
        console.error('3D Viewer Error: Invalid context or container ID.');
        return;
      }
      this.window = context.window;
      this.document = context.document;
      this.container = this.document.getElementById(options.containerId);

      // --- Crucial: Access dependencies loaded into the window scope ---
      this.THREE = context.window.THREE;
      // Loaders/Controls might be attached to THREE or exist globally depending on how Datart loads UMD/examples
      // Check context.window for THREE.GLTFLoader, THREE.OrbitControls OR window.GLTFLoader etc.
      // Assuming they are attached to THREE for this example based on common patterns
      this.GLTFLoader = context.window.THREE?.GLTFLoader || context.window.GLTFLoader;
      this.OrbitControls = context.window.THREE?.OrbitControls || context.window.OrbitControls;
      // --------------------------------------------------------------------

      if (!this.THREE || !this.GLTFLoader || !this.OrbitControls) {
        console.error('3D Viewer Error: Three.js or required components (GLTFLoader, OrbitControls) not loaded. Check dependency URLs and versions.');
        this.displayError('Failed to load 3D library components.');
        return;
      }

      this.clock = new this.THREE.Clock(); // Initialize clock here
      this.updateOptions(options); // Store initial options

      try {
        this.initThree();
        this.loadModel();
        this.animate();
      } catch (error) {
        console.error("Error during chart initialization:", error);
        this.displayError(`Initialization failed: ${error.message}`);
      }
    },

    onUpdated(options, context) {
      if (!this.renderer || !this.scene || !this.camera) {
        console.warn('onUpdated called before mount finished or after unmount.');
        return; // Not ready yet or already cleaned up
      }

      const oldOptions = this.options;
      this.updateOptions(options); // Store new options

      // Check for relevant changes
      const modelUrlChanged = this.getStyleValue('modelUrl') !== this.getStyleValue('modelUrl', oldOptions);
      const bgColorChanged = this.getStyleValue('backgroundColor') !== this.getStyleValue('backgroundColor', oldOptions);
      const enableControlsChanged = this.getStyleValue('enableControls') !== this.getStyleValue('enableControls', oldOptions);

      try {
        if (bgColorChanged) {
          const bgColor = new this.THREE.Color(this.getStyleValue('backgroundColor', this.options, '#f0f0f0'));
          this.scene.background = bgColor;
          if (this.renderer) {
            this.renderer.setClearColor(bgColor);
          }
        }

        if (enableControlsChanged && this.controls) {
          this.controls.enabled = this.getStyleValue('enableControls');
        }

        if (modelUrlChanged) {
          console.log("Model URL changed, reloading...");
          this.cleanupModel(); // Clean previous model
          this.loadModel();    // Load new one
        } else {
          // Handle other non-model-url style updates if needed
          // e.g., lighting intensity, etc.
        }

        // Camera settings
        const cameraFOVChanged = this.getStyleValue('cameraFOV') !== this.getStyleValue('cameraFOV', oldOptions);
        const cameraNearChanged = this.getStyleValue('cameraNear') !== this.getStyleValue('cameraNear', oldOptions);
        const cameraFarChanged = this.getStyleValue('cameraFar') !== this.getStyleValue('cameraFar', oldOptions);

        if (cameraFOVChanged || cameraNearChanged || cameraFarChanged) {
          this.camera.fov = this.getStyleValue('cameraFOV', this.options, 60);
          this.camera.near = this.getStyleValue('cameraNear', this.options, 0.1);
          this.camera.far = this.getStyleValue('cameraFar', this.options, 2000);
          this.camera.updateProjectionMatrix();
        }

        // Lighting settings
        const ambientIntensityChanged = this.getStyleValue('ambientLightIntensity') !== this.getStyleValue('ambientLightIntensity', oldOptions);
        const directionalIntensityChanged = this.getStyleValue('directionalLightIntensity') !== this.getStyleValue('directionalLightIntensity', oldOptions);
        const directionalColorChanged = this.getStyleValue('directionalLightColor') !== this.getStyleValue('directionalLightColor', oldOptions);

        if (ambientIntensityChanged || directionalIntensityChanged || directionalColorChanged) {
          // Update ambient light
          const ambientLight = this.scene.children.find(child => child.isAmbientLight);
          if (ambientLight) {
            ambientLight.intensity = this.getStyleValue('ambientLightIntensity', this.options, 0.6);
          }

          // Update directional light
          const directionalLight = this.scene.children.find(child => child.isDirectionalLight);
          if (directionalLight) {
            directionalLight.intensity = this.getStyleValue('directionalLightIntensity', this.options, 0.8);
            directionalLight.color.set(this.getStyleValue('directionalLightColor', this.options, '#ffffff'));
          }
        }

        // Controls settings
        const enableDampingChanged = this.getStyleValue('enableDamping') !== this.getStyleValue('enableDamping', oldOptions);
        const dampingFactorChanged = this.getStyleValue('dampingFactor') !== this.getStyleValue('dampingFactor', oldOptions);
        const enableAutoRotateChanged = this.getStyleValue('enableAutoRotate') !== this.getStyleValue('enableAutoRotate', oldOptions);
        const autoRotateSpeedChanged = this.getStyleValue('autoRotateSpeed') !== this.getStyleValue('autoRotateSpeed', oldOptions);

        if (this.controls && (enableDampingChanged || dampingFactorChanged || enableAutoRotateChanged || autoRotateSpeedChanged)) {
          this.controls.enableDamping = this.getStyleValue('enableDamping', this.options, true);
          this.controls.dampingFactor = this.getStyleValue('dampingFactor', this.options, 0.05);
          this.controls.autoRotate = this.getStyleValue('enableAutoRotate', this.options, false);
          this.controls.autoRotateSpeed = this.getStyleValue('autoRotateSpeed', this.options, 2.0);
        }

        // Camera position and target settings
        const cameraPositionChanged = JSON.stringify(this.getStyleValue('cameraPosition')) !== 
                                    JSON.stringify(this.getStyleValue('cameraPosition', oldOptions));
        const cameraTargetChanged = JSON.stringify(this.getStyleValue('cameraTarget')) !== 
                                   JSON.stringify(this.getStyleValue('cameraTarget', oldOptions));

        if (cameraPositionChanged || cameraTargetChanged) {
          const cameraPosition = this.getStyleValue('cameraPosition', this.options, { x: 0, y: 1.5, z: 5 });
          const cameraTarget = this.getStyleValue('cameraTarget', this.options, { x: 0, y: 0, z: 0 });

          this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
          
          if (this.controls) {
            this.controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
            this.controls.update();
          }
        }

        // --- Data Handling (Placeholder) ---
        // If data configuration exists and data changes, process it here
        // const dataChanged = JSON.stringify(options.data) !== JSON.stringify(oldOptions.data);
        // if (dataChanged) {
        //    console.log("Data changed:", options.data);
        //    this.applyDataToModel(options.data); // Implement this function
        // }
        // --- End Data Handling ---

      } catch (error) {
        console.error("Error during chart update:", error);
        this.displayError(`Update failed: ${error.message}`);
      }
    },

    onResize(options, context) {
      if (!this.renderer || !this.camera || !this.container) return;

      this.updateOptions(options);
      const { width, height } = this.container.getBoundingClientRect();

      if (width > 0 && height > 0) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      } else {
        console.warn('onResize called with zero width or height.');
      }
    },

    onUnMount() {
      console.log("Unmounting 3D Model Viewer...");
      if (this.reqId) {
        this.window?.cancelAnimationFrame(this.reqId); // Use window reference
        this.reqId = null;
      }
      this.cleanupModel();
      this.cleanupThree();

      // Clear internal state
      this.container = null;
      this.window = null;
      this.document = null;
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.controls = null;
      this.model = null;
      this.clock = null;
      this.THREE = null;
      this.GLTFLoader = null;
      this.OrbitControls = null;
      this.options = {};
      console.log("3D Model Viewer unmounted and cleaned up.");
    },

    // --------------------------------------------------
    // Helper Methods (Internal Implementation Details)
    // --------------------------------------------------

    updateOptions(newOptions) {
      this.options = { ...newOptions }; // Shallow copy is usually enough
      // Update container ref just in case, though unlikely to change in practice
      if (newOptions.containerId && this.document) {
        this.container = this.document.getElementById(newOptions.containerId) || this.container;
      }
    },

    getStyleValue(key, opts = this.options, defaultValue = undefined) {
      // Access style config from the stored options
      return opts?.config?.styles?.flatMap(s => s.rows).find(r => r.key === key)?.value ?? defaultValue;
    },

    displayError(message) {
      if (this.container) {
        // Clear previous content and display error
        this.container.innerHTML = `<div style="color: red; padding: 20px; font-family: sans-serif; text-align: center;">Error: ${message}<br/>Please check console for details.</div>`;
      } else {
        console.error("Cannot display error, container not available.");
      }
    },

    initThree() {
      if (!this.container || !this.THREE) return; // Guard

      const { width, height } = this.container.getBoundingClientRect();
      if (width <= 0 || height <= 0) {
        console.error("Cannot init Three.js with zero width or height.");
        this.displayError("Chart container has invalid dimensions.");
        throw new Error("Invalid container dimensions"); // Stop initialization
      }
      const bgColor = new this.THREE.Color(this.getStyleValue('backgroundColor', this.options, '#f0f0f0'));

      // Scene
      this.scene = new this.THREE.Scene();
      this.scene.background = bgColor;

      // Camera
      this.camera = new this.THREE.PerspectiveCamera(60, width / height, 0.1, 2000); // Adjusted FOV and far plane
      this.camera.position.set(0, 1.5, 5); // Sensible default position

      // Renderer
      this.renderer = new this.THREE.WebGLRenderer({ antialias: true, alpha: true }); // Use alpha for potential transparency
      this.renderer.setPixelRatio(this.window?.devicePixelRatio || 1);
      this.renderer.setSize(width, height);
      this.renderer.outputEncoding = this.THREE.sRGBEncoding; // Correct color space
      this.container.innerHTML = ''; // Clear previous content (like error messages)
      this.container.appendChild(this.renderer.domElement);

      // Controls
      this.controls = new this.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enabled = this.getStyleValue('enableControls', this.options, true);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.screenSpacePanning = true; // Usually preferred
      this.controls.target.set(0, 1, 0); // Aim slightly above the ground
      this.controls.update();

      // Lights
      const ambientLight = new this.THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      const directionalLight = new this.THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 7.5);
      this.scene.add(directionalLight);

      console.log("Three.js initialized successfully.");
    },

    loadModel() {
      if (!this.scene || !this.GLTFLoader) {
        console.error("Cannot load model: Scene or GLTFLoader not initialized.");
        return;
      }

      const modelUrl = this.getStyleValue('modelUrl');
      if (!modelUrl) {
        console.warn('Model URL is not provided.');
        this.displayError('Please provide a Model URL in the chart settings.');
        return;
      }

      // Display loading indicator
      // this.displayLoading();

      const loader = new this.GLTFLoader();
      loader.load(
        modelUrl,
        // onSuccess
        (gltf) => {
          console.log('Model loaded:', modelUrl);
          this.cleanupModel();
          this.model = gltf.scene;

          // **** TEMPORARY TEST: Force basic material ****
          // console.warn("!!! Overriding model material for testing !!!");
          // const overrideMaterial = new this.THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true }); // Magenta wireframe
          // this.model.traverse((child) => {
          //   if (child.isMesh) {
          //     child.material = overrideMaterial;
          //   }
          // });
          // *******************************************
          this.centerAndScaleModel(this.model);
          this.scene.add(this.model);
        },
        // onProgress (optional)
        (xhr) => {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          console.log(`Model loading progress: ${percent}%`);
          // this.updateLoading(percent);
          // if (percent === 100) {
          //   this.hideLoading();
          // }
        },
        // onError
        (error) => {
          console.error('Error loading model:', error);
          this.displayError(`Failed to load model: ${modelUrl}. Check URL and browser console.`);
          // Keep the error message displayed
        }
      );
    },

    hideLoading() {
      if (this.container) {
        this.container.style.display = 'none';
      }
    },

    displayLoading () {
      if (this.container) {
        this.container.innerHTML = `<div id="__loading_indicator__" style="padding: 20px; text-align: center; font-family: sans-serif;">Loading 3D Model... (0%)</div>`;
      }
    },

    updateLoading(percentage) {
      if (this.container) {
        const indicator = this.document?.getElementById('__loading_indicator__');
        if (indicator) {
          indicator.textContent = `Loading 3D Model... (${percentage}%)`;
        }
      }
    },

    animate() {
      // Check if unmounted
      if (!this.window || !this.renderer || !this.scene || !this.camera) {
        return;
      }
      this.reqId = this.window.requestAnimationFrame(this.animate.bind(this));

      const delta = this.clock?.getDelta() || 0.016; // Get time delta

      if (this.controls && this.controls.enabled) {
        this.controls.update(delta); // Update controls (needed for damping)
      }

      // Add other animations here if needed (e.g., mixer.update(delta) for GLTF animations)

      this.renderer.render(this.scene, this.camera);
    },

    cleanupThree() {
      if (this.renderer) {
        this.renderer.dispose();
        // Remove canvas from DOM
        if (this.renderer.domElement && this.renderer.domElement.parentNode === this.container) {
          try { // Add try-catch for robustness during cleanup
            this.container?.removeChild(this.renderer.domElement);
          } catch (e) {
            console.warn("Could not remove renderer DOM element during cleanup:", e);
          }
        }
        this.renderer = null;
      }
      if (this.controls) {
        this.controls.dispose();
        this.controls = null;
      }
      // Scene, camera, clock don't have explicit top-level dispose methods
      // but their contents should be handled by cleanupModel
      this.scene = null;
      this.camera = null;
      this.clock = null;
      console.log('Three.js core resources cleaned up.');
    },

    cleanupModel() {
      if (this.model && this.scene) {
        this.scene.remove(this.model);
        // Dispose geometries, materials, textures
        this.model.traverse((object) => {
          if (object.isMesh) {
            object.geometry?.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => this.disposeMaterial(material));
              } else {
                this.disposeMaterial(object.material);
              }
            }
          }
        });
        this.model = null;
        console.log('Previous model resources cleaned up.');
      }
    },

    disposeMaterial(material) {
      if (!material) return;
      material.dispose();
      // Dispose textures
      for (const key of Object.keys(material)) {
        const value = material[key];
        if (value && typeof value === 'object' && value.isTexture) {
          value.dispose();
        }
      }
    },

    centerAndScaleModel(object) {
      // Ensure THREE and camera are available from 'this' context
      if (!this.THREE || !this.camera) {
          console.error("THREE library or camera not available in centerAndScaleModel.");
          return;
      }

      // Calculate bounding box
      const box = new this.THREE.Box3().setFromObject(object);
      const center = box.getCenter(new this.THREE.Vector3());
      const size = box.getSize(new this.THREE.Vector3());

      // Simple check for invalid bounding box (size <= 0 or NaN/Infinity)
      if (!isFinite(size.x) || !isFinite(size.y) || !isFinite(size.z) || size.x <= 0 || size.y <= 0 || size.z <= 0) {
         console.warn("Model bounding box calculation resulted in invalid size. Scaling/Centering skipped.", size);
         // Reset position/scale to avoid issues if box is invalid
         object.position.set(0, 0, 0);
         object.scale.set(1, 1, 1);
         if (this.controls) {
            // Reset target as well if controls exist
            this.controls.target.set(0, 0, 0);
         }
         return; // Stop further processing for this invalid model size
       }

      // --- Scaling Calculation ---
      const maxDim = Math.max(size.x, size.y, size.z);
      const desiredSize = 5; // Target size for the largest dimension in the scene (adjust this value as needed)
      const scale = desiredSize / maxDim;

      // --- Apply Scaling and Centering ---
      object.scale.set(scale, scale, scale);
      // Recalculate box *after* scaling to get the correct center for translation
      const scaledBox = new this.THREE.Box3().setFromObject(object);
      const scaledCenter = scaledBox.getCenter(new this.THREE.Vector3());
      // Translate the object so its new center is at the world origin (0,0,0)
      object.position.sub(scaledCenter);

      // --- Adjust Camera and Controls ---
      // Calculate a suitable distance to view the object based on its scaled size and camera FOV
      const distanceFactor = 1.5; // How far back the camera should be relative to object size (can adjust)
      const fovRadians = this.THREE.MathUtils.degToRad(this.camera.fov);
      // Use the scaled size for distance calculation
      const scaledMaxDim = maxDim * scale; // Size of the largest dimension after scaling
      // Calculate distance needed to fit the scaled object based on FOV
      // Uses Math.tan(fov/2) = (size/2) / distance => distance = (size/2) / tan(fov/2)
      const distance = (scaledMaxDim / 2) / Math.tan(fovRadians / 2);

      // Set camera position:
      // X: Align with the object's origin X (which is now 0)
      // Y: Look slightly above the object's origin Y (using half its scaled height for a better default view)
      // Z: Position it back along the Z-axis based on calculated distance + factor
      this.camera.position.set(
         object.position.x, // Should be 0 after centering
         object.position.y + (scaledBox.max.y - scaledBox.min.y) * 0.5, // Slightly elevated view
         object.position.z + distance * distanceFactor // Pull camera back along Z
      );

      // Update OrbitControls target if they exist
      if (this.controls) {
        // Set the controls target to the object's new origin (0,0,0 after centering)
        this.controls.target.copy(object.position);
        this.controls.update(); // Apply changes to controls internals

        // --- ADDED DEBUG LOGS ---
        console.log('Final Camera Position:', JSON.stringify(this.camera.position)); // Log final camera pos
        console.log('Final Controls Target:', JSON.stringify(this.controls.target)); // Log final target
        // -------------------------
      }

      // Adjust camera's far clipping plane to ensure the model isn't cut off
      // Make it large enough to encompass the model and the camera's distance
      this.camera.far = Math.max(100, (distance * distanceFactor + scaledMaxDim) * 2); // Ensure it's at least 100, or twice the needed distance+size
      this.camera.updateProjectionMatrix(); // IMPORTANT: Apply camera changes (FOV, aspect, near/far)

      // Final combined log message
      console.log(`Model centered/scaled. Final scale: ${scale.toFixed(3)}, Cam Far: ${this.camera.far.toFixed(1)}`);
    },

    // --- Placeholder for Data Binding ---
    // applyDataToModel(data) {
    //   if (!this.model || !data) return;
    //   console.log("Applying data to model:", data);
    //   // Example: Iterate through data rows
    //   // data.forEach(row => {
    //   //    const equipmentId = dHelper.getValue(row, 'dimension'); // Assuming 'dimension' holds ID
    //   //    const status = dHelper.getValue(row, 'metrics'); // Assuming 'metrics' holds status
    //   //    const node = this.model.getObjectByName(equipmentId); // Find object by name
    //   //    if (node && node.isMesh) {
    //   //       console.log(`Found node: ${equipmentId}, applying status: ${status}`);
    //   //       const color = status === 'error' ? 0xff0000 : (status === 'warning' ? 0xffff00 : 0x00ff00);
    //   //       // Make sure material is modifiable, might need to clone if shared
    //   //       if (!Array.isArray(node.material)) {
    //   //           node.material = node.material.clone(); // Clone to avoid changing others
    //   //           node.material.color.setHex(color);
    //   //       }
    //   //    } else {
    //   //        console.warn(`Node not found in model: ${equipmentId}`);
    //   //    }
    //   // });
    // }
    // ------------------------------------

  }
} 
