class LinesCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.showLines = false;
        this.lineSpacing = 10;
    }

    drawLines() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.showLines) {
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 1;

            for (let i = 0; i < this.canvas.width + this.canvas.height; i += this.lineSpacing) {
                this.ctx.beginPath();
                this.ctx.moveTo(i, 0);
                this.ctx.lineTo(i - this.canvas.height, this.canvas.height);
                this.ctx.stroke();
            }
        }
    }

    toggle() {
        this.showLines = !this.showLines;
        this.drawLines();
        return this.showLines;
    }

    hide() {
        this.showLines = false;
        this.drawLines();
    }

    show() {
        this.showLines = true;
        this.drawLines();
    }
}

class PWAApp {
    constructor() {
        this.pieChart = null;
        this.linesCanvas = null;
        this.toggleButton = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.pieChart = new PieChart('pieChart');
            this.linesCanvas = new LinesCanvas('linesCanvas');
            this.toggleButton = document.getElementById('toggleLines');

            this.setupEventListeners();
            this.pieChart.draw();
            this.linesCanvas.hide();
        });
    }

    setupEventListeners() {
        this.toggleButton.addEventListener('click', () => {
            const isShowing = this.linesCanvas.toggle();
            this.toggleButton.textContent = isShowing ? 'Ocultar líneas' : 'Exhibir líneas';
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });

        window.addEventListener('popstate', () => {
            this.pieChart.redraw();
        });
    }

    handleResize() {
        const canvas1 = document.getElementById('pieChart');
        const canvas2 = document.getElementById('linesCanvas');

        if (window.innerWidth <= 480) {
            canvas1.width = 200;
            canvas1.height = 200;
            canvas2.width = 200;
            canvas2.height = 200;
        } else if (window.innerWidth <= 768) {
            canvas1.width = 250;
            canvas1.height = 250;
            canvas2.width = 250;
            canvas2.height = 250;
        } else {
            canvas1.width = 300;
            canvas1.height = 300;
            canvas2.width = 300;
            canvas2.height = 300;
        }

        this.pieChart.centerX = canvas1.width / 2;
        this.pieChart.centerY = canvas1.height / 2;
        this.pieChart.radius = Math.min(this.pieChart.centerX, this.pieChart.centerY) - 20;

        this.pieChart.redraw();
        this.linesCanvas.drawLines();
    }

    updateChart(n, d) {
        const url = new URL(window.location);
        url.searchParams.set('n', n);
        url.searchParams.set('d', d);
        window.history.pushState({}, '', url);
        this.pieChart.redraw();
    }
}

const app = new PWAApp();
