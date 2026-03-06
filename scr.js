/**
 * NOA PROTEIN DASHBOARD - CORE LOGIC
 */

// 1. DATASET DEFINITIONS
const DASHBOARD_DATA = {
    comp: { labels: ['Worse than current', 'About the Same', 'Better than current'], values: [19, 10, 8], colors: ['#f43f5e', '#94a3b8', '#10b981'] },
    freq: { labels: ['Daily', 'Occasional', '3-5 days/wk', '1-2 days/wk', 'Never'], values: [14, 13, 4, 3, 3], colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'] },
    protein: { labels: ['Isolate', 'Conc.', 'Plant', 'Egg', 'Soy'], values: [14, 8, 6, 4, 3], color: '#6366f1' },
    taste: { labels: ['1 (Poor)', '2', '3', '4 (Good)'], values: [5, 7, 14, 11], color: '#10b981' },
    texture: { labels: ['1', '2', '3', '4', '5'], values: [3, 6, 13, 8, 7], color: '#8b5cf6' },
    price: { labels: ['<1.5k', '1.5k-2k', '2k-2.5k', '2.5k-3k', '>3k'], values: [12, 20, 2, 2, 1], color: '#f59e0b' }
};

document.addEventListener('DOMContentLoaded', () => {
    // 2. CHART.JS DEFAULTS
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#64748b';
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;

    // 3. CHART INITIALIZATION FUNCTION
    const initChart = (id, type, labels, data, bgColor, isHorizontal = false) => {
        const ctx = document.getElementById(id);
        if (!ctx) return;
        
        return new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: bgColor,
                    borderRadius: type === 'bar' ? 8 : 0,
                    borderWidth: 0,
                    hoverOffset: 20
                }]
            },
            options: {
                indexAxis: isHorizontal ? 'y' : 'x',
                plugins: {
                    legend: {
                        display: (type === 'pie' || type === 'doughnut'),
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true }
                    }
                },
                scales: type === 'bar' ? {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' }, border: { display: false } },
                    x: { grid: { display: false } }
                } : {}
            }
        });
    };

    // 4. RENDER ALL CHARTS
    initChart('compChart', 'doughnut', DASHBOARD_DATA.comp.labels, DASHBOARD_DATA.comp.values, DASHBOARD_DATA.comp.colors);
    initChart('freqChart', 'pie', DASHBOARD_DATA.freq.labels, DASHBOARD_DATA.freq.values, DASHBOARD_DATA.freq.colors);
    initChart('proteinChart', 'bar', DASHBOARD_DATA.protein.labels, DASHBOARD_DATA.protein.values, DASHBOARD_DATA.protein.color, true);
    initChart('tasteChart', 'bar', DASHBOARD_DATA.taste.labels, DASHBOARD_DATA.taste.values, DASHBOARD_DATA.taste.color);
    initChart('textureChart', 'bar', DASHBOARD_DATA.texture.labels, DASHBOARD_DATA.texture.values, DASHBOARD_DATA.texture.color);
    initChart('priceChart', 'bar', DASHBOARD_DATA.price.labels, DASHBOARD_DATA.price.values, DASHBOARD_DATA.price.color);

    // 5. KPI COUNT-UP ANIMATION
    const animateValue = (id, start, end, duration) => {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = (progress * (end - start) + start).toFixed(id.includes('total') ? 0 : 2);
            obj.innerHTML = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Trigger animations for the 4 KPIs
    animateValue('kpi-total', 0, 37, 1000);
    animateValue('kpi-taste', 0, 2.84, 1200);
    animateValue('kpi-texture', 0, 3.27, 1400);
    animateValue('kpi-purchase', 0, 2.68, 1600);
});
