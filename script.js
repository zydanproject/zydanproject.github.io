const inputText = document.getElementById('inputText');
const outputContainer = document.getElementById('outputContainer');
const copyButton = document.getElementById('copyButton');

inputText.addEventListener('input', processInput);
copyButton.addEventListener('click', copyOutput);

function processInput() {
    const options = inputText.value.trim().split('\n');

    outputContainer.innerHTML = '';

    if (options.length > 0) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let alphabetIndex = 0;
        let foundEmptyLine = false;

        options.forEach(option => {
            const trimmedOption = option.trim();
            if (trimmedOption === '*' || trimmedOption === '/') {
                // Jika ditemukan baris kosong, set foundEmptyLine menjadi true
                foundEmptyLine = true;
            } else if (foundEmptyLine) {
                // Jika ditemukan baris kosong sebelumnya, tambahkan huruf alfabet ke opsi
                const formattedOption = `${alphabet[alphabetIndex++]}. ${trimmedOption}`;
                const optionElement = document.createElement('div');
                optionElement.textContent = formattedOption;
                outputContainer.appendChild(optionElement);
            } else {
                // Jika belum ditemukan baris kosong, tambahkan opsi tanpa huruf alfabet
                const optionElement = document.createElement('div');
                optionElement.textContent = trimmedOption;
                outputContainer.appendChild(optionElement);
            }
        });
    }
}

function copyOutput() {
    const formattedOptions = Array.from(outputContainer.children)
        .map(option => option.textContent.trim())
        .join('\n');
    
    navigator.clipboard.writeText(formattedOptions)
        .then(() => {
            inputText.value = '';  // Clear the input text
            processInput();        // Reprocess input to clear the output container
        })
        .catch(err => {
            console.error('Gagal menyalin:', err);
            alert('Gagal menyalin opsi.');
        });
}
