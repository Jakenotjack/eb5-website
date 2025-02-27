document.addEventListener('DOMContentLoaded', function() {
    // 语言切换功能
    const languageSwitch = document.querySelector('.language-switch');
    let currentLang = 'zh'; // 默认中文

    languageSwitch.addEventListener('click', function() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        this.textContent = currentLang === 'zh' ? 'EN/中文' : '中文/EN';
        // 这里可以添加切换语言的逻辑
    });

    // 滚动时导航栏效果
    let lastScroll = 0;
    const nav = document.querySelector('.main-nav');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // 向下滚动
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // 向上滚动
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // 移动端菜单切换
    const createMobileMenu = () => {
        if (window.innerWidth <= 1024) {
            const nav = document.querySelector('.main-nav');
            if (!document.querySelector('.mobile-menu-button')) {
                const mobileMenuButton = document.createElement('button');
                mobileMenuButton.className = 'mobile-menu-button';
                mobileMenuButton.innerHTML = `
                    <span class="menu-icon"></span>
                `;
                nav.appendChild(mobileMenuButton);

                mobileMenuButton.addEventListener('click', function() {
                    this.classList.toggle('active');
                    document.querySelector('.nav-links').classList.toggle('show');
                    document.querySelector('.nav-buttons').classList.toggle('show');
                });
            }
        }
    };

    // 监听窗口大小变化
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();

    // 添加下拉菜单的触摸支持
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('touchstart', function(e) {
            e.preventDefault();
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('touch-open');
                }
            });
            this.classList.toggle('touch-open');
        });
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('touch-open');
            });
        }
    });
}); 