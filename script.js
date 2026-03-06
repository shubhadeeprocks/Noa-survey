const DATA = {
    comp: { labels: ['Worse', 'Same', 'Better'], values: [19, 10, 8], colors: ['#f43f5e', '#94a3b8', '#10b981'] },
    freq: { labels: ['Daily', 'Occasional', '3-5d', '1-2d', 'Never'], values: [14, 13, 4, 3, 3], colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'] },
    protein: { labels: ['Isolate', 'Conc.', 'Plant', 'Egg', 'Soy'], values: [14, 8, 6, 4, 3], color: '#6366f1' },
    taste: { labels: ['1', '2', '3', '4'], values: [5, 7, 14, 11], color: '#10b981' },
    texture: { labels: ['1', '2', '3', '4', '5'], values: [3, 6, 13, 8, 7], color: '#8b5cf6' },
    price: { labels: ['<1.5k', '1.5-2k', '2-2.5k', '2.5-3k', '>3k'], values: [12, 20, 2, 2, 1], color: '#f59e0b' }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Chart Helper
    const createChart = (id, type, labels, data, bgColor, isHorizontal = false) => {
        new Chart(document.getElementById(id), {
            type: type,
            data: {
                labels: labels,
                datasets: [{ data: data, backgroundColor: bgColor, borderRadius: 8 }]
            },
            options: {
                indexAxis: isHorizontal ? 'y' : 'x',
                maintainAspectRatio: false,
                plugins: { legend: { display: (type === 'pie' || type === 'doughnut'), position: 'bottom' } }
            }
        });
    };

    // 2. Initialize All Charts
    createChart('compChart', 'doughnut', DATA.comp.labels, DATA.comp.values, DATA.comp.colors);
    createChart('freqChart', 'pie', DATA.freq.labels, DATA.freq.values, DATA.freq.colors);
    createChart('proteinChart', 'bar', DATA.protein.labels, DATA.protein.values, DATA.protein.color, true);
    createChart('tasteChart', 'bar', DATA.taste.labels, DATA.taste.values, DATA.taste.color);
    createChart('textureChart', 'bar', DATA.texture.labels, DATA.texture.values, DATA.texture.color);
    createChart('priceChart', 'bar', DATA.price.labels, DATA.price.values, DATA.price.color);

    // 3. KPI Animation
    const animate = (id, end, duration) => {
        let start = 0;
        const obj = document.getElementById(id);
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            obj.innerHTML = (progress * end).toFixed(id === 'kpi-total' ? 0 : 2);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    animate('kpi-total', 37, 1000);
    animate('kpi-taste', 2.84, 1200);
    animate('kpi-texture', 3.27, 1400);
    animate('kpi-purchase', 2.68, 1600);

    // 4. Dark Mode Switch Logic
    const toggle = document.getElementById('themeToggle');
    
    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });
});
