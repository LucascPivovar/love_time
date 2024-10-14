document.addEventListener('DOMContentLoaded', function() {
    // Função para exibir a pré-visualização de uma única imagem e permitir remoção ao clicar
    function previewSingleImage(input, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Limpa o container antes de adicionar nova imagem

        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.style.width = '100px'; // Largura da imagem
                imgElement.style.margin = '2px';
                imgElement.style.cursor = 'pointer';

                // Adiciona evento para remover a imagem ao clicar
                imgElement.addEventListener('click', function() {
                    container.innerHTML = ''; // Remove a imagem ao clicar nela
                    input.value = ''; // Reseta o input file
                });

                container.appendChild(imgElement); // Adiciona a imagem ao container
            };
            reader.readAsDataURL(file); // Lê o arquivo e dispara o onload
        }
    }

    // Função para exibir a pré-visualização de múltiplas imagens e permitir remoção ao clicar
    function previewMultipleImages(input, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Limpa o container antes de adicionar novas imagens

        const files = input.files;
        if (files.length > 0) {
            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    imgElement.style.width = '100px'; // Largura da imagem
                    imgElement.style.margin = '2px';
                    imgElement.style.cursor = 'pointer';

                    // Adiciona evento para remover a imagem ao clicar
                    imgElement.addEventListener('click', function() {
                        imgElement.remove(); // Remove a imagem ao clicar nela
                    });

                    container.appendChild(imgElement); // Adiciona a imagem ao container
                };
                reader.readAsDataURL(file); // Lê cada arquivo
            });
        }
    }


    // Eventos para as imagens únicas
    document.getElementById('foto-one').addEventListener('change', function() {
        previewSingleImage(this, 'preview-foto-one-container');
    });

    document.getElementById('foto-two').addEventListener('change', function() {
        previewSingleImage(this, 'preview-foto-two-container');
    });

    // Evento para as múltiplas imagens do casal
    document.getElementById('couple-fotos').addEventListener('change', function() {
        previewMultipleImages(this, 'preview-couple-container');
    });
});
