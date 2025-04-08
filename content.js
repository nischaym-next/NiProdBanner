// Function to check if the current URL matches any production URL pattern
function isProductionSite(currentUrl, productionUrls) {
    // Simple matching for exact URLs or domains
    for (const pattern of productionUrls) {
        // Convert glob patterns to regex patterns
        if (pattern.includes('*')) {
            const regexPattern = pattern
                .replace(/\./g, '\\.')
                .replace(/\*/g, '.*');

            const regex = new RegExp(`^${regexPattern}$`);
            if (regex.test(currentUrl)) {
                return true;
            }
        }
        // Direct match
        else if (currentUrl.includes(pattern)) {
            return true;
        }
    }
    return false;
}

// Function to create and insert the banner
function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'production-warning-banner';
    banner.textContent = '⚠️ THIS IS A PRODUCTION SITE ⚠️';
    document.body.insertAdjacentElement('afterbegin', banner);
}

// Check if the current page is a production site as soon as possible
window.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('productionUrls', function(data) {
        const productionUrls = data.productionUrls || [];

        if (productionUrls.length > 0) {
            const currentUrl = window.location.href;

            if (isProductionSite(currentUrl, productionUrls)) {
                createBanner();
            }
        }
    });
});