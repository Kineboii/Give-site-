document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('giveawayForm');
  
  form.addEventListener('submit', function(e) {
    // You can add client-side validation here if needed
    // e.preventDefault(); // Uncomment if you want to handle submission with AJAX
    
    // Example validation:
    const phone = document.getElementById('phone').value;
    if (!/^\d+$/.test(phone)) {
      alert('Please enter a valid phone number');
      e.preventDefault();
    }
  });
  
  // Add any additional interactive elements here
});