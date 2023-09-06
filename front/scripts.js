// �̹��� �̸����� ���
document.getElementById("chooseFile").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;
            imgElement.id = "uploadedImg";
            const preview = document.querySelector(".preview");
            preview.innerHTML = "";
            preview.appendChild(imgElement);
        };
        reader.readAsDataURL(file);
    }
});

document.querySelector(".button-generate").addEventListener("click", function (event) {
    event.preventDefault();

    const uploadedImg = document.getElementById("uploadedImg");
    if (uploadedImg) {
        const formData = new FormData();
        formData.append('image', document.getElementById("chooseFile").files[0]);

        // �̹����� ������ �����Ͽ� ó��
        fetch('/process-image', {
            method: 'POST',
            body: formData
        })
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                uploadedImg.src = url;
            });
    }

    // ����� �������� �Ʒ� �κп� ǥ��
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
