/**
 * 游戏与AI新闻监控器 - 中文脚本
 * 负责新闻数据加载、分类筛选与界面交互
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM元素引用
    const newsContainer = document.getElementById('news-container');
    const lastUpdatedTime = document.getElementById('last-updated-time');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // 当前激活的分类
    let activeCategory = 'all';
    
    // 新闻数据数组
    let newsData = [];
    
    // 初始化设置最后更新时间
    lastUpdatedTime.textContent = new Date().toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });
    
    // 页面初始化
    loadNewsData();
    setupEventListeners();
    
    // 从JSON文件加载新闻数据
    async function loadNewsData() {
        try {
            // 尝试从数据文件加载新闻
            const response = await fetch('news-data.json');
            if (!response.ok) {
                throw new Error('新闻数据文件未找到');
            }
            
            const data = await response.json();
            newsData = data.articles || [];
            displayNews(activeCategory);
            
            // 更新最后更新时间
            if (data.lastUpdated) {
                const updateTime = new Date(data.lastUpdated);
                lastUpdatedTime.textContent = updateTime.toLocaleString('zh-CN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false
                }) + ' (自动)';
            }
        } catch (error) {
            console.error('加载新闻数据错误:', error);
            // 使用示例数据
            loadSampleData();
        }
    }
    
    // 加载示例数据（备用）
    function loadSampleData() {
        newsData = [
            {
                id: 1,
                title: "《黑神话：悟空》正式发售，首日销量突破500万",
                description: "游戏科学历时八年开发的国产3A大作《黑神话：悟空》今日全球同步发售，获得玩家与媒体一致好评。",
                category: "game",
                source: "游民星空",
                date: "2024-08-20",
                url: "#",
                readingTime: "5分钟"
            },
            {
                id: 2,
                title: "腾讯AI实验室发布游戏AI代练系统",
                description: "腾讯 AI Lab 全新开发的游戏AI助手可在《王者荣耀》等游戏中达到职业选手水平，有效帮助玩家提高游戏技巧。",
                category: "ai",
                source: "腾讯新闻",
                date: "2024-08-19",
                url: "#",
                readingTime: "4分钟"
            },
            {
                id: 3,
                title: "Steam中国用户突破4000万，国产游戏销量大涨",
                description: "根据Steam官方数据，中国地区活跃用户已突破4000万，《永劫无间》等国产游戏海外销售表现亮眼。",
                category: "game",
                source: "Steam官方",
                date: "2024-08-18",
                url: "#",
                readingTime: "3分钟"
            },
            {
                id: 4,
                title: "华为发布新一代AI游戏优化芯片",
                description: "华为海思推出专门为移动游戏优化的AI处理芯片，可在游戏中实时优化画质、帧率和功耗平衡。",
                category: "ai",
                source: "华为官方",
                date: "2024-08-17",
                url: "#",
                readingTime: "6分钟"
            },
            {
                id: 5,
                title: "米哈游《原神》5.0版本上线，新增AI NPC对话系统",
                description: "《原神》5.0版本更新引入基于大语言模型的NPC对话系统，玩家可与游戏角色进行真正有意义的对话。",
                category: "game",
                source: "米哈游官方",
                date: "2024-08-16",
                url: "#",
                readingTime: "4分钟"
            },
            {
                id: 6,
                title: "OpenAI与中国游戏公司合作开发游戏AI助理",
                description: "OpenAI宣布与多家中国游戏公司建立合作关系，共同开发专门用于游戏场景的AI对话助手。",
                category: "ai",
                source: "OpenAI官方",
                date: "2024-08-15",
                url: "#",
                readingTime: "5分钟"
            },
            {
                id: 7,
                title: "NVIDIA发布RTX 5090显卡，游戏性能提升80%",
                description: "NVIDIA最新旗舰显卡RTX 5090正式发布，支持全新的AI超分辨率技术，显著提升游戏画质。",
                category: "game",
                source: "NVIDIA官方",
                date: "2024-08-14",
                url: "#",
                readingTime: "7分钟"
            },
            {
                id: 8,
                title: "字节跳动AI研发团队推出游戏自动测试系统",
                description: "字节跳动旗下AI实验室发布自动化游戏测试AI系统，可大幅降低游戏开发的测试成本。",
                category: "ai",
                source: "字节跳动",
                date: "2024-08-13",
                url: "#",
                readingTime: "4分钟"
            }
        ];
        
        displayNews(activeCategory);
    }
    
    // 根据分类显示新闻
    function displayNews(category) {
        // 清空容器
        newsContainer.innerHTML = '';
        
        // 按分类筛选新闻
        const filteredNews = category === 'all' 
            ? newsData 
            : newsData.filter(news => news.category === category);
        
        // 如果没有新闻，显示提示信息
        if (filteredNews.length === 0) {
            newsContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-secondary);">
                    <i class="fas fa-newspaper" style="font-size: 3.5rem; margin-bottom: 1rem;"></i>
                    <h3>当前分类暂无新闻</h3>
                    <p>请尝试其他分类，或等待自动更新</p>
                </div>
            `;
            return;
        }
        
        // 创建新闻卡片
        filteredNews.forEach(news => {
            const newsCard = createNewsCard(news);
            newsContainer.appendChild(newsCard);
        });
    }
    
    // 创建新闻卡片元素
    function createNewsCard(news) {
        const card = document.createElement('div');
        card.className = 'news-card';
        
        const categoryClass = news.category === 'game' ? 'category-game' : 'category-ai';
        const categoryText = news.category === 'game' ? '游戏新闻' : '人工智能';
        
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
                <a href="${news.url}" class="read-more" target="_blank">阅读详情 <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        return card;
    }
    
    // 格式化日期显示
    function formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch (e) {
            return dateString;
        }
    }
    
    // 设置分类按钮事件监听
    function setupEventListeners() {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 更新激活标签
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // 更新激活分类
                activeCategory = this.getAttribute('data-category');
                
                // 显示选中分类的新闻
                displayNews(activeCategory);
            });
        });
    }
    
    // 每10分钟自动检查更新（简单实现）
    setInterval(() => {
        console.log('正在检查新闻更新...');
    }, 600000);
    
    // 页面滚动动画
    window.addEventListener('scroll', function() {
        const cards = document.querySelectorAll('.news-card');
        const scrollY = window.scrollY + window.innerHeight;
        
        cards.forEach(card => {
            const cardTop = card.offsetTop;
            if (scrollY > cardTop + 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }, { passive: true });
    });
});