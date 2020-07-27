// group them in type, eg. graphic books, novels -- unique identifier, SECTIONS
// 1 - check title (key), volume # (the order of that book collection)
// 2 - stack all sames titles together, no order needed
// 3 - sort 

var pilesOfBooks = {};

var unorganized = [
    {
        "title":"Tin Tin",
        "volumne":5
    },
    {
        "title":"astro boy",
        "volumne":4
    },
    {
        "title":"swamp thing",
        "volumne":3
    },
    {
        "title":"astro boy",
        "volumne":2
    },
    {
        "title":"curious george",
        "volumne":16
    },
    {
        "title":"swamp thing",
        "volumne":1
    },
    {
        "title":"astro boy",
        "volumne":1
    },
    {
        "title":"swamp thing",
        "volumne":2
    },
    {
        "title":"astro boy",
        "volumne":3
    },
];

for(let i = 0; i < unorganized.length; i++) {
    var book = unorganized[i]; //giving an index to any item
    // if it doesn't fit into existing pile, create new pile
    if(! pilesOfBooks.hasOwnProperty(book.title)) { // more specifically, if the key or title does not exist
        pilesOfBooks[book.title] = [];
    }
    // add this to new pile
    pilesOfBooks[book.title].push(book);
}
console.log(pilesOfBooks);

//we need a list of piles of books
// var listOfPiles = [
//     {
//         "tin tin": [
//             {
//                 "title": "tin tin",
//                 "volume": 5
//             },
//         ],
//     },
//     {
//         "astro boy": [
//             {
//                 "title":"astro boy",
//                 "volumne":3
//             },
//         ]
//     }
// ];
var titleKeys = Object.keys(pilesOfBooks);
//console.log(titleKeys);

for( let i = 0; i < titleKeys.length; i++) {
    var titleKey = titleKeys[i];

    console.log(titleKey);
    console.log(pilesOfBooks[titleKey]);
}