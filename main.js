fetch(
  "https://api.nytimes.com/svc/books/v3//lists/full-overview.json?api-key=Q32Hh0yfvQmS9Gs3QE7dVTEOz8lSi5PY"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    class Book{
      constructor(data){
        this.data = data
        // this.book = this.book
        this.mkBook()
        this.desc()
      }
      mkBook(){
        let list = this.data.results.lists;
        let rndmList = Math.floor(Math.random() * 17) + 1;
        let range = list[rndmList].books;
        let bookNmb = Math.floor(Math.random() * (range.length - 1)) + 1;
        console.log(rndmList);
        console.log(bookNmb);
        return this.book = list[rndmList].books[bookNmb];
      }

      desc(){
        let description = this.book.description;
        if(description === ""){
          description = 'No description avalable :(';
        }
        return description;
      }
    }
    let tBook = new Book(data);
    let nBook = new Book(data);
    let book = tBook.book;
    let oldBks = [];
    let curN = ''
  
    let btn = document.getElementById('btn');
    function setPage(book){
      document.getElementById("book-img").setAttribute("style",`background:url(${book.book_image});width:${book.book_image_width + "px"};height:${book.book_image_height + "px"};`);
      document.getElementById('book-name').innerHTML = `${book.title}`;
      document.getElementById('author').innerHTML =`${book.author}`;
      console.log(book.description);
      console.log(book.book_image_height);
      console.log(book.book_image_width);
      return book
    }
    function startPage(nBook,book){
    console.log('now');
    console.log(book.title);
    console.log('next');
    console.log(nBook.book.title);
    btn.setAttribute("style",`background:url(${nBook.book.book_image}) object-fit: scale-down;`);
    setPage(book)
    }

    function nextB(nBook){
      tBook = nBook.book;
      console.log('now');
      console.log(tBook.title);
      nBook = new Book(data);
      while(nBook.Book === tBook || oldBks.includes(nBook.Book)){
        nBook = new Book(data);
      }
      console.log(nBook.book.book_image_height)
      btn.setAttribute("style",`background:url(${nBook.book.book_image})`);
      console.log('next');
      console.log(nBook.book.title);
      setPage(tBook);
      return nBook;
    }
    startPage(nBook,book)
    btn.addEventListener("click", () => {
      
      nBook = nextB(nBook);
      if(!oldBks.includes(tBook)){
        oldBks.push(tBook);
      }
      console.log(oldBks);
      curN = oldBks.length - 1
      console.log(curN)
      
    });
  });
