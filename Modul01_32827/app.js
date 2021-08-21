const bmiResult = document.getElementById('bmi-result');
const bmiValue = document.getElementById('bmi-value');
const calculateBtn = document.getElementById('bmi-btn');
const heightInput = document.getElementById('height-input');
const resetBtn = document.getElementById('reset-btn');
const weightInput = document.getElementById('weight-input');

const calculateBMI = () => {
  const enteredHeight = parseInt(heightInput.value, 10) / 100;
  const enteredWeight = parseInt(weightInput.value, 10);
  const bmi = enteredWeight / (enteredHeight * enteredHeight);

  if (bmi < 18.5) {
    bmiResult.textContent = 'Kurus';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    bmiResult.textContent = 'Normal';
  } else if (bmi >= 25 && bmi <= 29.9) {
    bmiResult.textContent = 'Gemuk';
  } else {
    bmiResult.textContent = 'Obseitas';
  }

  bmiValue.textContent = bmi;
};

calculateBtn.addEventListener('click', calculateBMI);

resetBtn.addEventListener('click', () => {
  bmiValue.textContent = 'Belum dihitung!';
  bmiResult.textContent = 'Mohon hitung terlebih dahulu!';
});
