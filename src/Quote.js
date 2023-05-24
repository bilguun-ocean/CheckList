export class Quote {
  constructor() {
    this.quoteContainer = document.querySelector('#quote-container');
    this.quoteText = document.querySelector("#quote-text");
    this.quoteFooter = document.querySelector("#quote-footer");
    this.quoteBtn = document.querySelector('#quote-btn');
    this.quotes = [];

    this.initializeQuote();
  }

  initializeQuote() {
    this.fetchMotivationalQuotes()
      .then(quotes => {
        this.quotes = quotes;
        this.displayRandomQuote();
      })
      .catch(error => console.error(error));

    this.quoteBtn.addEventListener("click", () => {
      this.displayRandomQuote();
    });
  }

  fetchMotivationalQuotes() {
    return fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then(data => data);
  }

  displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    const randomQuote = this.quotes[randomIndex];
    this.quoteText.innerText = randomQuote.text;
    this.quoteFooter.innerText = randomQuote.author;
  }
}