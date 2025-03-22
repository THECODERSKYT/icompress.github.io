document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions (adjust for compression)
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Get compression quality from slider
            const quality = document.getElementById('quality').value / 100;

            // Convert canvas to a compressed image
            canvas.toBlob(function (blob) {
                const compressedImageUrl = URL.createObjectURL(blob);

                // Show the compressed image preview
                const preview = document.getElementById('preview');
                preview.src = compressedImageUrl;

                // Show the download link
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = compressedImageUrl;
                downloadLink.download = 'compressed-image.jpg';
                downloadLink.style.display = 'block';
            }, 'image/jpeg', quality);
        };
    };
    reader.readAsDataURL(file);
});

// Update slider value display
document.getElementById('quality').addEventListener('input', function () {
    document.getElementById('qualityValue').textContent = this.value;
});
