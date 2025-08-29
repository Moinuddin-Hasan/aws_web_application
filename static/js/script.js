// Handle animal checkbox selection to show one photo
const animalCheckboxes = document.querySelectorAll('input[name="animal"]');
const animalPhotoDiv = document.getElementById('animal-photo');

animalCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        // Uncheck all except the current
        animalCheckboxes.forEach(otherCb => {
            if (otherCb !== cb) otherCb.checked = false;
        });

        if (cb.checked) {
            showAnimalPhoto(cb.value);
        } else {
            animalPhotoDiv.innerHTML = '';
        }
    });
});

function showAnimalPhoto(animal) {
    // Image path relative to static folder
    const imgPath = `/static/images/${animal}.jpeg`;
    animalPhotoDiv.innerHTML = `<img src="${imgPath}" alt="${animal}" />`;
}

// Handle file upload info display
const fileInput = document.getElementById('fileInput');
const fileInfoContainer = document.getElementById('file-info-container');
const fileNameTd = document.getElementById('file-name');
const fileSizeTd = document.getElementById('file-size');
const fileTypeTd = document.getElementById('file-type');

fileInput.addEventListener('change', () => {
    if (fileInput.files.length === 0) {
        fileInfoContainer.style.display = 'none';
        return;
    }
    const file = fileInput.files[0];

    // Prepare FormData
    const formData = new FormData();
    formData.append('file', file);

    // Post file to backend
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            fileInfoContainer.style.display = 'none';
            alert('Error uploading file: ' + data.error);
            return;
        }
        // Show file details in table
        fileNameTd.textContent = data.filename;
        fileSizeTd.textContent = data.size;
        fileTypeTd.textContent = data.content_type;
        fileInfoContainer.style.display = 'block';
    })
    .catch(() => {
        fileInfoContainer.style.display = 'none';
        alert('Error uploading file');
    });
});
