// Load Google Charts
google.charts.load('current', {'packages':['corechart', 'geochart']});
google.charts.setOnLoadCallback(initCharts);

// Authentication state
let isAuthenticated = false;

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated
    checkAuth();
    
    // Add authentication button event listener
    const authButton = document.getElementById('auth-button');
    if (authButton) {
        authButton.addEventListener('click', authenticate);
    }
});

// Check if user is authenticated
function checkAuth() {
    // In a real implementation, this would check for a valid session
    // For demo purposes, we'll use localStorage
    isAuthenticated = localStorage.getItem('analytics_auth') === 'true';
    
    // Get analytics content element
    const analyticsContent = document.getElementById('analytics-content');
    
    if (isAuthenticated) {
        // If authenticated, fetch real data
        fetchAnalyticsData();
        const authButton = document.getElementById('auth-button');
        if (authButton) {
            authButton.textContent = 'Sign Out';
        }
        
        // Remove blur effect
        if (analyticsContent) {
            analyticsContent.classList.remove('blur-content');
            const overlay = analyticsContent.querySelector('.blur-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        }
    } else {
        // If not authenticated, show demo data
        showDemoData();
        
        // Add blur effect
        if (analyticsContent) {
            analyticsContent.classList.add('blur-content');
            const overlay = analyticsContent.querySelector('.blur-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        }
    }
}

// Authentication function
function authenticate() {
    // Get analytics content element
    const analyticsContent = document.getElementById('analytics-content');
    const authButton = document.getElementById('auth-button');
    
    if (!analyticsContent || !authButton) {
        console.error('Required elements not found');
        return;
    }
    
    if (isAuthenticated) {
        // Sign out
        localStorage.removeItem('analytics_auth');
        isAuthenticated = false;
        authButton.textContent = 'Authenticate';
        showDemoData();
        
        // Add blur effect
        analyticsContent.classList.add('blur-content');
        const overlay = analyticsContent.querySelector('.blur-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    } else {
        // Simple authentication for demo purposes
        // In a real app, you would use a more secure method
        localStorage.setItem('analytics_auth', 'true');
        isAuthenticated = true;
        authButton.textContent = 'Sign Out';
        fetchAnalyticsData();
        
        // Remove blur effect
        analyticsContent.classList.remove('blur-content');
        const overlay = analyticsContent.querySelector('.blur-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        // Scroll to analytics content
        analyticsContent.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fetch analytics data from Google Analytics API
function fetchAnalyticsData() {
    // In a real implementation, this would fetch data from the Google Analytics API
    // For demo purposes, we'll use sample data
    
    // Update dashboard metrics with sample data
    document.getElementById('active-users').textContent = '3';
    document.getElementById('total-visitors').textContent = '542';
    document.getElementById('page-views').textContent = '1,247';
    document.getElementById('avg-duration').textContent = '2:34';
    
    // Show a message indicating this is sample data
    const setupSection = document.querySelector('.analytics-setup');
    const dataNotice = document.createElement('p');
    dataNotice.className = 'data-notice';
    dataNotice.innerHTML = 'Showing sample data for demonstration';
    dataNotice.style.fontSize = '14px';
    dataNotice.style.marginTop = '10px';
    dataNotice.style.opacity = '0.7';
    
    // Remove any existing notice before adding a new one
    const existingNotice = document.querySelector('.data-notice');
    if (existingNotice) {
        existingNotice.remove();
    }
    
    setupSection.appendChild(dataNotice);
    
    // Update charts with sample data
    drawCharts(true);
}

// Show demo data when not authenticated
function showDemoData() {
    document.getElementById('active-users').textContent = '--';
    document.getElementById('total-visitors').textContent = '--';
    document.getElementById('page-views').textContent = '--';
    document.getElementById('avg-duration').textContent = '--';
    
    // Draw charts with demo data
    drawCharts(false);
}

// Initialize charts
function initCharts() {
    // Initial draw with demo data
    drawCharts(isAuthenticated);
}

// Draw all charts
function drawCharts(isReal) {
    drawCountryChart(isReal);
    drawDeviceChart(isReal);
    drawSourceChart(isReal);
    drawTimeChart(isReal);
}

// Draw country chart
function drawCountryChart(isReal) {
    const data = google.visualization.arrayToDataTable([
        ['Country', 'Visitors'],
        ['United States', isReal ? 324 : 0],
        ['Canada', isReal ? 85 : 0],
        ['United Kingdom', isReal ? 56 : 0],
        ['Germany', isReal ? 38 : 0],
        ['France', isReal ? 29 : 0],
        ['Other', isReal ? 10 : 0]
    ]);

    const options = {
        colorAxis: {colors: ['#e7f0fa', '#0066cc']},
        backgroundColor: '#f9f9f9',
        datalessRegionColor: '#f8f8f8',
        defaultColor: '#f5f5f5',
    };

    const chart = new google.visualization.GeoChart(document.getElementById('country-chart'));
    chart.draw(data, options);
}

// Draw device chart
function drawDeviceChart(isReal) {
    const data = google.visualization.arrayToDataTable([
        ['Device', 'Visitors'],
        ['Mobile', isReal ? 312 : 0],
        ['Desktop', isReal ? 187 : 0],
        ['Tablet', isReal ? 43 : 0]
    ]);

    const options = {
        pieHole: 0.4,
        backgroundColor: '#f9f9f9',
        colors: ['#0066cc', '#4d94db', '#a3c4e9'],
        legend: {position: 'bottom'},
        chartArea: {width: '90%', height: '80%'},
        pieSliceText: 'percentage'
    };

    const chart = new google.visualization.PieChart(document.getElementById('device-chart'));
    chart.draw(data, options);
}

// Draw source chart
function drawSourceChart(isReal) {
    const data = google.visualization.arrayToDataTable([
        ['Source', 'Visitors'],
        ['Direct', isReal ? 215 : 0],
        ['Social', isReal ? 167 : 0],
        ['Search', isReal ? 124 : 0],
        ['Referral', isReal ? 36 : 0]
    ]);

    const options = {
        backgroundColor: '#f9f9f9',
        colors: ['#0066cc', '#4d94db', '#a3c4e9', '#d1e3f7'],
        legend: {position: 'bottom'},
        chartArea: {width: '90%', height: '80%'}
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('source-chart'));
    chart.draw(data, options);
}

// Draw time chart
function drawTimeChart(isReal) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Visitors');
    
    // Generate last 14 days of data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const rows = [];
    
    for (let i = 13; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayName = days[date.getDay()];
        const visitors = isReal ? Math.floor(Math.random() * 50) + 10 : 0;
        rows.push([`${dayName} ${date.getDate()}`, visitors]);
    }
    
    data.addRows(rows);

    const options = {
        backgroundColor: '#f9f9f9',
        colors: ['#0066cc'],
        legend: {position: 'none'},
        chartArea: {width: '90%', height: '80%'},
        hAxis: {
            textStyle: {fontSize: 10}
        }
    };

    const chart = new google.visualization.LineChart(document.getElementById('time-chart'));
    chart.draw(data, options);
}
