console.clear();
// ===== DOM Elements ===== //
const universalDate = document.querySelector("#datepicker");
const twDate = document.querySelector("#datepickerTW");


// ===== English Calendar ===== //
const datePicker = flatpickr(universalDate, {
    enableTime: true,
    defaultDate: "today",
    time_24hr: false,
    minDate: "1911.01.01",
    maxDate: "01,01,2030",
    dateFormat: "d-m-Y",
    altInput: true,
    altFormat: "F j ,Y. D h:iK",
});


// ===== 中文 Calendar ===== //
// Reference: https://tipsfordev.com/flatpickr-adding-dropdown-to-change-year
const SELF_DROP_YEAR = "flatpickr-selfmade-years"
const momentDateFormat = "YYYY-M-DD-LT";
const datePickerTW = flatpickr(twDate, {
    locale: "zh_tw",
    mode: "range",
    minDate: "01,01,1911",
    maxDate: "01,01,2030",
    dateFormat: momentDateFormat,
    formatDate: convertDateFormat,
    onReady: function (selectedDates, dateStr, instance) {

        // Step1: hide original year input
        const oldYear = instance.currentYearElement
        const childrenDom = oldYear.parentNode.childNodes
        for (let i = 0; i < childrenDom.length; i++) {
            childrenDom[i].style.display = "none"
        }

        // Step2: create dropdown select
        const dropdown = document.createElement("select")
        const minDate = moment(instance.config.minDate)
        const maxDate = moment(instance.config.maxDate)

        for (let i = minDate.year(); i <= maxDate.year(); i++) {
            const childNode = document.createElement("option")
            childNode.value = i
            childNode.text = `民國 ${i - 1911}`
            childNode.className="flatpickr-monthDropdown-month"
            dropdown.appendChild(childNode)
        }

        // Step3: add event listener for select
        dropdown.addEventListener('change', (event) => {            
            instance.currentYear = parseInt(event.target.value)
            instance.redraw()
        })
        //Step4: add classes and id to yearSelect and append it to yearEl
        dropdown.id = SELF_DROP_YEAR
        dropdown.className = "flatpickr-monthDropdown-months"
        
        console.log(instance.currentYear.value);
        dropdown.value = instance.currentYear
        oldYear.parentNode.appendChild(dropdown)
    },
    onMonthChange: function (selectedDates, dateStr, instance) {
        // update custom select year value
        
        document.getElementById(SELF_DROP_YEAR).value = instance.currentYear
    },
});

// convert date format
function convertDateFormat(dateObj, formatString, locale) {
    const year = moment(dateObj).year() - 1911;
    const dateArr = moment(dateObj).format(`民國 ${year}年 MM月 DD日`);
    
    return dateArr;
}
