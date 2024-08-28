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
        let foundSeparator = false;

        options.forEach(option => {
            const trimmedOption = option.trim();
            
            // Periksa apakah baris merupakan separator '*' atau '/'
            if (trimmedOption === '*' || trimmedOption === '/') {
                foundSeparator = true;
            } else if (foundSeparator && trimmedOption !== '') {
                // Cetak dengan huruf alfabet jika ditemukan separator dan baris tidak kosong
                const formattedOption = `${alphabet[alphabetIndex++]}. ${trimmedOption}`;
                const optionElement = document.createElement('div');
                optionElement.textContent = formattedOption;
                outputContainer.appendChild(optionElement);
            } else if (!foundSeparator && trimmedOption !== '') {
                // Cetak langsung jika belum menemukan separator dan baris tidak kosong
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
