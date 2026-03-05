document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const newsContainer = document.getElementById('news-container');
    const lastUpdatedTime = document.getElementById('last-updated-time');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Current active category
    let activeCategory = 'all';
    
    // News data (will be loaded from JSON)
    let newsData = [];
    
    // Set last updated time
    lastUpdatedTime.textContent = new Date().toLocaleString();
    
    // Initialize the page
    loadNewsData();
    setupEventListeners();
    
    // Load news data from JSON file
    async function loadNewsData() {
        try {
            // Try to load news from the data file
            const response = await fetch('news-data.json');
            if (!response.ok) {
                throw new Error('News data not found');
            }
            
            newsData = await response.json();
            displayNews(activeCategory);
        } catch (error) {
            console.log('Error loading news data:', error);
            // Fallback to sample data
            loadSampleData();
        }
    }
    
    // Load sample data when real data is not available
    function loadSampleData() {
        newsData = [
            {
                id: 1,
                title: "New AAA Game Release: Cyberpunk 2077 Phantom Liberty",
                description: "CD Projekt Red has released the Phantom Liberty expansion for Cyberpunk 2077, introducing new storylines and gameplay mechanics.",
                category: "game",
                source: "IGN",
                date: "2024-03-15",
                url: "#",
                readingTime: "5 min"
            },
            {
                id: 2,
                title: "OpenAI Releases GPT-5 with Multimodal Capabilities",
                description: "The latest iteration of OpenAI's language model now supports seamless text, image, and audio interactions.",
                category: "ai",
                source: "TechCrunch",
                date: "2024-03-14",
                url: "#",
                readingTime: "4 min"
            },
            {
                id: 3,
                title: "Nintendo Announces Next-Gen Console for 2025",
                description: "Nintendo has officially confirmed development of its next-generation gaming console, promising innovative gameplay experiences.",
                category: "game",
                source: "GameSpot",
                date: "2024-03-13",
                url: "#",
                readingTime: "3 min"
            },
            {
                id: 4,
                title: "Google DeepMind Develops AI That Masters Complex Strategy Games",
                description: "New AI system demonstrates human-level performance in games requiring long-term planning and strategy.",
                category: "ai",
                source: "Nature",
                date: "2024-03-12",
                url: "#",
                readingTime: "6 min"
            },
            {
                id: 5,
                title: "Xbox Game Pass Reaches 50 Million Subscribers",
                description: "Microsoft's subscription service continues to grow, with new titles added monthly and expanded cloud gaming capabilities.",
                category: "game",
                source: "The Verge",
                date: "2024-03-11",
                url: "#",
                readingTime: "3 min"
            },
            {
                id: 6,
                title: "AI Breakthrough: Protein Folding Prediction Achieves 95% Accuracy",
                description: "New deep learning model dramatically improves accuracy in predicting protein structures, advancing drug discovery.",
                category: "ai",
                source: "Science",
                date: "2024-03-10",
                url: "#",
                readingTime: "7 min"
            },
            {
                id: 7,
                title: "PlayStation VR2 Gets Major Software Update",
                description: "Sony enhances PSVR2 with new social features, improved passthrough, and expanded game library.",
                category: "game",
                source: "Eurogamer",
                date: "2024-03-09",
                url: "#",
                readingTime: "4 min"
            },
            {
                id: 8,
                title: "Meta's AI Research Unveils Real-Time Language Translation Model",
                description: "SeamlessM4T model provides high-quality translation across 100+ languages with near-instantaneous results.",
                category: "ai",
                source: "Meta AI Blog",
                date: "2024-03-08",
                url: "#",
                readingTime: "5 min"
            }
        ];
        
        displayNews(activeCategory);
    }
    
    // Display news based on category
    function displayNews(category) {
        // Clear the container
        newsContainer.innerHTML = '';
        
        // Filter news by category
        const filteredNews = category === 'all' 
            ? newsData 
            : newsData.filter(news => news.category === category);
        
        // Show message if no news
        if (filteredNews.length === 0) {
            newsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-newspaper" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>No news available for this category</h3>
                    <p>Check back later for updates</p>
                </div>
            `;
            return;
        }
        
        // Create news cards
        filteredNews.forEach(news => {
            const newsCard = createNewsCard(news);
            newsContainer.appendChild(newsCard);
        });
    }
    
    // Create a news card element
    function createNewsCard(news) {
        const card = document.createElement('div');
        card.className = 'news-card';
        
        const categoryClass = news.category === 'game' ? 'category-game' : 'category-ai';
        const categoryText = news.category === 'game' ? 'Gaming' : 'AI';
        
        card.innerHTML = `
            <div class="card-header">
                <span class="card-category ${categoryClass}">${categoryText}</span>
                <h3 class="card-title">${news.title}</h3>
            </div>
            <div class="card-body">
                <p class="card-description">${news.description}</p>
                <div class="card-meta">
                    <span class="card-source">${news.source}</span>
                    <span class="card-date">${formatDate(news.date)}</span>
                </div>
            </div>
            <div class="card-footer">
                <span class="reading-time"><i class="far fa-clock"></i> ${news.readingTime}</span>
                <a href="${news.url}" class="read-more" target="_blank">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        return card;
    }
    
    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    // Set up event listeners for tab buttons
    function setupEventListeners() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active tab
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update active category
                activeCategory = this.getAttribute('data-category');
                
                // Display news for selected category
                displayNews(activeCategory);
            });
        });
    }
});