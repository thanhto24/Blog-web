// popup.js
export function showPopup(message, status) {
    // Create popup container element
    const popup = document.createElement('div');
    popup.classList.add(
      'fixed', 'top-5', 'right-5', 'z-50', 'p-4', 'rounded-lg', 'shadow-lg', 'transition-opacity', 'duration-300',
      'max-w-sm', 'text-white'
    );
  
    // Add different styles based on status
    if (status === 'success') {
      popup.classList.add('bg-green-500'); // Green background for success
    } else if (status === 'fail') {
      popup.classList.add('bg-red-500'); // Red background for failure
    }
  
    // Set the popup message
    popup.innerHTML = `
      <div class="flex items-center">
        <span class="flex-grow">${message}</span>
        <button class="ml-4 text-lg font-bold" onclick="this.parentElement.parentElement.remove()">X</button>
      </div>
    `;
  
    // Append the popup to the document body
    document.body.appendChild(popup);
  
    // Automatically remove the popup after 3 seconds
    setTimeout(() => {
      popup.classList.add('opacity-0'); // Fade out
      setTimeout(() => {
        popup.remove(); // Remove after fade-out transition
      }, 300); // Match transition duration
    }, 3000); // Display for 3 seconds
  }
  