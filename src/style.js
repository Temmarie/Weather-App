function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    if (tab.textContent.toLowerCase() === tabName.toLowerCase()) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  const forecastContainers = document.querySelectorAll('.forecast-container');
  forecastContainers.forEach(container => {
    if (container.id.toLowerCase().includes(tabName.toLowerCase())) {
      container.classList.add('active');
    } else {
      container.classList.remove('active');
    }
  });
}
