// 이미지 미리보기 기능
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

        // 이미지를 서버로 전송하여 처리
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

    // 결과를 페이지의 아래 부분에 표시
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
