const apiKey = '13edbb9eeace16994be848f8';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromcorent = document.getElementById('fromcorent');
const tocorent = document.getElementById('tocorent');
const qiymatchiqar = document.getElementById('qiymatchiqar');
const jamlanma = document.getElementById('jamlanma');
const amountInput = document.getElementById('amount');
const result = document.getElementById('result');

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = option2.value = currency;
      option1.textContent = option2.textContent = currency;
      fromcorent.appendChild(option1);
      tocorent.appendChild(option2);
    });

    fromcorent.value = 'USD';
    tocorent.value = 'UZS';

    jamlanma.textContent = ""; 
  })
  .catch(() => {
    jamlanma.textContent = "Valyutalar yuklanmadi.";
  });

qiymatchiqar.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const from = fromcorent.value;
  const to = tocorent.value;


  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[to];
      const converted = (amount * rate).toFixed(2);
      result.textContent = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      result.textContent = "Xatolik yuz berdi.";
    });
});
