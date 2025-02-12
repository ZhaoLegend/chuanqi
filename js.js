// app.js
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    loadProjects();
    initCursorFollow();
});

// 粒子系统
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.01;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// 动态加载项目
function loadProjects() {
    // 1. 项目数据数组，每个项目是一个对象
    const projects = [
        {
            title: "AI 艺术生成器",          // 项目标题
            description: "基于生成对抗网络的数字艺术创作平台",  // 项目描述
            image: "project1.webp",         // 项目图片
            tags: ["AI", "Python", "React"] // 技术标签
        },
        // 这里可以添加更多项目...
    ];

    // 2. 获取项目网格容器
    const grid = document.querySelector('.project-grid');

    // 3. 遍历每个项目，动态创建项目卡片
    projects.forEach(project => {
        // 创建卡片容器
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // 使用模板字符串构建卡片内容
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        // 将卡片添加到网格中
        grid.appendChild(card);
    });
}

function initCursorFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follow';
    cursor.innerHTML = 'Zhao Legend';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 10 + 'px';
        cursor.style.top = e.clientY + 10 + 'px';
    });
}