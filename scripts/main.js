// Main application module

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация тем
    initTheme();
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация модальных окон
    initModals();
    
    // Загрузка данных
    loadDashboardData();
    
    // Инициализация фильтров
    initFilters();
    
    // Обновление информации о системе
    updateSystemInfo();
    
    // Инициализация карточек базы данных
    initDatabaseCards();
});

// Управление темами
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Применение сохраненной темы
    document.body.className = `${savedTheme}-theme`;
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Переключение темы
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.classList.remove(`${currentTheme}-theme`);
        document.body.classList.add(`${newTheme}-theme`);
        
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', newTheme);
    });
}

// Управление навигацией
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
            
            // Скрываем все секции
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Показываем выбранную секцию
            const sectionId = `${this.dataset.section}-section`;
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Инициализация модальных окон
function initModals() {
    const modal = document.getElementById('detail-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Загрузка данных для дашборда
function loadDashboardData() {
    // Здесь будет загрузка данных с сервера
    // Временно используем mock-данные
    const mockData = {
        topWanted: [
            { name: "Unknown Name", image: "suspect_people/{4B551AA6-FDFA-4D05-A75D-09D4CC2B781D}.png", country: "Syria", risk: "high", details: "Height: 1.81-1.87, Black Hair, Slim | Genocide in Tartus and Latakia" },
            { name: "Unknown Name", image: "suspect_people/{4C5737BA-62D0-46D1-A07A-8868E329D7F6}.png", country: "Syria", risk: "high", details: "Height: 1.73-1.77, Red Hair, Medium Build | Genocide in Tartus and Latakia - 2025" },
            { name: "Unknown Name", image: "suspect_people/{8A4C53ED-5E0A-47FD-9266-0F64B1E196D7}.png", country: "Syria", risk: "medium", details: "Height: 1.84-1.88, Large Build | Genocide in Tartus and Latakia - 2025" }
        ],
        suspiciousVehicles: [
            { model: "Toyota Land Cruiser 2007 White", plate: "?????74??", image: "suspect_vehicles/{204C80FB-A22C-4DA2-93C0-CBF2EBCEAA71}.png", country: "Syria", details: "Used for killings with a Land Cruiser type vehicle and ammunition transport - 2025" },
            { model: "Kia Bongo 3 White", plate: "Unknown Plate", image: "suspect_vehicles/{134521EC-4382-4978-930A-8C22014846C4}.png", country: "Syria", details: "Transport of Ammunition and Terrorists - 2025" }
        ],
        stats: {
            totalSuspects: 1245,
            highRisk: 342,
            countries: 18,
            newThisMonth: 56
        },
        recentAlerts: [
            { type: "warning", message: "New suspect added in Syria - High risk", time: "2 hours ago" },
            { type: "info", message: "Database update completed", time: "5 hours ago" },
            { type: "danger", message: "Vehicle spotted in Sudan - Possible match", time: "1 day ago" }
        ]
    };
    
    // Заполняем топ разыскиваемых
    const topWantedList = document.querySelector('.top-wanted-list');
    mockData.topWanted.forEach(suspect => {
        const item = document.createElement('div');
        item.className = 'wanted-item';
        item.innerHTML = `
            <img src="${suspect.image}" alt="${suspect.name}">
            <div class="wanted-info">
                <h4>${suspect.name}</h4>
                <span class="country-flag">${suspect.country}</span>
                <span class="risk-level ${suspect.risk}">${suspect.risk.toUpperCase()}</span>
                <p>${suspect.details}</p>
            </div>
        `;
        topWantedList.appendChild(item);
    });
    
    // Заполняем подозрительные транспортные средства
    const vehiclesList = document.querySelector('.vehicles-list');
    mockData.suspiciousVehicles.forEach(vehicle => {
        const item = document.createElement('div');
        item.className = 'vehicle-item';
        item.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.model}">
            <div class="vehicle-info">
                <h4>${vehicle.model}</h4>
                <span class="country-flag">${vehicle.country}</span>
                <span class="plate-number">${vehicle.plate}</span>
                <p>${vehicle.details}</p>
            </div>
        `;
        vehiclesList.appendChild(item);
    });
    
    // Заполняем статистику
    const statsContainer = document.querySelector('.stats-container');
    statsContainer.innerHTML = `
        <div class="stat-item">
            <div class="stat-value">${mockData.stats.totalSuspects}</div>
            <div class="stat-label">Total Suspects</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${mockData.stats.highRisk}</div>
            <div class="stat-label">High Risk</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${mockData.stats.countries}</div>
            <div class="stat-label">Countries</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${mockData.stats.newThisMonth}</div>
            <div class="stat-label">New This Month</div>
        </div>
    `;
    
    // Заполняем последние предупреждения
    const alertsList = document.querySelector('.alerts-list');
    mockData.recentAlerts.forEach(alert => {
        const item = document.createElement('div');
        item.className = `alert-item ${alert.type}`;
        item.innerHTML = `
            <i class="fas fa-${alert.type === 'danger' ? 'exclamation-triangle' : alert.type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
            <div class="alert-content">
                <p>${alert.message}</p>
                <span class="alert-time">${alert.time}</span>
            </div>
        `;
        alertsList.appendChild(item);
    });
}

// Инициализация фильтров
function initFilters() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    // Применение фильтров
    applyFiltersBtn.addEventListener('click', function() {
        // Здесь будет логика фильтрации
        showSystemAlert('Filters applied successfully', 'success');
    });
    
    // Сброс фильтров
    resetFiltersBtn.addEventListener('click', function() {
        document.querySelectorAll('#country-filter option, #category-filter option, #risk-filter option').forEach(option => {
            option.selected = option.value === 'all';
        });
        showSystemAlert('Filters reset', 'info');
    });
}

// Обновление информации о системе
function updateSystemInfo() {
    document.getElementById('last-update').textContent = new Date().toLocaleDateString();
    document.getElementById('db-size').textContent = '0.0001 TB';
}

// Показать системное уведомление
function showSystemAlert(message, type = 'info') {
    const alertsContainer = document.getElementById('system-alerts');
    const alert = document.createElement('div');
    alert.className = `system-alert ${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'danger' ? 'exclamation-triangle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="alert-close"><i class="fas fa-times"></i></button>
    `;
    
    alertsContainer.appendChild(alert);
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 300);
    }, 5000);
    
    // Ручное закрытие
    alert.querySelector('.alert-close').addEventListener('click', function() {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 300);
    });
}

// Инициализация карточек в базе данных
function initDatabaseCards() {
    // Здесь будет загрузка данных с сервера
    // Временно используем mock-данные
    const mockData = {
        "Syria": {
            "people": [
                { name: "Unknown Name", image: "suspect_people/{4B551AA6-FDFA-4D05-A75D-09D4CC2B781D}.png", details: "Height: 1.81-1.87, Black Hair, Slim | Genocide in Tartus and Latakia", risk: "high" },
                { name: "Unknown Name", image: "suspect_people/{4C5737BA-62D0-46D1-A07A-8868E329D7F6}.png", details: "Height: 1.73-1.77, Red Hair, Medium Build | Genocide in Tartus and Latakia - 2025", risk: "high" },
                { name: "Unknown Name", image: "suspect_people/{8A4C53ED-5E0A-47FD-9266-0F64B1E196D7}.png", details: "Height: 1.84-1.88, Large Build | Genocide in Tartus and Latakia - 2025", risk: "medium" },
                { name: "Unknown Name", image: "suspect_people/{7711430C-F34F-4EB9-B750-88E594F82006}.png", details: "Height: 1.81-1.87, Black Hair, Slim | Genocide Operator in Tartus and Latakia - 2025", risk: "high" },
                { name: "Unknown Name", image: "suspect_people/{AF262C9E-D56C-4378-9E7A-A25BE979C728}.png", details: "Height: 1.73-1.77, Red Hair, Medium Build | Genocide in Tartus and Latakia - 2025", risk: "medium" }
            ],
            "vehicles": [
                { model: "Toyota Land Cruiser 2007 White", plate: "?????74??", image: "suspect_vehicles/{204C80FB-A22C-4DA2-93C0-CBF2EBCEAA71}.png", details: "Used for killings with a Land Cruiser type vehicle and ammunition transport - 2025", risk: "high" },
                { model: "Kia Bongo 3 White", plate: "Unknown Plate", image: "suspect_vehicles/{134521EC-4382-4978-930A-8C22014846C4}.png", details: "Transport of Ammunition and Terrorists - 2025", risk: "medium" }
            ]
        },
        "Sudan": {
            "people": [
                { name: "No Info", image: "suspect_people/undefined_person.png", details: "Undefined", risk: "low" }
            ],
            "vehicles": [
                { model: "No Info", plate: "No-404", image: "suspect_vehicles/undefined_vehicle.png", details: "No Vehicle Found", risk: "low" }
            ]
        },
        "Nigeria": {
            "people": [
                { name: "No Info", image: "suspect_people/undefined_person.png", details: "Undefined", risk: "low" }
            ],
            "vehicles": [
                { model: "No Info", plate: "No-404", image: "suspect_vehicles/undefined_vehicle.png", details: "No Vehicle Found", risk: "low" }
            ]
        }
    };
    
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    
    // Счетчик результатов
    let resultsCount = 0;
    
    // Добавляем данные в результаты
    Object.keys(mockData).forEach(country => {
        ['people', 'vehicles'].forEach(category => {
            mockData[country][category].forEach(item => {
                resultsCount++;
                const card = document.createElement('div');
                card.className = 'result-card';
                card.dataset.country = country;
                card.dataset.category = category;
                card.dataset.risk = item.risk;
                
                if (category === 'people') {
                    card.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="card-body">
                            <h3>${item.name}</h3>
                            <div class="card-meta">
                                <span class="country-flag">${country}</span>
                                <span class="risk-level ${item.risk}">${item.risk.toUpperCase()}</span>
                            </div>
                            <p class="card-description">${item.details}</p>
                        </div>
                    `;
                } else {
                    card.innerHTML = `
                        <img src="${item.image}" alt="${item.model}">
                        <div class="card-body">
                            <h3>${item.model}</h3>
                            <div class="card-meta">
                                <span class="country-flag">${country}</span>
                                <span class="risk-level ${item.risk}">${item.risk.toUpperCase()}</span>
                            </div>
                            <p class="plate-number">Plate: ${item.plate}</p>
                            <p class="card-description">${item.details}</p>
                        </div>
                    `;
                }
                
                // Обработчик клика для открытия детальной информации
                card.addEventListener('click', function() {
                    openDetailModal(item, category);
                });
                
                resultsContainer.appendChild(card);
            });
        });
    });
    
    // Обновляем счетчик результатов
    document.getElementById('results-count').textContent = resultsCount;
}

// Открытие модального окна с детальной информацией
function openDetailModal(item, category) {
    const modal = document.getElementById('detail-modal');
    const modalBody = document.querySelector('.modal-body');
    
    // Заполняем модальное окно данными
    if (category === 'people') {
        modalBody.innerHTML = `
            <div class="detail-header">
                <div class="detail-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="detail-title">
                    <h2>${item.name}</h2>
                    <div class="detail-meta">
                        <span class="risk-level ${item.risk}">${item.risk.toUpperCase()}</span>
                        <span class="country-flag">${item.country || 'Unknown'}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-content">
                <div class="detail-section">
                    <h3><i class="fas fa-info-circle"></i> Details</h3>
                    <p>${item.details}</p>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-map-marker-alt"></i> Last Known Locations</h3>
                    <ul class="locations-list">
                        <li>Tartus, Syria (2025)</li>
                        <li>Latakia, Syria (2025)</li>
                        <li>Syria (2025)</li>
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-exclamation-triangle"></i> Associated Crimes</h3>
                    <ul class="crimes-list">
                        <li>Genocide</li>
                        <li>War crimes</li>
                        <li>Murder of prisoners</li>
                    </ul>
                </div>
            </div>
            
            <div class="detail-actions">
                <button class="primary-button"><i class="fas fa-flag"></i> Report Sighting</button>
                <button class="secondary-button"><i class="fas fa-download"></i> Download Profile</button>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="detail-header">
                <div class="detail-image">
                    <img src="${item.image}" alt="${item.model}">
                </div>
                <div class="detail-title">
                    <h2>${item.model}</h2>
                    <div class="detail-meta">
                        <span class="risk-level ${item.risk}">${item.risk.toUpperCase()}</span>
                        <span class="country-flag">${item.country || 'Unknown'}</span>
                        <span class="plate-number">${item.plate}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-content">
                <div class="detail-section">
                    <h3><i class="fas fa-info-circle"></i> Details</h3>
                    <p>${item.details}</p>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-map-marker-alt"></i> Last Known Locations</h3>
                    <ul class="locations-list">
                        <li>Tartus, Syria (2025)</li>
                        <li>Latakia, Syria (2025)</li>
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h3><i class="fas fa-users"></i> Associated Individuals</h3>
                    <div class="associated-people">
                        <div class="person-card">
                            <img src="suspect_people/{4B551AA6-FDFA-4D05-A75D-09D4CC2B781D}.png" alt="Person">
                            <span>Unknown Name</span>
                        </div>
                        <div class="person-card">
                            <img src="suspect_people/{4C5737BA-62D0-46D1-A07A-8868E329D7F6}.png" alt="Person">
                            <span>Unknown Name</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="detail-actions">
                <button class="primary-button"><i class="fas fa-flag"></i> Report Sighting</button>
                <button class="secondary-button"><i class="fas fa-download"></i> Download Profile</button>
            </div>
        `;
    }
    
    // Показываем модальное окно
    modal.style.display = 'block';
}
