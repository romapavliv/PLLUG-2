if (navigator?.serviceWorker) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../service-worker.js');
    });
}