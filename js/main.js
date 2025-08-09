// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
const navbar = document.getElementById("navScroll");
window.addEventListener("scroll", function() {
    if (window.scrollY > 5) {
        navbar.classList.add("navScroll");
    } else {
        navbar.classList.remove("navScroll");
    }
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const anchorLinks = document.querySelectorAll(".nav-links a");

hamburger.addEventListener('click', () => {
    // Animate Links
    navbar.classList.remove("navScroll");
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    // Hamburger Animation
    hamburger.classList.toggle("toggle");
});

// Close navbar when an anchor link is clicked
anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', () => {
        navLinks.classList.remove("open");
        links.forEach(link => {
            link.classList.remove("fade");
        });
        hamburger.classList.remove("toggle");
    });
});

const buttonsComponent = document.querySelector('.buttons');
const buttonsToggle = document.querySelector('.buttons__toggle');

buttonsToggle.addEventListener('click', toggleButtons);

function toggleButtons() {
	buttonsToggle.classList.toggle('buttons__toggle--active');
	buttonsComponent.classList.toggle('buttons--active');
	document.activeElement.blur();
}
// معالج الفورم المبسط
class SimpleContactForm {
    constructor() {
        this.emailAddress = "adelgomaa82@yahoo.com";
        this.init();
    }

    init() {
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // منع الإرسال الافتراضي
            this.handleSubmit();
        });

        // إضافة التحقق المباشر للحقول
        this.setupValidation();
    }

    // معالجة إرسال الفورم
    handleSubmit() {
        const formData = this.getFormData();
        const errors = this.validateForm(formData);

        if (errors.length > 0) {
            this.showErrors(errors);
            return;
        }

        // إظهار رسالة التحميل
        this.showLoading();

        // إرسال الإيميل
        this.sendEmail(formData);
    }

    // جمع بيانات الفورم
    getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };
    }

    // التحقق من صحة البيانات
    validateForm(data) {
        const errors = [];

        if (!data.name || data.name.length < 2) {
            errors.push('Please enter a valid name (at least 2 characters)');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.phone || data.phone.length < 10) {
            errors.push('Please enter a valid phone number');
        }

        if (!data.message || data.message.length < 10) {
            errors.push('Please enter a message (at least 10 characters)');
        }

        return errors;
    }

    // فحص صحة البريد الإلكتروني
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // إرسال الإيميل
    sendEmail(data) {
        const subject = `New Contact Form Submission - ${data.name}`;
        const body = this.formatEmailBody(data);
        
        const mailtoLink = `mailto:${this.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // فتح الإيميل
        window.location.href = mailtoLink;
        
        // إظهار رسالة النجاح وإعادة تعيين الفورم
        setTimeout(() => {
            this.showSuccess();
            this.resetForm();
        }, 1000);
    }

    // تنسيق نص الإيميل
    formatEmailBody(data) {
        return `Contact us 

Client Details:
---------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
--------
${data.message}

--------------------------
Sent from: El Yasmen Flowers Website
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}`;
    }

    // إعداد التحقق المباشر
    setupValidation() {
        const fields = ['name', 'email', 'phone', 'message'];
        
        fields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            element.addEventListener('input', () => {
                this.validateField(fieldId);
            });
            element.addEventListener('blur', () => {
                this.validateField(fieldId);
            });
        });
    }

    // فحص حقل واحد
    validateField(fieldId) {
        const element = document.getElementById(fieldId);
        const value = element.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(fieldId) {
            case 'name':
                isValid = value.length >= 2;
                errorMessage = 'Name is too short';
                break;
            case 'email':
                isValid = this.isValidEmail(value);
                errorMessage = 'Invalid email format';
                break;
            case 'phone':
                isValid = value.length >= 10;
                errorMessage = 'Phone number is too short';
                break;
            case 'message':
                isValid = value.length >= 10;
                errorMessage = 'Message is too short';
                break;
        }

        // إزالة رسائل الخطأ السابقة
        this.removeFieldError(element);

        if (isValid) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else if (value.length > 0) {
            element.classList.add('invalid');
            element.classList.remove('valid');
            this.showFieldError(element, errorMessage);
        } else {
            element.classList.remove('valid', 'invalid');
        }
    }

    // إظهار خطأ حقل محدد
    showFieldError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }

    // إزالة خطأ حقل محدد
    removeFieldError(element) {
        const existingError = element.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // إظهار رسالة التحميل
    showLoading() {
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // إعادة الزر لحالته الأصلية بعد 3 ثواني
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }

    // إظهار أخطاء عامة
    showErrors(errors) {
        this.removeAlerts();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-alert';
        errorDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-exclamation-triangle"></i>
                <div class="alert-text">
                    <strong>Please fix the following errors:</strong>
                    <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
                </div>
                <button class="close-alert">&times;</button>
            </div>
        `;

        document.getElementById('contactForm').prepend(errorDiv);

        // إغلاق التنبيه
        errorDiv.querySelector('.close-alert').addEventListener('click', () => {
            errorDiv.remove();
        });

        // إزالة تلقائية بعد 7 ثواني
        setTimeout(() => {
            if (errorDiv.parentNode) errorDiv.remove();
        }, 7000);
    }

    // إظهار رسالة نجاح
    showSuccess() {
        this.removeAlerts();

        const successDiv = document.createElement('div');
        successDiv.className = 'success-alert';
        successDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-check-circle"></i>
                <div class="alert-text">
                    <strong>Success!</strong>
                    <p>Your email client should open now. Please send the email to complete your message.</p>
                </div>
                <button class="close-alert">&times;</button>
            </div>
        `;

        document.getElementById('contactForm').prepend(successDiv);

        successDiv.querySelector('.close-alert').addEventListener('click', () => {
            successDiv.remove();
        });

        setTimeout(() => {
            if (successDiv.parentNode) successDiv.remove();
        }, 5000);
    }

    // إزالة جميع التنبيهات
    removeAlerts() {
        const alerts = document.querySelectorAll('.error-alert, .success-alert');
        alerts.forEach(alert => alert.remove());
    }

    // إعادة تعيين الفورم
    resetForm() {
        document.getElementById('contactForm').reset();
        const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        // إزالة رسائل الخطأ
        const fieldErrors = document.querySelectorAll('.field-error');
        fieldErrors.forEach(error => error.remove());
    }
}

// تشغيل الكود عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new SimpleContactForm();
});