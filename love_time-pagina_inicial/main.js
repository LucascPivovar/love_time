document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("text");
    const textContent = textElement.innerHTML;
    textElement.innerHTML = ""; 
    let index = 0;

    function typeLetter() {
        if (index < textContent.length) {
            if (textContent[index] === '<') {

                let closingTagIndex = textContent.indexOf('>', index);
                textElement.innerHTML += textContent.substring(index, closingTagIndex + 1);
                index = closingTagIndex + 1;
            } else {

                textElement.innerHTML += textContent[index];
                index++;
            }
            setTimeout(typeLetter, 70);
        }
    }

    typeLetter();
});
