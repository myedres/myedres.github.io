---
---

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

mobileMenu.addEventListener('click', () =>{
  mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', 'false');
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      q.setAttribute('aria-expanded', 'true');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Update hero section gold price card
async function fetchGoldPrice() {
    const gold_price_url = '{{ site.gold_spot_price_api_url }}';
    const payout10K = '{{ site.business.payout_10K }}';
    const payout14K = '{{ site.business.payout_14K }}';
    const payout18K = '{{ site.business.payout_18K }}';
    const payout22K = '{{ site.business.payout_22K }}';
    const payout24K = '{{ site.business.payout_24K }}';

    try {
        const response = await fetch(gold_price_url);
        const data = await response.json();

        // XAU is typically priced per ounce in USD. 
        // Invert or adjust calculation depending on your specific API structure.
        const pricePerOunce = data.price;
        const pricePerGr = pricePerOunce / 31.1035;

        const price10K = (pricePerGr * payout10K).toFixed(2);
        const price14K = (pricePerGr * payout14K).toFixed(2);
        const price18K = (pricePerGr * payout18K).toFixed(2);
        const price22K = (pricePerGr * payout22K).toFixed(2);
        const price24K = (pricePerGr * payout24K).toFixed(2);

        const formatedLabelText =   "24K gold - $" + price24K + "/g<br/>" +
                                    "22K gold - $" + price22K + "/g<br/>" +
                                    "18K gold - $" + price18K + "/g<br/>" +
                                    "14K gold - $" + price14K + "/g<br/>" +
                                    "10K gold - $" + price10K + "/g<br/>" +
                                    "<small>Prices in CAD. Updated: " +
                                    new Date(data.updatedAt).toDateString();


        document.getElementById('gold-price').innerHTML = formatedLabelText;
    } catch (error) {
        document.getElementById('gold-price').innerText = 'Failed to load price.';
        console.error('Error fetching gold price:', error);
    }
}
fetchGoldPrice();
// Refresh every 60 seconds
// setInterval(fetchGoldPrice, 60000);