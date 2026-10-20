/* --------------------------------------------------------------------------
   SCALE OF THE UNIVERSE & 20/10 ROMANTIC STORY - TAP-ANYWHERE EXPERIENCE
   Tap-to-Advance, 3D Crystal Ruby Heart Expansion, 3 Story Messages & Finale
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ========================================================================
     1. WEB AUDIO SYNTHESIZER (SHUTTER CLICK, CRYSTAL CHIMES & ROMANTIC MELODY)
     ======================================================================== */
  let audioCtx = null;
  let isMusicPlaying = false;
  let musicInterval = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Camera Shutter Click sound
  function playCameraShutterSound() {
    try {
      initAudioContext();
      const now = audioCtx.currentTime;

      // Noise click
      const bufferSize = Math.floor(audioCtx.sampleRate * 0.04);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(3.5, now);

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.14, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      whiteNoise.start(now);

      // AF lock chirp
      const osc = audioCtx.createOscillator();
      const chimeGain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now + 0.03);
      osc.frequency.setValueAtTime(1318.5, now + 0.1);

      chimeGain.gain.setValueAtTime(0.05, now + 0.03);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(chimeGain);
      chimeGain.connect(audioCtx.destination);
      osc.start(now + 0.03);
      osc.stop(now + 0.28);
    } catch (e) {}
  }

  // Sweet Crystal Harmonic Chime for Heart & Story Reveals
  function playCrystalChimeSound(freq = 587.33) {
    try {
      initAudioContext();
      const now = audioCtx.currentTime;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.5);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    } catch (e) {}
  }

  // Authentic Fountain Pen on Fine Stationery Paper Sound Synthesizer (ASMR Calligraphy Acoustics)
  let lastPenAudioTime = 0;
  function playPenScratchSound(char = 'a') {
    if (!audioCtx) return;
    try {
      initAudioContext();
      const now = audioCtx.currentTime;
      // Prevent overlapping pop if events fire too closely
      if (now - lastPenAudioTime < 0.012) return;
      lastPenAudioTime = now;

      // Character-based stroke acoustic profile
      const isPunctuation = (char === '.' || char === ',' || char === '!' || char === '?' || char === '💕' || char === '💖' || char === '✨');
      const isTall = 'NPTVEĐHKLBGQYÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬẾỀỂỄỆÍÌỈĨỊỐỒỔỖỘỚỜỞỠỢỨỪỬỮỰ'.includes(char);
      const isAccent = 'áàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ'.includes(char.toLowerCase());

      let duration = 0.026 + Math.random() * 0.008;
      let baseFreq = 2050 + (Math.random() - 0.5) * 300;
      let paperFreq = 1050 + (Math.random() - 0.5) * 150;
      let volume = 0.038 + Math.random() * 0.01;

      if (isPunctuation) {
        duration = 0.018;
        baseFreq = 1500;
        volume = 0.025;
      } else if (isTall) {
        duration = 0.038;
        baseFreq = 1900;
        volume = 0.044;
      } else if (isAccent) {
        duration = 0.020;
        baseFreq = 2300;
        volume = 0.030;
      }

      // Generate organic paper friction buffer via pink-filtered random walk
      const sampleRate = audioCtx.sampleRate;
      const bufferSize = Math.max(1, Math.floor(sampleRate * duration));
      const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      let walk = 0;
      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        // Natural parabolic stroke envelope: gentle contact -> drag -> release
        const env = Math.sin(t * Math.PI);
        const white = Math.random() * 2 - 1;
        // Warm low-frequency integration (paper texture)
        walk = walk * 0.68 + white * 0.32;
        data[i] = walk * env;
      }

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;

      // Filter 1: Paper body warmth (warm low-mid bandpass)
      const paperFilter = audioCtx.createBiquadFilter();
      paperFilter.type = 'bandpass';
      paperFilter.frequency.setValueAtTime(paperFreq, now);
      paperFilter.Q.setValueAtTime(1.9, now);

      // Filter 2: Nib metal friction drag (mid-high bandpass with pitch glide)
      const nibFilter = audioCtx.createBiquadFilter();
      nibFilter.type = 'bandpass';
      nibFilter.frequency.setValueAtTime(baseFreq, now);
      // Subtle sweep as the pen moves across paper fibers
      nibFilter.frequency.linearRampToValueAtTime(baseFreq * (isTall ? 0.88 : 1.08), now + duration);
      nibFilter.Q.setValueAtTime(2.8, now);

      // Output Gain
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(volume, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Chain: Source -> PaperFilter -> NibFilter -> Gain -> Destination
      source.connect(paperFilter);
      paperFilter.connect(nibFilter);
      nibFilter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      source.start(now);
      source.stop(now + duration);
    } catch (e) {}
  }

  // Background Romantic Soundtrack (Video chuyển thành âm thanh - TỰ ĐỘNG PHÁT KHI VÔ THƯ)
  // Fix cắt bỏ đoạn kết TikTok glitch (ở 44.5s) để bài hát ngân vang lặp lại mượt mà hoàn hảo!
  const bgmAudio = document.getElementById('romanticBgmAudio');
  const bgmVideo = document.getElementById('romanticBgmVideo');
  const TIKTOK_OUTRO_CUTOFF_SEC = 44.4; // Cắt trước khi âm thanh TikTok outro xuất hiện (44.8s)

  let bgmBufferClean = null;
  let bgmSourceNode = null;
  let isBgmPlaying = false;

  // Tải trước và cắt sạch đoạn watermark TikTok khỏi audio buffer
  async function prepareCleanAudioBuffer() {
    if (!audioCtx) return;
    try {
      const resp = await fetch('assets/love_song.mp4');
      const arrayBuf = await resp.arrayBuffer();
      const decoded = await audioCtx.decodeAudioData(arrayBuf);
      
      const cleanSamples = Math.floor(TIKTOK_OUTRO_CUTOFF_SEC * decoded.sampleRate);
      const cleanBuf = audioCtx.createBuffer(
        decoded.numberOfChannels,
        Math.min(decoded.length, cleanSamples),
        decoded.sampleRate
      );
      for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
        cleanBuf.getChannelData(ch).set(
          decoded.getChannelData(ch).subarray(0, cleanSamples)
        );
      }
      bgmBufferClean = cleanBuf;
    } catch (e) {
      console.warn('Web Audio buffer decode skipped, will use HTML5 media element:', e);
    }
  }

  // Tự động kiểm tra thời gian trên HTML5 element để tua lại trước khúc kết TikTok nếu phát qua HTML5
  function setupHtml5LoopGuard(mediaEl) {
    if (!mediaEl) return;
    mediaEl.addEventListener('timeupdate', () => {
      if (mediaEl.currentTime >= TIKTOK_OUTRO_CUTOFF_SEC) {
        mediaEl.currentTime = 0;
        mediaEl.play().catch(() => {});
      }
    });
  }

  setupHtml5LoopGuard(bgmAudio);
  setupHtml5LoopGuard(bgmVideo);

  function playRomanticBgm() {
    if (isBgmPlaying) return;
    isBgmPlaying = true;
    initAudioContext();

    // 1. Ưu tiên phát qua AudioBuffer đã cắt gọt 100% sạch sẽ khúc TikTok
    if (bgmBufferClean && audioCtx && audioCtx.state === 'running') {
      try {
        if (bgmSourceNode) {
          bgmSourceNode.stop();
          bgmSourceNode.disconnect();
        }
        bgmSourceNode = audioCtx.createBufferSource();
        bgmSourceNode.buffer = bgmBufferClean;
        bgmSourceNode.loop = true;
        const bgmGain = audioCtx.createGain();
        bgmGain.gain.setValueAtTime(0.85, audioCtx.currentTime);
        bgmSourceNode.connect(bgmGain);
        bgmGain.connect(audioCtx.destination);
        bgmSourceNode.start(0);
        return;
      } catch (e) {
        console.warn('BufferSource start failed, fallback to media element:', e);
      }
    }

    // 2. Fallback qua thẻ audio / video với bảo vệ timeupdate cắt đoạn kết TikTok
    if (bgmAudio) {
      bgmAudio.volume = 0.85;
      const p = bgmAudio.play();
      if (p !== undefined) {
        p.catch(() => {
          if (bgmVideo) {
            bgmVideo.volume = 0.85;
            bgmVideo.play().catch(e => console.error('Video audio error:', e));
          }
        });
      }
    } else if (bgmVideo) {
      bgmVideo.volume = 0.85;
      bgmVideo.play().catch(e => console.error('Video audio error:', e));
    }
  }

  function pauseRomanticBgm() {
    isBgmPlaying = false;
    if (bgmSourceNode) {
      try {
        bgmSourceNode.stop();
        bgmSourceNode.disconnect();
      } catch (e) {}
      bgmSourceNode = null;
    }
    if (bgmAudio) {
      bgmAudio.pause();
      bgmAudio.currentTime = 0;
    }
    if (bgmVideo) {
      bgmVideo.pause();
      bgmVideo.currentTime = 0;
    }
  }

  /* ========================================================================
     2. THREE.JS 3D GLOWING HEARTS STARFIELD (NỀN TRÁI TIM BAY LƠ LỬNG)
     ======================================================================== */
  const canvas3D = document.getElementById('webglCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas3D,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  function createHeartTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const glow = ctx.createRadialGradient(32, 32, 6, 32, 32, 30);
    glow.addColorStop(0, 'rgba(255, 117, 143, 0.7)');
    glow.addColorStop(0.7, 'rgba(255, 77, 109, 0.28)');
    glow.addColorStop(1, 'rgba(255, 77, 109, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 64, 64);

    ctx.save();
    ctx.translate(32, 26);
    ctx.scale(0.85, 0.85);
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(-14, -14, -26, 4, 0, 24);
    ctx.bezierCurveTo(26, 4, 14, -14, 0, 6);
    ctx.closePath();

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ff4d6d';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();

    return new THREE.CanvasTexture(canvas);
  }

  const heartTexture = createHeartTexture();

  const heartCount = 1200;
  const heartGeo = new THREE.BufferGeometry();
  const heartPositions = new Float32Array(heartCount * 3);
  const heartColors = new Float32Array(heartCount * 3);
  const heartVelocities = [];
  let warpSpeedMultiplier = 1;

  const heartPalette = [
    new THREE.Color(0xff4d6d),
    new THREE.Color(0xff758f),
    new THREE.Color(0xffd166),
    new THREE.Color(0xffffff),
    new THREE.Color(0xf472b6),
    new THREE.Color(0xfb7185),
  ];

  for (let i = 0; i < heartCount; i++) {
    const idx = i * 3;
    heartPositions[idx] = (Math.random() - 0.5) * 35;
    heartPositions[idx + 1] = (Math.random() - 0.5) * 35;
    heartPositions[idx + 2] = (Math.random() - 0.5) * 35;

    const col = heartPalette[Math.floor(Math.random() * heartPalette.length)];
    heartColors[idx] = col.r;
    heartColors[idx + 1] = col.g;
    heartColors[idx + 2] = col.b;

    heartVelocities.push({
      vy: Math.random() * 0.006 + 0.002,
      vx: (Math.random() - 0.5) * 0.002,
    });
  }

  heartGeo.setAttribute('position', new THREE.BufferAttribute(heartPositions, 3));
  heartGeo.setAttribute('color', new THREE.BufferAttribute(heartColors, 3));

  const heartMat = new THREE.PointsMaterial({
    size: 0.38,
    map: heartTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const heartField = new THREE.Points(heartGeo, heartMat);
  scene.add(heartField);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });



  function animateHearts() {
    requestAnimationFrame(animateHearts);
    const positions = heartGeo.attributes.position.array;

    for (let i = 0; i < heartCount; i++) {
      const idx = i * 3;
      positions[idx + 1] += heartVelocities[i].vy * warpSpeedMultiplier;
      positions[idx] += heartVelocities[i].vx;

      if (positions[idx + 1] > 18) positions[idx + 1] = -18;
      if (positions[idx] > 18) positions[idx] = -18;
      else if (positions[idx] < -18) positions[idx] = 18;
    }
    heartGeo.attributes.position.needsUpdate = true;
    heartField.rotation.y += 0.0004;

    renderer.render(scene, camera);
  }
  animateHearts();

  function triggerCosmicWarp() {
    warpSpeedMultiplier = 4.5;
    setTimeout(() => {
      warpSpeedMultiplier = 1;
    }, 400);
  }
  let heart3DScene = null;
  let heart3DRenderer = null;
  let heart3DCamera = null;
  let heart3DGroup = null;
  let heart3DAnimationId = null;
  let heartMesh = null;
  let innerWireMesh = null;
  let coreAuraSprite = null;
  let coreLight = null;
  let ring1 = null;
  let ring2 = null;
  let emberGeo = null;
  let emberVel = [];
  const emberCount = 40;

  let targetCameraZ = 4.5;
  let currentCameraZ = 4.5;
  let targetHeartBaseScale = 0.72;
  let currentHeartBaseScale = 0.72;

  let heartDragRotation = { x: 0, y: 0 };
  let targetRotation = { x: 0, y: 0 };
  let orbitGleamLight = null;

  function init3DHeart() {
    const container = document.getElementById('heart3DContainer');
    const canvas = document.getElementById('heart3DCanvas');
    if (!container || !canvas) return;

    if (heart3DAnimationId) {
      cancelAnimationFrame(heart3DAnimationId);
    }

    const rect = container.getBoundingClientRect();
    const width = rect.width || 220;
    const height = rect.height || 220;

    heart3DRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    heart3DRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heart3DRenderer.setSize(width, height);
    heart3DRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    heart3DRenderer.toneMappingExposure = 1.35;

    heart3DScene = new THREE.Scene();
    heart3DCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    heart3DCamera.position.z = 4.5;
    currentCameraZ = 4.5;
    targetCameraZ = 4.5;
    currentHeartBaseScale = 0.72;
    targetHeartBaseScale = 0.72;

    heart3DGroup = new THREE.Group();
    heart3DScene.add(heart3DGroup);

    // Studio 3-Point Lighting
    const ambLight = new THREE.AmbientLight(0xff4d6d, 1.0);
    heart3DScene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3, 4, 4);
    heart3DScene.add(keyLight);

    const fillLight = new THREE.PointLight(0xff1453, 3.0, 15);
    fillLight.position.set(-3, -2, 3);
    heart3DScene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff758f, 2.5);
    rimLight.position.set(-3, -2, -3);
    heart3DScene.add(rimLight);

    coreLight = new THREE.PointLight(0xff0044, 5.0, 10);
    coreLight.position.set(0, 0, 0);
    heart3DGroup.add(coreLight);

    orbitGleamLight = new THREE.PointLight(0xffffff, 4.0, 8);
    heart3DGroup.add(orbitGleamLight);

    // ========================================================================
    // 2. PLUMP VOLUMETRIC 3D CRYSTAL RUBY JEWEL HEART (KHỐI 3D TRÒN TRĨNH ĐÁNG YÊU)
    // ========================================================================
    const heartShape = new THREE.Shape();
    // Center cleft
    heartShape.moveTo(0, 0.42);
    // Smooth, round left lobe
    heartShape.bezierCurveTo(-0.15, 0.96, -1.05, 0.96, -1.05, 0.35);
    // Smooth tapering curve to bottom tip
    heartShape.bezierCurveTo(-1.05, -0.22, -0.58, -0.72, 0, -1.2);
    // Mirror smooth curve to right lobe
    heartShape.bezierCurveTo(0.58, -0.72, 1.05, -0.22, 1.05, 0.35);
    // Smooth right lobe into cleft
    heartShape.bezierCurveTo(1.05, 0.96, 0.15, 0.96, 0, 0.42);

    const extrudeSettings = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 28,
      steps: 2,
      bevelSize: 0.26,
      bevelThickness: 0.30,
      curveSegments: 54,
    };

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center(); // Perfect origin centering

    // Outer Translucent Ruby Crystal Glass Material
    const heartMat = new THREE.MeshPhysicalMaterial({
      color: 0xff053a, // Intense candy ruby red
      emissive: 0x800020, // Warm inner wine glow
      emissiveIntensity: 0.55,
      roughness: 0.05, // Mirror gloss
      metalness: 0.12,
      clearcoat: 1.0, // Luxury clearcoat reflection
      clearcoatRoughness: 0.03,
      transmission: 0.25, // Saturated translucency
      ior: 1.62, // High ruby crystal refraction
      reflectivity: 0.98,
      transparent: true,
      opacity: 0.98,
    });

    heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.scale.set(0.72, 0.72, 0.72);
    heart3DGroup.add(heartMesh);

    // Inner Golden Crystal Lattice Wireframe (Phong cách trang sức Cartier)
    const innerGeo = heartGeo.clone();
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xffaa00,
      emissiveIntensity: 0.65,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    innerWireMesh = new THREE.Mesh(innerGeo, innerMat);
    innerWireMesh.scale.set(0.64, 0.64, 0.64);
    heart3DGroup.add(innerWireMesh);

    // Core Aura Glow Sprite (Tỏa hào quang ấm áp từ tâm)
    function createCoreAuraTexture() {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
      g.addColorStop(0, 'rgba(255, 255, 255, 1)');
      g.addColorStop(0.25, 'rgba(255, 105, 180, 0.85)');
      g.addColorStop(0.55, 'rgba(255, 23, 100, 0.45)');
      g.addColorStop(0.85, 'rgba(225, 29, 72, 0.15)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }
    const coreAuraMat = new THREE.SpriteMaterial({
      map: createCoreAuraTexture(),
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
    });
    coreAuraSprite = new THREE.Sprite(coreAuraMat);
    coreAuraSprite.scale.set(2.4, 2.4, 2.4);
    heart3DGroup.add(coreAuraSprite);

    // Orbiting Saturn Stardust Rings
    function createCelestialRing(radius, tiltX, tiltZ, count, colorHex) {
      const ringGeo = new THREE.BufferGeometry();
      const ringPos = new Float32Array(count * 3);
      const ringCol = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * 0.28;
        ringPos[i * 3] = Math.cos(angle) * r;
        ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
        ringPos[i * 3 + 2] = Math.sin(angle) * r;

        const baseCol = new THREE.Color(colorHex);
        if (Math.random() > 0.6) baseCol.set(0xffffff);
        ringCol[i * 3] = baseCol.r;
        ringCol[i * 3 + 1] = baseCol.g;
        ringCol[i * 3 + 2] = baseCol.b;
      }

      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
      ringGeo.setAttribute('color', new THREE.BufferAttribute(ringCol, 3));

      const ringMat = new THREE.PointsMaterial({
        size: 0.12,
        map: heartTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Points(ringGeo, ringMat);
      mesh.rotation.x = tiltX;
      mesh.rotation.z = tiltZ;
      return mesh;
    }

    ring1 = createCelestialRing(1.35, 0.42, -0.28, 480, 0xffd166);
    ring2 = createCelestialRing(1.52, -0.32, 0.38, 420, 0xff8da1);
    heart3DGroup.add(ring1);
    heart3DGroup.add(ring2);

    // Floating Stardust Embers
    emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    emberVel = [];

    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3] = (Math.random() - 0.5) * 2.5;
      emberPos[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      emberPos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      emberVel.push({
        vx: (Math.random() - 0.5) * 0.005,
        vy: Math.random() * 0.007 + 0.003,
        vz: (Math.random() - 0.5) * 0.005,
      });
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 0.14,
      map: heartTexture,
      color: 0xffe4e6,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const emberMesh = new THREE.Points(emberGeo, emberMat);
    heart3DGroup.add(emberMesh);



    // ========================================================================
    // 3. ANIMATION RENDER LOOP: ROMANTIC 3D SWAY & HEARTBEAT
    // ========================================================================
    let startTime = performance.now();

    function render3DHeart() {
      heart3DAnimationId = requestAnimationFrame(render3DHeart);
      const time = (performance.now() - startTime) * 0.001;

      // Smooth Camera Z zoom interpolation (when heart expands)
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.06;
      heart3DCamera.position.z = currentCameraZ;

      // Smooth Heart scale interpolation
      currentHeartBaseScale += (targetHeartBaseScale - currentHeartBaseScale) * 0.06;

      // Double thump-thump heartbeat pulse
      const t = time * 3.4;
      const beat1 = Math.pow(Math.max(0, Math.sin(t)), 24) * 0.14;
      const beat2 = Math.pow(Math.max(0, Math.sin(t + 0.38)), 24) * 0.075;
      const scaleVal = currentHeartBaseScale * (1.0 + beat1 + beat2);

      heartMesh.scale.set(scaleVal, scaleVal, scaleVal);
      innerWireMesh.scale.set(scaleVal * 0.88, scaleVal * 0.88, scaleVal * 0.88);

      // Core aura and light pulse
      const auraScale = (currentHeartBaseScale * 3.2) + (beat1 + beat2) * 1.8;
      coreAuraSprite.scale.set(auraScale, auraScale, auraScale);
      coreLight.intensity = 4.0 + beat1 * 12.0;

      // Smooth inertia damping for interactive drag rotation
      heartDragRotation.x += (targetRotation.x - heartDragRotation.x) * 0.08;
      heartDragRotation.y += (targetRotation.y - heartDragRotation.y) * 0.08;

      // ROMANTIC 3D FLOATING SWAY: ALWAYS KEEPS THE HEART SILHOUETTE CLEARLY VISIBLE!
      heart3DGroup.rotation.y = Math.sin(time * 1.0) * 0.22 + heartDragRotation.y;
      heart3DGroup.rotation.x = Math.sin(time * 0.7) * 0.10 + heartDragRotation.x;
      heart3DGroup.rotation.z = Math.sin(time * 0.5) * 0.05;
      heart3DGroup.position.y = Math.sin(time * 1.5) * 0.08;

      // Saturn rings continue 360-degree rotation
      if (ring1) ring1.rotation.y = -time * 0.35;
      if (ring2) ring2.rotation.y = time * 0.3;

      // Orbiting dynamic jewel sparkle light
      if (orbitGleamLight) {
        orbitGleamLight.position.set(
          Math.cos(time * 2.0) * 2.4,
          Math.sin(time * 2.0) * 1.5,
          Math.sin(time * 2.0) * 1.8 + 1.2
        );
      }

      if (emberGeo) {
        const emPos = emberGeo.attributes.position.array;
        for (let i = 0; i < emberCount; i++) {
          emPos[i * 3 + 1] += emberVel[i].vy;
          emPos[i * 3] += emberVel[i].vx;
          emPos[i * 3 + 2] += emberVel[i].vz;
          if (emPos[i * 3 + 1] > 2.0) emPos[i * 3 + 1] = -2.0;
        }
        emberGeo.attributes.position.needsUpdate = true;
      }



      heart3DRenderer.render(heart3DScene, heart3DCamera);
    }
    render3DHeart();

    // Drag to rotate heart with clamped bounds (never turns edge-on!)
    let isTouching = false;
    let prevX = 0;
    let prevY = 0;

    canvas.addEventListener('mousedown', (e) => {
      isTouching = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isTouching) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotation.y = Math.max(-0.45, Math.min(0.45, targetRotation.y + dx * 0.012));
      targetRotation.x = Math.max(-0.35, Math.min(0.35, targetRotation.x + dy * 0.012));
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('mouseup', () => { isTouching = false; });

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isTouching = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isTouching || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      targetRotation.y = Math.max(-0.45, Math.min(0.45, targetRotation.y + dx * 0.014));
      targetRotation.x = Math.max(-0.35, Math.min(0.35, targetRotation.x + dy * 0.014));
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => { isTouching = false; });
  }

  /* ========================================================================
     4. SCALE STAGES DATA (CON KIẾN -> CON VOI -> TRÁI ĐẤT -> THIÊN HÀ -> VŨ TRỤ -> TRÁI TIM)
     ======================================================================== */
  const SCALE_STAGES = [
    {
      title: 'Con Kiến Nhỏ Bé',
      measure: 'Kích thước: 1 milimét (0.001 m)',
      render: () => `
        <div class="visual-img-container stage-ant-view">
          <img src="assets/ant.jpg" alt="Con kiến 1mm" class="visual-photo-render" />
        </div>
      `,
    },
    {
      title: 'Con Voi Rừng Xanh',
      measure: 'Kích thước: 4 mét (+4.000 lần chú kiến)',
      render: () => `
        <div class="visual-img-container stage-elephant-view">
          <img src="assets/elephant.jpg" alt="Con voi 4m" class="visual-photo-render" />
        </div>
      `,
    },
    {
      title: 'Trái Đất Của Chúng Ta',
      measure: 'Đường kính: 12.742 kilômét (km)',
      render: () => `
        <div class="visual-img-container stage-earth-view">
          <img src="assets/earth.jpg" alt="Trái Đất 12,742km" class="visual-photo-render" />
        </div>
      `,
    },
    {
      title: 'Dải Ngân Hà (Milky Way)',
      measure: 'Đường kính: 100.000 Năm Ánh Sáng',
      render: () => `
        <div class="visual-img-container stage-galaxy-view">
          <img src="assets/galaxy.jpg" alt="Dải Ngân Hà" class="visual-photo-render" />
        </div>
      `,
    },
    {
      title: 'Toàn Bộ Vũ Trụ Quan Sát Được',
      measure: 'Quy mô: 93 Tỷ Năm Ánh Sáng',
      render: () => `
        <div class="visual-img-container stage-universe-view">
          <img src="assets/universe.jpg" alt="Vũ trụ 93 tỷ năm ánh sáng" class="visual-photo-render" />
        </div>
      `,
    },
    {
      title: 'Tình Yêu Của Anh Dành Cho Em 💕',
      measure: 'Kích thước: Vô Tận ∞ (Lớn hơn cả Vũ Trụ)',
      isHeartStage: true,
      render: () => `
        <div class="heart-3d-particle-container" id="heart3DContainer">
          <canvas id="heart3DCanvas"></canvas>
        </div>
      `,
    },
  ];

  // 3 Romantic Story Messages (Rõ nét 100%, sang trọng, không giật lag)
  const ROMANTIC_STORY_MESSAGES = [
    'Helooo Cục dàng 💕',
    'Hôm nay là 20 tháng 10 🌸',
    'Anh chúc em bé có 1 Ngày Vuiii vẻ ---- Coiii tiếp ở sau nha bé ✨',
  ];

  let currentScaleIdx = 0;
  // Sub-stages for the Heart stage:
  // 0: Initial Heart in lens
  // 1: Heart expanded big
  // 2: Story Text 1
  // 3: Story Text 2
  // 4: Story Text 3
  // 5: Finale card (Photo + 20/10 Wish)
  let heartSubStage = 0;

  // DOM Elements
  const interactiveStage = document.getElementById('interactiveStage');
  const cameraLensAssembly = document.getElementById('cameraLensAssembly');
  const lensKnurledBarrel = document.getElementById('lensKnurledBarrel');
  const lensApertureIris = document.getElementById('lensApertureIris');
  const lensGlass = document.getElementById('lensGlass');
  const lensFlashBurst = document.getElementById('lensFlashBurst');
  const glareStreak = document.getElementById('glareStreak');
  const lensPhotoContent = document.getElementById('lensPhotoContent');
  const scaleInfoPanel = document.getElementById('scaleInfoPanel');
  const scaleTitle = document.getElementById('scaleTitle');
  const scaleMeasure = document.getElementById('scaleMeasure');
  const romanticStoryDisplay = document.getElementById('romanticStoryDisplay');
  const storyTextShimmer = document.getElementById('storyTextShimmer');
  const storyMainText = document.getElementById('storyMainText');
  const finaleCardWrap = document.getElementById('finaleCardWrap');
  const tapScreenHint = document.getElementById('tapScreenHint');
  const replayBtn = document.getElementById('replayBtn');

  /* ========================================================================
     5. ULTRA-SMOOTH STORY TEXT TRANSITIONS (GPU-ACCELERATED, ZERO LAG)
     ======================================================================== */
  function showRomanticStoryText(index) {
    if (!storyTextShimmer || !storyMainText) return;

    if (storyTextShimmer.classList.contains('active')) {
      storyTextShimmer.classList.add('morphing');
      setTimeout(() => {
        storyMainText.textContent = ROMANTIC_STORY_MESSAGES[index];
        storyTextShimmer.classList.remove('morphing');
        storyTextShimmer.classList.add('active');
      }, 200);
    } else {
      storyMainText.textContent = ROMANTIC_STORY_MESSAGES[index];
      storyTextShimmer.classList.add('active');
    }
  }

  function hideRomanticStoryText() {
    if (storyTextShimmer) {
      storyTextShimmer.classList.remove('active');
    }
  }

  // Render a scale stage (0 to 5)
  function renderScaleStage(idx) {
    const stage = SCALE_STAGES[idx];

    // Shutter Click & AF chirp sound
    playCameraShutterSound();

    // Optical Rack Focus Animation
    if (lensGlass) {
      lensGlass.classList.remove('focus-transition');
      void lensGlass.offsetWidth;
      lensGlass.classList.add('focus-transition');
    }

    // Iris diaphragm snap
    if (lensApertureIris) {
      lensApertureIris.classList.remove('iris-snap');
      void lensApertureIris.offsetWidth;
      lensApertureIris.classList.add('iris-snap');
      setTimeout(() => {
        lensApertureIris.classList.remove('iris-snap');
      }, 380);
    }

    // Knurled focus ring spin
    if (lensKnurledBarrel) {
      lensKnurledBarrel.classList.remove('focus-spin');
      void lensKnurledBarrel.offsetWidth;
      lensKnurledBarrel.classList.add('focus-spin');
    }

    // Flash light & Glare streak
    if (lensFlashBurst) {
      lensFlashBurst.style.opacity = '0.9';
      setTimeout(() => {
        lensFlashBurst.style.opacity = '0';
      }, 200);
    }

    if (glareStreak) {
      glareStreak.classList.remove('flash-active');
      void glareStreak.offsetWidth;
      glareStreak.classList.add('flash-active');
      setTimeout(() => {
        glareStreak.classList.remove('flash-active');
      }, 350);
    }

    // Cosmic warp speed leap
    triggerCosmicWarp();

    // Info panel smooth morph
    if (scaleInfoPanel) {
      scaleInfoPanel.classList.add('morphing');
    }

    setTimeout(() => {
      if (lensPhotoContent) {
        lensPhotoContent.innerHTML = stage.render();
      }

      // Initialize 3D Heart if stage 5
      if (stage.isHeartStage) {
        setTimeout(init3DHeart, 60);
      }

      if (scaleTitle) scaleTitle.textContent = stage.title;
      if (scaleMeasure) scaleMeasure.textContent = stage.measure;

      if (scaleInfoPanel) {
        scaleInfoPanel.classList.remove('morphing');
      }
    }, 180);
  }

  /* ========================================================================
     6. TYPEWRITER / PEN WRITING EFFECT (BÚT VIẾT TỪNG CHỮ GỬI EMBE TRMYY)
     ======================================================================== */
  let typewriterTimeout = null;
  const LETTER_CONTENT = 
`Nhân ngày Phụ nữ Việt Nam 20/10, anh chúc Embe Trmyy dễ thương luôn ngập tràn nụ cười, luôn xinh đẹp rạng rỡ và mãi là cô công chúa nhỏ hạnh phúc nhất! 💕

Cảm ơn em vì đã xuất hiện trong cuộc đời anh, mang theo bao điều ngọt ngào và biến mỗi ngày bên em đều trở nên ý nghĩa. Có em ở bên là điều tuyệt vời và may mắn nhất đối với anh ✨

Chúc em bé 20/10 thật nhiều niềm vui, luôn bình an và được yêu thương thật nhiều nhé! Anh yêu em rất nhiều! 💖`;

  function startLetterTypewriter() {
    const textEl = document.getElementById('letterTypewriterText');
    const penHolder = document.getElementById('calligraphyPenHolder');
    const signatureWrap = document.getElementById('letterSignatureWrap');
    if (!textEl) return;

    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
    }

    textEl.textContent = '';
    if (signatureWrap) signatureWrap.classList.remove('show');
    if (penHolder) {
      penHolder.classList.remove('finished');
      penHolder.style.display = 'inline-block';
    }

    let charIdx = 0;
    function typeNextChar() {
      if (charIdx < LETTER_CONTENT.length) {
        const char = LETTER_CONTENT[charIdx];
        textEl.textContent += char;
        charIdx++;

        // Authentic Fountain Pen on Paper Scratch Sound on letters!
        if (char !== ' ' && char !== '\n') {
          playPenScratchSound(char);
        }

        // Natural human cursive handwriting cadence
        const isPunc = char === '.' || char === '!' || char === '?' || char === '💕' || char === '✨' || char === '💖';
        const isComma = char === ',';
        const isNewline = char === '\n';
        const isSpace = char === ' ';

        const delay = isNewline ? 160 : (isPunc ? 190 : (isComma ? 110 : (isSpace ? 45 : (24 + Math.floor(Math.random() * 8)))));
        typewriterTimeout = setTimeout(typeNextChar, delay);
      } else {
        // Typing complete! Lift the pen and fly it away gracefully
        if (penHolder) {
          penHolder.classList.add('finished');
        }
        if (signatureWrap) {
          setTimeout(() => {
            signatureWrap.classList.add('show');
            playCrystalChimeSound(880);
            if (window.confetti) {
              window.confetti({
                particleCount: 140,
                spread: 90,
                origin: { y: 0.65 },
                colors: ['#ff4d6d', '#ff758f', '#ffd166', '#ffffff', '#fb7185'],
              });
            }
          }, 350);
        }
      }
    }
    // Anticipation pause before pen touches paper
    setTimeout(typeNextChar, 350);
  }

  // Handle Heart Expansion & Particle Story Progression
  function advanceHeartStory() {
    heartSubStage++;

    if (heartSubStage === 1) {
      // 1. Trái tim bự ra (Heart Expands Big into open space!)
      playCrystalChimeSound(659.25);
      triggerCosmicWarp();

      // Expand lens container to open space
      if (cameraLensAssembly) {
        cameraLensAssembly.classList.add('heart-expanded');
      }

      // Hide the info panel
      if (scaleInfoPanel) {
        scaleInfoPanel.classList.add('hidden');
      }

      // Resize WebGL renderer to match expanded mobile container (width 380-400px, height 290px)
      if (heart3DRenderer && heart3DCamera) {
        const w = Math.min(window.innerWidth - 32, 400);
        const h = 290;
        heart3DRenderer.setSize(w, h);
        heart3DCamera.aspect = w / h;
        heart3DCamera.updateProjectionMatrix();
      }

      // 3D camera zooms closer with wide frustum - no clipping of rings!
      targetCameraZ = 4.4;
      targetHeartBaseScale = 0.88;

      // Update tap hint
      if (tapScreenHint) {
        tapScreenHint.querySelector('.hint-text').textContent = 'Chạm để lắng nghe tiếng lòng anh... 💖';
      }
    } else if (heartSubStage === 2) {
      // 2. Đợt chữ 1: Rõ nét, gradient lộng lẫy, hiệu ứng ánh sáng
      playCrystalChimeSound(523.25);
      showRomanticStoryText(0);
    } else if (heartSubStage === 3) {
      // 3. Đợt chữ 2: Chuyển cảnh mềm mại, mượt mà không lag
      playCrystalChimeSound(587.33);
      showRomanticStoryText(1);
    } else if (heartSubStage === 4) {
      // 4. Đợt chữ 3: Chuyển cảnh mềm mại, mượt mà không lag
      playCrystalChimeSound(659.25);
      showRomanticStoryText(2);
    } else if (heartSubStage === 5) {
      // 5. Lần cuối: Ẩn chữ và hiện 3 ảnh kỷ niệm + Bức thư tình 20/10 gửi Embe Trmyy!
      playCrystalChimeSound(880);
      hideRomanticStoryText();

      // Show Finale Card Wrap
      if (finaleCardWrap) {
        finaleCardWrap.classList.add('active');
        finaleCardWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // CHỈ KHI BỨC THƯ HIỆN RA NHẠC MỚI VANG LÊN! (Play user romantic soundtrack)
      setTimeout(() => {
        playRomanticBgm();
      }, 350);

      // Compact the 3D heart above the card so entire finale fits beautifully on screen
      if (cameraLensAssembly) {
        cameraLensAssembly.classList.add('finale-compact');
      }
      targetCameraZ = 5.6;
      targetHeartBaseScale = 0.52;
      if (heart3DRenderer && heart3DCamera) {
        heart3DRenderer.setSize(110, 110);
        heart3DCamera.aspect = 1;
        heart3DCamera.updateProjectionMatrix();
      }

      // Hide tap hint
      if (tapScreenHint) {
        tapScreenHint.classList.add('hidden');
      }

      // Start Typewriter / Pen Writing Effect for the letter
      startLetterTypewriter();

      // Fireworks celebration confetti
      if (window.confetti) {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ff4d6d', '#ff758f', '#ffd166', '#ffffff', '#38bdf8'],
        });
      }
    }
  }

  // Master Tap Anywhere Advance Handler
  function handleScreenAdvance(e) {
    // If clicking on floating music button or replay button, ignore
    if (e.target.closest('#floatingAudioBtn') || e.target.closest('#replayBtn')) {
      return;
    }

    initAudioContext();

    // If still in cosmic scale stages (0 to 4)
    if (currentScaleIdx < SCALE_STAGES.length - 1) {
      currentScaleIdx++;
      renderScaleStage(currentScaleIdx);
    } else {
      // In Heart stage: advance story progression
      if (heartSubStage < 5) {
        advanceHeartStory();
      }
    }
  }

  // Listen to clicks / taps on the interactive stage & body
  if (interactiveStage) {
    interactiveStage.addEventListener('click', handleScreenAdvance);
  }

  // Replay Journey from beginning
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      currentScaleIdx = 0;
      heartSubStage = 0;

      // Pause soundtrack on replay so it resets until letter appears again
      pauseRomanticBgm();
      if (bgmAudio) bgmAudio.currentTime = 0;
      if (bgmVideo) bgmVideo.currentTime = 0;

      // Stop typewriter
      if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
      }
      const textEl = document.getElementById('letterTypewriterText');
      if (textEl) textEl.textContent = '';
      const signatureWrap = document.getElementById('letterSignatureWrap');
      if (signatureWrap) signatureWrap.classList.remove('show');
      const penHolder = document.getElementById('calligraphyPenHolder');
      if (penHolder) {
        penHolder.classList.remove('finished');
        penHolder.style.display = 'inline-block';
      }

      // Hide story text
      hideRomanticStoryText();

      // Reset lens and heart state
      if (cameraLensAssembly) {
        cameraLensAssembly.classList.remove('heart-expanded');
        cameraLensAssembly.classList.remove('finale-compact');
      }
      if (scaleInfoPanel) {
        scaleInfoPanel.classList.remove('hidden');
      }
      if (finaleCardWrap) {
        finaleCardWrap.classList.remove('active');
      }
      if (tapScreenHint) {
        tapScreenHint.classList.remove('hidden');
        tapScreenHint.querySelector('.hint-text').textContent = 'Chạm màn hình để tiếp tục ✨';
      }

      targetCameraZ = 4.5;
      targetHeartBaseScale = 0.72;
      if (heart3DRenderer && heart3DCamera) {
        heart3DRenderer.setSize(220, 220);
        heart3DCamera.aspect = 1;
        heart3DCamera.updateProjectionMatrix();
      }

      renderScaleStage(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initial stage render
  renderScaleStage(0);
});
