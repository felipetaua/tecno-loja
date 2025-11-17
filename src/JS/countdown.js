class CountdownTimer {
    constructor() {
        this.daysElement = document.querySelector('.cronometer-content:nth-child(1) p:first-child');
        this.hoursElement = document.querySelector('.cronometer-content:nth-child(2) p:first-child');
        this.minutesElement = document.querySelector('.cronometer-content:nth-child(3) p:first-child');
        this.secondsElement = document.querySelector('.cronometer-content:nth-child(4) p:first-child');
        
        this.endDate = this.getEndDate();
        
        this.updateCountdown();
        this.startTimer();
    }

    getEndDate() {
        const savedEndDate = localStorage.getItem('countdownEndDate');
        
        if (savedEndDate) {
            const endDate = new Date(savedEndDate);
            if (endDate > new Date()) {
                return endDate;
            }
        }
        
        const newEndDate = new Date();
        newEndDate.setDate(newEndDate.getDate() + 7); 
        
        localStorage.setItem('countdownEndDate', newEndDate.toISOString());
        
        return newEndDate;
    }

    calculateTimeRemaining() {
        const now = new Date().getTime();
        const distance = this.endDate.getTime() - now;

        if (distance < 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                expired: true
            };
        }

        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            expired: false
        };
    }

    formatNumber(num) {
        return num < 10 ? `0${num}` : num;
    }

    updateCountdown() {
        const time = this.calculateTimeRemaining();

        if (time.expired) {
            this.handleExpiration();
            return;
        }

        if (this.daysElement) this.daysElement.textContent = this.formatNumber(time.days);
        if (this.hoursElement) this.hoursElement.textContent = this.formatNumber(time.hours);
        if (this.minutesElement) this.minutesElement.textContent = this.formatNumber(time.minutes);
        if (this.secondsElement) this.secondsElement.textContent = this.formatNumber(time.seconds);

        if (time.days === 0 && time.hours === 0 && time.minutes < 5) {
            const cronometer = document.querySelector('.cronometer');
            if (cronometer && !cronometer.classList.contains('urgent')) {
                cronometer.classList.add('urgent');
            }
        }
    }

    handleExpiration() {
        if (this.daysElement) this.daysElement.textContent = '00';
        if (this.hoursElement) this.hoursElement.textContent = '00';
        if (this.minutesElement) this.minutesElement.textContent = '00';
        if (this.secondsElement) this.secondsElement.textContent = '00';

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        const cronometer = document.querySelector('.cronometer');
        if (cronometer) {
            const title = cronometer.querySelector('h4');
            if (title) {
                title.textContent = 'OFERTA EXPIRADA!';
                title.style.color = '#ef4444';
            }
        }

        localStorage.removeItem('countdownEndDate');
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
}

class ProgressBar {
    constructor() {
        this.progressBar = document.getElementById('lineprogressBar');
        this.totalSold = 45;
        this.totalStock = 100;
        
        this.updateProgress();
    }

    updateProgress() {
        if (!this.progressBar) return;

        const percentage = (this.totalSold / this.totalStock) * 100;
        
        setTimeout(() => {
            this.progressBar.style.width = `${percentage}%`;
        }, 300);

        if (percentage >= 80) {
            this.progressBar.style.background = 'linear-gradient(90deg, #2d9acc, #1f8dc0ff)';
        } else if (percentage >= 50) {
            this.progressBar.style.background = 'linear-gradient(90deg, #2d8cccff, #1e76b1ff)';
        } else {
            this.progressBar.style.background = 'linear-gradient(90deg, #2d72ccff, #205fb1ff)';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const countdown = new CountdownTimer();
    
    const progressBar = new ProgressBar();
    
    const cardDestaque = document.querySelector('.card-destaque');
    if (cardDestaque) {
        cardDestaque.addEventListener('mouseenter', () => {
            cardDestaque.style.transform = 'translateY(-5px)';
        });
        
        cardDestaque.addEventListener('mouseleave', () => {
            cardDestaque.style.transform = 'translateY(0)';
        });
    }
});
