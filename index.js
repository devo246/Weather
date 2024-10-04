let apiKey = "0d745dba92178abed54c8db481e48edf";
let apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let weatherIcon = document.getElementById('image')
// دالة لتحميل بيانات الطقس
async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);
        
        // تحقق من استجابة الطلب
        if (!response.ok) {
            throw new Error('لم يتم العثور على المدينة. يرجى التحقق من الاسم.');
        }

        let data = await response.json();

        console.log(data);
        
        // تحديث واجهة المستخدم
        document.getElementById('city_name').innerHTML = data.name; 
        document.getElementById('degree').innerHTML = Math.round(data.main.temp) + "°C"; 
        document.getElementById('present').innerHTML = data.main.humidity + "%";
        document.getElementById('speed').innerHTML = data.wind.speed + " km/h"; 

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "Images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "Images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "Images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "Images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "Images/mist.png";
        }
        
        // حفظ اسم المدينة في localStorage
        localStorage.setItem('lastCity', city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message); // عرض رسالة الخطأ في تنبيه
    }
}

// دالة للبحث
function search() {
    let input = document.getElementById('city_search');
    checkWeather(input.value);
}

// دالة لتحميل المدينة الأخيرة عند بدء تحميل الصفحة
function loadLastCity() {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        checkWeather(lastCity); // جلب بيانات الطقس للمدينة الأخيرة
    }
}

// استدعاء دالة تحميل المدينة الأخيرة عند تحميل الصفحة
window.onload = loadLastCity;
