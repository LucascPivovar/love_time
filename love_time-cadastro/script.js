document.addEventListener('DOMContentLoaded', function() {
    // Array para armazenar as imagens selecionadas
    let fileArray = [];

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
                imgElement.style.width = '100px';
                imgElement.style.margin = '2px';
                imgElement.style.cursor = 'pointer';

                // Adiciona evento para remover a imagem ao clicar
                imgElement.addEventListener('click', function() {
                    container.innerHTML = ''; // Remove a imagem ao clicar nela
                    input.value = ''; // Reseta o input file
                });

                container.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        }
    }

    // Função para exibir e acumular múltiplas imagens
    function previewMultipleImages(input, containerId, maxFiles = 6) {
        const container = document.getElementById(containerId);
        const files = Array.from(input.files);

        // Verifica o total de imagens após a adição
        if (fileArray.length + files.length > maxFiles) {
            alert(`Você só pode enviar até ${maxFiles} fotos.`);
            return;
        }

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.style.width = '100px';
                imgElement.style.margin = '2px';
                imgElement.style.cursor = 'pointer';

                // Adiciona evento para remover a imagem ao clicar
                imgElement.addEventListener('click', function() {
                    // Remove a imagem do DOM e do array
                    imgElement.remove();
                    fileArray = fileArray.filter((f) => f !== file);
                });

                // Adiciona a imagem ao container e ao array de arquivos
                container.appendChild(imgElement);
                fileArray.push(file);
            };
            reader.readAsDataURL(file);
        });

        // Limpa o input para permitir a seleção dos mesmos arquivos novamente
        input.value = '';
    }

    // Eventos para as imagens únicas
    document.getElementById('foto-one').addEventListener('change', function() {
        previewSingleImage(this, 'preview-foto-one-container');
    });

    document.getElementById('foto-two').addEventListener('change', function() {
        previewSingleImage(this, 'preview-foto-two-container');
    });

    // Evento para as múltiplas imagens do casal, limitado a 6 fotos
    document.getElementById('couple-fotos').addEventListener('change', function() {
        previewMultipleImages(this, 'preview-couple-container', 6);
    });
});