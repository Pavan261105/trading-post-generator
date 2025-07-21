document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const canvas = document.getElementById('post-preview');
    const ctx = canvas.getContext('2d');

    const postType = document.getElementById('post-type');
    const achievedFields = document.getElementById('achieved-fields');
    const progressFields = document.getElementById('progress-fields');

    const today = new Date();
    document.getElementById('post-date').valueAsDate = today;
    document.getElementById('hit-date').valueAsDate = today;

    postType.addEventListener('change', function () {
        achievedFields.style.display = this.value === 'achieved' ? 'block' : 'none';
        progressFields.style.display = this.value === 'progress' ? 'block' : 'none';
    });

    generateBtn.addEventListener('click', function () {
        const type = postType.value;
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

        const hitPrice = parseFloat(document.getElementById('hit-price')?.value);
        const hitDate = document.getElementById('hit-date')?.value;
        const currentPrice = parseFloat(document.getElementById('current-price')?.value);

        canvas.width = 1080;
        canvas.height = 1080;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (type === 'idea') drawIdeaLayout();
        else if (type === 'achieved') drawAchievedLayout();
        else if (type === 'progress') drawProgressLayout();

        function drawIdeaLayout() {
            const centerX = canvas.width / 2;
            const tableWidth = 800;
            const tableX = (canvas.width - tableWidth) / 2;
            const rowHeight = 100;
            let currentY = 200;

            ctx.fillStyle = textColor;
            ctx.font = 'bold 70px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('INVESTMENT VIEW', centerX, currentY - 50);

            ctx.lineWidth = 2;
            ctx.strokeStyle = textColor;
            ctx.strokeRect(tableX, currentY, tableWidth, rowHeight * 4);
            for (let i = 1; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(tableX, currentY + i * rowHeight);
                ctx.lineTo(tableX + tableWidth, currentY + i * rowHeight);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.moveTo(tableX + tableWidth / 2, currentY);
            ctx.lineTo(tableX + tableWidth / 2, currentY + rowHeight * 4);
            ctx.stroke();

            ctx.textAlign = 'left';
            ctx.font = 'bold 50px Arial';
            ctx.fillStyle = textColor;
            ctx.fillText('Script Name:', tableX + 30, currentY + 65);
            ctx.textAlign = 'right';
            ctx.fillText(scriptName || '-', tableX + tableWidth - 30, currentY + 65);
            currentY += rowHeight;

            ctx.textAlign = 'left';
            ctx.fillText('CMP:', tableX + 30, currentY + 65);
            ctx.textAlign = 'right';
            ctx.fillText(!isNaN(cmp) ? cmp.toFixed(2) : '-', tableX + tableWidth - 30, currentY + 65);
            currentY += rowHeight;

            ctx.fillStyle = stopLossColor;
            ctx.textAlign = 'left';
            ctx.fillText('Stop Loss:', tableX + 30, currentY + 65);
            ctx.textAlign = 'right';
            ctx.fillText(!isNaN(stopLoss) ? stopLoss.toFixed(2) : '-', tableX + tableWidth - 30, currentY + 65);
            currentY += rowHeight;

            ctx.fillStyle = destinationColor;
            ctx.textAlign = 'left';
            ctx.fillText('Target:', tableX + 30, currentY + 65);
            ctx.textAlign = 'right';
            ctx.fillText(!isNaN(destination) ? destination.toFixed(2) : '-', tableX + tableWidth - 30, currentY + 65);

            ctx.fillStyle = noteColor;
            ctx.font = 'bold 40px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('NOTE: EDUCATIONAL PURPOSE ONLY', centerX, currentY + 160);

            if (postDate) {
                const dateStr = new Date(postDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                ctx.fillStyle = textColor;
                ctx.font = '40px Arial';
                ctx.fillText(`Date: ${dateStr}`, centerX, currentY + 220);
            }

            ctx.font = 'bold 42px Arial';
            ctx.fillText('Santosh Me Maza Hai ✍🏻', centerX, canvas.height - 90);
            downloadBtn.classList.remove('hidden');
        }

        function drawAchievedLayout() {
            const centerX = canvas.width / 2;

            ctx.fillStyle = '#00C853';
            ctx.font = 'bold 85px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('🎯 TARGET ACHIEVED!', centerX, 140);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 60px Arial';
            ctx.fillText(scriptName || '-', centerX, 240);

            ctx.fillStyle = '#FFC107';
            ctx.font = 'bold 45px Arial';
            ctx.fillText(`Hit Price: ₹${!isNaN(hitPrice) ? hitPrice.toFixed(2) : '-'}`, centerX, 330);

            ctx.fillStyle = destinationColor;
            ctx.font = 'bold 42px Arial';
            ctx.fillText(`🎯 Target Was: ₹${!isNaN(destination) ? destination.toFixed(2) : '-'}`, centerX, 400);

            ctx.fillStyle = '#81D4FA';
            ctx.font = 'bold 40px Arial';
            ctx.fillText(`📈 Posted CMP: ₹${!isNaN(cmp) ? cmp.toFixed(2) : '-'}`, centerX, 460);

            if (postDate) {
                const postedStr = new Date(postDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                ctx.fillText(`🗓️ Posted On: ${postedStr}`, centerX, 520);
            }

            if (hitDate) {
                const hitStr = new Date(hitDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                ctx.fillText(`✅ Hit On: ${hitStr}`, centerX, 580);
            }

            ctx.fillStyle = '#FFEB3B';
            ctx.font = 'bold italic 40px Arial';
            ctx.fillText('Santosh Me Maza Hai ✍🏻', centerX, canvas.height - 70);
            downloadBtn.classList.remove('hidden');
        }

        function drawProgressLayout() {
            const centerX = canvas.width / 2;
            const percent = (!isNaN(currentPrice) && !isNaN(cmp)) ? (((currentPrice - cmp) / cmp) * 100).toFixed(2) : '-';

            ctx.fillStyle = '#29B6F6';
            ctx.font = 'bold 80px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('📈 PRICE IN ACTION!', centerX, 130);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 60px Arial';
            ctx.fillText(scriptName || '-', centerX, 220);

            ctx.font = 'bold 42px Arial';
            ctx.fillStyle = '#B3E5FC';
            ctx.fillText(`CMP: ₹${!isNaN(cmp) ? cmp.toFixed(2) : '-'}`, centerX, 300);
            ctx.fillStyle = '#ffffffff';
            ctx.fillText(`Current: ₹${!isNaN(currentPrice) ? currentPrice.toFixed(2) : '-'}`, centerX, 360);

            ctx.fillStyle = '#FFF176';
            ctx.fillText(`📊 Progress: ${percent}%`, centerX, 420);

            ctx.fillStyle = destinationColor;
            ctx.fillText(`🎯 Target: ₹${!isNaN(destination) ? destination.toFixed(2) : '-'}`, centerX, 480);

            if (postDate) {
                const dateStr = new Date(postDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                ctx.fillStyle = textColor;
                ctx.font = '40px Arial';
                ctx.fillText(`📅 Posted On: ${dateStr}`, centerX, 540);
            }

            ctx.fillStyle = '#FF9100';
            ctx.font = 'bold 36px Arial';
            ctx.fillText('🔥 Price moving toward our target!', centerX, 620);

            ctx.fillStyle = textColor;
            ctx.font = 'bold 42px Arial';
            ctx.fillText('Santosh Me Maza Hai ✍🏻', centerX, canvas.height - 70);

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
