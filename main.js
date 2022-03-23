fetch(
  "https://api.nytimes.com/svc/books/v3//lists/full-overview.json?api-key=Q32Hh0yfvQmS9Gs3QE7dVTEOz8lSi5PY"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    // Creates Book Class
    class Book{
      constructor(data){
        this.data = data
        this.mkBook()
        this.infoCheck()
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

      infoCheck(){
        
        if(this.book.description === ""){
          this.book.description = 'No description avalable :(';
        }
        return this.book.description;
      }
    }
    // Veriables 
    let tBook = new Book(data).book;
    let nBook = new Book(data);
    let book = tBook;
    let oldBks = [];
    let curN = '';
    let btn = document.getElementById('btn');
    let bName = document.getElementById('book-name')
    let outMsg = bName.innerHTML = "Sorry it seems you've seen every book on the Best Sellers List :(";
    // Sets Info On Page
    function setPage(book){
      document.getElementById("book-img").setAttribute("style",`background:url(${book.book_image});width:${book.book_image_width + "px"};height:${book.book_image_height + "px"};`);
      bName.innerHTML = `${book.title}`;
      document.getElementById('author').innerHTML =`${book.author}`;
      console.log(book.description);
      console.log(book.book_image_height);
      console.log(book.book_image_width);
      return book
    }
    //Sets First Book & Next Book
    function startPage(){
    console.log('now');
    console.log(book.title);
    console.log('next');
    console.log(nBook.book.title);
    btn.setAttribute("style",`background:url(${nBook.book.book_image});`);
    setPage(book);
    }

    // Sets Up Next Book
    function nextB(){
      tBook = nBook.book;
      console.log('now');
      console.log(tBook.title);
      nBook = new Book(data);
      let count = 0;
      while(nBook.book === tBook || oldBks.includes(nBook.book)){
        count++;
        if(count >= 200){
          console.log('23423');
          return outMsg;
        }else{nBook = new Book(data);}
      }
      console.log(nBook.book.book_image_height)
      btn.setAttribute("style",`background:url(${nBook.book.book_image})`);
      console.log('next');
      console.log(nBook.book.title);
      setPage(tBook);
      return nBook;
    }

    function prevBook(){
      if(!oldBks.includes(tBook)){
        oldBks.push(tBook);
      }
      // tBook =                                                                    
    }
    startPage()
    //Btn Actions
    btn.addEventListener("click", () => {
      if(!oldBks.includes(tBook)){
        oldBks.push(tBook);
      }
      let n = nextB()
      if(n == !outMsg){
        nBook = n;
        console.log(oldBks);
        curN = oldBks.length - 1;
        console.log(curN);
      }else{console.log('no more');}
     
      
    });
  });
