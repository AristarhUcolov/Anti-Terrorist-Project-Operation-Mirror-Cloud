// Advanced features module
import TerrorWatchDB from './database.js';

// Initialize advanced features
export function initAdvancedFeatures() {
    initWorldMap();
    initAnalyticsCharts();
    initReportForm();
    initExportSystem();
    initCompareSystem();
    initNetworkGraph();
}

// Initialize world map
function initWorldMap() {
    const map = L.map('world-map').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add markers from database
    const markers = {
        people: L.layerGroup(),
        vehicles: L.layerGroup(),
        organizations: L.layerGroup()
    };
    
    Object.values(markers).forEach(layer => layer.addTo(map));
    
    // Add people markers
    TerrorWatchDB.search("", { category: "people" }).forEach(person => {
        if (person.locations && person.locations.length > 0) {
            // For demo, just place randomly in the country
            const countryCoords = getCountryCoordinates(person.country);
            const lat = countryCoords.lat + (Math.random() * 4 - 2);
            const lng = countryCoords.lng + (Math.random() * 4 - 2);
            
            const marker = L.circleMarker([lat, lng], {
                radius: 8,
                fillColor: getRiskColor(person.risk),
                color: '#fff',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(markers.people);
            
            marker.bindPopup(`
                <h3>${person.name}</h3>
                <p><strong>Risk:</strong> <span class="risk-level ${person.risk}">${person.risk.toUpperCase()}</span></p>
                <p>${person.details}</p>
                <button class="map-view-profile" data-id="${person.id}">View Profile</button>
            `);
            
            marker.on('click', updateMapSidebar(person));
        }
    });
    
    // Add vehicle markers
    TerrorWatchDB.search("", { category: "vehicles" }).forEach(vehicle => {
        if (vehicle.locations && vehicle.locations.length > 0) {
            const countryCoords = getCountryCoordinates(vehicle.country);
            const lat = countryCoords.lat + (Math.random() * 4 - 2);
            const lng = countryCoords.lng + (Math.random() * 4 - 2);
            
            const marker = L.circleMarker([lat, lng], {
                radius: 8,
                fillColor: getRiskColor(vehicle.risk),
                color: '#fff',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(markers.vehicles);
            
            marker.bindPopup(`
                <h3>${vehicle.model}</h3>
                <p><strong>Plate:</strong> ${vehicle.plate}</p>
                <p><strong>Risk:</strong> <span class="risk-level ${vehicle.risk}">${vehicle.risk.toUpperCase()}</span></p>
                <p>${vehicle.details}</p>
                <button class="map-view-profile" data-id="${vehicle.id}">View Profile</button>
            `);
            
            marker.on('click', updateMapSidebar(vehicle));
        }
    });
    
    // Layer control
    document.getElementById('show-people-layer').addEventListener('change', function(e) {
        e.target.checked ? map.addLayer(markers.people) : map.removeLayer(markers.people);
    });
    
    document.getElementById('show-vehicles-layer').addEventListener('change', function(e) {
        e.target.checked ? map.addLayer(markers.vehicles) : map.removeLayer(markers.vehicles);
    });
    
    document.getElementById('show-organizations-layer').addEventListener('change', function(e) {
        e.target.checked ? map.addLayer(markers.organizations) : map.removeLayer(markers.organizations);
    });
    
    // Map controls
    document.getElementById('map-zoom-in').addEventListener('click', () => map.zoomIn());
    document.getElementById('map-zoom-out').addEventListener('click', () => map.zoomOut());
    document.getElementById('map-reset').addEventListener('click', () => map.setView([20, 0], 2));
    
    // Helper to update sidebar when marker is clicked
    function updateMapSidebar(item) {
        return function() {
            const sidebarContent = document.getElementById('map-details-content');
            sidebarContent.innerHTML = `
                <h4>${item.name || item.model}</h4>
                <p><strong>Type:</strong> ${item.category}</p>
                <p><strong>Country:</strong> ${item.country}</p>
                <p><strong>Risk Level:</strong> <span class="risk-level ${item.risk}">${item.risk.toUpperCase()}</span></p>
                <p>${item.details}</p>
                <button class="secondary-button small-button view-profile-btn" data-id="${item.id}">
                    <i class="fas fa-external-link-alt"></i> View Full Profile
                </button>
            `;
            
            // Add click handler for view profile button
            sidebarContent.querySelector('.view-profile-btn').addEventListener('click', function() {
                const itemId = this.dataset.id;
                const item = TerrorWatchDB.getById(itemId);
                if (item) {
                    document.getElementById('detail-modal').style.display = 'none';
                    openDetailModal(item);
                }
            });
        };
    }
}

// Get approximate country coordinates
function getCountryCoordinates(country) {
    const coords = {
        'Syria': { lat: 34.802075, lng: 38.996815 },
        'Sudan': { lat: 12.862807, lng: 30.217636 },
        'Nigeria': { lat: 9.081999, lng: 8.675277 }
    };
    return coords[country] || { lat: 20, lng: 0 };
}

// Get color based on risk level
function getRiskColor(risk) {
    switch(risk) {
        case 'high': return '#ff3860';
        case 'medium': return '#ffdd57';
        case 'low': return '#209cee';
        default: return '#00b4ff';
    }
}

// Initialize analytics charts
function initAnalyticsCharts() {
    const stats = TerrorWatchDB.getStatistics();
    
    // Timeline chart
    const timelineCtx = document.getElementById('activity-timeline-chart').getContext('2d');
    const timelineChart = new Chart(timelineCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (30 - i));
                return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
            }),
            datasets: [{
                label: 'Threat Activity',
                data: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
                borderColor: 'rgba(0, 180, 255, 0.8)',
                backgroundColor: 'rgba(0, 180, 255, 0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
    
    // Region distribution chart
    const regionCtx = document.getElementById('region-distribution-chart').getContext('2d');
    const regionChart = new Chart(regionCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(stats.byCountry),
            datasets: [{
                data: Object.values(stats.byCountry).map(c => c.people),
                backgroundColor: [
                    'rgba(255, 56, 96, 0.7)',
                    'rgba(255, 221, 87, 0.7)',
                    'rgba(32, 156, 238, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    // Category distribution chart
    const categoryCtx = document.getElementById('category-distribution-chart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'bar',
        data: {
            labels: ['Operatives', 'Logistics', 'Recruiters', 'Financiers', 'Cyber'],
            datasets: [{
                label: 'Suspect Categories',
                data: [65, 40, 30, 25, 15],
                backgroundColor: 'rgba(0, 255, 157, 0.7)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
    
    // Time range filter
    document.getElementById('analytics-time-range').addEventListener('change', function() {
        const days = parseInt(this.value);
        const newData = Array.from({length: days}, () => Math.floor(Math.random() * 100));
        const newLabels = Array.from({length: days}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (days - i));
            return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
        });
        
        timelineChart.data.labels = newLabels;
        timelineChart.data.datasets[0].data = newData;
        timelineChart.update();
    });
}

// Initialize report form
function initReportForm() {
    const form = document.getElementById('report-form');
    const mediaInput = document.getElementById('report-media');
    const mediaPreview = document.getElementById('media-preview');
    
    // Media preview
    mediaInput.addEventListener('change', function() {
        mediaPreview.innerHTML = '';
        Array.from(this.files).forEach(file => {
            if (!file.type.match('image.*') && !file.type.match('video.*')) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'media-preview-item';
                
                if (file.type.match('image.*')) {
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="remove-media">&times;</button>
                    `;
                } else {
                    previewItem.innerHTML = `
                        <video controls>
                            <source src="${e.target.result}" type="${file.type}">
                        </video>
                        <button class="remove-media">&times;</button>
                    `;
                }
                
                previewItem.querySelector('.remove-media').addEventListener('click', function() {
                    previewItem.remove();
                    // Note: In a real app, you'd need to update the FileList
                });
                
                mediaPreview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        showSystemAlert('Report submitted successfully. Thank you for your contribution.', 'success');
        
        // Reset form
        form.reset();
        mediaPreview.innerHTML = '';
        
        // In a real app, you would send the data to a server here
        const formData = new FormData(form);
        console.log('Report data:', Object.fromEntries(formData.entries()));
    });
    
    // Emergency button
    document.getElementById('call-emergency').addEventListener('click', function() {
        if (confirm('Are you in immediate danger? Confirm to be redirected to emergency services.')) {
            alert('Redirecting to emergency services...');
            // In a real app, this would redirect to local emergency services
        }
    });
}

// Initialize export system
function initExportSystem() {
    const exportModal = document.getElementById('export-modal');
    const exportBtn = document.querySelector('.detail-actions .secondary-button');
    const generateBtn = document.getElementById('generate-export');
    const progressBar = document.getElementById('export-progress');
    
    // Open export modal from detail view
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportModal.style.display = 'block';
        });
    }
    
    // Generate export
    generateBtn.addEventListener('click', function() {
        const format = document.querySelector('input[name="export-format"]:checked').value;
        const options = {
            profile: document.getElementById('export-profile').checked,
            photos: document.getElementById('export-photos').checked,
            locations: document.getElementById('export-locations').checked,
            associates: document.getElementById('export-associates').checked,
            activity: document.getElementById('export-activity').checked
        };
        
        // Show progress
        progressBar.style.display = 'block';
        const progressFill = progressBar.querySelector('.progress-fill');
        const progressText = progressBar.querySelector('.progress-text');
        
        // Simulate export process
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `Preparing export... ${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                progressText.textContent = 'Export complete!';
                
                // Simulate download
                setTimeout(() => {
                    const blob = new Blob(['Mock exported data'], {type: 'text/plain'});
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `terror-watch-export-${new Date().toISOString().slice(0,10)}.${format}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    progressBar.style.display = 'none';
                    progressFill.style.width = '0%';
                    exportModal.style.display = 'none';
                }, 1000);
            }
        }, 100);
    });
}

// Initialize compare system
function initCompareSystem() {
    const compareModal = document.getElementById('compare-modal');
    const compareBtn = document.createElement('button');
    compareBtn.className = 'secondary-button';
    compareBtn.innerHTML = '<i class="fas fa-not-equal"></i> Compare';
    
    // Add compare button to detail view
    document.querySelector('.detail-actions').appendChild(compareBtn);
    
    // Open compare modal
    compareBtn.addEventListener('click', function() {
        compareModal.style.display = 'block';
        
        // Populate select options
        const selects = document.querySelectorAll('.compare-select');
        selects.forEach(select => {
            select.innerHTML = `
                <option value="">Select profile to compare</option>
                ${TerrorWatchDB.search().map(item => `
                    <option value="${item.id}">${item.name || item.model} (${item.risk.toUpperCase()} - ${item.country})</option>
                `).join('')}
            `;
        });
    });
    
    // Update compare content when selection changes
    document.querySelectorAll('.compare-select').forEach(select => {
        select.addEventListener('change', function() {
            const container = this.closest('.compare-item').querySelector('.compare-content');
            const id = this.value;
            
            if (!id) {
                container.innerHTML = '<p>Select a profile to compare</p>';
                updateComparisonResults();
                return;
            }
            
            const item = TerrorWatchDB.getById(id);
            if (!item) {
                container.innerHTML = '<p>Profile not found</p>';
                return;
            }
            
            container.innerHTML = `
                <div class="compare-profile">
                    <img src="${item.image || 'assets/placeholder.png'}" alt="${item.name || item.model}">
                    <h4>${item.name || item.model}</h4>
                    <p><strong>Type:</strong> ${item.category}</p>
                    <p><strong>Country:</strong> ${item.country}</p>
                    <p><strong>Risk:</strong> <span class="risk-level ${item.risk}">${item.risk.toUpperCase()}</span></p>
                    <p>${item.details}</p>
                </div>
            `;
            
            updateComparisonResults();
        });
    });
    
    // Swap profiles
    document.getElementById('swap-profiles').addEventListener('click', function() {
        const select1 = document.querySelector('#compare-item-1 .compare-select');
        const select2 = document.querySelector('#compare-item-2 .compare-select');
        const temp = select1.value;
        select1.value = select2.value;
        select2.value = temp;
        
        select1.dispatchEvent(new Event('change'));
        select2.dispatchEvent(new Event('change'));
    });
    
    // Update comparison results
    function updateComparisonResults() {
        const resultsContainer = document.getElementById('compare-results');
        const profile1 = document.querySelector('#compare-item-1 .compare-select').value;
        const profile2 = document.querySelector('#compare-item-2 .compare-select').value;
        
        if (!profile1 || !profile2) {
            resultsContainer.querySelector('.results-placeholder').innerHTML = 
                '<p>Select two profiles to see comparison results</p>';
            return;
        }
        
        const item1 = TerrorWatchDB.getById(profile1);
        const item2 = TerrorWatchDB.getById(profile2);
        
        if (!item1 || !item2) {
            resultsContainer.querySelector('.results-placeholder').innerHTML = 
                '<p>Error loading comparison data</p>';
            return;
        }
        
        // Find common locations
        const loc1 = item1.locations || [];
        const loc2 = item2.locations || [];
        const commonLocations = loc1.filter(l => loc2.includes(l));
        
        // Find common associates
        const assoc1 = TerrorWatchDB.getAssociates(item1).map(a => a.id);
        const assoc2 = TerrorWatchDB.getAssociates(item2).map(a => a.id);
        const commonAssociates = [...new Set(assoc1.filter(id => assoc2.includes(id)))];
        
        // Prepare comparison data
        const comparisonData = {
            commonLocations: commonLocations.length > 0 ? commonLocations : ['No common locations'],
            commonAssociates: commonAssociates.length,
            riskComparison: {
                profile1: item1.risk.toUpperCase(),
                profile2: item2.risk.toUpperCase()
            }
        };
        
        // Display results
        resultsContainer.querySelector('.results-placeholder').innerHTML = `
            <div class="comparison-grid">
                <div class="comparison-item">
                    <h4><i class="fas fa-map-marked-alt"></i> Common Locations</h4>
                    <ul>
                        ${comparisonData.commonLocations.map(loc => `<li>${loc}</li>`).join('')}
                    </ul>
                </div>
                <div class="comparison-item">
                    <h4><i class="fas fa-users"></i> Common Associates</h4>
                    <p>${comparisonData.commonAssociates} known associates in common</p>
                </div>
                <div class="comparison-item">
                    <h4><i class="fas fa-skull"></i> Risk Comparison</h4>
                    <p>Profile 1: <span class="risk-level ${item1.risk}">${comparisonData.riskComparison.profile1}</span></p>
                    <p>Profile 2: <span class="risk-level ${item2.risk}">${comparisonData.riskComparison.profile2}</span></p>
                </div>
            </div>
        `;
    }
}

// Initialize network graph
function initNetworkGraph() {
    const container = document.getElementById('network-graph-container');
    
    // Create nodes from database
    const nodes = new vis.DataSet([
        // Add some sample nodes (in a real app, this would be generated from the database)
        { id: 1, label: "Unknown Name", group: "person", title: "Suspected leader in Syria" },
        { id: 2, label: "Toyota Land Cruiser", group: "vehicle", title: "Used in multiple attacks" },
        { id: 3, label: "Al-Nusra Cell", group: "organization", title: "Terrorist organization" },
        { id: 4, label: "Unknown Name", group: "person", title: "Logistics coordinator" },
        { id: 5, label: "Weapons Cache", group: "location", title: "Discovered" }
    ]);
    
    // Create edges (connections)
    const edges = new vis.DataSet([
        { from: 1, to: 2, label: "uses" },
        { from: 1, to: 3, label: "leads" },
        { from: 1, to: 4, label: "commands" },
        { from: 4, to: 5, label: "manages" },
        { from: 3, to: 5, label: "uses" }
    ]);
    
    const data = { nodes, edges };
    const options = {
        nodes: {
            shape: 'dot',
            size: 16,
            font: { size: 12, face: 'Oxanium' },
            borderWidth: 2
        },
        edges: {
            width: 2,
            font: { size: 10, face: 'Oxanium' },
            arrows: { to: { enabled: true, scaleFactor: 0.5 } },
            smooth: { enabled: true, type: 'continuous' }
        },
        groups: {
            person: { color: { border: '#fff', background: '#ff3860', highlight: { border: '#fff', background: '#ff3860' } } },
            vehicle: { color: { border: '#fff', background: '#ffdd57', highlight: { border: '#fff', background: '#ffdd57' } } },
            organization: { color: { border: '#fff', background: '#209cee', highlight: { border: '#fff', background: '#209cee' } } },
            location: { color: { border: '#fff', background: '#00ff9d', highlight: { border: '#fff', background: '#00ff9d' } } }
        },
        physics: {
            barnesHut: {
                gravitationalConstant: -2000,
                centralGravity: 0.3,
                springLength: 95,
                springConstant: 0.04,
                damping: 0.09
            }
        }
    };
    
    const network = new vis.Network(container, data, options);
    
    // Graph controls
    document.getElementById('reset-graph').addEventListener('click', () => {
        network.fit({ animation: { duration: 1000, easingFunction: 'easeInOutQuad' } });
    });
    
    document.getElementById('zoom-in-graph').addEventListener('click', () => {
        const scale = network.getScale();
        network.moveTo({ scale: scale * 1.2, animation: true });
    });
    
    document.getElementById('zoom-out-graph').addEventListener('click', () => {
        const scale = network.getScale();
        network.moveTo({ scale: scale / 1.2, animation: true });
    });
    
    // Handle node clicks to open profiles
    network.on('click', function(params) {
        if (params.nodes.length === 1) {
            const nodeId = params.nodes[0];
            const node = nodes.get(nodeId);
            
            // In a real app, you would match this to your database
            if (node) {
                // Simulate opening a profile
                console.log('Opening profile for:', node.label);
            }
        }
    });
}