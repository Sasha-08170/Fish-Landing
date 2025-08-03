// DOM элементы
const burgerBtn = document.getElementById('burgerBtn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');
const navOverlay = document.getElementById('navOverlay');
const contactForm = document.querySelector('.form');
const scrollToTopBtn = document.getElementById('scrollToTop');
const scrollToAboutBtn = document.getElementById('scrollToAbout');

// Состояние меню
let isMenuOpen = false;

// Функция для переключения мобильного меню
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    // Переключаем классы для анимации
    burgerBtn.classList.toggle('header__burger--active');
    nav.classList.toggle('nav--active');
    navOverlay.classList.toggle('nav-overlay--active');
    
    // Блокируем скролл при открытом меню
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Обновляем aria-label для доступности
    burgerBtn.setAttribute('aria-label', isMenuOpen ? 'Закрыть меню' : 'Открыть меню');
}

// Функция для закрытия мобильного меню
function closeMobileMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        burgerBtn.classList.remove('header__burger--active');
        nav.classList.remove('nav--active');
        navOverlay.classList.remove('nav-overlay--active');
        document.body.style.overflow = '';
        burgerBtn.setAttribute('aria-label', 'Открыть меню');
    }
}

// Обработчик клика по бургер-кнопке
burgerBtn.addEventListener('click', toggleMobileMenu);

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Не закрываем меню если ссылка активная
        if (!link.classList.contains('nav__link--active')) {
            closeMobileMenu();
        }
    });
});

// Закрытие меню при клике на overlay
navOverlay.addEventListener('click', closeMobileMenu);

// Закрытие меню при клике вне навигации
document.addEventListener('click', (e) => {
    if (isMenuOpen && !nav.contains(e.target) && !burgerBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Закрытие меню при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
});

// Эффект прозрачности хедера при скролле
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Добавляем/убираем тень при скролле
    if (scrollTop > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Скрываем/показываем хедер при скролле (опционально)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Скролл вниз - скрываем хедер
        header.style.transform = 'translateY(-100%)';
    } else {
        // Скролл вверх - показываем хедер
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Плавная прокрутка для якорных ссылок
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Проверяем, является ли ссылка якорной
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.hero__title, .hero__description, .hero__button, ' +
        '.about__title, .about__description, .about__image, ' +
        '.services__title, .service-card, ' +
        '.portfolio__title, .portfolio-item, ' +
        '.contact__title, .contact__info, .contact__form'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Добавляем активный класс для текущей секции
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Убираем активный класс со всех ссылок
            navLinks.forEach(link => link.classList.remove('nav__link--active'));
            
            // Добавляем активный класс к текущей ссылке
            if (navLink) {
                navLink.classList.add('nav__link--active');
            }
        }
    });
}

// Обновляем активную ссылку при скролле
window.addEventListener('scroll', updateActiveNavLink);

// Обработка формы обратной связи
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Простая валидация
        if (!name || !email || !message) {
            showNotification('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }
        
        // Имитация отправки формы
        showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Очищаем форму
        this.reset();
    });
}

// Функция валидации email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Добавляем стили
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Добавляем в DOM
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Обработчик закрытия
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

// Функция скрытия уведомления
function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Анимация для кнопок и интерактивных элементов
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем эффект ripple для кнопок
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Добавляем поддержку клавиатуры для бургер-меню
    burgerBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });
    
    // Добавляем поддержку клавиши Escape для закрытия меню
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Предзагрузка шрифтов для лучшей производительности
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.style.fontDisplay = 'swap';
        });
    }
});

// Добавляем CSS анимацию для ripple эффекта
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Утилиты для работы с классами
const classUtils = {
    add: (element, className) => {
        if (element && element.classList) {
            element.classList.add(className);
        }
    },
    
    remove: (element, className) => {
        if (element && element.classList) {
            element.classList.remove(className);
        }
    },
    
    toggle: (element, className) => {
        if (element && element.classList) {
            element.classList.toggle(className);
        }
    },
    
    contains: (element, className) => {
        return element && element.classList && element.classList.contains(className);
    }
};

// Экспортируем функции для возможного использования в других модулях
window.menuUtils = {
    toggleMobileMenu,
    closeMobileMenu,
    classUtils,
    showNotification
}; 

// Функция для показа/скрытия кнопки "Наверх"
function toggleScrollToTopButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Кнопка всегда видна, но меняет стиль при скролле
    if (scrollTop > 300) {
        scrollToTopBtn.classList.add('scroll-to-top--visible');
    } else {
        scrollToTopBtn.classList.remove('scroll-to-top--visible');
    }
}

// Функция для прокрутки наверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Обработчик клика по кнопке "Наверх"
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', scrollToTop);
    // Делаем кнопку всегда видимой
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
    scrollToTopBtn.style.transform = 'translateY(0)';
}

// Обновляем видимость кнопки при скролле
window.addEventListener('scroll', toggleScrollToTopButton); 

// Функция для прокрутки к секции "О нас"
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = aboutSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Обработчик клика по кнопке "Узнать больше"
if (scrollToAboutBtn) {
    scrollToAboutBtn.addEventListener('click', scrollToAbout);
} 
