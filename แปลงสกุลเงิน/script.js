const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");

const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

const rateText = document.getElementById("rate");
const swap = document.getElementById("btn");

currency_one.addEventListener("change", calculateMoney);
currency_two.addEventListener("change", calculateMoney);
amount_one.addEventListener("input", calculateMoney);
amount_two.addEventListener("input", calculateMoney);

function calculateMoney() {
  const one = currency_one.value;
  const two = currency_two.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[two];
      rateText.innerText = `1 ${one} = ${rate} ${two}`;
      amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

swap.addEventListener("click", () => {
  const temp = currency_one.value; //สร้างตัวแปร temp ขึ้นมาเพื่อเก็บค่าไว้ชั่วคราว
  //เพื่อที่จะสลับค่าได้
  currency_one.value = currency_two.value; //การสลับค่า
  currency_two.value = temp; //การสลับค่า
  //เมื่อสลับค่าแล้วให้ทำการคำนวณเงินใหม่อีกครั้ง
  calculateMoney();
});
calculateMoney();
