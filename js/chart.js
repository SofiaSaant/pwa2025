class PieChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.colors = ['#2196F3', '#FF9800', '#F44336', '#4CAF50', '#00BCD4'];
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.centerX, this.centerY) - 20;
    }

    getUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const n = parseInt(urlParams.get('n')) || 2;
        const d = parseInt(urlParams.get('d')) || 5;

        return { n: Math.max(1, n), d: Math.max(1, d) };
    }

    draw() {
        const { n, d } = this.getUrlParameters();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const activeSlices = Math.min(n, d);
        const sliceAngle = (2 * Math.PI) / d;

        let currentAngle = -Math.PI / 2;

        for (let i = 0; i < d; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.arc(
                this.centerX,
                this.centerY,
                this.radius,
                currentAngle,
                currentAngle + sliceAngle
            );
            this.ctx.closePath();

            if (i < activeSlices) {
                this.ctx.fillStyle = this.colors[i % this.colors.length];
                this.ctx.fill();

                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();

                const textAngle = currentAngle + sliceAngle / 2;
                const textX = this.centerX + Math.cos(textAngle) * (this.radius * 0.7);
                const textY = this.centerY + Math.sin(textAngle) * (this.radius * 0.7);

                this.ctx.fillStyle = '#fff';
                this.ctx.font = 'bold 16px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(`1/${d}`, textX, textY);
            } else {
                this.ctx.fillStyle = '#e0e0e0';
                this.ctx.fill();

                this.ctx.strokeStyle = '#ccc';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }

            currentAngle += sliceAngle;
        }

        this.drawTitle(n, d);
    }

    drawTitle(n, d) {
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(
            `${n}/${d}`,
            this.centerX,
            this.centerY
        );
    }

    redraw() {
        this.draw();
    }
}