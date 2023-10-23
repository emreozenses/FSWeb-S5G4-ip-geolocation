//axios import buraya gelecek

import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/
//benimIP = "217.131.100.59";
ipAdresimiAl().then(() => {
  const url = "https://apis.ergineer.com/ipgeoapi/" + benimIP;
  axios
    .get(url)
    .then((response) => {
      const component = infoCreator(response.data);
      const cards = document.querySelector(".cards");
      cards.append(component);
    })
    .catch((error) => {
      console.log("hata" + error);
    });
});
/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

const infoCreator = (data) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const imgBayrak = document.createElement("img");
  imgBayrak.src = `https://flagsapi.com/${data.ülkeKodu}/flat/64.png`;

  const cardInfoDiv = document.createElement("div");
  cardInfoDiv.className = "card-info";

  const ip = document.createElement("h3");
  ip.className = "ip";
  ip.textContent = benimIP;

  const ulke = document.createElement("p");
  ulke.className = "ulke";
  ulke.textContent = data.ülke + " (" + data.ülkeKodu + ")";

  const enlemP = document.createElement("p");
  enlemP.textContent = "Enlem:" + data.enlem + "Boylam:" + data.boylam;

  const sehirP = document.createElement("p");
  sehirP.textContent = "Şehir:" + data.şehir;

  const saatP = document.createElement("p");
  saatP.textContent = "Saat dilimi:" + data.saatdilimi;

  const paraP = document.createElement("p");
  paraP.textContent = "Para birimi:" + data.parabirimi;

  const ispP = document.createElement("p");
  ispP.textContent = "ISP:" + data.isp;

  cardDiv.append(imgBayrak, cardInfoDiv);

  cardInfoDiv.append(ip);
  cardInfoDiv.append(ulke);
  cardInfoDiv.append(enlemP);
  cardInfoDiv.append(sehirP);
  cardInfoDiv.append(saatP);
  cardInfoDiv.append(paraP);
  cardInfoDiv.append(ispP);

  return cardDiv;
};

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek
