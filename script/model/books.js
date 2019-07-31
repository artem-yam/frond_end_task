var Book = (function(){
    "use strict;"

    function Book(id, title, author, image, stars){
        this.id = id;
        this.title = title;
        this.author = author;

        this.image  = image || "nocover.jpg";
        this.stars = stars || 0;

    }

    return Book;

}());

var BooksStore = (function (Book) {

    "use strict";

    return [
        new Book(1, "Jewels of Nizam", "Geeta Devi", "JewelsOfNizam.jpg", 5),
        new Book(2, "Cakes & Bakes", "Sanjeev Kapoor", "CakesAndBakes.jpg", 5),
        new Book(3, "Jamie's Kitchen", "Jamie Oliver", "JamiesKitchen.jpg", 4),
        new Book(4, "Inexpensive Family Meals", "Simon Holst", "InexpensiveFamilyMeals.jpg", 3),
        new Book(5, "Paleo Slow Cooking", "Chrissy Gawer", "PaleoSlowCooking.jpg", 4),
        new Book(6, "Cook Like an Italian", "Toble Puttock", "CookLikeAnItalian.jpg", 3),
        new Book(7, "Suneeta Vaswani", "Geeta Devi", "SuneetaVaswani.jpg", 5),
        new Book(8, "Jamie Does", "Jamie Oliver", "JamieDoes.jpg", 3),
        new Book(9, "Jamie's Italy", "Jamie Oliver", "JamiesItaly.jpg", 5),
        new Book(10, "Vegetables Cookbook", "Matthew Biggs", "VegetablesCookbook.jpg", 3)
    ];

} (Book));