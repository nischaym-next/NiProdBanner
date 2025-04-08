
// Load saved URLs when the options page is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('productionUrls', function(data) {
        if (data.productionUrls) {
            document.getElementById('urlList').value = data.productionUrls.join('\n');
        }
    });

    // Add save button functionality
    document.getElementById('saveButton').addEventListener('click', saveOptions);
});

// Save options to Chrome storage
function saveOptions() {
    const urlTextarea = document.getElementById('urlList');
    const urlList = urlTextarea.value.split('\n')
        .map(url => url.trim())
        .filter(url => url !== '');

    chrome.storage.sync.set({ 'productionUrls': urlList }, function() {
        // Show success message
        const saveSuccess = document.getElementById('saveSuccess');
        saveSuccess.style.display = 'block';

        // Hide message after 3 seconds
        setTimeout(function() {
            saveSuccess.style.display = 'none';
        }, 3000);
    });
}