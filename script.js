const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//ID NYA HARUS SAMA DI HTML

let apiQuotes = []

//naming lebih lengkap
function ShowLoadingSpinner(){
    loader.hidden  = false;
    quoteContainer.hidden = true;
}

//Hide loading spinner
function RemoveLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//show new quote
function newQuote(){
    ShowLoadingSpinner();
    // pICK A RANDOM QUOTE from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    RemoveLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
    ShowLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try { //fetch request
        //disini fungsi try catch awai fetch harus ngecheck apakah async atau tidak
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
    //console.log(apiQuotes[12]); //dimasukin braket biar bisa milih spesifik quotenya
    //disini kita harus bikin function yang intinya cuma munculin
    // satu quote dari 1 fetch request tiap kali ngeklik sesuatu

    //kalo ini bisa lebih spesifik
    newQuote();

    } catch (error) {
      getQuotes();
    }
}
function tweetQuote(){
    // pake back ticks, posisinya dibawah escape key ``"" beda kan
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuotes();

// ASAASDAA
