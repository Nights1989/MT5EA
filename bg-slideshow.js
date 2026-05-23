// 背景轮播脚本 - 4张图片循环切换，3秒间隔（增强版）
(function() {
    const backgrounds = ['/bj.jpg', '/bj1.jpg', '/bj2.jpg', '/bj3.jpg'];
    let currentIndex = 0;
    let intervalId = null;

    function getBgElement() {
        let el = document.querySelector('.hero-bg');
        if (!el) {
            el = document.createElement('div');
            el.className = 'hero-bg';
            el.style.position = 'fixed';
            el.style.top = '0';
            el.style.left = '0';
            el.style.width = '100%';
            el.style.height = '100%';
            el.style.zIndex = '-2';
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
            el.style.transition = 'background-image 0.8s ease-in-out';
            document.body.insertBefore(el, document.body.firstChild);
        }
        // 确保 .overlay 存在
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'radial-gradient(circle at 20% 30%, rgba(0,20,40,0.7), rgba(0,0,0,0.85))';
            overlay.style.zIndex = '-1';
            document.body.insertBefore(overlay, document.body.firstChild);
        }
        return el;
    }

    function switchBackground() {
        const bgEl = getBgElement();
        if (!bgEl) return;
        currentIndex = (currentIndex + 1) % backgrounds.length;
        bgEl.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
    }

    function startSlideshow() {
        if (intervalId) return;
        const bgEl = getBgElement();
        bgEl.style.backgroundImage = `url('${backgrounds[0]}')`;
        intervalId = setInterval(switchBackground, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSlideshow);
    } else {
        startSlideshow();
    }

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (intervalId) clearInterval(intervalId);
            intervalId = null;
        } else {
            if (!intervalId) startSlideshow();
        }
    });
})();