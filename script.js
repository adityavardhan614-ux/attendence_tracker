// script.js contains the login and dashboard behavior

// Helper to pick a random integer in a range
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Validate login fields and redirect to dashboard
function handleLogin() {
  const studentId = document.getElementById('studentId').value.trim();
  const password = document.getElementById('password').value.trim();

  if (studentId === '' || password === '') {
    alert('Please enter both Student ID and Password.');
    return;
  }

  sessionStorage.setItem('isLoggedIn', 'true');
  window.location.href = 'dashboard.html';
}

// Show the selected section and hide the others
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section-panel');
  sections.forEach((section) => {
    section.classList.toggle('hidden', section.id !== sectionId);
  });
}

// Create dummy student data and populate the dashboard
function populateDashboard() {
  const studentData = {
    name: 'Aarav Patel',
    id: 'STU' + randomInt(1000, 9999),
    branch: 'Computer Science',
    year: '3rd Year',
  };

  document.getElementById('studentName').textContent = studentData.name;
  document.getElementById('studentID').textContent = studentData.id;
  document.getElementById('studentBranch').textContent = studentData.branch;
  document.getElementById('studentYear').textContent = studentData.year;

  const attendance = randomInt(60, 100);
  document.getElementById('attendanceValue').textContent = attendance + '%';
  document.getElementById('attendanceFill').style.width = attendance + '%';

  document.getElementById('mathsMark').textContent = randomInt(50, 100);
  document.getElementById('physicsMark').textContent = randomInt(50, 100);
  document.getElementById('chemistryMark').textContent = randomInt(50, 100);
}

// Logout and return to login page
function handleLogout() {
  sessionStorage.removeItem('isLoggedIn');
  window.location.href = 'index.html';
}

// Run when index.html is loaded
if (document.getElementById('loginBtn')) {
  document.getElementById('loginBtn').addEventListener('click', handleLogin);
}

// Run when dashboard.html is loaded
if (document.getElementById('logoutBtn')) {
  if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
  }

  populateDashboard();
  showSection('detailsSection');

  document.getElementById('logoutBtn').addEventListener('click', handleLogout);

  const cards = document.querySelectorAll('.dashboard-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-section');
      if (target === 'logoutSection') {
        handleLogout();
        return;
      }
      showSection(target);
    });
  });
}
