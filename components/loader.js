// Load component into element
async function loadComponent(elementId, componentPath) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  try {
    const response = await fetch(componentPath);
    if (response.ok) {
      element.innerHTML = await response.text();
      
      // Set active nav link based on current page
      if (elementId === 'nav-placeholder') {
        setActiveNavLink();
      }
    }
  } catch (error) {
    console.error(`Error loading ${componentPath}:`, error);
  }
}

// Set active class on current page's nav link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links > a, .nav-dropdown-trigger');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Handle dropdown pages (competitions, schools)
  if (currentPage === 'competitions.html' || currentPage === 'schools.html') {
    const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
    if (dropdownTrigger) {
      dropdownTrigger.classList.add('active');
    }
  }
}

// Toggle mobile menu
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Determine path prefix based on page location
  const isInSubfolder = window.location.pathname.includes('/posts/');
  const prefix = isInSubfolder ? '../' : '';
  
  loadComponent('nav-placeholder', prefix + 'components/nav.html');
  loadComponent('footer-placeholder', prefix + 'components/footer.html');
});
