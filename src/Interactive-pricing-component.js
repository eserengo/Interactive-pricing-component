(function () {
  const data = [
    { query: 'body', tag: 'header', class: `header`, content: `<h1>Simple, traffic-based pricing</h1><h2>Sign-up for our 30-day trial. No credit card required.</h2>` },
    { query: 'body', tag: 'main', class: `card`, content: `<form action="#" method="get" id="form-action" rel="noreferrer" target="_blank" autocomplete="off" novalidate><label for="range" form="form-action"><h2 class="uppercase range-views"><span id="view"></span> pageviews</h2></label><input type="range" id="range" class="selectable" form="form-action" list="markers" step="25" required><datalist id="markers"><option value="0"></option><option value="25"></option><option value="50"></option><option value="75"></option><option value="100"></option></datalist><br><div class="floating"><h3 class="inline range-cost">$ <span id="result"></span></h3><h2 class="inline range-period"></h2></div><label for="checkbox" class="checkbox inactive" form="form-action"><span class="para">Monthly Billing</span><input type="checkbox" id="checkbox" form="form-action" /><span class="para">Yearly Billing</span><span class="discount">-25%</span></label><div class="wrapper inactive"><img src="./src/images/icon-check.svg" alt="check icon image" /><span class="para">Unlimited websites</span><br><img src="./src/images/icon-check.svg" alt="check icon image" /><span class="para">100% data ownership</span><br><img src="./src/images/icon-check.svg" alt="check icon image" /><span class="para">Email reports</span></div><input type="submit" class="button primary inactive submitBtn" value="Start my trial" form="form-action"/></form>` },
    { query: 'body', tag: 'footer', class: `footer`, content: `Challenge by <a class="anchor" href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a class="anchor" href="https://github.com/eserengo/" target="_blank">Federico Borzani</a>.` },
    { name: 'modal', query: 'body', tag: 'div', class: `modal flex-col center`, content: `<img src="./src/images/icon-check.svg" class="modal check" alt="check icon image" /><br><h1>Thank you!</h1><button class="button secondary selectable closeBtn">Continue</button>` },
  ];

  const values = [
    { value: 0, cost: 8, view: '10k' },
    { value: 25, cost: 12, view: '50k' },
    { value: 50, cost: 16, view: '100k' },
    { value: 75, cost: 24, view: '500k' },
    { value: 100, cost: 36, view: '1m' },
  ];

  const createContent = () => {
    document.querySelector('body').classList.add('body');
    data.map(item => {
      if (Object.hasOwn(item, 'name')) {
        return null;
      } else {
        return document.querySelector(`${item.query}`).insertAdjacentHTML('beforeend', `<${item.tag} class='${item.class}'>${item.content}</${item.tag}`)
      }
    });
  }

  const displayOnResize = () => {
    if (window.matchMedia("(width<=375px)").matches) {
      // RULES
      document.querySelectorAll('.desktop').forEach(item => {
        item.classList.add('hidden');
      })
      document.querySelectorAll('.mobile').forEach(item => {
        item.classList.remove('hidden');
      })
      document.querySelector('.card').classList.remove('flex-row');
      document.querySelector('.card').classList.add('flex-col');
      document.querySelector('.card').classList.add('center');
      document.querySelector('.floating').classList.remove('right');
      document.querySelector('.submitBtn').classList.remove('right');
    }
    if (window.matchMedia("(width>375px)").matches) {
      // RULES
      document.querySelectorAll('.mobile').forEach(item => {
        item.classList.add('hidden');
      })
      document.querySelectorAll('.desktop').forEach(item => {
        item.classList.remove('hidden');
      })
      document.querySelector('.card').classList.remove('flex-col');      
      document.querySelector('.card').classList.remove('center');
      document.querySelector('.card').classList.add('flex-row');
      document.querySelector('.floating').classList.add('right');
      document.querySelector('.submitBtn').classList.add('right');
    }
  }
  
  function displayForm() {
    document.querySelector('.checkbox').classList.remove('inactive');
    document.getElementById('checkbox').classList.add('selectable');
    document.querySelector('.submitBtn').classList.remove('inactive');
    document.querySelector('.submitBtn').classList.add('selectable');
    document.querySelector('.wrapper').classList.remove('inactive');
      if (!document.getElementById('checkbox').checked) {
        values.filter(item => {
          if (item.value == this.value) {
            document.getElementById('view').textContent = item.view;
            document.getElementById('result').textContent = item.cost;
          }
        })
        document.querySelector('.range-period').textContent = '/month';
      }
    if (document.getElementById('checkbox').checked) {
      values.filter(item => {
        if (item.value == this.value) {
          document.getElementById('view').textContent = item.view;
          document.getElementById('result').textContent = (item.cost * 12) - (Math.round((item.cost * 12) * (25 / 100)));
        }
      })
      document.querySelector('.range-period').textContent = '/year';
    }
    document.getElementById('checkbox').addEventListener('change', (event) => {
      if (!document.getElementById('checkbox').checked) {
        values.filter(item => {
          if (item.value == this.value) {
            document.getElementById('view').textContent = item.view;
            document.getElementById('result').textContent = item.cost;
          }
        })
        document.querySelector('.range-period').textContent = '/month';
      }
      if (document.getElementById('checkbox').checked) {
        values.filter(item => {
          if (item.value == this.value) {
            document.getElementById('view').textContent = item.view;
            document.getElementById('result').textContent = (item.cost * 12) - (Math.round((item.cost * 12) * (25 / 100)));
          }
        })
        document.querySelector('.range-period').textContent = '/year';
      }
    });
    document.querySelector('.submitBtn').addEventListener('click', event => {
      event.preventDefault();
      data.filter(item => {
        if (Object.hasOwn(item, 'name')) {
          if (item.name === 'modal') {
            return document.querySelector(`${item.query}`).insertAdjacentHTML('beforeend', `<${item.tag} class='${item.class}'>${item.content}</${item.tag}`);
          }
        }
      })
      document.querySelectorAll('.header, .main, .footer').forEach(item => item.classList.add('blur'));
      document.querySelectorAll('.closeBtn').forEach(item => {
        item.addEventListener('click', () => {
          window.location.reload();
        })
      })
    })
  }

  window.addEventListener('resize', () => {
    let timer;
    window.clearTimeout(timer);
    timer = window.setTimeout(displayOnResize(), 500);
  });


  window.addEventListener('DOMContentLoaded', () => {
    createContent();
    document.getElementById('range').addEventListener("change", displayForm);
    displayOnResize();
  })
})();