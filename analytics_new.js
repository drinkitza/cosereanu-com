// Load Google Charts
google.charts.load('current', {'packages':['corechart', 'geochart']});
google.charts.setOnLoadCallback(initCharts);

// Authentication state
let isAuthenticated = false;

// Wait for the window to fully load
window.onload = function() {
    console.log('Window loaded');
    setupAuthentication();
};

// Set up authentication
function setupAuthentication() {
    // Check if user is authenticated
    checkAuth();
    
    // Add authentication button event listener
    const authButton = document.getElementById('auth-button');
    console.log('Auth button found:', authButton);
    
    if (authButton) {
        // Use direct onclick handler for maximum compatibility
        authButton.onclick = function() {
            console.log('Auth button clicked');
            authenticate();
        };
    } else {
        console.error('Auth button not found!');
    }
}

// Check if user is authenticated
function checkAuth() {
    console.log('Checking authentication');
    // Check for authentication token in localStorage
    isAuthenticated = localStorage.getItem('analytics_auth_token') === 'nico_authenticated';
    console.log('Is authenticated:', isAuthenticated);
    
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
    console.log('Authentication function called');
    
    // Get analytics content element
    const analyticsContent = document.getElementById('analytics-content');
    const authButton = document.getElementById('auth-button');
    
    if (!analyticsContent || !authButton) {
        console.error('Required elements not found');
        return;
    }
    
    if (isAuthenticated) {
        console.log('Signing out');
        // Sign out
        localStorage.removeItem('analytics_auth_token');
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
        console.log('Prompting for password');
        // Ask for password
        const password = prompt('Enter password to authenticate:');
        console.log('Password entered:', password ? '(password entered)' : 'none');
        
        // Check if password is correct (simple authentication)
        if (password === 'kneeco') {
            console.log('Password correct, authenticating');
            localStorage.setItem('analytics_auth_token', 'nico_authenticated');
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
        } else {
            console.log('Password incorrect or canceled');
            alert('Authentication failed. Incorrect password.');
        }
    }
}

// Fetch analytics data from Google Analytics API
function fetchAnalyticsData() {
    console.log('Fetching analytics data');
    // In a real implementation, this would fetch data from the Google Analytics API
    // For demo purposes, we'll use sample data
    
    // Update metrics
    document.getElementById('active-users').textContent = '12';
    document.getElementById('total-visitors').textContent = '543';
    document.getElementById('page-views').textContent = '1,247';
    document.getElementById('avg-duration').textContent = '2.3';
    
    // Draw charts with real data
    drawCharts(true);
}

// Show demo data when not authenticated
function showDemoData() {
    console.log('Showing demo data');
    document.getElementById('active-users').textContent = '--';
    document.getElementById('total-visitors').textContent = '--';
    document.getElementById('page-views').textContent = '--';
    document.getElementById('avg-duration').textContent = '--';
    
    // Draw charts with demo data
    drawCharts(false);
}

// Initialize charts
function initCharts() {
    console.log('Initializing charts');
    // Initial draw with demo data
    drawCharts(isAuthenticated);
}

// Draw all charts
function drawCharts(isReal) {
    console.log('Drawing charts');
    drawCountryChart(isReal);
    drawDeviceChart(isReal);
    drawSourceChart(isReal);
    drawTimeChart(isReal);
}

// Draw country chart
function drawCountryChart(isReal) {
    console.log('Drawing country chart');
    const data = google.visualization.arrayToDataTable([
        ['Country', 'Visitors'],
        ['United States', isReal ? 324 : 0],
        ['Canada', isReal ? 87 : 0],
        ['United Kingdom', isReal ? 52 : 0],
        ['Germany', isReal ? 41 : 0],
        ['France', isReal ? 39 : 0]
    ]);
    
    const options = {
        colorAxis: {colors: ['#e7f0fa', '#1f77b4']},
        backgroundColor: '#f9f9f9',
        datalessRegionColor: '#f8f8f8',
        defaultColor: '#f5f5f5',
    };
    
    const chart = new google.visualization.GeoChart(document.getElementById('country-chart'));
    chart.draw(data, options);
}

// Draw device chart
function drawDeviceChart(isReal) {
    console.log('Drawing device chart');
    const data = google.visualization.arrayToDataTable([
        ['Device', 'Visitors'],
        ['Mobile', isReal ? 312 : 0],
        ['Desktop', isReal ? 187 : 0],
        ['Tablet', isReal ? 44 : 0]
    ]);
    
    const options = {
        pieHole: 0.4,
        backgroundColor: '#f9f9f9',
        legend: {position: 'bottom'},
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c']
    };
    
    const chart = new google.visualization.PieChart(document.getElementById('device-chart'));
    chart.draw(data, options);
}

// Draw source chart
function drawSourceChart(isReal) {
    console.log('Drawing source chart');
    const data = google.visualization.arrayToDataTable([
        ['Source', 'Visitors'],
        ['Direct', isReal ? 215 : 0],
        ['Organic Search', isReal ? 149 : 0],
        ['Social', isReal ? 87 : 0],
        ['Referral', isReal ? 92 : 0]
    ]);
    
    const options = {
        backgroundColor: '#f9f9f9',
        legend: {position: 'bottom'},
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
    };
    
    const chart = new google.visualization.PieChart(document.getElementById('source-chart'));
    chart.draw(data, options);
}

// Draw time chart
function drawTimeChart(isReal) {
    console.log('Drawing time chart');
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('number', 'Visitors');
    
    data.addRows([
        ['Mon', isReal ? 42 : 0],
        ['Tue', isReal ? 56 : 0],
        ['Wed', isReal ? 39 : 0],
        ['Thu', isReal ? 65 : 0],
        ['Fri', isReal ? 73 : 0],
        ['Sat', isReal ? 81 : 0],
        ['Sun', isReal ? 47 : 0]
    ]);
    
    const options = {
        backgroundColor: '#f9f9f9',
        hAxis: {
            title: 'Day of Week'
        },
        vAxis: {
            title: 'Visitors',
            minValue: 0
        },
        legend: {position: 'none'},
        colors: ['#1f77b4']
    };
    
    const chart = new google.visualization.ColumnChart(document.getElementById('time-chart'));
    chart.draw(data, options);
}
