function calculateWater() {
    const input = document.getElementById('heightsInput').value;
    const heights = input.split(',').map(Number);
    const n = heights.length;
    if (n < 3) {
        document.getElementById('output').innerText = 'No water can be trapped.';
        return;
    }

    let leftMax = Array(n).fill(0);
    let rightMax = Array(n).fill(0);
    let waterTrapped = 0;

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    let trappedWater = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        const waterLevel = Math.min(leftMax[i], rightMax[i]);
        if (waterLevel > heights[i]) {
            trappedWater[i] = waterLevel - heights[i];
            waterTrapped += trappedWater[i];
        }
    }

    document.getElementById('output').innerText = `Total Water Trapped: ${waterTrapped} Units`;
    visualizeWaterOnly(trappedWater);
}

function visualizeWaterOnly(trappedWater) {
    const container = document.getElementById('visualization');
    container.innerHTML = '';
    const maxHeight = Math.max(...trappedWater);
    for (let i = 0; i < trappedWater.length; i++) {
        const waterAmount = trappedWater[i];

        if (waterAmount > 0) {
            const waterBlock = document.createElement('div');
            waterBlock.className = 'block';
            waterBlock.style.height = `${maxHeight * 10}px`;

            const water = document.createElement('div');
            water.className = 'water';
            water.style.height = `${waterAmount * 10}px`;

            waterBlock.appendChild(water);
            container.appendChild(waterBlock);
        } else {
            const emptyBlock = document.createElement('div');
            emptyBlock.className = 'block';
            emptyBlock.style.height = `${maxHeight * 10}px`;
            container.appendChild(emptyBlock);
        }
    }
}
