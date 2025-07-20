document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const canvas = document.getElementById('post-preview');
    const ctx = canvas.getContext('2d');

    // Set today's date as default
    const today = new Date();
    document.getElementById('post-date').valueAsDate = today;

    generateBtn.addEventListener('click', function () {
        const scriptName = document.getElementById('script-name').value.trim();
        const cmp = parseFloat(document.getElementById('cmp').value);
        const stopLoss = parseFloat(document.getElementById('stop-loss').value);
        const destination = parseFloat(document.getElementById('destination').value);
        const bgColor = document.getElementById('bg-color').value;
        const textColor = document.getElementById('text-color').value;
        const stopLossColor = document.getElementById('stop-loss-color').value;
        const destinationColor = document.getElementById('destination-color').value;
        const noteColor = document.getElementById('note-color').value;
        const postDate = document.getElementById('post-date').value;

        // Set canvas size
        canvas.width = 1080;
        canvas.height = 1080;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background color
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load and draw watermark image
        const watermark = new Image();
        watermark.src = 'logo.jpg';

        watermark.onload = function () {
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.drawImage(watermark, 0, 0, canvas.width, canvas.height);
            ctx.restore();

            drawTextElements();
        };

        function drawTextElements() {
            ctx.textAlign = 'center';
            const centerX = canvas.width / 2;

            const tableWidth = 800;
            const tableX = (canvas.width - tableWidth) / 2;
            const rowHeight = 100;
            let currentY = 200;

            // Title
            ctx.fillStyle = textColor;
            ctx.font = 'bold 70px Arial';
            ctx.fillText('INVESTMENT VIEW', centerX, currentY - 50);

            // Draw full grid: 6 rows, 2 columns
            const rows = 4;
            const cols = 2;
            const cellWidth = tableWidth / cols;

            ctx.lineWidth = 2;
            ctx.strokeStyle = textColor;

            // Outer border
            ctx.strokeRect(tableX, currentY, tableWidth, rowHeight * rows);

            // Horizontal lines
            for (let i = 1; i < rows; i++) {
                const y = currentY + i * rowHeight;
                ctx.beginPath();
                ctx.moveTo(tableX, y);
                ctx.lineTo(tableX + tableWidth, y);
                ctx.stroke();
            }

            // Vertical line (for 2 columns)
            const verticalX = tableX + cellWidth;
            ctx.beginPath();
            ctx.moveTo(verticalX, currentY);
            ctx.lineTo(verticalX, currentY + rowHeight * rows);
            ctx.stroke();

            // Row 1: Script Name
            ctx.fillStyle = textColor;
            ctx.font = 'bold 50px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('Script Name:', tableX + 30, currentY + 65);
            ctx.textAlign = 'right';
            ctx.fillText(scriptName || '-', tableX + tableWidth - 30, currentY + 65);
            currentY += rowHeight;

            // Row 2: CMP
            ctx.textAlign = 'left';
            ctx.fillText('CMP:', tableX + 30, currentY + 65);
            ctx.textAlign = 'right';
            ctx.fillText(!isNaN(cmp) ? cmp.toFixed(2) : '-', tableX + tableWidth - 30, currentY + 65);
            currentY += rowHeight;

            // Row 3: Stop Loss
            ctx.fillStyle = stopLossColor;
            ctx.textAlign = 'left';
            ctx.fillText('Stop Loss:', tableX + 30, currentY + 65);
            ctx.textAlign = 'right';
            ctx.fillText(!isNaN(stopLoss) ? stopLoss.toFixed(2) : '-', tableX + tableWidth - 30, currentY + 65);
            currentY += rowHeight;

            // Row 4: Destination
            ctx.fillStyle = destinationColor;
            ctx.textAlign = 'left';
            ctx.fillText('Destination:', tableX + 30, currentY + 65);
            ctx.textAlign = 'right';
            ctx.fillText(!isNaN(destination) ? destination.toFixed(2) : '-', tableX + tableWidth - 30, currentY + 65);
            currentY += rowHeight;

            // Row 5: Note
            ctx.fillStyle = noteColor;
            ctx.font = 'bold 40px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('NOTE: EDUCATIONAL PURPOSE ONLY', centerX, currentY + 60);
            currentY += rowHeight;

            // Row 6: Date
            if (postDate) {
                const date = new Date(postDate);
                const dateStr = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                ctx.fillStyle = textColor;
                ctx.font = '40px Arial';
                ctx.fillText(`Date: ${dateStr}`, centerX, currentY + 60);
            }

            downloadBtn.classList.remove('hidden');
        }
    });

    downloadBtn.addEventListener('click', function () {
        const link = document.createElement('a');
        link.download = 'investment-view.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
