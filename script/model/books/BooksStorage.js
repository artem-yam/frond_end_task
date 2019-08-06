let booksStorage = (function (book) {
    "use strict";

    return [
        new book(1, "Jewels of Nizam", "Geeta Devi", "JewelsOfNizam.jpg", 5),
        new book(2, "Cakes & Bakes", "Sanjeev Kapoor", "CakesAndBakes.jpg", 5),
        new book(3, "Jamie's Kitchen", "Jamie Oliver", "JamiesKitchen.jpg", 4),
        new book(4, "Inexpensive Family Meals", "Simon Holst", "InexpensiveFamilyMeals.jpg", 3),
        new book(5, "Paleo Slow Cooking", "Chrissy Gawer", "PaleoSlowCooking.jpg", 4),
        new book(6, "Cook Like an Italian", "Toble Puttock", "CookLikeAnItalian.jpg", 3),
        new book(7, "Suneeta Vaswani", "Geeta Devi", "SuneetaVaswani.jpg", 5),
        new book(8, "Jamie Does", "Jamie Oliver", "JamieDoes.jpg", 3),
        new book(9, "Jamie's Italy", "Jamie Oliver", "JamiesItaly.jpg", 5),
        new book(10, "Vegetables Cookbook", "Matthew Biggs", "VegetablesCookbook.jpg", 3)
    ];
}(book));